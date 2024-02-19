import dynamic from "next/dynamic";

const TapConversion = dynamic(() => import("./TapAffiliateInner"), {
  ssr: false,
});

export default TapConversion;
