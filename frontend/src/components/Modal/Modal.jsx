import { useEffect } from "react";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient( 90deg, #2e42ae 0%, #616fbe 100%)",
    border: "none",
    borderRadius: "10px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

export default function Modal({ zIndex, padding = false, ...props }) {
  useEffect(() => {
    ReactModal.setAppElement("body");
  }, []);

  useEffect(() => {
    if (props.isOpen) {
      const x = window.scrollX;
      const y = window.scrollY;
      const disableScroll = () => {
        window.scrollTo(x, y);
      };
      window.addEventListener("scroll", disableScroll);
      return () => {
        window.removeEventListener("scroll", disableScroll);
      };
    }
  }, [props.isOpen]);
  return (
    <ReactModal
      style={{
        content: {
          ...customStyles.content,
          ...props.customContentStyles,
          ...(padding ? { padding: 0 } : { padding: 20 }),
        },
        overlay: {
          zIndex,
          ...customStyles.overlay,
          ...props.customOverlayStyles,
        },
      }}
      {...props}
    />
  );
}
