import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("./ReactQuillInner"), {
  ssr: false,
});

export default ReactQuill;
