import BulkUploadTool from "components/BulkUploadTool/BulkUploadTool";
import MetadataHelper from "components/MetadataHelper";

export default function BulkUpload() {
  return (
    <>
      <MetadataHelper noindex title="Bulk Upload" />
      <BulkUploadTool />
    </>
  );
}
