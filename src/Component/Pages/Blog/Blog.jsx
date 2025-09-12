import React from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";
import { Outlet } from "react-router-dom";

function Blog() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Blog