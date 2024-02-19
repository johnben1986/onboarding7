import BackgroundPicker from "./BackgroundPicker";
import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import {
  RiEditFill,
  RiEditLine,
  RiImage2Fill,
  RiImage2Line,
  RiImageFill,
  RiImageLine,
} from "react-icons/ri";
import {
  IoMdClose,
  IoMdRadioButtonOff,
  IoMdRadioButtonOn,
} from "react-icons/io";
import Modal from "./Modal";

const imageFitClass = {
  contain: "object-contain",
  background: "object-cover",
  stretch: "object-fill",
};

const editStates = {
  image: "image",
  text: "text",
  none: "none",
};


export function Box({
  enableImage = true,
  enableText = true,
  customTextEditor,
  previewing,
  editTextLabel,
  label,
  content,
  setContent = () => {}, 
}) {
  const editorRef = useRef(null);

  const [editState, setEditState] = useState(editStates.none);

  
  
  
  

  const borderClasses = previewing
    ? ""
    : "border border-dashed border-gray-400";

  function startTextEditing() {
    setEditState(editStates.text);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }

  function openImageModal() {
    setEditState(editStates.image);
  }

  useEffect(() => {
    function handleBlur() {
      setEditState(editStates.none);
      setContent({
        ...content,
        text: editorRef.current.getContent(),
      });
      
    }

    if (editorRef.current) {
      editorRef.current.on("blur", handleBlur);
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.off("blur", handleBlur);
      }
    };
  }, [editState, content]);

  
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getBody().setAttribute("contenteditable", !previewing);
    }

    function handleClick(ev) {
      console.log("previweing", previewing);
      if (previewing) {
        console.log("STOPPING");
        editorRef.current.getElement().blur();
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();

        

        
        
        
        
        

        
        const link = ev.target.closest("a");
        if (link) {
          const newLink = link.cloneNode(true);
          newLink.click();
        }

        return false;
      }
    }

    function setEventListener(name) {
      function f(ev) {
        console.log("EVENT!", name, ev);
        handleClick(ev);
      }
      if (editorRef.current) {
        [...editorRef.current.getBody().children].forEach((child) => {
          child.addEventListener(name, f);
        });
      }
      return [name, f];
    }

    const events = [
      setEventListener("click"),
      setEventListener("mousedown"),
      
      
      setEventListener("focusin"),
      
      
    ];

    console.log("here");
    return () => {
      if (editorRef.current) {
        events.forEach(([name, f]) => {
          console.log("removing");
          const body = editorRef.current.getBody();
          if (body) {
            [...body.children].forEach((child) => {
              child.removeEventListener(name, f);
            });
          }
        });
      }
    };
  }, [previewing]);

  return (
    <div
      className={`group relative h-full w-full overflow-hidden rounded text-black ${borderClasses} p-1`}
      style={{
        backgroundColor: content.backgroundColor,
      }}
    >
      {content.imageHyperlink && previewing && (
        <a
          className="absolute inset-0 z-40"
          href={content.imageHyperlink}
          target="_blank"
          rel="noopener noreferrer"
        />
      )}
      {previewing || (
        <div className="absolute top-0 right-0 left-0 pt-1 text-center text-4xl">
          {label}
        </div>
      )}
      {content.image && (
        <img
          className={`absolute inset-0 m-auto h-full w-full object-center ${
            imageFitClass[content.imageFit]
          }`}
          style={
            content.imageAlpha
              ? {
                  opacity: content.imageAlpha,
                }
              : {}
          }
          src={content.image}
          alt="image"
        />
      )}
      <div className="relative z-30 h-full w-full text-black">
        {customTextEditor ? (
          (() => {
            const [text, editor] = customTextEditor(
              content.customTextEditorState,
              (content) =>
                setContent({ ...content, customTextEditorState: content }),
            );
            return (
              <>
                <Modal
                  isOpen={editState === editStates.text}
                  onRequestClose={() => setEditState(editStates.none)}
                  customContentStyles={{ padding: 0 }}
                >
                  {editor}
                </Modal>
                {text}
              </>
            );
          })()
        ) : (
          <Editor
            inline={true}
            onInit={(evt, editor) => {
              editorRef.current = editor;

              editor.dom.setAttribs(editor.getBody(), {
                style: content.custom_style,
              });

              editor.getBody().style.outline = "none";
            }}
            onClick={() => {
              return true;
            }}
            initialValue={content.text}
            init={{
              menubar: false,
              width: "100%",
              height: "100%",
              statusbar: false,
              plugins: ["lists", "link"],
              toolbar:
                "fontfamily fontsize forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | numlist bullist | link",
              font_size_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt",
              content_style: `
                  .mce-content-body ul, .mce-content-body ol {
                    list-style: revert;
                    padding: revert;
                    margin: revert;
                  }

                  .website-builder-previewing .mce-content-body [data-mce-selected=inline-boundary] {
                    background-color: inherit !important;
                  }

                  a:hover {
                    color: rgb(32, 88, 220);
                  }
                `,
              
            }}
          />
        )}
        <div
          className={`absolute inset-0 z-20 text-black ${
            (editState === editStates.text || previewing) && "hidden"
          }`}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
        >
          {previewing || (
            <>
              <div
                className={`h-full w-full items-center justify-center ${
                  editState === editStates.none ? "flex" : "hidden"
                }`}
              >
                {enableImage && (
                  <button
                    className="z-40 m-2 flex h-fit flex-col items-center rounded bg-gray-600/90 p-3 text-3xl text-gray-100 shadow-md backdrop-blur hover:bg-gray-500/90 active:bg-gray-700/90"
                    onClick={() => openImageModal()}
                  >
                    <RiImage2Line className="text-3xl sm:text-5xl" />
                    <div className="text-sm sm:text-lg">Add image</div>
                  </button>
                )}
                {enableText && (
                  <button
                    className="z-40 m-2 flex h-fit flex-col items-center rounded bg-gray-600/90 p-3 text-3xl text-gray-100 shadow-md backdrop-blur hover:bg-gray-500/90 active:bg-gray-700/90"
                    onClick={() => startTextEditing()}
                  >
                    <RiEditLine className="text-3xl sm:text-5xl" />
                    <div className="text-sm sm:text-lg">
                      {editTextLabel || "Text"}
                    </div>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        {
          <Modal
            isOpen={editState === editStates.image}
            onRequestClose={() => setEditState(editStates.none)}
            customContentStyles={{ padding: 0 }}
          >
            <div className="max-w-xl bg-gray-200 p-4 text-lg text-black">
              <div className="space-y-4">
                <div className="text-center text-2xl">Customize image</div>
                <BackgroundPicker setContent={setContent} content={content} />
              </div>
            </div>
          </Modal>
        }
      </div>
    </div>
  );
}
