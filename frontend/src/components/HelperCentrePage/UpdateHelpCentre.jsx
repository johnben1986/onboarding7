import { useAPI } from "../../hooks/useAPI";
import React, { useEffect, useState } from "react";
import AuthenticatedPage from "components/Authenticated/AuthenticatedPage";
import { setTitle } from "helpers/utils";
import ReactQuill from "components/utils/ReactQuill";
import { useRouter } from "next/router";

const UpdateHelpCentre = () => {
  const router = useRouter();

  const { api } = useAPI();
  const [helpCentrePost, setHelpCentrePost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getHelpCentrePost();
      setHelpCentrePost(response);
    };

    fetchData();
  }, [api]);

  const updateHelpCentre = async () => {
    await api.updateHelpCentre({
      ...helpCentrePost,
    });
    router.push(`/help-center`);
  };

  return (
    <AuthenticatedPage
      permission="help_centre:insert"
      render={({ currentAddress, disconnectWallet }) => (
        <>
          <div className="mx-auto w-3/5 space-y-3 pb-24 font-brand-tomorrow text-lg">
            <h1 className="mb-10 text-center font-brand-heading text-3xl">
              {" "}
              Update Help Centre{" "}
            </h1>
            <ReactQuill
              value={helpCentrePost.content}
              onChange={(content) =>
                setHelpCentrePost((state) => ({ ...state, content }))
              }
            />
            <button
              className="mt-0 inline-block bg-brand-500 px-5 py-3 font-brand-tomorrow text-lg text-brand-50"
              onClick={updateHelpCentre}
            >
              Update
            </button>
          </div>
        </>
      )}
    />
  );
};

export default UpdateHelpCentre;
