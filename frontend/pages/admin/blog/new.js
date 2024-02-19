import NewBlog from "components/Blog/NewBlog";
import MetadataHelper from "components/MetadataHelper";

export default function NewBlogPage() {
  return (
    <>
      <MetadataHelper noindex title="New Blog" />
      <NewBlog />
    </>
  );
}
