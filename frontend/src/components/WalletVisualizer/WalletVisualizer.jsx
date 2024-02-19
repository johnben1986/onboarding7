import React from "react";
import useWallet from "hooks/useWallet";
import { connectors } from "components/config";

import Modal from "components/Modal/Modal";
import Loading from "components/utils/Loading";
import Image from "next/image";

function getOpStatusText(op) {
  if (op.status === "error") {
    if (op.error.type === "UserError") {
      return op.error.message;
    }
    return `Unknown error occured. Please try refreshing the page and if the issue persists contact our support team. ${op.error.message}`;
  } else if (op.status === "pending") {
    if (op.type === "transaction") {
      return "Please confirm the transaction in your wallet.";
    } else if (op.type === "wallet") {
      return "Please complete this operation in your wallet.";
    } else {
      return <Loading />;
    }
  } else if (op.status === "sent") {
    return "Transaction sent. Please wait for confirmation.";
  }
}

function getOperationWidget(op) {
  return (
    <div className="space-around flex w-full max-w-[100vw] flex-col items-center break-all p-6">
      <div className="w-full font-bold"> {op.description} </div>
      <div style={{ color: op.status === "error" && "#ff4444" }}>
        {" "}
        {getOpStatusText(op)}{" "}
      </div>
    </div>
  );
}

export default function WalletVisualizer() {
  const {
    currentAddress,
    walletOperations,
    choosingWallet,
    connectWallet,
    abortChoosingWallet,
    dismissWalletOperation,
    currentFlow,
  } = useWallet();

  const walletOperationsArray = Object.entries(walletOperations);

  function tryDismissingWalletOperations() {
    for (const [uuid, op] of walletOperationsArray) {
      if (op.status !== "completed" && op.status !== "error") {
        return;
      }
    }

    for (const [uuid, op] of walletOperationsArray) {
      dismissWalletOperation(uuid);
    }
  }

  return (
    <div>
      <Modal
        isOpen={!!choosingWallet}
        onRequestClose={abortChoosingWallet}
        zIndex={1100}
        padding={true}
      >
        <div className="bg-image5 p-6 text-white">
          <div className="mb-6 text-center text-xl font-bold">
            Choose a wallet
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                key={key}
                onClick={() => connectWallet(connectorId)}
                className="flex h-36 w-36 cursor-pointer flex-col items-center justify-around"
              >
                <div className="h-24 w-24">
                  <Image src={icon} alt={title} className="h-full w-full" />
                </div>
                <div className="text-center text-lg">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={!!currentFlow || walletOperationsArray.length > 0}
        onRequestClose={tryDismissingWalletOperations}
        zIndex={1000}
        padding={true}
      >
        <div className="bg-image5 p-6 text-white">
          <div className="mb-6 text-center text-xl font-bold">
            {currentFlow?.description || "Pending operations"}
          </div>
          {walletOperationsArray.length ? (
            <div className="flex h-full flex-col items-center justify-around">
              {walletOperationsArray.map(([id, op]) => (
                <div key={id}>{getOperationWidget(op)}</div>
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </Modal>
    </div>
  );
}
