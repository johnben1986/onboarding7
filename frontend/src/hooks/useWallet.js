import { ethers } from "ethers";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

import { API } from "./API";
import config from "../../../config/web3.js";
import { UserError } from "./errors";
import { toast } from "react-hot-toast";

const api = new API();

const parseSig = (bytes) => {
  bytes = bytes.substr(2);
  const r = "0x" + bytes.slice(0, 64);
  const s = "0x" + bytes.slice(64, 128);
  const v = parseInt("0x" + bytes.slice(128, 130), 16);
  return { v, r, s };
};

const getAuthSignature = async ({
  connector,
  currentAddress,
  onlyExisting,
}) => {
  const localStorageKeyForAccount = `v2:signature:${currentAddress}`;
  const storedSignature = localStorage.getItem(localStorageKeyForAccount);
  const storageSignatureDataKeyForAccount = `v2:signatureData:${currentAddress}`;
  const storedSignatureData = localStorage.getItem(
    storageSignatureDataKeyForAccount
  );

  let signature = storedSignature;
  let signatureData = storedSignatureData;

  if (onlyExisting) {
    return { signature, signatureData };
  }

  if (!signature || !signatureData) {
    signatureData = `Nonce: ${Math.floor(Math.random() * 1000000000000000000)}`;

    signature = await connector.personalSign(signatureData);
    localStorage.setItem(localStorageKeyForAccount, signature);
    localStorage.setItem(storageSignatureDataKeyForAccount, signatureData);
  }

  return { signature, signatureData };
};

const genericFunctions = {
  tryExistingConnection: async (provider) => {
    const accounts = (await provider.listAccounts()).map((account) =>
      account.toLowerCase()
    );

    return accounts[0];
  },
  connect: async (provider) => {
    try {
      const accounts = await provider.send("eth_requestAccounts");
      return accounts[0];
    } catch (err) {
      if (err.code === 4001) {
        throw new UserError("Metamask connection rejected by user.");
      } else if (err.code === -32002) {
        throw new UserError("Please open your wallet and select an account.");
      }
      throw err;
    }
  },
  isOnNetwork: async (provider, targetNetworkName) => {
    const networkParams = config.networks[targetNetworkName];
    const targetChainId = networkParams.chainId;
    const chainId = await provider.send("eth_chainId");
    return chainId == targetChainId;
  },
  switchNetwork: async (provider, targetNetworkName) => {
    const networkParams = config.networks[targetNetworkName];
    const targetChainId = networkParams.chainId;
    const chainId = await provider.send("eth_chainId");
    if (chainId == targetChainId) {
      return false;
    }
    console.log("switching chain id", chainId, targetChainId);
    try {
      await provider.send("wallet_switchEthereumChain", [
        {
          chainId: targetChainId,
        },
      ]);
    } catch (err) {
      console.log("CAUGHT", err);
      if (err.code === 4902 || err.code === -32603) {
        await provider.send("wallet_addEthereumChain", [
          {
            chainId: networkParams.chainId,
            chainName: networkParams.chainName,
            nativeCurrency: networkParams.nativeCurrency,
            rpcUrls: networkParams.rpcUrls,
            blockExplorerUrls: networkParams.blockExplorerUrls,
          },
        ]);
      } else if (err.code == 4001) {
        throw new UserError("User rejected switching to the correct network.");
      } else if (err.code == -32002) {
        throw new UserError(
          "Please switch to the correct network in Metamask."
        );
      } else {
        throw err;
      }
    }
  },
  personalSign: async (provider, message) => {
    try {
      return await provider.getSigner().signMessage(message);
    } catch (err) {
      if (err.code === 4001) {
        throw new UserError("User rejected signature request.");
      }
      throw err;
    }
  },
  signTypedData: async (provider, dataObject) => {
    //console.log(dataObject);

    //delete dataObject.types.EIP712Domain;

    console.log("SIGNER", provider.getSigner(), provider);

    let signature;
    try {
      try {
        signature = await provider.send("eth_signTypedData_v4", [
          await provider.getSigner().getAddress(),
          JSON.stringify(dataObject),

        ]);
      } catch (e) {
        console.log("FAILED TO SIGN WITH V4, TRYING V3", e);
        signature = await provider
          .getSigner()
          ._signTypedData(
            dataObject.domain,
            dataObject.types,
            dataObject.message,
          );
      }
    } catch (err) {
      if (err.code === 4001) {
        throw new UserError("User rejected signing the order.");
      }
      throw err;
    }

    const parsedSig = parseSig(signature);
    return (
      (await ethers.utils.defaultAbiCoder.encode(
        ["uint8", "bytes32", "bytes32"],
        [parsedSig.v, parsedSig.r, parsedSig.s]
      )) + (parsedSig.suffix || "")
    );
  },
};

