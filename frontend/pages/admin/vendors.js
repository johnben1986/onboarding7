import MetadataHelper from "components/MetadataHelper";
import VendorsPage from "components/VendorsPage/VendorsPage";

export default function AdminPage() {
  return (
    <>
      <MetadataHelper noindex title="Vendors" />
      <VendorsPage />
    </>
  );
}
