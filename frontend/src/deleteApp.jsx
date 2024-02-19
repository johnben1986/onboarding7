import { useEffect } from "react";
import AppLayout from "components/AppLayout/AppLayout";
import { ConfigProvider } from "antd";
import useWallet from "hooks/useWallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

ConfigProvider.config({
  theme: {
    primaryColor: "#2058DC", 
    linkColor: "#2058DC", 
    successColor: "#20DC46", 
    warningColor: "#faad14", 
    errorColor: "#f5222d", 
    fontSizeBase: "14px", 
    headingColor: "rgba(0, 0, 0, 0.85)", 
    textColor: "rgba(0, 0, 0, 0.65)", 
    textColorSecondary: "rgba(0, 0, 0, 0.45)", 
    disabledColor: "rgba(0, 0, 0, 0.25)", 
    borderRadiusBase: "2px", 
    borderColorBase: "#d9d9d9", 
    boxChadowBase:
      "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)", 
  },
});

const queryClient = new QueryClient();

const App = ({ isServerInfo }) => {
  const { tryExistingConnection } = useWallet();

  useEffect(() => {
    tryExistingConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <title>Web3 Onboarding — Best Web3 Domain Marketplace</title>
        <meta
          name="description"
          content="Web3 onboarding is the premiere platform for people and businesses to onboard web3 and the metaverse safely. Buy crypto, get a wallet, web3 domain, web3site, or launch your web3 project's token with efficiency and confidence!"
        />
        {/* <meta
          name="description"
          content="Web3 Onboarding is the premier platform to trade Web3 domain names. Browse, mint, buy, sell, and rent Web3 domains on the EDA platform now!"
        /> */}
      </Helmet>
      <AppLayout />
    </QueryClientProvider>
  );
};


