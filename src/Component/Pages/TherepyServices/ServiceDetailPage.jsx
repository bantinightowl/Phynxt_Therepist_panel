// import React from "react";
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { ToastContainer, toast } from "react-toastify";
// import { BiSolidEditAlt } from "react-icons/bi";
// import { MdDelete } from "react-icons/md";
// import { RxCross2 } from "react-icons/rx";
// import { ThreeDots } from "react-loader-spinner";
// import { MdEdit } from "react-icons/md";

// function ServiceDetailPage() {
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [singleService, setSingleService] = useState([]);
//   const [editMode, setEditMode] = useState(false);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   const [cityInput, setCityInput] = useState("");

//   const [slots, setSlots] = useState({
//     morning: [],
//     afternoon: [],
//     evening: [],
//     night: [],
//   });
//   const [newTimes, setNewTimes] = useState({});
//   const [showInputs, setShowInputs] = useState({});

//   const [updateAvailableLoading, setUpdateAvailableLoading] = useState(false);

//   const [blogLoading, setBlogLoading] = useState(false);
//   const [blogEdit, setBlogEdit] = useState(false);
//   const [title, setTitle] = useState([]);
//   const [article, setArticle] = useState([]);
//   const [image, setImages] = useState([]);

//   const [video, setVideos] = useState([]);
//   const [therapyServiceId, setTherapyServiceId] = useState("");

//   const { serviceId } = useParams();

//   const navigate = useNavigate();

//   const handleDeleteService = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this service?"
//     );
//     if (!confirmDelete) return;

//     const token = Cookies.get("accessToken");
//     if (!token) {
//       toast.error("You are not logged in. Please log in.", {
//         position: "top-right",
//       });
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://physiotherapy-1.onrender.com/apis/therapy-services/deleteServiceTherapy/${serviceId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         toast.success("Service deleted successfully!");
//         navigate("/therapy/alltherapy");
//       } else {
//         toast.error(data.message || "Failed to delete the service.");
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Try again later.");
//       console.error("Delete Error:", error);
//     }
//   };

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
//         `https://physiotherapy-1.onrender.com/apis/imageVideoInTherapyServices/getSingleImageVideoArticleById/${serviceId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       console.log("singalseviceData", data.data);
//       if (data.success) {
//         setSingleService(data.data);

//         if (data.data.availableSlots) {
//           setSlots(data.data.availableSlots);
//         }
//         setTitle(data?.data?.title?.[0]);
//         setArticle(data?.data?.article?.[0]);
//         setImages(data?.data?.image);
//         setVideos(data?.data?.video);
//       } else {
//         setSingleService([]);
//         toast.error("Something went wrong. Please try again.", {
//           position: "top-right",
//         });
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
//   }, [serviceId]);

//   const isTimeInRange = (time, range) => {
//     const ranges = {
//       morning: ["05:00", "11:59"],
//       afternoon: ["12:00", "16:59"],
//       evening: ["17:00", "19:59"],
//       night: ["20:00", "23:59"],
//     };

//     const [hour, minute] = time.split(":").map(Number);
//     const totalMinutes = hour * 60 + minute;

//     const [start, end] = ranges[range];
//     const [startH, startM] = start.split(":").map(Number);
//     const [endH, endM] = end.split(":").map(Number);

//     const startMinutes = startH * 60 + startM;
//     const endMinutes = endH * 60 + endM;

//     return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
//   };

//   const handleAdd = (range) => {
//     console.log("yes working");
//     const newTime = newTimes[range];
//     if (!newTime) {
//       toast.error("please Enter time", { position: "top-right" });
//       return;
//     }
//     if (!isTimeInRange(newTime, range)) {
//       alert(`Please enter a valid time for ${range}`);
//       return;
//     }

//     const formatted = formatTo12Hour(newTime);

//     setSlots((prev) => ({
//       ...prev,
//       [range]: [...prev[range], formatted],
//     }));

//     setNewTimes({ ...newTimes, [range]: "" });
//     setShowInputs({ ...showInputs, [range]: false });
//   };

//   const handleRemove = (range, index) => {
//     setSlots((prev) => ({
//       ...prev,
//       [range]: prev[range].filter((_, i) => i !== index),
//     }));
//   };
//   const timeRanges = ["morning", "afternoon", "evening", "night"];

//   const formatTo12Hour = (time) => {
//     const [h, m] = time.split(":");
//     const hour = parseInt(h);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const hr12 = hour % 12 === 0 ? 12 : hour % 12;
//     return `${hr12.toString().padStart(2, "0")}:${m} ${ampm}`;
//   };

//   const handleUpdateChange = async (id) => {
//     const token = Cookies.get("accessToken");
//     if (!token) {
//       toast.error("You are not logged in. Please log in.", {
//         position: "top-right",
//       });
//       navigate("/login");
//       return;
//     }
//     if (cityInput === "") {
//       toast.error("You cannot save empty city", {
//         position: "top-right",
//       });
//       return;
//     }
//     setUpdateAvailableLoading(true);
//     try {
//       const response = await fetch(
//         `https://physiotherapy-1.onrender.com/apis/therapy-services/updateServiceTherapy/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },

//           body: JSON.stringify({ availableSlots: slots, city: cityInput }),
//         }
//       );
//       const data = await response.json();
//       console.log("senddata ", data);
//       if (data.success) {
//         fetchServiceData();
//         toast.success("Succesfully update Available your Details");
//       }
//       console.log("updated", data);
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message || "something want wrong please try again");
//     } finally {
//       setEditMode(false);
//       setUpdateAvailableLoading(false);
//     }
//   };

//   const images = singleService?.image || [];
//   const videos = singleService?.video || [];

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   const prevVideo = () => {
//     setCurrentVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
//   };

//   const nextVideo = () => {
//     setCurrentVideoIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
//   };

//   const handleBlogUpdate = async () => {
//     const token = Cookies.get("accessToken");
//     if (!token) {
//       toast.error("You are not logged in. Please log in.", {
//         position: "top-right",
//       });
//       navigate("/login");
//       return;
//     }

//     setBlogLoading(true);
//     try {
//         const formData = new FormData();
//         formData.append("title", JSON.stringify(title));
//     formData.append("article", JSON.stringify(article));
//     formData.append("therapyServiceId", therapyServiceId);
//     images.forEach((img) => formData.append("image", img));
//     videos.forEach((vid) => formData.append("video", vid));
//     console.log("formdata " , images)
//    const response = await fetch(
//         `https://physiotherapy-1.onrender.com/apis/imageVideoInTherapyServices/updateImageVideoArticleInTherapyService/${singleService?._id}`,
//         {
//           method: "PATCH",
//           headers: {

//             Authorization: `Bearer ${token}`,
//           },

//           body: formData,
//         }
//       );

//     } catch (err) {
//       toast.error(err.message || "Something went wrong. Please try again.", {
//         position: "top-right",
//       });
//     } finally {
//       setBlogLoading(false);

//     }
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };
//   const handleVideoChange = (e) => {
//     setVideos([...e.target.files]);
//   };

//   return (
//     <div className="bg-gray-100 ">
//       <div className="bg-white rounded-xl shadow-md p-6 max-w-8xl mx-auto w-full">
//         <div className="flex items-start justify-between">
//           <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center md:text-left underline underline-offset-8">
//             Services Details
//           </h1>
//           <div className="flex items-center">
//             {editMode && (
//               <button
//                 className="border py-1 px-3 mr-2 rounded font-medium text-white bg-blue-700"
//                 onClick={() =>
//                   handleUpdateChange(singleService?.therapyServiceId?._id)
//                 }
//               >
//                 {updateAvailableLoading ? (
//                   <ThreeDots
//                     visible={true}
//                     height="30"
//                     width="40"
//                     color="#4fa94d"
//                     radius="9"
//                     ariaLabel="three-dots-loading"
//                     wrapperStyle={{}}
//                     wrapperClass=""
//                   />
//                 ) : (
//                   "save"
//                 )}
//               </button>
//             )}

//             <button onClick={() => setEditMode((pre) => !pre)}>
//               {editMode ? (
//                 <button
//                   className="border py-1 px-3 mr-2 rounded font-medium text-white bg-red-700" onClick={()=>setEditMode((pre)=>!pre)}
//                   // onClick={handleUpdateChange}
//                 >
//                   Cancel
//                 </button>
//               ) : (
//                 <BiSolidEditAlt className="text-2xl font-medium text-blue-800 mr-3" />
//               )}{" "}
//             </button>
//             <button
//               className="text-2xl font-medium text-red-800"
//               onClick={handleDeleteService}
//             >
//               {!editMode && <MdDelete />}{" "}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4  ">
//           <div>
//             <h1 className="text-xl font-medium text-gray-800 mb-1">
//               Service Name
//             </h1>
//             <h1>{singleService?.therapyServiceId?.serviceId?.serviceName}</h1>
//           </div>

//           <div>
//             <h1 className="text-xl font-medium text-gray-800 mb-1">
//               {" "}
//               Service Description
//             </h1>
//             <h1>{singleService?.therapyServiceId?.serviceId?.description}</h1>
//           </div>

//           <div>
//             <h1 className="text-xl font-medium text-gray-800 mb-1">
//               {" "}
//               Service Feature
//             </h1>
//             <h1 className="flex gap-2 flex-wrap">
//               {singleService?.therapyServiceId?.serviceId?.features.map((f) => (
//                 <ul>
//                   <li>{f},</li>
//                 </ul>
//               ))}
//             </h1>
//           </div>
//           <div>
//             <h1 className="text-xl font-medium text-gray-800 mb-1">
//               {" "}
//               Service Created At
//             </h1>
//             <h1>
//               {new Date(singleService?.createdAt)
//                 .toLocaleDateString("en-US")
//                 .replace(/\//g, "-")}
//             </h1>
//           </div>

