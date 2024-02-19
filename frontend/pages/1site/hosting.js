import { IPFSHosting } from "components/WebsiteBuilder/WebsiteBuilder_orig";
import MetadataHelper from "components/MetadataHelper";
import Navbar from "components/Layout/Navbar";
import Footer from "components/Layout/Footer";

export default function QuickBuildHostingPage() {
  return (
    <>
      {/* <MetadataHelper noindex title="Quick Build Hosting" />
      <main className="bg-image4 py-5 text-white">
      <IPFSHosting />
      </main> */}
      <MetadataHelper noindex title="Hosting" />
      <div className="bg-image4">
      <Navbar title="IPFS Hosting" />
      <div className="bg-gray-100 bg-opacity-75">
      <IPFSHosting />
      </div>
      
        <Footer />
        </div>
    </>
  );
}
