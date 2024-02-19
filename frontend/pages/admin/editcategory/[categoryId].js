import MetadataHelper from "components/MetadataHelper";
import SingleCategoryPage from "components/SingleCategoryPage/SingleCategoryPage";

export default function AdminPage() {
  return (
    <>
      <MetadataHelper noindex title="Edit category" />
      <SingleCategoryPage />
    </>
  );
}
