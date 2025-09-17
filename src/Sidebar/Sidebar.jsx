
import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import * as FaIcons from "react-icons/fa";
import { FcBusinessContact } from "react-icons/fc";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { HiReceiptRefund } from "react-icons/hi2";


const Sidebar = ({ activePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [contentHeight, setContentHeight] = useState(window.innerHeight);
  const [openDropdown, setOpenDropdown] = useState({});
  const navRefs = useRef([]);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // const toggleDropdown = (key) => {
  //   setOpenDropdown((prev) => ({
  //     ...prev,
  //     [key]: !prev[key],
  //   }));
  // };

  const toggleDropdown = (key) => {
  // If sidebar is collapsed, expand it before opening dropdown
  if (isCollapsed) setIsCollapsed(false);

  setOpenDropdown((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));
};


  const handleSignOut = () => {
    Cookies.remove("authToken");
    Cookies.remove("tokenTimestamp");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  

  const modules = [
    { icon: "FaTachometerAlt", text: "My Dashboard", path: "/" },
    { icon: "FaUserInjured", text: "Patients", path: "/patients" },
    { icon: "FaBrain", text: "Therapy Services", path: "/therapy/alltherapy" },
    // {
    //   icon: "FaBrain",
    //   text: "Therapy Services",
    //   dropdown: true,
    //   subRoutes: [
    //     { text: "Add Services", path: "/therapy/addtherapy" },
    //     { text: "All Services", path: "/therapy/alltherapy" },
    //   ],
    // },

    { icon: "FaCalendarCheck", text: "Appointments", path: "/appointments" },
    // { icon: "FaStethoscope", text: "Clinical Assessments", path: "/treatments", },
    // { icon: "LuNotebookPen", text: "Treatments", path: "/assesments" },
    { icon: "LuNotebookPen", text: "Patient Documentation", path: "/management" },
    { icon: "FaComments", text: "Feedback & Queries", path: "/feedback" },
    { icon: "BsFillQuestionCircleFill", text: "Question", path: "/question" },
    // { icon: "HiReceiptRefund", text: "Refund", path: "/refund" },
    
    {
      icon:  "HiReceiptRefund",
      text: "ReFund",
      dropdown: true,
      subRoutes: [
        { text: "Req Refund", path: "/refund/reqrefund" },
        { text: "All Refund", path: "/refund/allrefund" },
      ],
    },
    { icon: "FaLink", text: "Referral", path: "/referral" },


    // { icon: "HiReceiptRefund", text: "Contact", path: "/contact"},
    
     
  ];

  useEffect(() => {
    const updateHeight = () => {
      const bodyHeight = document.body.scrollHeight;
      setContentHeight(
        bodyHeight > window.innerHeight ? bodyHeight : window.innerHeight
      );
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    const interval = setInterval(updateHeight, 500);

    return () => {
      window.removeEventListener("resize", updateHeight);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isCollapsed) {
      setOpenDropdown({}); // close all dropdowns when collapsed
    }
  }, [isCollapsed]);

  return (
    <div className="flex" style={{ height: `${contentHeight}px` }}>
      <aside
        className={`bg-[#0B1B33] text-[#1F1F1F] ${
          isCollapsed ? "w-20" : "w-64"
        } transition-all duration-300 p-4 flex flex-col max-h-full shadow-2xl relative group`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-5 bg-white text-[#0B1B33] p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors duration-200"
        >
          <FaBars className="w-4 h-4" />
        </button>

        <div className="flex items-center mb-8 px-2">
          {!isCollapsed && (
            <div className="p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 360 100"
                width="180"
                height="50"
              >
                <text
                  x="0"
                  y="0"
                  fontFamily="Arial Black, sans-serif"
                  fontWeight="bold"
                  fontSize="68"
                  dominantBaseline="hanging"
                >
                  <tspan fill="#FFFFFF">Phys</tspan>
                  <tspan fill="#FCD577">NXT</tspan>
                </text>
                <text
                  x="10"
                  y="83"
                  fontFamily="Arial, sans-serif"
                  fontWeight="600"
                  fontSize="18"
                  fill="#FCD577"
                  letterSpacing="2.2"
                  dominantBaseline="hanging"
                >
                  NEXT STEP TO YOUR RECOVERY
                </text>
              </svg>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-2 relative">
          {modules.map((item, index) => {
            const IconComponent =
              item.icon === "FcBusinessContact"
                ? FcBusinessContact
                : item.icon === "LuNotebookPen"
                ? LuNotebookPen
                : item.icon === "BsFillQuestionCircleFill"
                ? BsFillQuestionCircleFill
                : item.icon === "HiReceiptRefund"
                ? HiReceiptRefund
                : FaIcons[item.icon] || FaIcons.FaQuestionCircle;

            if (item.dropdown) {
              const isTherapyActive = item.subRoutes?.some(
                (sub) => activePage === sub.path
              );

              return (
                <div key={index}>
                  <div
                    onClick={() => toggleDropdown(item.text)}
                    className={`flex items-center justify-between p-3 h-12 rounded-xl cursor-pointer transition-all duration-200 ${
                      isTherapyActive
                        ? "bg-[#FCD577] border text-black"
                        : "hover:bg-white/10 text-white"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3 text-[#FCD577]">
                        <IconComponent />
                      </span>
                      {!isCollapsed && (
                        <span className="text-[#FFFFFF]">{item.text}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <span className="text-sm text-gray-300">
                        {openDropdown[item.text] ? "▲" : "▼"}
                      </span>
                    )}
                  </div>

                  {openDropdown[item.text] && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subRoutes.map((sub, subIndex) => (
                        <div
                          key={subIndex}
                          onClick={() => {
                            navigate(sub.path);
                            setOpenDropdown((prev) => ({
                              ...prev,
                              [item.text]: false,
                            }));
                          }}
                          className={`cursor-pointer px-3 py-1 rounded-md text-sm ${
                            activePage === sub.path
                              ? "bg-yellow-400 text-[#FCD577] font-semibold"
                              : "text-[#FFFF] hover:bg-white/10"
                          }`}
                        >
                          {sub.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div
                key={index}
                ref={(el) => (navRefs.current[index] = el)}
                onClick={() => navigate(item.path)}
                className={`flex items-center p-3 h-12 rounded-xl cursor-pointer relative z-10 transition-all duration-200 group/item ${
                  activePage === item.path
                    ? "pl-4 border bg-[#FCD577]"
                    : "hover:bg-white/10 hover:pl-4"
                }`}
              >
                <span
                  className={`text-xl mr-3 ${
                    activePage === item.path ? "text-black" : "text-[#FCD577]"
                  } group-hover/item:text-white transition-all duration-300`}
                >
                  <IconComponent />
                </span>
                {!isCollapsed && (
                  <span
                    className={`${
                      activePage === item.path
                        ? "text-black-900 font-semibold "
                        : "text-[#FFFFFF]"
                    } group-hover/item:text-white transition-all duration-300`}
                  >
                    {item.text}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* <div
          onClick={handleSignOut}
          className="mt-auto p-3 rounded-lg bg-white/5 hover:bg-red-500/20 cursor-pointer transition-colors duration-200 group/signout"
        >
          <div className="flex items-center">
            <FaSignOutAlt className="text-xl mr-3 text-red-300 group-hover/signout:text-red-400" />
            {!isCollapsed && (
              <span className="text-red-300 group-hover/signout:text-red-400 font-medium">
                Sign Out
              </span>
            )}
          </div>
        </div> */}
      </aside>
    </div>
  );
};

export default Sidebar;
