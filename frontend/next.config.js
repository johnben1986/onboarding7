const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: process.env.NEXT_PUBLIC_IS_TESTING === "true",
  images: {
    domains: ["storage.googleapis.com", "www.shareasale.com"],
  },
  async redirects() {
    return [
      {
        source: "/unstoppable",
        destination: "https://unstoppabledomains.com/?ref=4f4046defa8b48b",
        permanent: false,
      },
      {
        source: "/freename",
        destination: "https://freename.io?referralCode=eager-boxes-throw",
        permanent: false,
      },

      {
        source: "/ledger",
        destination: "https://shop.ledger.com/?r=e8bad9f4d6f2",
        permanent: false,
      },
      {
        source: "/my-brand-new-logo",
        destination:
          "https://shareasale.com/r.cfm?b=1559933&u=3400823&m=98455&urllink=&afftrack=",
        permanent: false,
      },
      {
        source: "/logo.com",
        destination:
          "https://shareasale.com/r.cfm?b=1423388&u=3400823&m=91820&urllink=&afftrack=",
        permanent: false,
      },
      {
        source: "/smashinglogo",
        destination:
          "https://shareasale.com/r.cfm?b=1361762&u=3400823&m=89054&urllink=&afftrack=",
        permanent: false,
      },
      {
        source: "/nortwest-registered-agent",
        destination:
          "https://shareasale.com/r.cfm?b=965743&u=3400823&m=69959&urllink=&afftrack=",
        permanent: false,
      },
      {
        source: "/mybusinessworks",
        destination:
          "https://shareasale.com/r.cfm?b=963955&u=3400823&m=69835&urllink=&afftrack=",
        permanent: false,
      },
      {
        source: "/trademark-engine",
        destination:
          "https://shareasale.com/r.cfm?b=1264457&u=3400823&m=83748&urllink=&afftrack=",
        permanent: false,
      },
      {
        source: "/brightlocal",
        destination:
          "https://shareasale.com/r.cfm?b=314694&u=3400823&m=33269&urllink=&afftrack=",
        permanent: false,
      },
      {
        source: "/share-a-sale",
        destination:
          "https://shareasale.com/r.cfm?b=40&u=3400823&m=47&urllink=&afftrack=",
        permanent: false,
      },
      {
        source: "/trademarks",
        destination:
          "https://drive.google.com/drive/folders/1tDwNzkn4eYWVaDJuWAwW1UnvZD9k121_?usp=sharing",
        permanent: false,
      },

      
      {
        source: "/add-domain",
        has: [
          {
            type: "query",
            key: "name",
          },
        ],
        destination: "/marketplace/add/:name",
        permanent: false,
      },

      
      {
        source: "/dashboard",
        destination: "/users/me",
        permanent: false,
      },

      {
        source: "/website-builder",
        destination: "/quickbuild/builder",
        permanent: false,
      },
    ];
  },
  swcMinify: true,
};
const withTM = require('next-transpile-modules')(['gsap']);
module.exports = withTM();






module.exports = nextConfig;
