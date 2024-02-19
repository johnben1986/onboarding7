import { withAuth } from "components/Auth/authMiddleware";
import EditSellerPage from "components/EditSeller/EditSellerPage";
import MetadataHelper from "components/MetadataHelper";
import { useRouter } from "next/router";

function EditSeller() {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <>
      <MetadataHelper noindex title="Edit Profile" />
      <EditSellerPage userId={userId == "me" ? undefined : userId} />
    </>
  );
}
export default withAuth(EditSeller);