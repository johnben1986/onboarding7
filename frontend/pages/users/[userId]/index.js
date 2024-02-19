import SellerDashboard from "components/SellerDashboard/SellerDashboardO";
// import SellerDashboardCopy from "components/SellerDashboard/SellerDashboardCopy";
import MetadataHelper from "components/MetadataHelper";
import { useRouter } from "next/router";
import { withAuth } from "components/Auth/authMiddleware";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";

function SellerDashboardPage() {
  const router = useRouter();
  const { userId } = router.query;

  useEffect(()=>{
    // window.location.href = '/dashboard';
    //router.push('/dashboard');
  });
  
  return (
    <>
      <MetadataHelper noindex title={`${userId} - Profile`} />
      <SellerDashboard userId={userId == "me" ? undefined : userId} />
      {/* <SellerDashboardCopy userId={userId == "me" ? undefined : userId} /> */}
    </>
  );
}
//export default withAuth(SellerDashboardPage);
export default SellerDashboardPage;