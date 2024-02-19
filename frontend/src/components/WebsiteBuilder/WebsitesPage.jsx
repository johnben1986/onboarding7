import React, { useEffect, useRef, useState } from "react";
import WebsiteBuilder from "components/WebsiteBuilder/WebsiteBuilder_orig";
import Link from "next/link";
import { useAPI } from "../../hooks/useAPI";
import moment from "moment";
import prettyBytes from "pretty-bytes";
import AuthenticatedPage from "components/Authenticated/AuthenticatedPage";
import useWallet from "hooks/useWallet";
import Loading from "components/utils/Loading";

async function fetchWebsites(api, owner, setHostingInfo) {
  const res = await api.getUserHostingInfo({ id: owner });
  setHostingInfo(res);
  console.log(res);
}

export default function WebsitesPage({ userId }) {
  const { api } = useAPI();

  const [hostingInfo, setHostingInfo] = useState(null);

  const owner = userId;

  const { currentAddress } = useWallet();

  useEffect(() => {
    if (currentAddress) {
      fetchWebsites(api, owner || currentAddress, setHostingInfo);
    }
  }, [api, owner, currentAddress]);

  const websites = hostingInfo?.websites;

  return (
    <AuthenticatedPage
      render={() => {
        if (!hostingInfo) {
          return <Loading />;
        }

        return (
          <main className='min-h-screen bg-image4'>
          <div className="mx-auto mb-12 w-full max-w-4xl overflow-y-auto p-2">
            <div className="mt-8 flex flex-col items-baseline justify-between sm:flex-row">
              <div className="text-2xl">My websites</div>
              <div>
                Hosting usage: {prettyBytes(hostingInfo.storage_usage)} /{" "}
                {prettyBytes(hostingInfo.storage_quota)}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {websites.length > 0 ? (
                websites.map((website, index) => (
                  <div
                    key={index}
                    className="bg-brand-800 flex flex-col items-center gap-4 rounded p-6 sm:flex-row sm:justify-between"
                  >
                    <div className="flex flex-col gap-1">
                      <div>
                        <div className="break-all font-mono text-xs text-gray-400">
                          ipfs:
                        </div>
                      </div>
                      <div className="flex  flex-col items-baseline gap-2 sm:flex-row">
                        <div className="text-lg">
                          {website.website_meta.title ||
                            website.website_meta.filename ||
                            "Untitled website"}
                        </div>
                        <div className="text-xs text-gray-400">
                          Last edited {moment(website.updated_at).fromNow()}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {prettyBytes(+website.size)}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Link
                        className="ml-auto rounded bg-brand-primary px-4 py-2 text-white"
                        href={`/site/link-website/${website.ipfs_hash}`}
                      >
                        Link
                      </Link>
                      {website.website_meta.onlyHosting || (
                        <Link
                          className="ml-auto rounded bg-brand-primary px-4 py-2 text-white"
                          href={`/website-builder?lfid=${website.id}`}
                        >
                          Edit
                        </Link>
                      )}
                      <button
                        className="ml-auto rounded bg-red-600 px-4 py-2 text-white"
                        onClick={async () => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this website?"
                            )
                          ) {
                            await api.deleteWebsite({
                              id: website.id,
                            });
                            fetchWebsites(
                              api,
                              owner || currentAddress,
                              setHostingInfo
                            );
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-10 flex flex-col gap-2 text-red-500">
                  <div>You haven't created any websites yet.</div>
                  <Link
                    className="mt-5 block w-fit rounded px-4 py-2 text-blue-500 bg-primary-newBgColor/90 hover:text-white hover:opacity-50"
                    href="/site"
                  >
                    Create a website
                  </Link>
                </div>
              )}
            </div>
            </div>
            </main>
        );
      }}
    />
  );
}
