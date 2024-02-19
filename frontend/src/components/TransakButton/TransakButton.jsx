import { Tooltip } from "antd";

import { useTransak } from "hooks/useTransak";
import Image from "next/image";
import TransakImg from "../../../public/assets/images/WalletIcons/transakLogo.png";

export default function TransakButton({ size }) {
  const { transak } = useTransak();

  return (
    <>
      <Tooltip title="Buy crypto using Transak">
        <Image
          src={TransakImg}
          className="cursor-pointer"
          width={size ? `${size}px` : "100%"}
          height={size ? `${size}px` : "100%"}
          onClick={() => {
            transak.launch();
          }}
        ></Image>
      </Tooltip>
    </>
  );
}
