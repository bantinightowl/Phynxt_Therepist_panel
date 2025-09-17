// import React from "react";

// import { VscShare } from "react-icons/vsc";
// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { IoMdClose } from "react-icons/io";
// import ServiceDetailPage from "./ServiceDetailPage";
// import { IoIosEye } from "react-icons/io";
// import { TailSpin } from "react-loader-spinner";
// import { all } from "axios";
// import { FaRegEye } from "react-icons/fa";

// function GetAllService() {
//   const [loading, setLoading] = useState(false);
//   const [allService, setAllService] = useState([]);
//   const [showTimeSlot, setShowTimeSlot] = useState(false);
//   const [timeSlotData, setTimeSlotData] = useState(null);

//   const [imageShowModel, setImageShowModel] = useState(false);
//   const [imageModelData, setImageModelData] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [videoShowModel, setVideoShowModel] = useState(false);
//   const [videoModelData, setVideoModelData] = useState([]);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   const navigate = useNavigate();

//   const fetchServiceData = async () => {
//     const token = Cookies.get("accessToken");
//     if (!token) {
//       toast.error("You are not logged in. Please log in.", {
//         position: "top-right",
//       });
//       navigate("/login");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch(
//         "https://physiotherapy-1.onrender.com/apis/imageVideoInTherapyServices/getImageVideoArticleInTherapyService",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       console.log("allseviceData", data.data);
//       if (data.success) {
//         setAllService(data.data);
//       }
//     } catch (err) {
//       toast.error(err.message || "Something went wrong. Please try again.", {
//         position: "top-right",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchServiceData();
//   }, []);

//   const handleSingalServiceVideo = (id) => {
//     navigate(`../details/${id}`);
//   };

//   return (
//     <div className="bg-gray-100 h-full">
//       <div className="bg-white rounded-xl shadow-md p-6 max-w-8xl mx-auto w-full">
//         <div className="flex justify-between items-center  w-full">
//           <h1 className="text-2xl text-gray-800 font-bold mb-6 md:text-left">
//             All Services
//           </h1>
//           <button className=" text-xl font-medium text-white py-2 px-3 bg-blue-700 rounded" onClick={()=>navigate("/therapy/addtherapy")}>
//             Add Service
//           </button>
//         </div>

//         <table className="table-fixed w-full border-collapse  ">
//           <thead className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
//             <tr>
//               <th className="  text-base border-l border-t-0  border-gray-300 px-4 py-2">
//                 Service Name
//               </th>
//               <th className="px-4 py-2">Feature</th>
//               <th className="px-4 py-2">Description</th>
//               <th className="px-4 py-2">City</th>
//               <th className="px-4 py-2">Price</th>
//               <th className="px-4 py-2">Available Slots</th>
//               <th className="px-4 py-2">Images</th>
//               <th className="px-4 py-2">Video</th>

//               <th className="border-t-0 border-r  border-gray-300 px-4 py-2">
//                 View
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <div className=" flex items-center justify-center text-center">
//                 <TailSpin
//                   visible={true}
//                   height="80"
//                   width="80"
//                   color="#4fa94d"
//                   ariaLabel="tail-spin-loading"
//                 />
//               </div>
//             ) : allService.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="text-center text-2xl font-medium">
//                   No Data Found
//                 </td>
//               </tr>
//             ) : (
//               allService.map((ser) => (
//                 <tr key={ser.id} className="text-center">
//                   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                     {ser?.therapyServiceId?.serviceId?.serviceName}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                     {ser?.therapyServiceId?.serviceId?.features[0]}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                     {ser?.therapyServiceId?.serviceId?.description
//                       .split(" ")
//                       .slice(0, 15)
//                       .join(" ")}
//                   </td>

//                   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                     {ser?.therapyServiceId?.city}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                     {ser?.therapyServiceId?.price}
//                   </td>

//                   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                     <button
//                       className="text-blue-600 underline "
//                       onClick={() => {
//                         setShowTimeSlot((pre) => !pre);
//                         setTimeSlotData(ser?.therapyServiceId?.availableSlots);
//                       }}
//                     >
//                       View{" "}
//                     </button>
//                   </td>

