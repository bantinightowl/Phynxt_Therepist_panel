import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-end mt-4 px-6">
      <div className="flex items-center space-x-2">
        <button onClick={() => onPageChange(currentPage - 1)} className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50" disabled={currentPage === 1}>
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50" disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
};
export default Pagination;
