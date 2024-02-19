import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export default function Modal({ children, isOpen, onRequestClose }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "visible" : "invisible"
      }`}
      onClick={() => onRequestClose()}
    >
      <div
        className="relative max-w-[100vw] text-lg shadow-2xl sm:max-w-xl"
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          className="absolute right-0 top-0 cursor-pointer p-3 text-2xl text-gray-600 hover:text-gray-900"
          onClick={() => onRequestClose()}
        >
          <IoMdClose />
        </button>
        <div className="max-h-screen overflow-auto rounded">{children}</div>
      </div>
    </div>,
    document?.getElementById("modal"),
  );
}
