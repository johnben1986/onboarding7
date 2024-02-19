const fs = require("fs");

const pageConfigs = [
  { path: /^\/$/, priority: 1 },
  { path: /^\/about$/, priority: 0.9 },
  { path: /^\/blog.*$/, priority: 0.9 },
  { path: /^\/business-tools$/, priority: 0.9 },
  { path: /^\/buy-crypto$/, priority: 0.9 },
  { path: /^\/help-center$/, priority: 0.9 },
  { path: /^\/marketplace\/mint$/, priority: 0.9 },
  { path: /^\/marketplace.*$/, priority: 0.5 },
  { path: /^\/quickbuild$/, priority: 0.9 },
  { path: /^\/terms-of-use$/, priority: 0.5 },
  // { path: /^\/users.*$/, priority: 0.5 },
  { path: /^\/web3-tld$/, priority: 0.9 },
];

module.exports = {
  siteUrl: process.env.SITE_URL || "https://web3onboarding.com/",
  generateRobotsTxt: true,
  transform: async (config, path) => {
    const basePath = ".next/server/pages";
    const filePath = `${
      basePath + (path === "" || path === "/" ? "/index" : path)
    }.html`;

    
    const data = await fs.promises.readFile(filePath, "utf8");

    if (!data.includes("metadata-helper-used")) {
      // TODO: not ignore error
      //throw new Error("MetadataHelper not used! Path: " + path);
    }

    if (data.includes("metadata-helper-noindex")) {
      console.log("ignored noindex file:", filePath);

      return null;
    }

    const pageConfig = pageConfigs.find((p) => p.path.test(path));
    if (!pageConfig) {
      // ТОДО: not ignore
      //throw new Error("pageConfig not found for path: " + path);
    }
    const priority = pageConfig?.priority;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || [],
    };
  },
};
