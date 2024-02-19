import MintDomainPage from "components/MintDomainPage/MintDomainPage";
import MetadataHelper from "components/MetadataHelper";
import { withAuth } from "components/Auth/authMiddleware";

function MintDomain() {
  return (
    <>
      <MetadataHelper title="Mint domains" />
      <MintDomainPage
        initialState={{
          domainType: "domain",
        }}
      />
    </>
  );
}export default withAuth(MintDomain);
// export default MintDomain;