//           <div>
//             {editMode ? (
//               <>
//                 <h1 className="text-xl font-medium text-gray-800 mb-1">
//                   {" "}
//                   Service city
//                 </h1>
//                 <input
//                   className="border p-2 rounded"
//                   type="text"
//                   name="city"
//                   value={cityInput} // ✅ this should be a plain string
//                   onChange={(e) => setCityInput(e.target.value)}
//                 />
//               </>
//             ) : (
//               <>
//                 <h1 className="text-xl font-medium text-gray-800 mb-1">
//                   {" "}
//                   Service City
//                 </h1>
//                 <h1>{singleService?.therapyServiceId?.city} </h1>
//               </>
//             )}
//           </div>
//           <div>
//             <>
//               <h1 className="text-xl font-medium text-gray-800 mb-1">
//                 {" "}
//                 Service Price
//               </h1>
//               <h1> {singleService?.therapyServiceId?.price} </h1>
//             </>
//           </div>

//           <div className="md:col-span-2">
//             <div className="flex items-center justify-between mb-2">
//               <label className="block mb-1 text-xl font-medium text-gray-800 ">
//                 Available Slots
//               </label>
//             </div>

//             {editMode ? (
//               <>
//                 <div className="bg-gray-100 p-4 rounded-lg border space-y-4">
//                   {timeRanges.map((range) => (
//                     <div key={range}>
//                       <div className="flex items-center space-x-3 mb-2">
//                         <span className="capitalize font-medium">{range}:</span>
//                         <button
//                           onClick={() =>
//                             setShowInputs((prev) => ({
//                               ...prev,
//                               [range]: true,
//                             }))
//                           }
//                           className="text-blue-600 hover:underline text-sm"
//                         >
//                           + Add
//                         </button>
//                         {showInputs[range] && (
//                           <>
//                             <input
//                               type="time"
//                               value={newTimes[range] || ""}
//                               onChange={(e) =>
//                                 setNewTimes({
//                                   ...newTimes,
//                                   [range]: e.target.value,
//                                 })
//                               }
//                               className="border px-2 py-1 rounded text-sm"
//                             />
//                             <button
//                               onClick={() => handleAdd(range)}
//                               className="text-green-600 text-sm"
//                             >
//                               {updateAvailableLoading ? (
//                                 <ThreeDots
//                                   visible={true}
//                                   height="80"
//                                   width="80"
//                                   color="#fffff"
//                                   radius="9"
//                                   ariaLabel="three-dots-loading"
//                                   wrapperStyle={{}}
//                                   wrapperClass=""
//                                 />
//                               ) : (
//                                 "save"
//                               )}
//                             </button>
//                           </>
//                         )}
//                       </div>

//                       {slots[range].length > 0 && (
//                         <ul className="ml-6 space-y-1 text-sm">
//                           {slots[range].map((time, idx) => (
//                             <li
//                               key={idx}
//                               className="flex items-center space-x-2"
//                             >
//                               <span>{time}</span>
//                               <button
//                                 onClick={() => handleRemove(range, idx)}
//                                 className="text-red-500"
//                               >
//                                 ✖
//                               </button>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg border">
//                   {["morning", "afternoon", "evening", "night"].map(
//                     (timeKey) => (
//                       <div key={timeKey}>
//                         <h3 className="font-medium mb-2 capitalize">
//                           {timeKey}
//                         </h3>
//                         <ul className="list-disc pl-4 text-sm">
//                           {singleService?.therapyServiceId?.availableSlots?.[
//                             timeKey
//                           ]?.map((time, idx) => (
//                             <li key={`${timeKey}-${idx}`}>{time}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="flex items-center justify-between col-span-2 mt-2 mb-2 ">
//             <h1 className="text-2xl font-semibold">Your Blog</h1>
//             <button onClick={handleBlogUpdate}>save</button>
//             <button
//               className="text-2xl font-semibold"
//               onClick={() => setBlogEdit((pre) => !pre)}
//             >
//               <MdEdit />
//             </button>
//           </div>
//           <div className="col-span-2">
//             {blogEdit ? (
//               <>
//                 <label className="block font-semibold">Title</label>
//                 <input
//                   name="title"
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle([e.target.value])}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />{" "}
//                 <div>
//                   <label className="block font-semibold">Article</label>
//                   <textarea
//                     name="article"
//                     rows="5"
//                     value={article}
//                     onChange={(e) => setArticle([e.target.value])}
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h2 className="text-xl font-medium text-gray-800 mb-4 capitalize  ">
//                   {singleService?.title?.[0]}
//                 </h2>
//                 <p>{singleService?.article?.[0]}</p>
//               </>
//             )}
//           </div>

