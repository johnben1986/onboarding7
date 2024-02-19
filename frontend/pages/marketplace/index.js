import DomainsPage from "components/DomainsPage/DomainsPage";
import { reactIcons } from "components/utils/icons";
import MetadataHelper from "components/MetadataHelper";
import { useRouter } from "next/router";
import { useAPI } from "../../src/hooks/useAPI";
import useWallet from "../../src/hooks/useWallet";
// import Button from "components/utils/Button";
import web3img from "/public/assets/images/web3logo.png";
import { withAuth } from "../../src/components/Auth/authMiddleware";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MarketplaceDomainsPage = (userId) => {
  const router = useRouter();
  const { api } = useAPI();
  const { currentAddress } = useWallet();
  const [userInfo, setUserInfo] = useState({});
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const targetUser = userId ? userId : currentAddress;
  
  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     if (targetUser) {
  //       const res = await api.getUser({ id: targetUser });
  //       // router.push('/marketplace');
  //       if (res?.result.length > 0) {
  //         setUserInfo(res.result[0]);
  //       }
  //       console.log('login successful');
  //     } 
  //     else{
  //       console.log('no data found');
  //       // router.push('/login')
  //     }
  //   };
  //   getUserInfo();
  // }, [targetUser, api, router]); 

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     router.push('/login');
  //   }
  // }, [router]);

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     if (targetUser) {
  //       const res = await api.getUser({ id: targetUser });
  //       if (res?.result.length > 0) {
  //         setUserInfo(res.result[0]);
  //         router.push('/login');
  //       }
  //     }
  //   };
  //   getUserInfo();
  // }, [targetUser, UDUser, api, router]); 
  return (
    <main className="bg-image4 min-h-screen">

      <MetadataHelper noindex title="Domain Marketplace" />

      <DomainsPage
        initialState={{
          domainType: "domain",
        }}
      />
      {/* <div className="h-screen flex">
        <sidebar className=" w-64 h-full text-white border-r border-white">
          <div className="border-b border-white p-3">
            <Link href="/home">
              <Image src={web3img} width={150} height={150} className="w-full max-w-[150px] cursor-pointer m-auto"></Image>
            </Link>
          </div>
          <div className="px-6 py-4">
            <div class="mb-8">
              <h2 class="text-xl font-medium mb-3 border-b border-white">Sub Heading</h2>
              <ul>
                <li class="flex items-center space-x-3 mb-2">
                  <BiSearch />
                  <a href="#" class="hover:text-gray-300 hover:underline">Item 1</a>
                </li>
              </ul>
            </div>
          </div>
        </sidebar>
        <div className="flex-1">
          <header className="border-b border-white text-white p-4">
            <div className="container mx-auto flex items-center justify-between px-0">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-medium">Marketplace</span>
              </div>
              <div className="relative">
                <input type="text" placeholder="What are you looking for?" className="bg-white text-black p-4 pl-10 rounded-full w-[350px]" />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
                  <BiSearch />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span>Username</span>
                <div className="border border-white rounded-full overflow-hidden">
                  <Image src={jacob} className="h-8 w-8 cursor-pointer object-cover"></Image>
                </div>

              </div>
            </div>
          </header>
          <div className="p-6">
            <p>Your main content goes here...</p>
          </div>
        </div>

      </div> */}

    </main>
  );
}
 export default withAuth(MarketplaceDomainsPage);
//export default MarketplaceDomainsPage;