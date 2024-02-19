import ConnectWalletButton from "components/Authenticated/ConnectWalletButton";
import dynamic from "next/dynamic";
import { message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const AuthenticatedPage = dynamic(
  () => import("components/Authenticated/AuthenticatedPage"),
  {
    ssr: false,
    loading: () => <ConnectWalletButton />,
  }
);


function Account({ textClass, className }) {
  const [token, setToken] = useState(null)
  const router = useRouter();
  // const logOutBtn = () => {
  //   localStorage.removeItem("token");
  //   message.success("Logout Successfully!");
  //   router.push("/login");
  // };
 useEffect(() => {
  const storeData = localStorage.getItem("token");
  if (storeData) {
    setToken(storeData);
  };
 }, [])
  return (
   <>
    {token ? (
      <AuthenticatedPage isNavBar={true}
      render={({ currentAddress, disconnectWallet }) => (
        <div className={`ml-0 flex items-center gap-4 md:ml-4 ${className}`}>
          <div className={`text-white ${textClass}`}>
            {currentAddress.slice(0, 5) + "..." + currentAddress.slice(40)}
          </div>
          <button className="btn text-16" onClick={() => disconnectWallet()}>
            Disconnect
          </button>
          {/* <button className="btn text-16" onClick={() => {
            logOutBtn();
            disconnectWallet();
            }}>
            Log Out
          </button> */}
         
        </div>
      )}
    />
    ) : ''}
   </>
    
  );
}

export default Account;
