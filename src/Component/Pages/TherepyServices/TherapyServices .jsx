import React from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";
import { Outlet } from "react-router-dom";

const TherapyServices = () => {
  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar activePage= "/therapy" />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header />
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TherapyServices;
