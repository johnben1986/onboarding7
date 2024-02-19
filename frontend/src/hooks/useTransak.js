import { useMemo, useEffect, useState } from "react";
import { message } from "antd";
import transakSDK from "@transak/transak-sdk";
import useWallet from "./useWallet";
import { useAPI } from "./useAPI";

export const useTransak = () => {
  const { currentAddress } = useWallet();
  const [userInfo, setUserInfo] = useState({});
  const { api } = useAPI();

  useEffect(() => {
    if (currentAddress) {
      api
        .getUser({ id: currentAddress })
        .then((res) => {
          if (res?.result.length > 0) {
            setUserInfo(res.result[0]);
          }
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
  }, [currentAddress, api]);

  return useMemo(
    () => ({
      transak: {
        launch: () => {
          const transak = new transakSDK({
            apiKey: "e9eae37e-b37a-4bec-abc5-fe43190d679a",
            environment: "PRODUCTION",
            widgetHeight: "625px",
            widgetWidth: "500px",
            defaultCryptoCurrency: "MATIC",
            walletAddress: currentAddress || "",
            themeColor: "0A38AE",
            
            email: userInfo?.email || "",
            redirectURL: "https://web3onboarding.com/",
          });

          
          
          
          
          
          
          
          
          
          
          
          
          

          transak.init();

          transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
            
            setTimeout(() => {
              document.documentElement.style.setProperty(
                "overflow",
                "auto",
                "important",
              );
            }, 200);
          });

          transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
            console.log(orderData);
            transak.close();
          });
        },
      },
    }),
    [currentAddress, userInfo],
  );
};
