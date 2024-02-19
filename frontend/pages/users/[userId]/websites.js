import WebsitesPage from "components/WebsiteBuilder/WebsitesPage";
import MetadataHelper from "components/MetadataHelper";
import { useRouter } from "next/router";
import { withAuth } from "components/Auth/authMiddleware";

function UserWebsitesPage() {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <>
      <MetadataHelper noindex title="Websites" />
      <WebsitesPage userId={userId == "me" ? undefined : userId} />
    </>
  );
}
export default withAuth(UserWebsitesPage);