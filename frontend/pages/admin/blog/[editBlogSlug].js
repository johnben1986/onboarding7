import NewBlog from "components/Blog/NewBlog";
import MetadataHelper from "components/MetadataHelper";
import { useRouter } from "next/router";

export default function NewBlogPage() {
  const router = useRouter();
  const { editBlogSlug } = router.query;

  return (
    <>
      <MetadataHelper noindex title="Edit Blog" />
      <NewBlog editBlogSlug={editBlogSlug} />
    </>
  );
}
