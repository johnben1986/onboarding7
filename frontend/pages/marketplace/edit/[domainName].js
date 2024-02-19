import ListDomainPage from "components/ListDomainPage/ListDomainPage";
import MetadataHelper from "components/MetadataHelper";
import { useRouter } from "next/router";

export default function AddDomainPage() {
  const router = useRouter();
  const { domainName } = router.query;

  return (
    <>
      <MetadataHelper noindex title={`Edit domain - ${domainName}`} />
      <ListDomainPage editDomainName={domainName} />
    </>
  );
}
