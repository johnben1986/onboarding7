import useWallet from "hooks/useWallet";
import ConnectWalletButton from "./ConnectWalletButton";
import Button from "components/utils/Button";

export default function AuthenticatedPage({
  children,
  render,
  isNavBar,
  title,
}) {
  const wallet = useWallet();
  const { connectWallet, currentAddress } = wallet;

  if (currentAddress) {
    return render ? render(wallet) : children;
  }

  if (isNavBar) {
    return <ConnectWalletButton onClick={() => connectWallet()} />;
  }

  return (
    <div className="flex items-center flex-col gap-5 bg-image4 py-10">
      <div className="font-brand-freename font-bold text-2xl text-white mb-4">
        {title || "Please connect your wallet to continue"}
      </div>

      <Button onClick={() => connectWallet()}>Connect Wallet</Button>
    </div>
  );
}
