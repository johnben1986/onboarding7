import { message } from "antd";
import { useMemo } from "react";
import { API } from "./API";
import { UserError } from "./errors";
import useWallet from "./useWallet";

export const useAPI = (options = {}) => {
  const { currentAddress, signature, signatureData } = useWallet();

  const errorHandler = async (err) => {
    if (err.type === "UserError") {
      message.error(err.message);
      throw new UserError(err.message);
    } else {
      throw err;
    }
  };
  
  return useMemo(
    () => ({
      api: new API({ currentAddress, signature, signatureData }, errorHandler),
      silentApi: new API(
        { currentAddress, signature, signatureData },
        (err) => {
          throw err;
        },
      ),
    }),
    [currentAddress, signature, signatureData],
  );
};
