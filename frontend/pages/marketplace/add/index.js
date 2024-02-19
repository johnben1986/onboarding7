import { withAuth } from "components/Auth/authMiddleware";
import ListDomainPage from "components/ListDomainPage/ListDomainPage";
import MetadataHelper from "components/MetadataHelper";

function AddDomainPage() {
  return (
    <>
      <MetadataHelper noindex title="Add Domain" />
      <ListDomainPage />
    </>
  );
}
export default withAuth(AddDomainPage);