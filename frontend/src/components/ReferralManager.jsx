import { ethers } from "ethers";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function ReferralManager() {
  
  const search = useSearchParams();

  useEffect(() => {
    const currentReferral = getReferralCode();
    
    const referral = search.get("referral");
    if (referral) {
      setReferralCode(referral);
    }
  }, [search]);

  return <div></div>;
}

function setReferralCode(referralCode) {
  localStorage.setItem("referral_code", referralCode);
}

export function getReferralCode() {
  return localStorage.getItem("referral_code") || "";
}

export function getReferralCodeHash() {
  return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(getReferralCode()));
}

export default ReferralManager;
