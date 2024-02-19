import styles from "./BlogPage.module.scss";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { useAPI } from "../../src/hooks/useAPI";
import { useRouter } from "next/router";
import { API } from "hooks/API";
import MetadataHelper from "components/MetadataHelper";

export default function BlogPage({ blogDetailsFromServer }) {
  const { api } = useAPI();
  const router = useRouter();
  const { slug } = router.query;

  const [postDetails, setPostDetails] = useState(blogDetailsFromServer);

  useEffect(() => {
    async function fetchPostDetails() {
      setPostDetails(await api.getPostDetails({ slug }));
    }
    fetchPostDetails();
  }, [api, slug]);
  return (
    <>
      <MetadataHelper
        title={postDetails.title}
        description={postDetails.preview_text}
      />
      <div className="bg-image3 pt-5">
      <div className="mx-auto w-4/5 space-y-4 pb-24 md:w-3/5 ">
        <h2 className="mx-auto w-full text-center font-brand-tomorrow text-3xl font-bold text-brand-primary md:text-5xl">
          {postDetails.title}
        </h2>
        <p className="font-brand-avro text-lg text-white">
          Posted on{" "}
          {postDetails.created_at
            ? new Date(postDetails.created_at).toISOString().split("T")[0]
            : ""}{" "}
          · {postDetails.minutes_read} min read
        </p>
        <div
          className={`${styles.blogContent} font-brand-tomorrow text-lg text-white`}
        >
          {parse(postDetails.content || "")}
        </div>
        <div className="flex flex-row">
          {postDetails.category_array?.map((category) => (
            <p
              key={category.id}
              className="mr-5 rounded-full bg-brand-primary p-2 font-brand-avro text-lg text-white"
            >
              {category.name}
            </p>
          ))}
        </div>
      </div>
      </div>
      
    </>
  );
}

export async function getStaticProps(context) {
  const api = new API();

  try {
    return {
      props: {
        blogDetailsFromServer: await api.getPostDetails({
          slug: context.params.slug,
        }),
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
      revalidate: 5,
    };
  }
}

export async function getStaticPaths() {
  const api = new API();

  const slugs = await api.getAllBlogPostSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: "blocking",
  };
}