//           {blogEdit ? (
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-semibold">Images (multiple)</label>
//                 <input
//                   name="images"
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageChange}
//                 />
//               </div>
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-xl font-medium text-gray-800 mb-4">
//                 Service Images
//               </h2>
//               {images.length > 0 ? (
//                 <div className="relative w-full max-w-md">
//                   <img
//                     src={images[currentImageIndex]}
//                     alt={`Service image ${currentImageIndex + 1}`}
//                     className="w-full h-64 object-cover rounded-lg shadow-md"
//                   />

//                   <div className="text-center text-sm text-gray-600 mt-2">
//                     Image {currentImageIndex + 1} of {images.length}
//                   </div>
//                   <div className="flex justify-between gap-4">
//                     <button
//                       onClick={prevImage}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
//                     >
//                       ◀ Prev
//                     </button>
//                     <button
//                       onClick={nextImage}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
//                     >
//                       Next ▶
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 italic">No image found</p>
//               )}
//             </div>
//           )}

//           {/* <div>
//             <h2 className="text-xl font-medium text-gray-800 mb-4">
//               Service Images
//             </h2>
//             {images.length > 0 ? (
//               <div className="relative w-full max-w-md ">
//                 <img
//                   src={images[currentImageIndex]}
//                   alt={`Service image ${currentImageIndex + 1}`}
//                   className="w-full h-64 object-cover rounded-lg shadow-md"
//                 />

//                 <div className="text-center text-sm text-gray-600 mt-2">
//                   Image {currentImageIndex + 1} of {images.length}
//                 </div>
//                 <div className="flex justify-between gap-4 ">
//                   <button
//                     onClick={prevImage}
//                     className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
//                   >
//                     ◀ Prev
//                   </button>
//                   <button
//                     onClick={nextImage}
//                     className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
//                   >
//                     Next ▶
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-500 italic">No image found</p>
//             )}
//           </div> */}

//           {/* video */}
//           {/* <div>
//             <h2 className="text-xl font-medium text-gray-800 mb-4">
//               Service Video
//             </h2>
//             {videos.length > 0 ? (
//               <div className="relative w-full max-w-md">
//                 <video
//                   src={videos[currentVideoIndex]}
//                   controls
//                   className="w-full rounded-lg shadow-md"
//                 />
//                 <div className="text-center text-sm text-gray-600 mt-2">
//                   Video {currentVideoIndex + 1} of {videos.length}
//                 </div>
//                 <div className="flex justify-between gap-4 ">
//                   <button
//                     onClick={prevVideo}
//                     className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
//                   >
//                     ◀ Prev
//                   </button>
//                   <button
//                     onClick={nextVideo}
//                     className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
//                   >
//                     Next ▶
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-500 italic">No video found</p>
//             )}
//           </div> */}

//           {blogEdit ? (
//             <div>
//               <label className="block font-semibold">Videos (multiple)</label>
//               <input
//                 name="videos"
//                 type="file"
//                 accept="video/*"
//                 multiple
//                 onChange={handleVideoChange}
//               />
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-xl font-medium text-gray-800 mb-4">
//                 Service Video
//               </h2>
//               {videos.length > 0 ? (
//                 <div className="relative w-full max-w-md">
//                   <video
//                     src={videos[currentVideoIndex]}
//                     controls
//                     className="w-full rounded-lg shadow-md"
//                   />
//                   <div className="text-center text-sm text-gray-600 mt-2">
//                     Video {currentVideoIndex + 1} of {videos.length}
//                   </div>
//                   <div className="flex justify-between gap-4 ">
//                     <button
//                       onClick={prevVideo}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
//                     >
//                       ◀ Prev
//                     </button>
//                     <button
//                       onClick={nextVideo}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
//                     >
//                       Next ▶
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 italic">No video found</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ServiceDetailPage;
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { ThreeDots } from "react-loader-spinner";
import { MdEdit } from "react-icons/md";
import { faL } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";

function ServiceDetailPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singleService, setSingleService] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // const [cityInput, setCityInput] = useState("");
  // const [showSuggestions, setShowSuggestions] = useState(false);
  // const [citySuggestions, setCitySuggestions] = useState([]);
  // const [suggestionLoading, setSuggestionLoading] = useState(false);
  // const [locationSuggestions, setLocationSuggestions] = useState([]);
  // const [isCitySelected, setIsCitySelected] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [city, setCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    city: "",
    state: "",
  });
  const [stateName, setStateName] = useState("");
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  const [country, setCountry] = useState("");
  const [locality, setLocality] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const [slots, setSlots] = useState({
    morning: [],
    afternoon: [],
    evening: [],
    night: [],
  });
  const [newTimes, setNewTimes] = useState({});
  const [showInputs, setShowInputs] = useState({});

  const [updateAvailableLoading, setUpdateAvailableLoading] = useState(false);

  const [blogLoading, setBlogLoading] = useState(false);
  const [blogEdit, setBlogEdit] = useState(false);
  const [title, setTitle] = useState([]);
  const [article, setArticle] = useState([]);
  const [image, setImages] = useState([]);
  const [newimage, setNewImage] = useState([]);

  const [video, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState([]);
  const [therapyServiceId, setTherapyServiceId] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const { serviceId } = useParams();

  const navigate = useNavigate();

  const handleDeleteService = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
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
        `https://physiotherapy-1.onrender.com/apis/therapy-services/deleteServiceTherapy/${singleService?._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Service deleted successfully!");
        navigate("/therapy/alltherapy");
      } else {
        toast.error(data.message || "Failed to delete the service.");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.");
      console.error("Delete Error:", error);
    }
  };

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
        `https://physiotherapy-1.onrender.com/apis/imageVideoInTherapyServices/getSingleImageVideoArticleById/${serviceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("singalseviceData", data.data);
      if (data.success) {
        setSingleService(data.data);

        if (data.data.availableSlots) {
          setSlots(data.data.availableSlots);
        }
        setTitle(data?.data?.title?.[0]);
        setArticle(data?.data?.article?.[0]);
        setImages(data?.data?.image);
        setVideos(data?.data?.video);
      } else {
        setSingleService([]);
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
        });
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
    fetchServiceData();
  }, [serviceId]);

  const isTimeInRange = (time, range) => {
    const ranges = {
      morning: ["05:00", "11:59"],
      afternoon: ["12:00", "16:59"],
      evening: ["17:00", "19:59"],
      night: ["20:00", "23:59"],
    };

    const [hour, minute] = time.split(":").map(Number);
    const totalMinutes = hour * 60 + minute;

    const [start, end] = ranges[range];
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
  };

  const handleAdd = (range) => {
    console.log("yes working");
    const newTime = newTimes[range];
    if (!newTime) {
      toast.error("please Enter time", { position: "top-right" });
      return;
    }
    if (!isTimeInRange(newTime, range)) {
      alert(`Please enter a valid time for ${range}`);
      return;
    }

    const formatted = formatTo12Hour(newTime);

    setSlots((prev) => ({
      ...prev,
      [range]: [...prev[range], formatted],
    }));

    setNewTimes({ ...newTimes, [range]: "" });
    setShowInputs({ ...showInputs, [range]: false });
  };

  const handleRemove = (range, index) => {
    setSlots((prev) => ({
      ...prev,
      [range]: prev[range].filter((_, i) => i !== index),
    }));
  };
  const timeRanges = ["morning", "afternoon", "evening", "night"];

  const formatTo12Hour = (time) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hr12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hr12.toString().padStart(2, "0")}:${m} ${ampm}`;
  };
  // const fetchLocationSuggestions = async (query) => {
  //   if (!query) {
  //     setLocationSuggestions([]);
  //     return;
  //   }
  //   try {
  //     const res = await fetch(
  //       `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`
  //     );
  //     const data = await res.json();
  //     setLocationSuggestions(data);
  //   } catch (error) {
  //     console.error("Error fetching location suggestions:", error);
  //   }
  // };

  // const debouncedFetchLocationSuggestions = useCallback(
  //   debounce((value) => {
  //     fetchLocationSuggestions(value);
  //   }, 1000),
  //   []
  // );

  const fetchLocationSuggestions = async (query) => {
    if (!query) return;

    setSuggestionLoading(true);
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&limit=50&type=city&apiKey=952464191bde4c50ae19e0f18da461b4`
      );

      const data = await res.json();
      const cityResults = data.features.map((item) => {
        const props = item.properties;
        return {
          display_name: props.formatted,
          city: props.city || props.name || "",
          state: props.state || props.county || props.region || "", // fallback
        };
      });

      setLocationSuggestions(cityResults);
    } catch (error) {
      console.error("Geoapify error:", error);
      setLocationSuggestions([]);
    } finally {
      setSuggestionLoading(false);
    }
  };

  const fetchStateSuggestions = async (query) => {
    if (!query) return;

    setSuggestionLoading(true);
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&limit=50&type=state&apiKey=952464191bde4c50ae19e0f18da461b4`
      );
      const data = await res.json();
      const stateResults = data.features.map((item) => {
        const props = item.properties;
        return {
          name: props.state || props.county || props.region || props.name || "",
        };
      });
      setStateSuggestions(stateResults);
    } catch (error) {
      console.error("Geoapify state fetch error:", error);
      setStateSuggestions([]);
    } finally {
      setSuggestionLoading(false);
    }
  };

  const debouncedFetchLocationSuggestions = useCallback(
    debounce((value) => {
      fetchLocationSuggestions(value);
    }, 500),
    []
  );

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setShowSuggestions(true);
    setIsCitySelected(false); // user is typing, not selecting
    debouncedFetchLocationSuggestions(value);
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setStateName(value);
    setShowStateSuggestions(true);
    fetchStateSuggestions(value);
  };

  useEffect(() => {
    return () => {
      debouncedFetchLocationSuggestions.cancel();
    };
  }, [debouncedFetchLocationSuggestions]);

  const handleCitySelect = (location) => {
    setCity(location.display_name);
    setSelectedLocation({
      city: location.city || location.name || "",
      state: location.state || location.county || location.region || "",
    });
    setIsCitySelected(true);
    setShowSuggestions(false);
  };

  const handleStateSelect = (state) => {
    setStateName(state.name || "");
    setShowStateSuggestions(false);
  };

  // const handleCityChange = (e) => {
  //   const value = e.target.value;
  //   setCityInput(value);
  //   setShowSuggestions(true);
  //   setIsCitySelected(false); // user is typing, not selecting
  //   debouncedFetchLocationSuggestions(value);
  // };

  // const handleCitySelect = (cityName) => {
  //   setCityInput(cityName);
  //   setIsCitySelected(true); // user selected from dropdown
  //   setShowSuggestions(false);
  // };

  const handleUpdateChange = async (id) => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }

    // if (cityInput === "") {
    //   toast.error("You cannot save empty city", {
    //     position: "top-right",
    //   });
    //   return;
    // }

    if (!isCitySelected) {
      toast.error("Please select a city from the dropdown.", {
        position: "top-right",
      });
      return;
    }
    setUpdateAvailableLoading(true);
    try {
      const response = await fetch(
        `https://physiotherapy-1.onrender.com/apis/therapy-services/updateServiceTherapy/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            availableSlots: slots,
            city: city,
            state: stateName,
            country: country,
            locality: locality,
            fullAddress: fullAddress,
          }),
        }
      );
      const data = await response.json();
      console.log("senddata ", data);
      if (data.success) {
        fetchServiceData();
        toast.success("Succesfully update Available your Details");
      }
      console.log("updated", data);
    } catch (err) {
      console.log(err);
      toast.error(err.message || "something want wrong please try again");
    } finally {
      setEditMode(false);
      setUpdateAvailableLoading(false);
    }
  };

  const images = singleService?.image || [];
  const videos = singleService?.video || [];

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const handleBlogUpdate = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }

    setBlogLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", JSON.stringify(title));
      formData.append("article", JSON.stringify(article));
      formData.append("therapyServiceId", serviceId);
      // formData.append("therapyServiceId", therapyServiceId);
      if (newimage.length > 0) {
        newimage.forEach((img) => formData.append("image", img));
      } else {
        images.forEach((img) => formData.append("image", img));
      }
      if (newVideo.length > 0) {
        newVideo.forEach((vid) => formData.append("video", vid));
      } else {
        videos.forEach((vid) => formData.append("video", vid));
      }

      const response = await fetch(
        `https://physiotherapy-1.onrender.com/apis/imageVideoInTherapyServices/updateImageVideoArticleInTherapyService/${serviceId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );
      const data = await response.json();
      console.log("update", data);
      if (data.success) {
        setTitle([]);
        setArticle([]);
        setNewImage([]);
        setNewVideo([]);
        fetchServiceData();
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.", {
        position: "top-right",
      });
    } finally {
      setBlogLoading(false);
      setBlogEdit(false);
      fetchServiceData();
    }
  };

  const handleImageChange = (e) => {
    setNewImage([...e.target.files]);
  };
  const handleVideoChange = (e) => {
    setNewVideo([...e.target.files]);
  };

  return (
    <div className="bg-gray-100 ">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-8xl mx-auto w-full">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center md:text-left underline underline-offset-8">
            Services Details
          </h1>
          <div className="flex items-center">
            {editMode && (
              <button
                className="border py-1 px-3 mr-2 rounded font-medium text-white bg-blue-700"
                onClick={() =>
                  handleUpdateChange(singleService?.therapyServiceId?._id)
                }
              >
                {updateAvailableLoading ? (
                  <ThreeDots
                    visible={true}
                    height="30"
                    width="40"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "save"
                )}
              </button>
            )}

            <button onClick={() => setEditMode((pre) => !pre)}>
              {editMode ? (
                <button
                  className="border py-1 px-3 mr-2 rounded font-medium text-white bg-red-700"

                  // onClick={handleUpdateChange}
                >
                  Cancel
                </button>
              ) : (
                <BiSolidEditAlt className="text-2xl font-medium text-blue-800 mr-3" />
              )}{" "}
            </button>
            {/* <button
              className="text-2xl font-medium text-red-800"
              onClick={handleDeleteService}
            >
              {!editMode && <MdDelete />}{" "}
            </button> */}
          </div>
        </div>

        <div className="sm:grid  sm:grid-cols-2 gap-4">
          <div>
            <h1 className="text-xl font-medium text-gray-800 mb-1">
              Service Name
            </h1>
            <h1>{singleService?.therapyServiceId?.serviceId?.serviceName}</h1>
          </div>

          <div>
            <h1 className="text-xl font-medium text-gray-800 mb-1">
              {" "}
              Service Description
            </h1>
            <h1>{singleService?.therapyServiceId?.serviceId?.description}</h1>
          </div>

          <div>
            <h1 className="text-xl font-medium text-gray-800 mb-1">
              {" "}
              Service Feature
            </h1>
            <h1 className="flex gap-2 flex-wrap">
              {singleService?.therapyServiceId?.serviceId?.features.map((f) => (
                <ul>
                  <li>{f},</li>
                </ul>
              ))}
            </h1>
          </div>
          <div>
            <h1 className="text-xl font-medium text-gray-800 mb-1">
              {" "}
              Service Created At
            </h1>
            <h1>
              {new Date(singleService?.createdAt)
                .toLocaleDateString("en-US")
                .replace(/\//g, "-")}
            </h1>
          </div>
          <div>
            {editMode ? (
              <>
                <div className="w-full">
                  <label className="block font-semibold mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g., India"
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <h1 className="text-xl font-medium text-gray-800 mb-1">
                  {" "}
                  Service Country
                </h1>
                <h1>{singleService?.therapyServiceId?.country} </h1>
              </>
            )}
          </div>

          <div>
            {editMode ? (
              <>
                <div className="w-full relative">
                  <label className="block font-semibold mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={stateName}
                    onChange={handleStateChange}
                    placeholder="e.g., Delhi, Maharashtra"
                    className="w-full border rounded-lg p-2"
                    required
                  />
                  {showStateSuggestions && stateSuggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto shadow-lg">
                      {stateSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                          onClick={() => handleStateSelect(suggestion)}
                        >
                          {suggestion.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <h1 className="text-xl font-medium text-gray-800 mb-1">
                  {" "}
                  Service State
                </h1>
                <h1>{singleService?.therapyServiceId?.state} </h1>
              </>
            )}
          </div>

          <div>
            {editMode ? (
              <>
                <div className="w-full relative">
                  <label className="block font-semibold mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="e.g., Delhi, Noida, Mumbai"
                    className="w-full border rounded-lg p-2"
                    required
                  />
                  {showSuggestions && locationSuggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto shadow-lg">
                      {locationSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                          onClick={() => handleCitySelect(suggestion)}
                        >
                          {suggestion.name || suggestion.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <h1 className="text-xl font-medium text-gray-800 mb-1">
                  {" "}
                  Service City
                </h1>
                <h1>{singleService?.therapyServiceId?.city} </h1>
              </>
            )}
          </div>

          <div>
            {editMode ? (
              <>
                <div className="w-full">
                  <label className="block font-semibold mb-1">Locality</label>
                  <input
                    type="text"
                    name="locality"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="e.g., Janakpuri"
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <h1 className="text-xl font-medium text-gray-800 mb-1">
                  {" "}
                  Service Locality
                </h1>
                <h1>{singleService?.therapyServiceId?.locality} </h1>
              </>
            )}
          </div>

          <div>
            {editMode ? (
              <>
                <div className="w-full">
                  <label className="block font-semibold mb-1">
                    Full Address
                  </label>
                  <input
                    type="text"
                    name="fullAddress"
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    placeholder="e.g., B-12, Janakpuri, New Delhi"
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <h1 className="text-xl font-medium text-gray-800 mb-1">
                  {" "}
                  full Address
                </h1>
                <h1>{singleService?.therapyServiceId?.fullAddress} </h1>
              </>
            )}
          </div>

          <div>
            <>
              <h1 className="text-xl font-medium text-gray-800 mb-1">
                {" "}
                Service Price
              </h1>
              <h1> {singleService?.therapyServiceId?.price} </h1>
            </>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block mb-1 text-xl font-medium text-gray-800 ">
                Available Slots
              </label>
            </div>

            {editMode ? (
              <>
                <div className="bg-gray-100 p-4 rounded-lg border space-y-4">
                  {timeRanges.map((range) => (
                    <div key={range}>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="capitalize font-medium">{range}:</span>
                        <button
                          onClick={() =>
                            setShowInputs((prev) => ({
                              ...prev,
                              [range]: true,
                            }))
                          }
                          className="text-blue-600 hover:underline text-sm"
                        >
                          + Add
                        </button>
                        {showInputs[range] && (
                          <>
                            <input
                              type="time"
                              value={newTimes[range] || ""}
                              onChange={(e) =>
                                setNewTimes({
                                  ...newTimes,
                                  [range]: e.target.value,
                                })
                              }
                              className="border px-2 py-1 rounded text-sm"
                            />
                            <button
                              onClick={() => handleAdd(range)}
                              className="text-green-600 text-sm"
                            >
                              {updateAvailableLoading ? (
                                <ThreeDots
                                  visible={true}
                                  height="80"
                                  width="80"
                                  color="#fffff"
                                  radius="9"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  wrapperClass=""
                                />
                              ) : (
                                "save"
                              )}
                            </button>
                          </>
                        )}
                      </div>

                      {slots[range].length > 0 && (
                        <ul className="ml-6 space-y-1 text-sm">
                          {slots[range].map((time, idx) => (
                            <li
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              <span>{time}</span>
                              <button
                                onClick={() => handleRemove(range, idx)}
                                className="text-red-500"
                              >
                                ✖
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg border">
                  {["morning", "afternoon", "evening", "night"].map(
                    (timeKey) => (
                      <div key={timeKey}>
                        <h3 className="font-medium mb-2 capitalize">
                          {timeKey}
                        </h3>
                        <ul className="list-disc pl-4 text-sm">
                          {singleService?.therapyServiceId?.availableSlots?.[
                            timeKey
                          ]?.map((time, idx) => (
                            <li key={`${timeKey}-${idx}`}>{time}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between col-span-2 mt-2 mb-2 ">
            <h1 className="text-2xl font-semibold">Your Blog</h1>
            <div className="flex justify-end items-center gap-4">
              {blogEdit && (
                <button
                  onClick={handleBlogUpdate}
                  className="py-1 px-4 bg-blue-800 font-semibold text-xl rounded text-white"
                >
                  {blogLoading ? (
                    <ThreeDots
                      visible={true}
                      height="30"
                      width="40"
                      color="#4fa94d"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              )}
              {blogEdit ? (
                <button
                  className="py-1 px-4 bg-red-800 font-semibold text-xl rounded text-white"
                  onClick={() => setBlogEdit((pre) => !pre)}
                >
                  Cancel
                </button>
              ) : (
                <button onClick={() => setBlogEdit((pre) => !pre)}>
                  <BiSolidEditAlt className="text-2xl font-medium text-blue-800 mr-3" />
                </button>
              )}
            </div>
          </div>
          <div className="col-span-2">
            {blogEdit ? (
              <>
                <label className="block font-semibold">Title</label>
                <input
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle([e.target.value])}
                  className="w-full p-2 border border-gray-300 rounded"
                />{" "}
                <div>
                  <label className="block font-semibold">Article</label>
                  <textarea
                    name="article"
                    rows="5"
                    value={article}
                    onChange={(e) => setArticle([e.target.value])}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-medium text-gray-800 mb-2 capitalize  ">
                  {singleService?.title?.[0]}
                </h2>
                <p>{singleService?.article?.[0]}</p>
              </>
            )}
          </div>

          {blogEdit ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold">Images (multiple)</label>
                <input
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">
                Service Images
              </h2>
              {images.length > 0 ? (
                <div className="relative w-full max-w-md">
                  <img
                    src={images[currentImageIndex]}
                    alt={`Service image ${currentImageIndex + 1}`}
                    className="w-full object-cover h-48 rounded-lg shadow-md"
                  />

                  <div className="text-center text-sm text-gray-600 mt-2">
                    Image {currentImageIndex + 1} of {images.length}
                  </div>
                  <div className="flex justify-between gap-4">
                    <button
                      onClick={prevImage}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
                    >
                      ◀ Prev
                    </button>
                    <button
                      onClick={nextImage}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
                    >
                      Next ▶
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">No image found</p>
              )}
            </div>
          )}

          {/* <div>
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Service Images
            </h2>
            {images.length > 0 ? (
              <div className="relative w-full max-w-md ">
                <img
                  src={images[currentImageIndex]}
                  alt={`Service image ${currentImageIndex + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />

                <div className="text-center text-sm text-gray-600 mt-2">
                  Image {currentImageIndex + 1} of {images.length}
                </div>
                <div className="flex justify-between gap-4 ">
                  <button
                    onClick={prevImage}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
                  >
                    ◀ Prev
                  </button>
                  <button
                    onClick={nextImage}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
                  >
                    Next ▶
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No image found</p>
            )}
          </div> */}

          {/* video */}
          {/* <div>
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Service Video
            </h2>
            {videos.length > 0 ? (
              <div className="relative w-full max-w-md">
                <video
                  src={videos[currentVideoIndex]}
                  controls
                  className="w-full rounded-lg shadow-md"
                />
                <div className="text-center text-sm text-gray-600 mt-2">
                  Video {currentVideoIndex + 1} of {videos.length}
                </div>
                <div className="flex justify-between gap-4 ">
                  <button
                    onClick={prevVideo}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
                  >
                    ◀ Prev
                  </button>
                  <button
                    onClick={nextVideo}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
                  >
                    Next ▶
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No video found</p>
            )}
          </div> */}

          {blogEdit ? (
            <div>
              <label className="block font-semibold">Videos (multiple)</label>
              <input
                name="videos"
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoChange}
              />
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">
                Service Video
              </h2>
              {videos.length > 0 ? (
                <div className="relative w-full max-w-md">
                  <video
                    src={videos[currentVideoIndex]}
                    controls
                    className="w-full object-cover h-48 rounded-lg shadow-md"
                  />
                  <div className="text-center text-sm text-gray-600 mt-2">
                    Video {currentVideoIndex + 1} of {videos.length}
                  </div>
                  <div className="flex justify-between gap-4 ">
                    <button
                      onClick={prevVideo}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
                    >
                      ◀ Prev
                    </button>
                    <button
                      onClick={nextVideo}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-4 rounded"
                    >
                      Next ▶
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">No video found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailPage;
