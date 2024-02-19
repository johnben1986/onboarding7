import WebsiteBuilder from "components/WebsiteBuilder/WebsiteBuilder_orig";
import MetadataHelper from "components/MetadataHelper";
import Navbar from "components/Layout/Navbar";
import Footer from "components/Layout/Footer";
import { withAuth } from "../../src/components/Auth/authMiddleware";
const Builder = () => {
  return (
    <>
      <MetadataHelper noindex title="1Site" />
      {/* <div className="bg-image4"> */}
      {/* <Navbar title="1Site We3 Site Builder" /> */}
      {/* <div className="bg-gray-100 bg-opacity-75"> */}
      <WebsiteBuilder />
      {/* </div> */}
      
      {/* <Footer /> */}
      {/* </div> */}
    </>
  );
}
//export default withAuth(Builder);
export default Builder;