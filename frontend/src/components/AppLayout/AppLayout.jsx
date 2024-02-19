import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WalletVisualizer from "components/WalletVisualizer/WalletVisualizer";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
export default function AppLayout({ children }) {
  const router = useRouter();
  const pagesWithNavBar = [
    "/",
    "/login",
    // "/about",
    // "/users/[userId]",
    // "/faqs",
    // "/affiliate",
    "/register",
    // "/marketplace",
    // "/marketplace/[domainName]",
    // "/marketplace/tlds",
    "/register-success",
    "/newhome",
    "/site/site-tutorial",
    // "/ipfs",
    // "/web3/purchase-crypto",
    // "/web3/getting-wallet",
    // "/web3/web3-domains",
    // "/web3/quick-build",
    // "/web3/ipfs-hosting",
    "/web3/featured",
    "/web3/quick-build-tutorial",
    "/web3/become-affiliate",
    "/web3/about-us",
    "/web3/our-story",
    // "/web3/ipfs",
    "/web3/partners",
    // "/users/me",
    // "/1site/1site",
    "/site/hosting",

  ];
  const shouldShowNavBar = pagesWithNavBar.includes(router.pathname);
  return (
    <>
      <WalletVisualizer />
      {!shouldShowNavBar && <Header />}
      {children}
      {!shouldShowNavBar && <Footer />}
    </>
  );
}
