import React, { useState, useCallback, forwardRef, useRef } from "react";

import { useAPI } from "../../hooks/useAPI";
import { blobToBase64 } from "../../helpers/utils";
import styles from "./ReactQuillInner.module.scss";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";

let BlockEmbed = Quill.import("blots/block/embed");

class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute("src", value.url);
    node.setAttribute("alt", value.alt);
    node.setAttribute("width", value.width);
    node.setAttribute("height", value.height);
    node.setAttribute("style", value.style);
    return node;
  }

  static value(node) {
    return {
      url: node.getAttribute("src"),
      alt: node.getAttribute("alt"),
      width: node.getAttribute("width"),
      height: node.getAttribute("height"),
      style: node.getAttribute("style"),
    };
  }
}
ImageBlot.blotName = "image";
ImageBlot.tagName = "img";

Quill.register(ImageBlot);
Quill.register("modules/imageResize", ImageResize);

const ReactQuillEditor = ({ value, onChange }) => {
  const { api } = useAPI();
  const [loadingModal, setLoadingModal] = useState(false);

  const quillRef = useCallback(
    (quill) => {
      quillRef.current = quill;

      const imageHandler = () => {
        setLoadingModal(true);
        const input = document.createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          try {
            const imageData = await blobToBase64(input.files[0]);
            const resultLink = await api.uploadImageToCDN({ imageData });
            console.log("ttt", resultLink);
            const range = quillRef.current.getEditorSelection();

            quillRef.current
              .getEditor()
              .insertEmbed(range.index, "image", resultLink);
          } catch (e) {
            console.log(e);
            alert("Error on uploading image");
          } finally {
            setLoadingModal(false);
          }
        };
      };

      quill?.editor?.getModule("toolbar").addHandler("image", imageHandler);
    },
    [api],
  );

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
        [{ align: [] }],
      ],
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "styleimage",
    "image",
    "align",
    "width",
  ];

  return (
    <>
      {loadingModal && (
        <div
          id="loadingModal"
          className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/40"
        >
          <div className="flex flex-col items-center rounded-full border bg-white py-2 px-5">
            <div className="mt-2 text-center text-xs font-medium text-gray-500">
              Uploading image...
            </div>
          </div>
        </div>
      )}
      <ReactQuill
        ref={quillRef}
        className={`${styles.quillEditor} bg-white text-black`}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </>
  );
};

export default ReactQuillEditor;
