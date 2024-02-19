import MetadataHelper from "components/MetadataHelper";
import useWallet from "hooks/useWallet";
import { toast } from "react-hot-toast";

function DebugPage() {
  const {
    currentAddress,
    getContract,
    wrapWalletFlow,
    sendContractTransaction,
  } = useWallet();

  return (
    <div className="flex flex-col gap-4">
      <MetadataHelper noindex />
      <div className="flex w-full justify-center gap-4">
        <button
          className="bg-blue-600 p-4 text-white hover:bg-blue-500"
          onClick={async () => {
            await wrapWalletFlow(
              "Reading some info from blockchain",
              async () => {
                const usdc = await getContract({
                  name: "USDC",
                  network: "ethereum",
                  address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                });
                const supply = await usdc.totalSupply();
                toast.success(`USDC supply: ${supply}`);
              },
            );
          }}
        >
          Read ethereum
        </button>
        <button
          className="bg-blue-600 p-4 text-white hover:bg-blue-500"
          onClick={async () => {
            await wrapWalletFlow(
              "Reading some info from blockchain",
              async () => {
                const usdc = await getContract({
                  name: "USDC",
                  network: "polygon",
                });
                const supply = await usdc.totalSupply();
                toast.success(`USDC supply: ${supply}`);
              },
            );
          }}
        >
          Read polygon
        </button>
      </div>
      <div className="flex w-full justify-center gap-4">
        <button
          className="bg-blue-600 p-4 text-white hover:bg-blue-500"
          onClick={async () => {
            await wrapWalletFlow(
              "Writing some info to blockchain",
              async () => {
                const usdc = await getContract({
                  name: "USDC",
                  network: "ethereum",
                  address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                });
                const supply = await usdc.totalSupply();
                await sendContractTransaction(
                  usdc,
                  "approve",
                  [usdc.address, supply],
                  "Approve the currency",
                );
                const allowance = await usdc.allowance(
                  currentAddress,
                  usdc.address,
                );

                toast.success(`Allowance: ${allowance}`);
              },
            );
          }}
        >
          Write ethereum
        </button>
        <button
          className="bg-blue-600 p-4 text-white hover:bg-blue-500"
          onClick={async () => {
            await wrapWalletFlow(
              "Writing some info to blockchain",
              async () => {
                const usdc = await getContract({
                  name: "USDC",
                  network: "polygon",
                });
                const supply = await usdc.totalSupply();
                await sendContractTransaction(
                  usdc,
                  "approve",
                  [usdc.address, supply],
                  "Approve the currency to start trading",
                );
                const allowance = await usdc.allowance(
                  currentAddress,
                  usdc.address,
                );

                toast.success(`Allowance: ${allowance}`);
              },
            );
          }}
        >
          Write polygon
        </button>
      </div>
    </div>
  );
}

export default DebugPage;
