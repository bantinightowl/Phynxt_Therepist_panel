import React from "react";

const Modal = ({ isOpen, onClose, title = '', children, maxWidth = 600 }) => {
  if (!isOpen) return null;

  return (
    <div
      className=" fixed inset-0 z-50 flex  justify-center items-center bg-black/50"
      onClick={onClose} // close when clicking backdrop
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-[90%] max-w-[${maxWidth}px] h-[90%] p-6 overflow-auto animate-fadeIn`}
        onClick={(e) => e.stopPropagation()} // prevent closing on inner click
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
