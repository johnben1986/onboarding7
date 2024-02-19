import { withAuth } from "components/Auth/authMiddleware";
import DomainsPage from "components/DomainsPage/DomainsPage";
import MetadataHelper from "components/MetadataHelper";
import Button from "components/utils/Button";

function MarketplaceDomainsPage() {
  return (
    <main className="bg-image4 min-h-screen">
      <MetadataHelper noindex title="TLD Marketplace" />
      <DomainsPage
        initialState={{
          domainType: "tld",
        }}
      />
    </main>
  );
}
// export default withAuth(MarketplaceDomainsPage);
export default MarketplaceDomainsPage;