//                   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                     <button
//                       className="text-blue-600 underline"
//                       onClick={() => {
//                         setImageShowModel((pre) => !pre);
//                         setImageModelData(ser?.image);
//                         setCurrentImageIndex(0);
//                       }}
//                     >
//                       View{" "}
//                     </button>
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                     <button
//                       className="text-blue-600 underline "
//                       onClick={() => {
//                         setVideoModelData(ser?.video);
//                         setCurrentVideoIndex(0);
//                         setVideoShowModel(true);
//                       }}
//                     >
//                       View{" "}
//                     </button>
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                     <button
//                       className="text-blue-600 underline "
//                       onClick={() =>
//                         handleSingalServiceVideo(ser?._id)
//                       }
//                     >
//                       <FaRegEye />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         {showTimeSlot && timeSlotData && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg min-w-[400px]">
//               <div className="flex items-center justify-between mb-3">
//                 <h1 className="font-semibold text-2xl text-gray-700">
//                   Available slot
//                 </h1>
//                 <button
//                   className="text-2xl"
//                   onClick={() => setShowTimeSlot(false)}
//                 >
//                   <IoMdClose />
//                 </button>
//               </div>
//               <div>
//                 {Object.entries(timeSlotData).map(([key, value], index) => (
//                   <div key={index} className="flex">
//                     <strong>{key}:</strong>
//                     {Array.isArray(value) ? (
//                       <ul className="flex ml-4">
//                         {value.map((v, i) => (
//                           <li key={i} className="pr-2">
//                             {v}
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <span className="ml-2">{String(value)}</span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {imageShowModel && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
//             <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-xl w-full">
//               <div className="flex items-center justify-between mb-3">
//                 <h1 className="font-semibold text-2xl text-gray-700">
//                   Your Service Image
//                 </h1>
//                 <button
//                   className="text-2xl"
//                   onClick={() => setImageShowModel(false)}
//                 >
//                   <IoMdClose />
//                 </button>
//               </div>

//               <img
//                 src={imageModelData[currentImageIndex]}
//                 alt="Therapy"
//                 className="w-full h-96 object-contain rounded"
//               />
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() =>
//                     setCurrentImageIndex((prev) =>
//                       prev === 0 ? imageModelData.length - 1 : prev - 1
//                     )
//                   }
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   Prev
//                 </button>
//                 <button
//                   onClick={() =>
//                     setCurrentImageIndex((prev) =>
//                       prev === imageModelData.length - 1 ? 0 : prev + 1
//                     )
//                   }
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {videoShowModel && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
//             <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
//               <div className="flex items-center justify-between mb-3">
//                 <h1 className="font-semibold text-2xl text-gray-700">
//                   Your Service Video
//                 </h1>
//                 <button
//                   className="text-2xl"
//                   onClick={() => setVideoShowModel((pre) => !pre)}
//                 >
//                   <IoMdClose />
//                 </button>
//               </div>

//               <video
//                 controls
//                 src={videoModelData[currentVideoIndex]}
//                 className="w-full h-[400px] rounded"
//               />
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() =>
//                     setCurrentVideoIndex((prev) =>
//                       prev === 0 ? videoModelData.length - 1 : prev - 1
//                     )
//                   }
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   Prev
//                 </button>
//                 <button
//                   onClick={() =>
//                     setCurrentVideoIndex((prev) =>
//                       prev === videoModelData.length - 1 ? 0 : prev + 1
//                     )
//                   }
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default GetAllService;

import React from "react";

import { VscShare } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import ServiceDetailPage from "./ServiceDetailPage";
import { IoIosEye } from "react-icons/io";
import { TailSpin } from "react-loader-spinner";
import { all } from "axios";
import { FaRegEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { RiEdit2Fill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";

function GetAllService() {
  const [loading, setLoading] = useState(false);
  const [allService, setAllService] = useState([]);
  const [showTimeSlot, setShowTimeSlot] = useState(false);
  const [timeSlotData, setTimeSlotData] = useState(null);

  const [imageShowModel, setImageShowModel] = useState(false);
  const [imageModelData, setImageModelData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [videoShowModel, setVideoShowModel] = useState(false);
  const [videoModelData, setVideoModelData] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState(null);

  const navigate = useNavigate();

  const fetchServiceData = async () => {
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
        "https://physiotherapy-1.onrender.com/apis/imageVideoInTherapyServices/getImageVideoArticleInTherapyService",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("allseviceData", data.data);
      console.log("detailId", data.data?.therapyServiceId);
      if (data.success) {
        setAllService(data.data);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const searchService = async (query) => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    try {
      const res = await fetch(
        `https://physiotherapy-1.onrender.com/apis/imageVideoInTherapyServices/getImageVideoByServiceName/${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setAllService(data.data);
      } else {
        setAllService([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setAllService([]);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() === "") {
        fetchServiceData(); // reload all
      } else {
        searchService(searchQuery);
      }
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSingalServiceVideo = (id) => {
    navigate(`../details/${id}`);
  };
  const handleDeleteService = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want  change the Status of this service?"
    );
    if (!confirmDelete) return;

    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://physiotherapy-1.onrender.com/apis/therapy-services/deleteServiceTherapyToggle/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Service Status Change  successfully!");
        fetchServiceData();
      } else {
        toast.error(data.message || "Failed to delete the service.");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.");
      console.error("Delete Error:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h1 className="text-2xl text-gray-800 font-bold sm:mb-6  mb-2 md:text-left">
          All Services
        </h1>
        {/* <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-b-2 pr-20"
          /> */}

        <button
          onClick={() => navigate("/therapy/addtherapy")}
          className="flex items-center bg-[#009688] hover:bg-[#008577] text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
        >
          <IoMdAdd  className="mr-1 font-bold" />
          Add Service
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px] bg-white shadow-md rounded-lg">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-[#1E2A3A] text-white">
              <tr>
                <th className="  text-base border-l border-t-0  border-gray-300 px-4 py-2">
                  Service Name
                </th>
                <th className="px-4 py-2">Feature</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Session Fee</th>
                <th className="px-4 py-2">Available Slots</th>
                <th className="px-4 py-2">Images</th>
                <th className="px-4 py-2">Video</th>

                <th className="border-t-0 border-r  border-gray-300 px-4 py-2">
                  Edit
                </th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={11} className="py-6 text-center">
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
              ) : allService.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-2xl font-medium">
                    No Data Found
                  </td>
                </tr>
              ) : (
                [...allService]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((ser) => (
                    <tr key={ser.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {ser?.therapyServiceId?.serviceId?.serviceName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {ser?.therapyServiceId?.serviceId?.features[0]}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {ser?.therapyServiceId?.serviceId?.description
                          .split(" ")
                          .slice(0, 5)
                          .join(" ")}
                        ....
                      </td>

                      {/* <td className="border border-gray-300 px-4 py-2 text-sm">
                        {ser?.therapyServiceId?.city}
                      </td> */}

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        <button
                          className="text-blue-600 underline"
                          onClick={() => {
                            setModalType("Address");
                            setModalContent(ser?.therapyServiceId);
                          }}
                        >
                          View{" "}
                        </button>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {ser?.therapyServiceId?.price}
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        <button
                          className="text-blue-600 underline "
                          onClick={() => {
                            setShowTimeSlot((pre) => !pre);
                            setTimeSlotData(
                              ser?.therapyServiceId?.availableSlots
                            );
                          }}
                        >
                          View{" "}
                        </button>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        <button
                          className="text-blue-600 underline"
                          onClick={() => {
                            setImageShowModel((pre) => !pre);
                            setImageModelData(ser?.image);
                            setCurrentImageIndex(0);
                          }}
                        >
                          View{" "}
                        </button>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        <button
                          className="text-blue-600 underline "
                          onClick={() => {
                            setVideoModelData(ser?.video);
                            setCurrentVideoIndex(0);
                            setVideoShowModel(true);
                          }}
                        >
                          View{" "}
                        </button>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {/* <button
                        className="text-blue-600 underline "
                        onClick={() =>
                          handleSingalServiceVideo(ser?.imageVideoId)
                        }
                      >
                        <RiEdit2Fill />
                      </button> */}

                        <button
                          className="text-blue-600 underline "
                          onClick={() =>
                            handleSingalServiceVideo(ser?.therapyServiceId?._id)
                          }
                        >
                          <RiEdit2Fill />
                        </button>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {/* <button onClick={()=>handleDeleteService(ser?.therapyServiceId._id)}>
                  { ser?.therapyServiceId?.isDelete ?<h1 className="text-red-700 font-medium ">InActive</h1> :<h1 className=" text-blue-700 font-medium">Active</h1>}
                  </button> */}

                        {ser?.therapyServiceId ? (
                          <div className="relative inline-block w-11 h-5">
                            <input
                              id={`toggle-${ser.therapyServiceId._id}`}
                              type="checkbox"
                              checked={!ser.therapyServiceId.isDelete}
                              onChange={() =>
                                handleDeleteService(ser.therapyServiceId._id)
                              }
                              className={`peer appearance-none w-11 h-5 rounded-full cursor-pointer transition-colors duration-300 ${
                                ser.therapyServiceId.isDelete
                                  ? "bg-red-500"
                                  : "bg-green-500"
                              }`}
                            />
                            <label
                              htmlFor={`toggle-${ser.therapyServiceId._id}`}
                              className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 cursor-pointer"
                            ></label>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No Data</span>
                        )}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showTimeSlot && timeSlotData && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-semibold text-2xl text-gray-700">
                Available slot
              </h1>
              <button
                className="text-2xl"
                onClick={() => setShowTimeSlot(false)}
              >
                <IoMdClose />
              </button>
            </div>
            <div>
              {Object.entries(timeSlotData).map(([key, value], index) => (
                <div key={index} className="flex">
                  <strong>{key}:</strong>
                  {Array.isArray(value) ? (
                    <ul className="flex ml-4">
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
          </div>
        </div>
      )}

      {imageShowModel && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-semibold text-2xl text-gray-700">
                Your Service Image
              </h1>
              <button
                className="text-2xl"
                onClick={() => setImageShowModel(false)}
              >
                <IoMdClose />
              </button>
            </div>

            <img
              src={imageModelData[currentImageIndex]}
              alt="Therapy"
              className="w-full h-96 object-contain rounded"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? imageModelData.length - 1 : prev - 1
                  )
                }
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Prev
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === imageModelData.length - 1 ? 0 : prev + 1
                  )
                }
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {videoShowModel && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-semibold text-2xl text-gray-700">
                Your Service Video
              </h1>
              <button
                className="text-2xl"
                onClick={() => setVideoShowModel((pre) => !pre)}
              >
                <IoMdClose />
              </button>
            </div>

            <video
              controls
              src={videoModelData[currentVideoIndex]}
              className="w-full h-[400px] rounded"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() =>
                  setCurrentVideoIndex((prev) =>
                    prev === 0 ? videoModelData.length - 1 : prev - 1
                  )
                }
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Prev
              </button>
              <button
                onClick={() =>
                  setCurrentVideoIndex((prev) =>
                    prev === videoModelData.length - 1 ? 0 : prev + 1
                  )
                }
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold ">{modalType}</h1>

              <button
                className="ml-auto  text-red-600 font-semibold text-3xl"
                onClick={() => {
                  setModalContent(null);
                  setModalType(null);
                }}
              >
                <RxCross2 />
              </button>
            </div>
            {modalType === "Address" && (
              <div>
                {/* <p>
                  <strong>Country:</strong> {modalContent.country}
                </p> */}

                <p>
                  <strong>State:</strong> {modalContent.state}
                </p>
                <p>
                  <strong>City:</strong> {modalContent.city}
                </p>
                <p>
                  <strong>Locality:</strong> {modalContent.locality}
                </p>
                <p>
                  <strong>fullAddress:</strong> {modalContent.fullAddress}
                </p>
              </div>
            )}
            {modalType === "patient Details" && (
              <div>
                <p>
                  <strong>Name:</strong> {modalContent.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {modalContent?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {modalContent?.phoneNumber}
                </p>
                <p>
                  <strong>Gender:</strong> {modalContent?.gender}
                </p>
                <p>
                  <strong>Date of Birthday:</strong>{" "}
                  {new Date(modalContent?.dob).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p>
                  <strong>Description:</strong> {modalContent?.description}
                </p>
              </div>
            )}

            {modalType === "Service Details" && (
              <div>
                <p>
                  <strong> Service Name:</strong> {modalContent?.serviceName}
                </p>
                <p>
                  <strong>Title:</strong> {modalContent?.title}
                </p>
                <p>
                  <strong> Description:</strong> {modalContent?.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GetAllService;
