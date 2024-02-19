import MetadataHelper from "components/MetadataHelper";
import SiteSettingsPage from "components/SiteSettingsPage/SiteSettingsPage";

export default function AdminPage() {
  return (
    <>
      <MetadataHelper noindex title="Site settings" />
      <SiteSettingsPage />
    </>
  );
}
