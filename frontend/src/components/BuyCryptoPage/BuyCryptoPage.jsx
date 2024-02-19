
import React, { useEffect } from "react";
import { setTitle } from "helpers/utils";
import Button from "components/utils/Button";
import { useTransak } from "hooks/useTransak";
import Image from "next/image";

const BuyCryptoPage = () => {
  useEffect(() => {
    setTitle("Buy Crypto");
  }, []);

  
  const { transak } = useTransak();

  return (
    <>
      <div className="lg:mx-30 mx-5 mb-20 md:mx-10">
        <h1 className="mb-8 text-center font-brand-heading text-3xl text-white">
          Buy Crypto With Transak On-Ramp
        </h1>
        <div className="mb-10 flex flex-col justify-center space-y-10 md:flex-row md:space-y-0">
          <div className="flex justify-center md:w-2/5 md:space-x-8">
            <Image
              className="w-1/5 animate-hover self-center p-2"
              src="https://storage.googleapis.com/eda-cdn/images/site-images/transakLogo.png"
              width={200}
              height={200}
            />
            <Image
              className="w-3/5 self-center p-2"
              src="https://storage.googleapis.com/eda-cdn/images/site-images/transakText.png"
              width={300}
              height={200}
            />
          </div>
          <div className="m-3 rounded bg-brand-background py-8 px-6 text-justify text-lg md:w-2/5 md:px-16 md:py-8">
            <p className="mb-6">
              We've integrated the <b>Transak On-Ramp</b> feature in our app to
              enable our users to buy crypto directly inside EDA using fiat
              currencies via different payment methods such as card, bank
              transfer and other local payment methods.
            </p>
            <Button
              onClick={() => {
                transak.launch();
              }}
            >
              Buy now!
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyCryptoPage;