async function getWalletConnectProvider() {
  const WalletConnectProvider = (await import("@walletconnect/web3-provider"))
    .default;

  const walletConnectProvider = new WalletConnectProvider({
    infuraId: undefined,
    rpc: {
      137: "https://polygon-rpc.com",
    },
    chainId: 137,
  });

  await walletConnectProvider.enable();

  walletConnectProvider.updateRpcUrl(137);

  return new ethers.providers.Web3Provider(walletConnectProvider);
}

const connectors = {
  metamask: {
    tryExistingConnection: async () => {
      if (!window.ethereum) {
        return null;
      }

      return await genericFunctions.tryExistingConnection(
        new ethers.providers.Web3Provider(window.ethereum)
      );
    },
    connect: async () => {
      if (!window.ethereum) {
        throw new UserError(
          "Metamask not installed. Please install the browser extension or use the mobile app."
        );
      }

      return await genericFunctions.connect(
        new ethers.providers.Web3Provider(window.ethereum)
      );
    },
    isOnNetwork: async (targetNetworkName) => {
      return await genericFunctions.isOnNetwork(
        new ethers.providers.Web3Provider(window.ethereum),
        targetNetworkName
      );
    },
    switchNetwork: async (targetNetworkName) => {
      return await genericFunctions.switchNetwork(
        new ethers.providers.Web3Provider(window.ethereum),
        targetNetworkName
      );
    },
    getEthersProvider: async () => {
      return new ethers.providers.Web3Provider(window.ethereum).getSigner();
    },
    personalSign: async (message) => {
      return await genericFunctions.personalSign(
        new ethers.providers.Web3Provider(window.ethereum),
        message
      );
    },
    signTypedData: async (dataObject) => {
      return await genericFunctions.signTypedData(
        new ethers.providers.Web3Provider(window.ethereum),
        dataObject
      );
    },
  },
  walletconnect: {
    tryExistingConnection: async () => {
      return null;
    },
    connect: async () => {
      try {
        const provider = await getWalletConnectProvider();
        const signer = await provider.getSigner();
        const account = (await signer.getAddress()).toLowerCase();
        return account;
      } catch (err) {
        if (err.message === "User closed modal") {
          throw new UserError("User closed modal.");
        }
        throw err;
      }
    },
    isOnNetwork: async (targetNetworkName) => {
      return await genericFunctions.isOnNetwork(
        await getWalletConnectProvider(),
        targetNetworkName
      );
    },
    switchNetwork: async (targetNetworkName) => {
      return await genericFunctions.switchNetwork(
        await getWalletConnectProvider(),
        targetNetworkName
      );
    },
    getEthersProvider: async () => {
      return (await getWalletConnectProvider()).getSigner();
    },
    personalSign: async (message) => {
      return await genericFunctions.personalSign(
        await getWalletConnectProvider(),
        message
      );
    },
    signTypedData: async (dataObject) => {
      return await genericFunctions.signTypedData(
        await getWalletConnectProvider(),
        dataObject
      );
    },
  },
};

