import React from "react";
import BlogBox from "../../BlogBox/BlogBox";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { VscShare } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
 
function GetAllBlog() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const[modalType , setModalType]= useState(null);
  const [modalContent , setModalContent]= useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        toast.error("You are not logged in. Please log in.", {
          position: "top-right",
        });
        navigate("/login");
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(
          "https://physiotherapy-1.onrender.com/apis/blog/getAllBlog",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Allblog", data);
        if (data.success) {
          setBlogData(data.data);
        }
      } catch (err) {
        toast.error(err.message || "Something went wrong", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, []);
  const handleModalContent = ( type, data)=>{
    setModalType(type);
    setModalContent(data)

  }

  return (
    <div className="bg-gray-100 h-full">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-8xl mx-auto w-full">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center md:text-left">
            All Blog
          </h1>
          <button className="px-4 py-2 border text-white bg-blue-700 rounded-md font-medium">
            Create Blog
          </button>
        </div>
        <table className="table-fixed w-full border-collapse  ">
          <thead className="bg-gradient-to-r from-blue-700 to-blue-600 text-white ">
            <tr>
              <th className=" border-l border-t-0  border-gray-300 px-4 py-3">
                Blog Name
              </th>
              <th className=" px-4 py-3">Description</th>
              <th className=" px-4 py-3">Created At</th>
              <th className=" px-4 py-3">Images</th>
              <th className=" px-4 py-3">Video</th>
              <th className=" px-4 py-3">View</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  <div className="flex justify-center">
                    <TailSpin
                      visible={true}
                      height="50"
                      width="50"
                      color="#4fa94d"
                      ariaLabel="tail-spin-loading"
                    />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {blogData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-6 text-xl font-medium"
                    >
                      No Blog Found
                    </td>
                  </tr>
                ) : (
                  blogData.map((cur, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2 text-center">{cur?.name}</td>

                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button className="text-blue-600 underline text-xs"
                        onClick={()=>handleModalContent(" description" , cur?.description)} 
                        >
                          View
                        </button>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {new Date(cur.createdAt).toLocaleDateString()}
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button className="text-blue-600 underline text-xs">
                          View
                        </button>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button className="text-blue-600 underline text-xs">
                          View
                        </button>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-center" >
                        <button className=" text-xl underline font-medium text-blue-700 ">
                          {" "}
                          <IoIosEye />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </>
            )}
          </tbody>
        </table>

        {
          modalType && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
           <div className="bg-white p-6 rounded-lg min-w-[400px]">
            <div className="flex items-center justify-between mb-3">
                            <h1 className="font-semibold text-2xl text-gray-700">
                              {" "}
                              Blog {modalType}
                            </h1>
                            <button className="text-2xl" onClick={() => setModalType(null)}>
                              {" "}
                              <IoMdClose />
                            </button>
                          </div>

                          <div className="flex items-start">
                {Array.isArray(modalContent) ? (
                  <ul>
                    {modalContent.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : modalContent && typeof modalContent === "object" ? (
                  <div>
                    {Object.entries(modalContent).map(([key, value], index) => (
                      <div key={index} className="flex">
                        <strong>{key}:</strong>
                        {Array.isArray(value) ? (
                          <ul className=" flex ml-4">
                            {value.map((v, i) => (
                              <li key={i} className="pr-2">
                                {v}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="ml-2">{String(value)}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>{modalContent}</p>
                )}
              </div>



           </div>
          </div>
        }
      </div>
    </div>
  );
}

export default GetAllBlog;
