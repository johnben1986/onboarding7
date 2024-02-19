import { LinkWebsite } from "components/WebsiteBuilder/WebsiteBuilder_orig";
import MetadataHelper from "components/MetadataHelper";
import { useRouter } from "next/router";

export default function QuickBuildLinkWebsitePage() {
  const router = useRouter();
  const { ipfsHash } = router.query;

  return (
    <>
      <MetadataHelper noindex title="Link Website" />
      <LinkWebsite ipfsHash={ipfsHash} />
    </>
  );
}