const useWallet = create(
  immer((set, get) => {
    const addWalletOp = async (op) => {
      const uuid = uuidv4();
      set((state) => {
        state.walletOperations[uuid] = op;
      });
      return uuid;
    };

    const handleGenericWalletOp = async (
      executor,
      description,
      type = "wallet"
    ) => {
      const uuid = await addWalletOp({
        type: type,
        description,
        status: "pending",
      });

      try {
        const result = await executor();

        set((state) => {
          delete state.walletOperations[uuid];
        });

        return result;
      } catch (err) {
        set((state) => {
          state.walletOperations[uuid].status = "error";
          state.walletOperations[uuid].error = err;
        });
        throw err;
      }
    };

    return {
      currentAddress: null,
      walletOperations: {},
      currentFlow: null,
      config,

      connectWallet: async (connectorId) => {
        if (!connectorId) {
          set((state) => {
            state.choosingWallet = true;
          });
          return;
        } else {
          set((state) => {
            state.choosingWallet = false;
          });
        }

        try {
          const connector = connectors[connectorId];

          const selectedAddress = await handleGenericWalletOp(
            () => connector.connect(),
            "Choose an account"
          );
          const { signature, signatureData } = await handleGenericWalletOp(
            () =>
              getAuthSignature({ connector, currentAddress: selectedAddress }),
            "Please sign the message in your wallet, so we can verify your identity. This will not trigger any blockchain transactions and will not cost any gas."
          );

          await get()._updateAccount({
            selectedAddress,
            signature,
            signatureData,
            connectorId,
          });
        } catch (e) {
          console.log("Error connecting wallet", e);
        }
      },
      abortChoosingWallet: async () => {
        set((state) => {
          state.choosingWallet = false;
        });
      },
      disconnectWallet: async () => {
        await get()._updateAccount({
          selectedAddress: null,
          connectorId: null,
        });
      },

      wrapWalletFlow: async (description, executor) => {
        if (get().currentFlow) {
          throw new Error("Another wallet flow is in progress");
        }

        set((state) => {
          state.currentFlow = { description };
        });

        try {
          return await executor();
        } catch (err) {
          set((state) => {
            const keys = Object.keys({ ...state.walletOperations });
            if (keys.length === 0) {
              return;
            }
            if (keys.length > 1) {
              console.log("Unexpected number of wallet operations", {
                ...state.walletOperations,
              });
              throw new Error("Unexpected number of wallet operations");
            }
            state.walletOperations[keys[0]].status = "error";
            state.walletOperations[keys[0]].error = err;
          });
          throw err;
        } finally {
          set((state) => {
            state.currentFlow = null;
          });
        }
      },
      verifyWalletConnected: () => {
        if (get().currentAddress) {
          return true;
        } else {
          get().connectWallet();
          throw new UserError("Please connect your wallet and try again.");
        }
      },
      verifyNetwork: async (targetNetworkName) => {
        const connector = connectors[get().connectorId];

        if (!(await connector.isOnNetwork(targetNetworkName))) {
          connector.switchNetwork(targetNetworkName);
          throw new UserError(
            `Please switch to the ${targetNetworkName} network and try again.`
          );
        }
      },

      getContract: async ({ name, address, network }) => {
        if (!network) {
          throw new Error("getContract network is required");
        }

        get().verifyWalletConnected();

        const provider = await connectors[
          get().connectorId
        ].getEthersProvider();

        const addr = address || config.contractAddresses[name];
        if (!addr) {
          throw new Error(`No address for contract ${name}`);
        }

        const contract = new ethers.Contract(
          addr,
          config.contractABIs[name],
          provider
        );

        return new Proxy(
          {},
          {
            get: (_target, prop) => {
              const value = contract[prop];
              if (typeof value === "function") {
                return async (...args) => {
                  get().verifyWalletConnected();
                  await get().verifyNetwork(network);
                  const result = contract[prop](...args);
                  // console.log("Result: "+ result);
                  if (!(result instanceof Promise)) {
                    throw new Error(
                      `Contract method ${name}.${prop} did not return a promise`
                    );
                  }
                  return result;
                };
              } else {
                return value;
              }
            },
          }
        );
      },

      sendContractTransaction: async (contract, method, args, description) => {
        if (typeof contract === "string") {
          contract = await get().getContract(contract);
        }

        console.log(
          "Sending contract transaction",
          contract,
          method,
          args,
          description
        );

        const uuid = await addWalletOp({
          type: "transaction",
          status: "pending",
          description,
        });

        let tx;
        try {
          tx = await contract[method](...args);
        } catch (err) {
          if (err.code === 4001 || err.message.match(/User rejected/i)) {
            throw new UserError("User rejected the transaction.");
          } else if (err.code === -32603) {
            throw new UserError(`Transaction failed: ${err?.data?.message}`);
          }

          throw err;
        }

        set((state) => {
          state.walletOperations[uuid].status = "sent";
        });

        await tx.wait();

        set((state) => {
          delete state.walletOperations[uuid];
        });

        return tx;
      },

      dismissWalletOperation: async (uuid) => {
        set((state) => {
          delete state.walletOperations[uuid];
        });
      },
      signTypedData: async (order) => {
        get().verifyWalletConnected();
        return await handleGenericWalletOp(
          () => connectors[get().connectorId].signTypedData(order),
          "Sign order"
        );
      },
      tryExistingConnection: async () => {
        for (const connectorId in connectors) {
          const connector = connectors[connectorId];
          const selectedAddress = await connector.tryExistingConnection();
          if (!selectedAddress) {
            return;
          }
          const { signature, signatureData } = await getAuthSignature({
            connector,
            currentAddress: selectedAddress,
            onlyExisting: true,
          });
          if (!signature && !signatureData) {
            return;
          }
          get()._updateAccount({
            selectedAddress,
            signature,
            signatureData,
            connectorId,
          });
          return;
        }
      },
      wrapGenericFlow: async (description, executor) => {
        return await get().wrapWalletFlow(description, executor);
      },
      handleGenericLoadingOp: async (description, executor) => {
        return await handleGenericWalletOp(executor, description, "nonWallet");
      },
      getEthersSigner: async () => {
        get().verifyWalletConnected();
        return await connectors[get().connectorId].getEthersProvider();
      },
      _updateAccount: async ({
        selectedAddress,
        signature,
        signatureData,
        connectorId,
      }) => {
        const currentAddress = selectedAddress;
        const user = await api.getUserRoleAndPermissions({
          id: currentAddress,
        });

        set((state) => {
          state.currentAddress = currentAddress;
          state.signature = signature;
          state.signatureData = signatureData;
          state.user = user;
          state.connectorId = connectorId;
        });
      },
    };
  })
);

if (typeof window !== "undefined") {
  (async () => {
    await useWallet.getState().tryExistingConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        useWallet.getState().connectWallet("metamask");
      });
    }
  })();

  window.globalErrorHandler = (event) => {
    const error = event.error || event.reason;

    if (error instanceof UserError) {
      toast.error(error.message);
      event.stopImmediatePropagation();
      return;
    }

    throw error;
  };
}

export default useWallet;
