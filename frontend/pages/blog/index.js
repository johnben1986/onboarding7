import React, { useState, useEffect, useRef } from "react";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";
import { useAPI } from "../../src/hooks/useAPI";
import Image from "next/image";
import LogoImg from "../../public/assets/images/svg/logo.svg";
import Link from "next/link";
import { API } from "hooks/API";
import MetadataHelper from "components/MetadataHelper";
import { reactIcons } from "components/utils/icons";
import Navbar from "components/Layout/Navbar";
import { message } from "antd";
import { withAuth } from "../../src/components/Auth/authMiddleware";
function BlogList({ blogPostsFromServer }) {
  const { api } = useAPI();
  const [blogPosts, setBlogPosts] = useState(null);
  const [noResults, setNoResults] = useState(true);

  const tableEl = useRef(null);
  const scrollSearchParams = useRef({});

  const changePostPinState = async (postId, newPinState) => {
    await api.changePostPinState({ id: postId, pinned: newPinState });
    scrollSearchParams.current.nextCursor = 0;
    const res = await api.getBlogPosts(scrollSearchParams.current);

    if (res.nextCursor) {
      scrollSearchParams.current = {
        ...scrollSearchParams.current,
        nextCursor: res.nextCursor,
      };
    }
    setBlogPosts(res.result);
  };

  const deleteBlogPost = async (postId) => {
    try{
      await api.deleteBlogPost({ id: postId });
      setBlogPosts(blogPosts.filter((post) => post.id !== postId));
      message.success("Successfully Deleted!");
    }
    catch(error){
      console.log('Delete Error:', error)
    }
  };

  const fetchNewData = async () => {
    if (scrollSearchParams.current && !scrollSearchParams.current.isFetching) {
      scrollSearchParams.current.isFetching = true;
      const posts = await api.getBlogPosts(scrollSearchParams.current);
      if (!scrollSearchParams.current?.isFetching) {
        return;
      }

      setNoResults(() => false);
      setBlogPosts((blogPosts) => (blogPosts || []).concat(posts.result));
      scrollSearchParams.current.isFetching = false;
      if (posts.nextCursor) {
        scrollSearchParams.current = {
          ...scrollSearchParams.current,
          nextCursor: posts.nextCursor,
        };
      } else {
        if (!blogPosts && posts.result.length == 0) {
          setNoResults(() => true);
        }
        scrollSearchParams.current = null;
      }
    }
  };

  function handleScroll() {
    if (
      window.scrollY <
      tableEl.current.offsetTop +
        tableEl.current.scrollHeight -
        window.innerHeight
    ) {
      return;
    }

    fetchNewData();
  }

  useEffect(() => {
    handleScroll();
  }, [blogPosts]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <MetadataHelper title="Blog" />

      <main className="bg-image3">
        <div className="container">
          <div className="flex items-center justify-end pt-5">
            <AuthenticatedFragment permission="blog_posts:insert">
              <Link href="/admin/blog/new" className="gradient-color btn">
                + New Blog
              </Link>
            </AuthenticatedFragment>
          </div>
          {/* <div className="flex items-center justify-end pt-5">
              <Link href="/admin/blog/new" className="gradient-color btn">
                + New Blog
              </Link>
          </div> */}
          <div
            className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-[25px] gap-y-[25px] py-[50px]"
            ref={tableEl}
          >
            {(blogPosts || []).map((post) => (
              <div key={post.id} className="col-span-1">
                <div className=" relative rounded-xl bg-white overflow-hidden">
                  <div className="gradient-color flex-center absolute top-8 left-0 z-10 h-[42px] rounded-r-md px-3 text-14 text-white">
                    Posted on{" "}
                    {new Date(post.created_at).toISOString().split("T")[0]}{" "}
                  </div>
                  {/* <div className="absolute top-2 right-2 z-10 space-x-3 text-white">
                      <Link
                        className="text-white no-underline"
                        href={"/admin/blog/" + post.slug}
                      >
                        <button className="rounded-md gradient-color py-2 px-4 text-white">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="rounded-md gradient-color py-2 px-4 text-white"
                        onClick={() => {
                          deleteBlogPost(post.id);
                        }}
                      >
                        Delete
                      </button>
                    </div> */}
                  <AuthenticatedFragment permission="blog_posts:insert">
                    <div className="absolute top-2 right-2 z-10 space-x-3 text-white">
                      {/* <button
                        className="rounded-md gradient-color py-2 px-4 text-white"
                        onClick={() => {
                          changePostPinState(post.id, !post.pinned);
                        }}
                      >
                        {post.pinned ? " Unpin" : "Pin"}
                      </button> */}
                      <Link
                        className="text-white no-underline"
                        href={"/admin/blog/" + post.slug}
                      >
                        <button className="rounded-md gradient-color py-2 px-4 text-white">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="rounded-md gradient-color py-2 px-4 text-white"
                        onClick={() => {
                          deleteBlogPost(post.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </AuthenticatedFragment>
                  <div className="relative h-[250px] w-full bg-white overflow-hidden">
                    <img
                      className="object-cover"
                      src={post.preview_image || LogoImg}
                      fill
                    />
                  </div>
                  <div className="flex min-h-[320px] flex-col justify-between p-5 text-black">
                    <div>
                      <p className="para-24 min-h-[70px] font-semibold">
                        {post.title}
                      </p>
                      <p className="para-24 line-clamp-4 mt-5 text-sm">
                        {post.preview_text}
                      </p>
                      <div className="my-4 flex flex-row flex-wrap gap-2">
                        {post.category_array?.map((category) => (
                          <p
                            key={category.id}
                            className=" rounded-full gradient-color p-2 px-4 text-white text-sm"
                          >
                            {category.name}
                          </p>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={"/blog/" + post.slug}
                      className="flex items-center justify-end gap-3 pt-2 text-20"
                    >
                      Read More{" "}
                      <span className="-rotate-45">
                        {reactIcons.rightarrow}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const api = new API();

  const posts = await api.getBlogPosts({ limit: 20 });

  return {
    props: {
      blogPostsFromServer: posts.result,
      nextCursor: posts.nextCursor,
    },
    revalidate: 24 * 60 * 60,
  };
}
export default withAuth(BlogList);