// components/StatusToggle.js
import React from "react";

const StatusToggle = ({ isBlocked, onToggle }) => {
  return (
    <div
      className={`w-16 h-8 flex items-center bg-gray-200 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isBlocked ? "justify-start bg-red-200" : "justify-end bg-green-200"
      }`}
      onClick={onToggle}
    >
      <div
        className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          isBlocked ? "bg-red-500" : "bg-green-500"
        }`}
      ></div>
    </div>
  );
};

export default StatusToggle;
