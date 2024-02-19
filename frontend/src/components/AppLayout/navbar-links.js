import { isTesting } from "helpers/environment";

const links = [
  {
    to: "/",
    title: "Home",
    footer: true,
  },
  // {
  //   title: "Marketplace",
  //   items: [
  //     {
  //       title: "Web3 Domains",
  //       to: "/marketplace",
  //     },
  //     {
  //       title: "Web3 TLDs",
  //       to: "/marketplace/tlds",
  //     },
  //     {
  //       title: "Mint UD domains",
  //       to: "/marketplace/mint",
  //     },
  //     {
  //       to: "/users/me",
  //       title: "Seller Dashboard",
  //       permission: "users:create", // tODOD CHANGE
  //     },
  //   ],
  // },
  // {
  //   to: "/quickbuild",
  //   title: "QuickBuild 🔥",
  // },
  {
    to: "/helpful-links",
    title: "Safe, Helpful Links to All Things Web3",
  },
  {
    title: "Web2 GoDaddy",
    to: "https://storefront.web3onboarding.com",
    externalLink: true,
  },
  // {
  //   to: "/quickbuild/hosting",
  //   title: "IPFS Hosting",
  // },
  // {
  //   to: "/web3-tld",
  //   title: "Web3 TLD",
  // },
  // {
  //   to: "/buy-crypto",
  //   title: "Buy Crypto",
  // },
  {
    title: " Info ",
    items: [
      {
        to: "/about",
        title: "About",
        useNextLink: true,
      },
      {
        to: "/blog",
        title: "Blog",
      },
      {
        to: "/trademarks",
        title: "Trademarks",
        externalLink: true,
      },
      {
        to: "/help-center",
        title: "Help Centre",
      },
      {
        to: "/documents/whitepaper.pdf",
        title: "Whitepaper",
        externalLink: true,
      },
      {
        to: "/documents/pitch-deck.pdf",
        title: "Pitchdeck",
        externalLink: true,
      },
      {
        to: "/#contact-us-section",
        title: "Contact Us",
      },
    ],
  },

  {
    title: "Admin tools",
    role: "admin",
    items: [
      {
        to: "/admin/vendors",
        title: "Vendors",
        permission: "users:update",
      },
      {
        to: "/admin/cashbacks",
        title: "Cashbacks",
        permission: "unstoppable_mints:read",
      },
      {
        to: "/admin/site-settings",
        title: "Site Settings",
        permission: "sites:update",
      },
      {
        to: "/admin/coupons",
        title: "Coupons",
        permission: "sites:update",
      },
    ],
  },
];

export default links;
