import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaFileExport, FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { AiFillDelete } from "react-icons/ai";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Bharti() {
  const [patientHistory, setPatientHistory] = useState([]);
  const [loader, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModalType, setActiveModalType] = useState(null);
  const [activeModelContent, setActiveModalContent] = useState(null);
  const navigate = useNavigate();

  const fetchContactUs = async () => {
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
        "https://physiotherapy-1.onrender.com/apis/contact/getAllContactUs",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("contect", data);
      if (data.success) {
        setPatientHistory(data.data);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchContactUs();
  }, []);
  

  const handleDelet = async (id) => {
       const token = Cookies.get("accessToken");
      if (!token) {
        toast.error("You are not logged in. Please log in.", {
          position: "top-right",
        });
        navigate("/login");
        return;
      }
    
    try {
      const res = await fetch(
        `https://physiotherapy-1.onrender.com/apis/contact/deleteContactUs/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
         
        }
      );
      const result = await res.json();
  
      if (result.success) {
        toast.success("Your Delete successfully!", {
                  position: "top-right",
                });
     
        
      } else {
       toast.error("Something Want Wrong ", {
                  position: "top-right",
                });
      }
    } catch (error) {
      console.error("Error While Deleting", error);
      alert("An error occurred");
    }finally{
      
   fetchContactUs();
    }
  };

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar activePage= "/contect"/>
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header title="Contact" />
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h1 className="text-2xl font-bold mb-4">Patient List</h1>
          </div>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#1E2A3A] text-white">
                <tr>
                     <th className="py-3 px-4 text-sm text-left">Serial No</th>
                  <th className="py-3 px-4 text-sm text-left">Name</th>
                  <th className="py-3 px-4 text-sm text-left">email</th>
                  <th className="py-3 px-4 text-sm text-left">subject</th>

                  <th className="py-3 px-4 text-sm text-left">message</th>

                  <th className="py-3 px-4 text-sm text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loader ? (
                  <tr>
                    <td colSpan={10} className="py-6 text-center">
                      <div className="flex justify-center items-center">
                        <TailSpin
                          visible={true}
                          height="80"
                          width="80"
                          color="#4fa94d"
                          ariaLabel="tail-spin-loading"
                        />
                      </div>
                    </td>
                  </tr>
                ) : patientHistory.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="text-center text-2xl font-medium"
                    >
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  patientHistory.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {index + 1}
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {item?.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words truncate">
                        {item?.email}
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words truncate">
                        {item?.subject}
                      </td>
                   

                      <td className="border border-gray-300 px-4 py-2 max-w-[200px] whitespace-normal break-words text-lg text-center ">
                        <button
                          className="text-blue-600 underline"
                          onClick={() => {
                            setActiveModalType("patient massage");
                            setActiveModalContent(item?.message);
                          }}
                        >
                          <FaRegEye />
                        </button>
                      </td>

                       <td className="border border-gray-300 px-4 py-2 max-w-[200px] whitespace-normal break-words text-lg text-center ">
                        <button
                          className="text-red-600 underline"
                      onClick={() => handleDelet(item?._id)}

                        >
                         <AiFillDelete />
                        </button>
                      </td>



                    
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {activeModelContent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl sm:text-2xl font-semibold">
                {activeModalType}
              </h1>
              <button
                className="text-red-600 font-semibold text-2xl sm:text-3xl"
                onClick={() => {
                  setActiveModalContent(null);
                  setActiveModalType(null);
                }}
              >
                <RxCross2 />
              </button>
            </div>

            {activeModalType === "patient massage" && (
              <div className="space-y-2 text-sm sm:text-base">
                <p>
                  <strong>Massage:</strong> {activeModelContent}
                </p>
                
                
             
               
             
              </div>
            )}

            {activeModalType === "Service Details" && (
              <div className="space-y-2 text-sm sm:text-base">
                <p>
                  <strong>Service Name:</strong>{" "}
                  {activeModelContent.serviceName}
                </p>
                <p>
                  <strong>Features:</strong>{" "}
                  {activeModelContent.features.join(", ")}
                </p>
              </div>
            )}

            {activeModalType === "notes" && (
              <div className="text-sm sm:text-base">
                <p>{activeModelContent}</p>
              </div>
            )}

            {activeModalType === "therapies" &&
              Array.isArray(activeModelContent) && (
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-left text-sm sm:text-base">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Session Date</th>
                        <th className="p-2 border">Charges</th>
                        <th className="p-2 border">Payment Status</th>
                        <th className="p-2 border">Payment Method</th>
                        <th className="p-2 border">Treatment Notes</th>
                        <th className="p-2 border">Next Appointment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeModelContent.map((session, index) => (
                        <tr key={session._id || index}>
                          <td className="p-2 border">
                            {new Date(session.sessionStart).toLocaleString()}
                          </td>
                          <td className="p-2 border">₹{session.charges}</td>
                          <td className="p-2 border">
                            {session.paymentStatus}
                          </td>
                          <td className="p-2 border">
                            {session.paymentMethod}
                          </td>
                          <td className="p-2 border">
                            {session.treatmentNotes}
                          </td>
                          <td className="p-2 border">
                            {session.nextAppointment
                              ? new Date(
                                  session.nextAppointment
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Bharti;
