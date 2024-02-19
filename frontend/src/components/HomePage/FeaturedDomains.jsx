import React, { useState, useEffect } from "react";
import { useAPI } from "../../hooks/useAPI";
import Link from "next/link";
import Button from "components/utils/Button";
import web from "/public/assets/images/web.png";
import Image from "next/image";
import rocket from "/public/assets/images/airoplane.png";
export default function FeaturedDomains() {
  const { api } = useAPI();
  const [buyDomainList, setBuyDomainList] = useState([]);
  const [leaseDomainList, setLeaseDomainList] = useState([]);

  async function getDomains() {
    const response = await api.getFeaturedDomains();
    setBuyDomainList(response.buy);
    setLeaseDomainList(response.lease);
  }

  useEffect(() => {
    getDomains();

    const interval = setInterval(() => {
      getDomains();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="container relative z-10">
        <Image
          src={rocket}
          width={150}
          height={110}
          className="topbottom absolute top-5 left-2 z-[-1]"
        ></Image>
        <h1 className="heading-1 section-center text-center">
          Featured Domains{" "}
        </h1>
        <div className="grid grid-cols-4 gap-x-4 gap-y-[50px]">
          {buyDomainList.map((domain) => (
            <div key={domain.id} className="col-span-1">
              <Link
                href={`/marketplace/${domain.name}`}
                className="gradient-color2 flex cursor-pointer items-center gap-3 rounded-[12px] border border-primary-borderWhite bg-primary-400 p-[10px]"
              >
                <div className="flex-center h-7 w-7 flex-shrink-0 overflow-hidden rounded-[7px] border border-primary-borderWhite bg-white p-1 xl2:h-10 xl2:w-10 xl2:rounded-[12px]">
                  <Image
                    src={web}
                    width={100}
                    height={100}
                    className=""
                  ></Image>
                </div>
                <span className="break-all text-20">{domain.name}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="my-10 text-center">
          <Button
            href="/marketplace"
            className="btn gradient-color font-brand-heading"
          >
            See More
          </Button>
        </div>
      </div>
    </>
  );
}
