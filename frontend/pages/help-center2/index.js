import styles from "./HelpCentre.module.scss";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { useAPI } from "../../src/hooks/useAPI";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";
import Link from "next/link";
import { API } from "hooks/API";
import MetadataHelper from "components/MetadataHelper";

export default function HelpCentre({ helpCentrePostFromServer }) {
  const { api } = useAPI();
  const [helpCentrePost, setHelpCentrePost] = useState(
    helpCentrePostFromServer || {},
  );

  useEffect(() => {
    async function fetchHelpCentrePost() {
      setHelpCentrePost(await api.getHelpCentrePost());
    }
    fetchHelpCentrePost();
  }, [api]);

  return (
    <>
      <MetadataHelper title="Help Center" />
      <AuthenticatedFragment permission="help_centre:insert">
        <Link
          href="/admin/update-help-center"
          className="bg-brand-500 text-brand-50 mt-0 inline-block px-5 py-3 font-brand-tomorrow text-lg no-underline"
        >
          Update
        </Link>
      </AuthenticatedFragment>
      {helpCentrePost.content != undefined ? (
        <div className="mx-auto w-4/5 space-y-4 pb-24 md:w-3/5">
          <div
            className={`${styles.blogContent} font-brand-tomorrow text-lg text-black`}
          >
            {parse(helpCentrePost.content || "")}
          </div>
        </div>
      ) : (
        <div className="container mx-auto text-center text-lg">
          Coming Soon!
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  const api = new API();

  return {
    props: {
      helpCentrePostFromServer: await api.getHelpCentrePost(),
    },
    revalidate: 60 * 60 * 24,
  };
}
