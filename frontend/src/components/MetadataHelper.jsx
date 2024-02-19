import Head from "next/head";
import Script from "next/script";

export default function MetadataHelper({
  title,
  exactTitle,
  description,
  canonical,
  image,
  noindex,
  isGlobal,
}) {
  if (exactTitle) {
    title = exactTitle;
  } else if (title) {
    title = `${title} | Web3 Onboarding`;
  }

  const schemaOrgOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Web3 Onboarding",
    alternateName: "WEB3ONBOARDING",
    url: "https://web3onboarding.com/",
    logo: "/assets/images/webp/logo.png",
    sameAs: [
      "https://www.facebook.com/web3onboarding",
      "https://twitter.com/EDA_Web3",
      "https://www.instagram.com/web3onboarding",
      "https://www.pinterest.com/web3onboarding/",
      "https://t.me/web3onboarding",
    ],
  };

  const schemaWebSite = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Web3 Onboarding",
    url: "https://web3onboarding.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && (
        <meta name="description" content={description} key="description" />
      )}
      {canonical && <link rel="canonical" href={canonical} key="canonical" />}

      <meta property="og:type" content="article" key="og:type" />
      {canonical && <meta property="og:url" content={canonical} key="og:url" />}
      {title && <meta property="og:title" content={title} key="og:title" />}
      {description && (
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
      )}
      {image && <meta property="og:image" content={image} key="og:image" />}

      <meta name="twitter:card" content="summary" key="twitter:card" />
      <meta name="twitter:site" content="@EDA_Web3" key="twitter:site" />
      <meta name="twitter:creator" content="@DA_Web3" key="twitter:creator" />

      <meta name="geo.region" content="US" key="geo.region" />
      <meta
        name="geo.position"
        content="39.78373;-100.445882"
        key="geo.position"
      />
      <meta name="ICBM" content="39.78373, -100.445882" key="ICBM" />

      <script type="application/ld+json" key="schemaOrgOrganization">
        {JSON.stringify(schemaOrgOrganization)}
      </script>

      <script type="application/ld+json" key="schemaWebSite">
        {JSON.stringify(schemaWebSite)}
      </script>

      {noindex && (
        <meta name="robots" content="noindex, nofollow" key="robots" />
      )}

      {noindex && (
        <meta
          itemProp="metadata-helper-noindex"
          key="metadata-helper-noindex"
        />
      )}
      {isGlobal || (
        <meta itemProp="metadata-helper-used" key="metadata-helper-used" />
      )}

      <link rel="icon" type="image/x-icon" href="/favicon.png" key="favicon" />
      <Script
        src="https://www.dwin1.com/50591.js"
        type="text/javascript"
        defer="defer"
      ></Script>
    </Head>
  );
}
