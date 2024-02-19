import CashbacksPage from "components/CashbacksPage/CashbacksPage";
import MetadataHelper from "components/MetadataHelper";

export default function AdminPage() {
  return (
    <>
      <MetadataHelper noindex title="Cashbacks" />
      <CashbacksPage />
    </>
  );
}
