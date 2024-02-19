import DebugPage from "components/DebugPage";
import MetadataHelper from "components/MetadataHelper";

export default function Debug() {
  return (
    <>
      <MetadataHelper noindex title="Debug" />
      <DebugPage />
    </>
  );
}
