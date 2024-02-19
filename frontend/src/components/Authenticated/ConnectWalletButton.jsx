import { FaWallet } from "react-icons/fa";

const ConnectWalletButton = ({ onClick, address }) => {
  return (
    <button
      onClick={onClick}
      className="btn px-4 py-2 flex w-fit max-w-none items-center gap-2 text-16"
    >Connect Wallet
      <FaWallet className="text-brand-gray box-content rounded-r px-2 text-xl lg:px-2 lg:text-xl" />
    </button>
  );
};

export default ConnectWalletButton;
