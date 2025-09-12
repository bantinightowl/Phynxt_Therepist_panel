// import React, { useState } from 'react';
// import Header from '../../../Header/Header';
// import Sidebar from '../../../Sidebar/Sidebar';
// import Pagination from '../../../Pagination/Pagination';
// import { useAppContext } from '../../../context/AppContext';

// const Appointment = () => {
//   // const [appointments, setAppointments] = useState([
//   //   { appointment_id: 'APT001', patient_name: 'John Doe', phone_no: '9876543210', email: 'john@example.com', service_type: 'Physiotherapy', service_description: 'Back pain relief session', booking_date: '2025-04-25', appointment_date: '2025-04-30', slot_time: '10:00 AM - 11:00 AM', status: 'Pending', location: 'Clinic', price: '₹1200' },
//   //   { appointment_id: 'APT002', patient_name: 'Jane Smith', phone_no: '9876543211', email: 'jane@example.com', service_type: 'Massage Therapy', service_description: 'Full body relaxing massage', booking_date: '2025-04-26', appointment_date: '2025-05-01', slot_time: '2:00 PM - 3:00 PM', status: 'Pending', location: 'Home Visit', price: '₹1500' },
//   //   // ... Add service_description for remaining entries
//   // ]);

//   const {data, setData} = useAppContext();

//   const [openDropdownId, setOpenDropdownId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [modalContent, setModalContent] = useState(null);
//   const [modalType, setModalType] = useState('');

//   const appointmentsPerPage = 8;

//   const handleStatusChange = (id, newStatus) => {
//     const updatedAppointments = data.map(appt =>
//       appt.appointment_id === id ? { ...appt, appointment_status: newStatus } : appt
//     );
//     setData(updatedAppointments);
//     setOpenDropdownId(null);
//   };

//   const toggleDropdown = (id) => {
//     setOpenDropdownId(openDropdownId === id ? null : id);
//   };

//   const openModal = (type, data) => {
//     setModalType(type);
//     setModalContent(data);
//   };

//   const closeModal = () => {
//     setModalContent(null);
//     setModalType('');
//   };

//   const totalPages = Math.ceil(data.length / appointmentsPerPage);
//   const indexOfLastAppointment = currentPage * appointmentsPerPage;
//   const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
//   const currentAppointments = data.slice(indexOfFirstAppointment, indexOfLastAppointment);

//   return (
//     <div className="appointment-wrapper flex flex-col lg:flex-row min-h-screen bg-gray-100">
//       <div className="hidden lg:block lg:w-64">
//         <Sidebar activePage="/appointments" />
//       </div>
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header title="Appointments" />
//         <main className="appointment-content flex-1 p-4 sm:p-6">
//           <h1 className="text-xl sm:text-2xl font-semibold mb-4">Appointments</h1>
//           <div className="min-w-full bg-white rounded-lg shadow-md">
//             <table className="min-w-full table-auto">
//               <thead className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
//                 <tr>
//                   <th className="px-4 py-2">Serial No</th>
//                   <th className="px-4 py-2">Patient Name</th>
//                   <th className="px-4 py-2">Patient Details</th>
//                   <th className="px-4 py-2">Service Details</th>
//                   <th className="px-4 py-2">Booking Date</th>
//                   <th className="px-4 py-2">Appointment Date</th>
//                   <th className="px-4 py-2">Slot Time</th>
//                   <th className="px-4 py-2">Status</th>
//                   <th className="px-4 py-2">Location</th>
//                   <th className="px-4 py-2">Price</th>
//                   <th className="px-4 py-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700 text-sm sm:text-base">
//                 {currentAppointments.map((appt, index) => (
//                   <tr key={appt.appointment_id} className="even:bg-gray-100">
//                     <td className="border px-4 py-2">{indexOfFirstAppointment + index + 1}</td>
//                     <td className="border px-4 py-2">{appt.patient_name}</td>
//                     <td className="border px-4 py-2">
//                       <button
//                         className="text-blue-600 underline text-xs"
//                         onClick={() => openModal('patient', { phone: appt.phone_no, email: appt.email })}
//                       >
//                         View Details
//                       </button>
//                     </td>
//                     <td className="border px-4 py-2">
//                       <button
//                         className="text-blue-600 underline text-xs"
//                         onClick={() => openModal('service', { type: appt.service_type, description: appt.service_description })}
//                       >
//                         View Details
//                       </button>
//                     </td>
//                     <td className="border px-4 py-2">{appt.booking_date}</td>
//                     <td className="border px-4 py-2">{appt.date}</td>
//                     <td className="border px-4 py-2">{appt.slot_time}</td>
//                     <td className="border px-4 py-2">
//                       <span
//                         className={`px-2 py-1 rounded-full text-white text-xs sm:text-sm ${
//                           appt.appointment_status === 'Confirmed'
//                             ? 'bg-green-500'
//                             : appt.appointment_status === 'Pending'
//                             ? 'bg-yellow-400'
//                             : appt.appointment_status === 'Rejected'
//                             ? 'bg-red-500'
//                             : 'bg-gray-400'
//                         }`}
//                       >
//                         {appt.appointment_status}
//                       </span>
//                     </td>
//                     <td className="border px-4 py-2">{appt.location}</td>
//                     <td className="border px-4 py-2">{appt.price}</td>
//                     <td className="border px-4 py-2 relative">
//                       {appt.appointment_status === 'Pending' ? (
//                         <div className="relative inline-block text-left">
//                           <button
//                             onClick={() => toggleDropdown(appt.appointment_id)}
//                             className="text-blue-500 hover:underline text-xs"
//                           >
//                             View Action
//                           </button>
//                           {openDropdownId === appt.appointment_id && (
//                             <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
//                               <div className="py-1">
//                                 <button
//                                   onClick={() => handleStatusChange(appt.appointment_id, 'Confirmed')}
//                                   className="block px-4 py-2 text-sm text-green-600 hover:bg-green-100 w-full text-left"
//                                 >
//                                   Approve
//                                 </button>
//                                 <button
//                                   onClick={() => handleStatusChange(appt.appointment_id, 'Rejected')}
//                                   className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left"
//                                 >
//                                   Reject
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       ) : (
//                         <span className="text-gray-500 text-xs">No Action</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//           </div>
//         </main>
//       </div>

//       {/* Modal */}
//       {modalContent && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg w-[300px]">
//             <h2 className="text-lg font-semibold mb-4">
//               {modalType === 'patient' ? 'Patient Details' : 'Service Details'}
//             </h2>
//             {modalType === 'patient' ? (
//               <>
//                 <p><strong>Phone:</strong> {modalContent.phone}</p>
//                 <p><strong>Email:</strong> {modalContent.email}</p>
//               </>
//             ) : (
//               <>
//                 <p><strong>Type:</strong> {modalContent.type}</p>
//                 <p><strong>Description:</strong> {modalContent.description}</p>
//               </>
//             )}
//             <button
//               onClick={closeModal}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Appointment;

// hey start from here

// import React, { useEffect, useState } from "react";
// import Header from "../../../Header/Header";
// import Sidebar from "../../../Sidebar/Sidebar";
// import Pagination from "../../../Pagination/Pagination";
// import { useAppContext } from "../../../context/AppContext";
// import Cookies from "js-cookie";
// import { useFetcher, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { TailSpin, ThreeDots } from "react-loader-spinner";
// import { RxCross2 } from "react-icons/rx";
// import { FaRegEye } from "react-icons/fa";

// const Appointment = () => {
//   const { data, setData } = useAppContext();

//   const [openDropdownId, setOpenDropdownId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [modalContent, setModalContent] = useState(null);
//   const [modalType, setModalType] = useState(null);
//   const [loader, setLoading] = useState(false);

//   const [allApointment, setAllAppointment] = useState([]);
//   const [statusValue, setStatusValue] = useState("");
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedAppoId, setSelectedAppoId] = useState(null);
//   const [formModelType, setFormModelType] = useState(null);
//   const [appointmentId, setAppointmentId] = useState("");
//   const [approvedTime, setApprovedTime] = useState("");
//   const [approvedDate, setApprovedDate] = useState("");
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [btnLoading, setBtnLoading] = useState(false);

//   const fetchAppointmentData = async () => {
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
//         "https://physiotherapy-1.onrender.com/apis/book-appointment/getAllBookAppointment",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       console.log("allAppointmentData", data?.data);
//       if (data.success) {
//         setAllAppointment(data.data);
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
//     fetchAppointmentData();
//   }, []);

//   const stautsAllfetchAppointmentData = async ({ url }) => {
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
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       console.log("stautsAppointmentData", data.data);
//       if (data.success) {
//         setAllAppointment(data.data);
//       }
//     } catch (err) {
//       toast.error(err.message || "Something went wrong. Please try again.", {
//         position: "top-right",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusfetchAppointmentData = (e) => {
//     const selectedStatus = e.target.value;
//     console.log(e.target.value);
//     setStatusValue(selectedStatus);

//     if (selectedStatus === "all") {
//       fetchAppointmentData();
//     } else if (selectedStatus === "approved") {
//       stautsAllfetchAppointmentData({
//         url: "https://physiotherapy-1.onrender.com/apis/book-appointment/getApprovedAppointmentsForPhysiotherapist",
//       });
//     } else if (selectedStatus === "pending") {
//       stautsAllfetchAppointmentData({
//         url: "https://physiotherapy-1.onrender.com/apis/book-appointment/getPendingAppointmentsForPhysiotherapist",
//       });
//     } else if (selectedStatus === "rejected") {
//       stautsAllfetchAppointmentData({
//         url: "https://physiotherapy-1.onrender.com/apis/book-appointment/getRejectedAppointmentsForPhysiotherapist",
//       });
//     }
//   };

//   const searchService = async (query) => {
//     const token = Cookies.get("accessToken");
//     if (!token) return;
//     setStatusValue("");

//     try {
//       const res = await fetch(
//         `https://physiotherapy-1.onrender.com/apis/book-appointment/searchBookAppointments/${query}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await res.json();
//       console.log("serchDATA", data);
//       if (data.success) {
//         if (data.success) {
//           setAllAppointment(data.data);
//         }
//       } else {
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
//     const delayDebounce = setTimeout(() => {
//       if (searchQuery.trim() === "") {
//         fetchAppointmentData();
//       } else {
//         searchService(searchQuery);
//       }
//     }, 500); // debounce

//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery]);

//   const appointmentsPerPage = 8;

//   const handleStatusChange = (id, newStatus) => {
//     const updatedAppointments = data.map((appt) =>
//       appt.appointment_id === id
//         ? { ...appt, appointment_status: newStatus }
//         : appt
//     );
//     setData(updatedAppointments);
//     setOpenDropdownId(null);
//   };

//   const toggleDropdown = (id) => {
//     setOpenDropdownId(openDropdownId === id ? null : id);
//   };

//   const openModal = (type, data) => {
//     setModalType(type);
//     setModalContent(data);
//   };

//   const closeModal = () => {
//     setModalContent(null);
//     setModalType("");
//   };

//   const totalPages = Math.ceil(data.length / appointmentsPerPage);
//   const indexOfLastAppointment = currentPage * appointmentsPerPage;
//   const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
//   const currentAppointments = data.slice(
//     indexOfFirstAppointment,
//     indexOfLastAppointment
//   );

//   const showAppointmentInfo = allApointment.some(
//     (appo) => appo?.approvedDate && appo?.approvedTime
//   );

//   const handleAction = (e, id) => {
//     const action = e.target.value;
//     if (action === "approved") {
//       setFormModelType("approved");
//       setAppointmentId(id);
//     }
//     if (action === "rejected") {
//       setFormModelType("rejected");
//       setAppointmentId(id);
//     }
//   };

//   const handleApproved = async (e) => {
//     e.preventDefault();

//     const token = Cookies.get("accessToken");
//     if (!token) {
//       toast.error("You are not logged in. Please log in.", {
//         position: "top-right",
//       });
//       navigate("/login");
//       return;
//     }

//     if (!approvedDate || !approvedTime) {
//       toast.error("Please select both date and time for approval.", {
//         position: "top-right",
//       });
//       return;
//     }
//     setBtnLoading(true);
//     try {
//       const res = await fetch(
//         "https://physiotherapy-1.onrender.com/apis/book-appointment/approvedAppointment",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             appointmentId,
//             approvedDate,
//             approvedTime,
//           }),
//         }
//       );

//       const data = await res.json();
//       if (data.success) {
//         toast.success("Appointment approved successfully!", {
//           position: "top-right",
//         });
//         setFormModelType(null);
//         setApprovedDate("");
//         setApprovedTime("");
//       } else {
//         toast.error(data.message || "Something went wrong", {
//           position: "top-right",
//         });
//       }
//     } catch (error) {
//       toast.error(error.message || "Failed to approve appointment.", {
//         position: "top-right",
//       });
//     } finally {
//       setBtnLoading(false);
//       fetchAppointmentData();
//     }
//   };

//   const handleReject = async (e) => {
//     e.preventDefault();

//     const token = Cookies.get("accessToken");
//     if (!token) {
//       toast.error("You are not logged in. Please log in.", {
//         position: "top-right",
//       });
//       navigate("/login");
//       return;
//     }

//     if (!rejectionReason) {
//       toast.error("Please write the Reason for Rejection for approval.", {
//         position: "top-right",
//       });
//       return;
//     }
//     setBtnLoading(true);
//     try {
//       const res = await fetch(
//         "https://physiotherapy-1.onrender.com/apis/book-appointment/rejectedAppointment",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             rejectionReason,
//             appointmentId,
//           }),
//         }
//       );

//       const data = await res.json();
//       if (data.success) {
//         toast.success("Appointment reject successfully!", {
//           position: "top-right",
//         });
//         setFormModelType(null);
//         setRejectionReason("");
//       } else {
//         toast.error(data.message || "Something went wrong", {
//           position: "top-right",
//         });
//       }
//     } catch (error) {
//       toast.error(error.message || "Failed to reject appointment.", {
//         position: "top-right",
//       });
//     } finally {
//       setBtnLoading(true);
//       fetchAppointmentData();
//     }
//   };

//   return (
//     <div className="appointment-wrapper flex flex-col lg:flex-row min-h-screen bg-gray-100">
//       <div className="hidden lg:block lg:w-64">
//         <Sidebar activePage="/appointments" />
//       </div>
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header title="Appointments" />
//         <main className="appointment-content flex-1 p-4 sm:p-6">
//           <div className="flex justify-between mb-4">
//             <h1 className="text-xl sm:text-2xl font-semibold ">Appointments</h1>
//             <div className="flex justify-between gap-8 ">
//               <select
//                 value={statusValue}
//                 onChange={statusfetchAppointmentData}
//                 className="py-2 px-4 rounded"
//               >
//                 <option value="all">All</option>
//                 <option value="approved">Approved</option>
//                 <option value="pending">Pending</option>
//                 <option value="rejected">Rejected</option>
//               </select>

//               <input
//                 type="text"
//                 placeholder="Search services..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="border-b-2 pr-20 pl-4 rounded"
//               />
//             </div>
//           </div>
//           <div className="min-w-full bg-white rounded-lg shadow-md">
//             <table className="min-w-full table-auto">
//               <thead className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
//                 <tr>
//                   <th className="px-4 py-2">Serial No</th>
//                   <th className="px-4 py-2">Patient Name</th>
//                   <th className="px-4 py-2">Patient Details</th>
//                   <th className="px-4 py-2">Service Details</th>
//                   <th className="px-4 py-2">Booking Date</th>
//                   {showAppointmentInfo && (
//                     <>
//                       <th className="px-4 py-2">Appointment Date</th>
//                       <th className="px-4 py-2">Approved Time</th>
//                     </>
//                   )}

//                   {/* <th className="px-4 py-2">Appointment Date</th>

//                   <th className="px-4 py-2">Approved Time</th> */}
//                   <th className="px-4 py-2">Status</th>
//                   <th className="px-4 py-2"> Service Location</th>
//                   <th className="px-4 py-2">Price</th>
//                   <th className="px-4 py-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700 text-sm sm:text-base">
//                 {loader ? (
//                   <tr>
//                     <td colSpan={11} className="py-6 text-center">
//                       <div className="flex justify-center items-center">
//                         <TailSpin
//                           visible={true}
//                           height="80"
//                           width="80"
//                           color="#4fa94d"
//                           ariaLabel="tail-spin-loading"
//                         />
//                       </div>
//                     </td>
//                   </tr>
//                 ) : allApointment.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={5}
//                       className="text-center text-2xl font-medium"
//                     >
//                       No Data Found
//                     </td>
//                   </tr>
//                 ) : (
//                   allApointment.map((appo, index) => (
//                     <tr key={appo._id}>
//                       <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                         {index + 1}
//                       </td>

//                       <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                         {appo?.fullName}
//                       </td>

//                       <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                         <button
//                           className="text-blue-600 underline"
//                           onClick={() => {
//                             setModalType("patient Details");
//                             setModalContent(appo);
//                           }}
//                         >
//                           View{" "}
//                         </button>
//                       </td>

//                       <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                         <button
//                           className="text-blue-600 underline"
//                           onClick={() => {
//                             setModalType("Service Details");
//                             setModalContent(appo?.therapyServiceId?.serviceId);
//                           }}
//                         >
//                           View{" "}
//                         </button>
//                       </td>

//                       <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px]  break-words whitespace-nowrap">
//                         {new Date(appo?.date).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                       </td>
//                       {/* <td
//                         id="appo data"
//                         className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words"
//                       ></td>
//                       <td
//                         id="slot date"
//                         className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words"
//                       ></td> */}

//                       {showAppointmentInfo && (
//                         <>
//                           <td className="border border-gray-300 px-4 py-2">
//                             {appo?.approvedDate
//                               ? new Date(appo.approvedDate).toLocaleDateString(
//                                   "en-US",
//                                   {
//                                     year: "numeric",
//                                     month: "long",
//                                     day: "numeric",
//                                   }
//                                 )
//                               : "-"}
//                           </td>
//                           <td className="border border-gray-300 px-4 py-2">
//                             {appo?.approvedTime || "-"}
//                           </td>
//                         </>
//                       )}

//                       <td
//                         className={`border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words
//     ${appo?.status === "approved" ? "text-green-600 font-semibold" : ""}
//     ${appo?.status === "pending" ? "text-yellow-600 font-semibold" : ""}
//     ${appo?.status === "rejected" ? "text-red-600 font-semibold" : ""}`}
//                       >
//                         {appo?.status}
//                       </td>

//                       <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                         {appo?.therapyServiceId?.city}
//                       </td>

//                       <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                         {appo?.therapyServiceId?.price}
//                       </td>

//                       <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                         <select
//                           defaultValue=""
//                           onChange={(e) => handleAction(e, appo?._id)}
//                           className="border border-gray-300 rounded px-2 py-1"
//                         >
//                           <option value="" disabled>
//                             Action
//                           </option>
//                           <option value="approved">Approved</option>
//                           <option value="rejected">Rejected</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             {/* <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//             /> */}
//           </div>
//         </main>
//       </div>

//       {modalContent && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-[400px]">
//             <div className="flex justify-between items-center mb-4">
//               <h1 className="text-2xl font-semibold ">{modalType}</h1>

//               <button
//                 className="ml-auto  text-red-600 font-semibold text-3xl"
//                 onClick={() => {
//                   setModalContent(null);
//                   setModalType(null);
//                 }}
//               >
//                 <RxCross2 />
//               </button>
//             </div>

//             {modalType === "patient Details" && (
//               <div>
//                 <p>
//                   <strong>Name:</strong> {modalContent.fullName}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {modalContent?.email}
//                 </p>
//                 <p>
//                   <strong>Status:</strong> {modalContent?.phoneNumber}
//                 </p>
//                 <p>
//                   <strong>Gender:</strong> {modalContent?.gender}
//                 </p>
//                 <p>
//                   <strong>Date of Birthday:</strong>{" "}
//                   {new Date(modalContent?.dob).toLocaleDateString("en-GB", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </p>
//                 <p>
//                   <strong>Description:</strong> {modalContent?.description}
//                 </p>
//               </div>
//             )}

//             {modalType === "Service Details" && (
//               <div>
//                 <p>
//                   <strong> Service Name:</strong> {modalContent?.serviceName}
//                 </p>
//                 <p>
//                   <strong>Title:</strong> {modalContent?.title}
//                 </p>
//                 <p>
//                   <strong> Description:</strong> {modalContent?.description}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* {
//         formModelType  && formModelType ==="approved" ?(
//           <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded w-[400px]">
//         <h2 className="text-lg font-bold mb-4">Approve Appointment</h2>
//         <input type="date" value={approvedDate} onChange={(e) => setApprovedDate(e.target.value)} className="border p-2 w-full mb-2" />
//         <input type="time" value={approvedTime} onChange={(e) => setApprovedTime(e.target.value)} className="border p-2 w-full mb-4" />
//         <div className="flex justify-end space-x-2">
//           <button onClick={handleApproved} className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
//           <button onClick={()=>setFormModelType((pre)=>!pre)} className="text-gray-500 px-4 py-2">Cancel</button>
//         </div>
//       </div>
//     </div>

//         ):(<h1>hey</h1>)
//       } */}

//       {formModelType && formModelType === "approved" ? (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded w-[400px]">
//             <h2 className="text-lg font-bold mb-4">Approve Appointment</h2>
//             <input
//               type="date"
//               value={approvedDate}
//               onChange={(e) => setApprovedDate(e.target.value)}
//               className="border p-2 w-full mb-2"
//             />
//             <input
//               type="time"
//               value={approvedTime}
//               onChange={(e) => setApprovedTime(e.target.value)}
//               className="border p-2 w-full mb-4"
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={handleApproved}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 {btnLoading ? (
//                   <div>
//                     <ThreeDots
//                       visible={true}
//                       height="20"
//                       width="40"
//                       color="white"
//                       radius="9"
//                       ariaLabel="three-dots-loading"
//                       wrapperStyle={{}}
//                       wrapperClass=""
//                     />
//                   </div>
//                 ) : (
//                   "Submit"
//                 )}
//               </button>
//               <button
//                 onClick={() => setFormModelType(null)}
//                 className="text-gray-500 px-4 py-2"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : formModelType === "rejected" ? (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded w-[400px]">
//             <h2 className="text-lg font-bold mb-4">Reject Appointment</h2>
//             <textarea
//               placeholder="Reason for rejection"
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//               className="border p-2 w-full h-28 resize-none mb-4"
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={handleReject}
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 {btnLoading ? (
//                   <div>
//                     <ThreeDots
//                       visible={true}
//                       height="20"
//                       width="40"
//                       color="white"
//                       radius="9"
//                       ariaLabel="three-dots-loading"
//                       wrapperStyle={{}}
//                       wrapperClass=""
//                     />
//                   </div>
//                 ) : (
//                   "Submit"
//                 )}
//               </button>
//               <button
//                 onClick={() => setFormModelType(null)}
//                 className="text-gray-500 px-4 py-2"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Appointment;

import React, { useEffect, useState } from "react";
import Header from "../../../Header/Header";
import Sidebar from "../../../Sidebar/Sidebar";
import Pagination from "../../../Pagination/Pagination";

import Cookies from "js-cookie";
import { useFetcher, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { RxCross2 } from "react-icons/rx";
import { FaRegEye } from "react-icons/fa";

import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { calculateAge } from "../../../utils";
const Appointment = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [loader, setLoading] = useState(false);

  const [allApointment, setAllAppointment] = useState([]);
  const [statusValue, setStatusValue] = useState("");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppoId, setSelectedAppoId] = useState(null);
  const [formModelType, setFormModelType] = useState(null);
  const [appointmentId, setAppointmentId] = useState("");
  const [approvedTime, setApprovedTime] = useState("");
  const [approvedDate, setApprovedDate] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectKey, setSelectKey] = useState(0);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const fetchAppointmentData = async () => {
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
        "https://physiotherapy-1.onrender.com/apis/book-appointment/getAllBookAppointment",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("allAppointmentData", data?.data);
      if (data.success) {
        setAllAppointment(data.data);
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
    fetchAppointmentData();
  }, []);

  const stautsAllfetchAppointmentData = async ({ url }) => {
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
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("stautsAppointmentData", data.data);
      if (data.success) {
        setAllAppointment(data.data);
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
  const handleNewAppointment = (event) => {
    const newAppointmentData = event.detail;
    console.log("New appointment received:", newAppointmentData);
    
    // Refresh the appointment data
    fetchAppointmentData();
    
    // Optional: Highlight the new appointment
    if (newAppointmentData.appointmentId) {
      setSelectedAppoId(newAppointmentData.appointmentId);
    }
  };

  window.addEventListener('newAppointment', handleNewAppointment);
  
  return () => {
    window.removeEventListener('newAppointment', handleNewAppointment);
  };
}, []);

  const statusfetchAppointmentData = (e) => {
    const selectedStatus = e.target.value;
    setStatusValue(selectedStatus);
    setSearchQuery(""); // <-- ✅ CLEAR SEARCH

    if (selectedStatus === "all") {
      fetchAppointmentData();
    } else if (selectedStatus === "approved") {
      stautsAllfetchAppointmentData({
        url: "https://physiotherapy-1.onrender.com/apis/book-appointment/getApprovedAppointmentsForPhysiotherapist",
      });
    } else if (selectedStatus === "pending") {
      stautsAllfetchAppointmentData({
        url: "https://physiotherapy-1.onrender.com/apis/book-appointment/getPendingAppointmentsForPhysiotherapist",
      });
    } else if (selectedStatus === "rejected") {
      stautsAllfetchAppointmentData({
        url: "https://physiotherapy-1.onrender.com/apis/book-appointment/getRejectedAppointmentsForPhysiotherapist",
      });
    }
  };

  // const statusfetchAppointmentData = (e) => {
  //   const selectedStatus = e.target.value;
  //   console.log(e.target.value);
  //   setStatusValue(selectedStatus);

  //   if (selectedStatus === "all") {
  //     fetchAppointmentData();
  //   } else if (selectedStatus === "approved") {
  //     stautsAllfetchAppointmentData({
  //       url: "https://physiotherapy-1.onrender.com/apis/book-appointment/getApprovedAppointmentsForPhysiotherapist",
  //     });
  //   } else if (selectedStatus === "pending") {
  //     stautsAllfetchAppointmentData({
  //       url: "https://physiotherapy-1.onrender.com/apis/book-appointment/getPendingAppointmentsForPhysiotherapist",
  //     });
  //   } else if (selectedStatus === "rejected") {
  //     stautsAllfetchAppointmentData({
  //       url: "https://physiotherapy-1.onrender.com/apis/book-appointment/getRejectedAppointmentsForPhysiotherapist",
  //     });
  //   }
  // };

  const searchService = async (query) => {
    const token = Cookies.get("accessToken");
    if (!token) return;
    setStatusValue("");

    try {
      const res = await fetch(
        `https://physiotherapy-1.onrender.com/apis/book-appointment/searchBookAppointments/${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log("serchDATA", data);
      if (data.success) {
        if (data.success) {
          setAllAppointment(data.data);
        }
      } else {
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
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() === "") {
        fetchAppointmentData();
      } else {
        searchService(searchQuery);
      }
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const appointmentsPerPage = 8;

  // const handleStatusChange = (id, newStatus) => {
  //   const updatedAppointments = data.map((appt) =>
  //     appt.appointment_id === id
  //       ? { ...appt, appointment_status: newStatus }
  //       : appt
  //   );
  //   setData(updatedAppointments);
  //   setOpenDropdownId(null);
  // };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const openModal = (type, data) => {
    setModalType(type);
    setModalContent(data);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalType("");
  };

  // const totalPages = Math.ceil(data.length / appointmentsPerPage);
  // const indexOfLastAppointment = currentPage * appointmentsPerPage;
  // const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  // const currentAppointments = data.slice(
  //   indexOfFirstAppointment,
  //   indexOfLastAppointment
  // );

  const showAppointmentInfo = allApointment.some(
    (appo) => appo?.approvedDate && appo?.approvedTime
  );

  const handleAction = (e, id) => {
    const action = e.target.value;
    if (action === "approved") {
      setFormModelType("approved");
      setAppointmentId(id);
    }
    if (action === "rejected") {
      setFormModelType("rejected");
      setAppointmentId(id);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const scriptExists = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (scriptExists) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  //with coupon
  //   const handleApproved = async (e) => {
  //   e.preventDefault();

  //   const scriptLoaded = await loadRazorpayScript();
  //   if (!scriptLoaded) {
  //     toast.error("Razorpay SDK failed to load. Please try again.");
  //     return;
  //   }

  //   const token = Cookies.get("accessToken");
  //   if (!token) {
  //     toast.error("You are not logged in. Please log in.", {
  //       position: "top-right",
  //     });
  //     navigate("/login");
  //     return;
  //   }

  //   if (!approvedDate || !approvedTime) {
  //     toast.error("Please select both date and time for approval.", {
  //       position: "top-right",
  //     });
  //     return;
  //   }

  //   setBtnLoading(true);

  //   try {
  //     // Prepare request body with optional coupon
  //     const requestBody = {
  //       appointmentId,
  //       ...(couponCode && { coupon: couponCode }) // Only include coupon if it exists
  //     };

  //     // Step 1: Initiate payment order with optional coupon
  //     const res = await fetch(
  //       "https://physiotherapy-1.onrender.com/apis/book-appointment/approvedAppointment",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(requestBody),
  //       }
  //     );

  //     const data = await res.json();
  //     if (!data.success) {
  //       toast.error(data.message || "Failed to create payment order.", {
  //         position: "top-right",
  //       });
  //       return;
  //     }

  //     const { razorpayOrderId, amount, currency } = data.data;

  //     const options = {
  //       key: "rzp_live_ggpm1XnSriu2lC", // Replace with your real Razorpay key
  //       amount,
  //       currency,
  //       name: "Physiotherapy Appointment",
  //       description: "Payment for appointment approval",
  //       order_id: razorpayOrderId,
  //       handler: async function (response) {
  //         try {
  //           // Prepare verification request body
  //           const verificationBody = {
  //             razorpayOrderId: response.razorpay_order_id,
  //             razorpayPaymentId: response.razorpay_payment_id,
  //             razorpaySignature: response.razorpay_signature,
  //             appointmentId,
  //             approvedTime,
  //             approvedDate,
  //             ...(couponCode && { coupon: couponCode }) // Include coupon in verification if it exists
  //           };

  //           const verifyRes = await fetch(
  //             "https://physiotherapy-1.onrender.com/apis/book-appointment/verifyAndApproveAppointment",
  //             {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: `Bearer ${token}`,
  //               },
  //               body: JSON.stringify(verificationBody),
  //             }
  //           );

  //           const verifyData = await verifyRes.json();
  //           if (verifyData.success) {
  //             toast.success("Appointment approved and payment successful!", {
  //               position: "top-right",
  //             });
  //             setFormModelType(null);
  //             setApprovedDate("");
  //             setApprovedTime("");
  //             setCouponCode(""); // Clear coupon code after successful approval
  //             fetchAppointmentData();
  //             setShowChecklistModal(true);
  //           } else {
  //             toast.error(
  //               verifyData.message || "Payment verified but approval failed.",
  //               {
  //                 position: "top-right",
  //               }
  //             );
  //           }
  //         } catch (err) {
  //           toast.error("Failed to verify payment or approve appointment.", {
  //             position: "top-right",
  //           });
  //         }
  //       },
  //       theme: {
  //         color: "#10B981",
  //       },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (err) {
  //     toast.error("Something went wrong while processing payment.", {
  //       position: "top-right",
  //     });
  //   } finally {
  //     setBtnLoading(false);
  //   }
  // };

  // const handleApproved = async (e) => {
  //   e.preventDefault();

  //   const scriptLoaded = await loadRazorpayScript();
  //   if (!scriptLoaded) {
  //     toast.error("Razorpay SDK failed to load. Please try again.");
  //     return;
  //   }

  //   const token = Cookies.get("accessToken");
  //   if (!token) {
  //     toast.error("You are not logged in. Please log in.", {
  //       position: "top-right",
  //     });
  //     navigate("/login");
  //     return;
  //   }

  //   if (!approvedDate || !approvedTime) {
  //     toast.error("Please select both date and time for approval.", {
  //       position: "top-right",
  //     });
  //     return;
  //   }

  //   setBtnLoading(true);

  //   try {
  //     // Step 1: Initiate payment order
  //     const res = await fetch(
  //       "https://physiotherapy-1.onrender.com/apis/book-appointment/approvedAppointment",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ appointmentId }),
  //       }
  //     );

  //     const data = await res.json();
  //     if (!data.success) {
  //       toast.error(data.message || "Failed to create payment order.", {
  //         position: "top-right",
  //       });
  //       return;
  //     }

  //     const { razorpayOrderId, amount, currency } = data.data;

  //     const options = {
  //       key:"rzp_live_ggpm1XnSriu2lC", // Replace with your real Razorpay key
  //       amount,
  //       currency,
  //       name: "Physiotherapy Appointment",
  //       description: "Payment for appointment approval",
  //       order_id: razorpayOrderId,
  //       handler: async function (response) {
  //         try {
  //           const verifyRes = await fetch(
  //             "https://physiotherapy-1.onrender.com/apis/book-appointment/verifyAndApproveAppointment",
  //             {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: `Bearer ${token}`,
  //               },
  //               body: JSON.stringify({
  //                 razorpayOrderId: response.razorpay_order_id,
  //                 razorpayPaymentId: response.razorpay_payment_id,
  //                 razorpaySignature: response.razorpay_signature,
  //                 appointmentId,
  //                 approvedTime,
  //                 approvedDate,
  //               }),
  //             }
  //           );

  //           const verifyData = await verifyRes.json();
  //           if (verifyData.success) {
  //             toast.success("Appointment approved and payment successful!", {
  //               position: "top-right",
  //             });
  //             setFormModelType(null);
  //             setApprovedDate("");
  //             setApprovedTime("");
  //             fetchAppointmentData();
  //             setShowChecklistModal(true);
  //           } else {
  //             toast.error(
  //               verifyData.message || "Payment verified but approval failed.",
  //               {
  //                 position: "top-right",
  //               }
  //             );
  //           }
  //         } catch (err) {
  //           toast.error("Failed to verify payment or approve appointment.", {
  //             position: "top-right",
  //           });
  //         }
  //       },
  //       theme: {
  //         color: "#10B981",
  //       },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (err) {
  //     toast.error("Something went wrong while processing payment.", {
  //       position: "top-right",
  //     });
  //   } finally {
  //     setBtnLoading(false);
  //   }
  // };

  const handleApproved = async (e) => {
    e.preventDefault();

    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load. Please try again.");

      return;
    }

    const token = Cookies.get("accessToken");

    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });

      navigate("/login");

      return;
    }

    if (!approvedDate || !approvedTime) {
      toast.error("Please select both date and time for approval.", {
        position: "top-right",
      });

      return;
    }

    setBtnLoading(true);

    try {
      const requestBody = {
        appointmentId,

        ...(couponCode && { coupon: couponCode }), // include coupon if exists
      };

      const res = await fetch(
        "https://physiotherapy-1.onrender.com/apis/book-appointment/approvedAppointment",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(requestBody),
        }
      );

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to create payment order.", {
          position: "top-right",
        });

        return;
      }

      const { razorpayOrderId, amount, currency, appointment, message } =
        data.data;

      // ✅ If no Razorpay order needed (coupon handled it)

      if (!razorpayOrderId) {
        toast.success(message || "Appointment approved successfully!", {
          position: "top-right",
        });

        setFormModelType(null);

        setApprovedDate("");

        setApprovedTime("");

        setCouponCode("");

        fetchAppointmentData();

        setShowChecklistModal(true);

        return;
      }

      // ✅ Proceed with Razorpay payment

      const options = {
        key: "rzp_live_ggpm1XnSriu2lC", // Your Razorpay live key

        amount,

        currency,

        name: "Physiotherapy Appointment",

        description: "Payment for appointment approval",

        order_id: razorpayOrderId,

        handler: async function (response) {
          try {
            const verificationBody = {
              razorpayOrderId: response.razorpay_order_id,

              razorpayPaymentId: response.razorpay_payment_id,

              razorpaySignature: response.razorpay_signature,

              appointmentId,

              approvedTime,

              approvedDate,

              ...(couponCode && { coupon: couponCode }),
            };

            const verifyRes = await fetch(
              "https://physiotherapy-1.onrender.com/apis/book-appointment/verifyAndApproveAppointment",

              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",

                  Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify(verificationBody),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success("Appointment approved and payment successful!", {
                position: "top-right",
              });

              setFormModelType(null);

              setApprovedDate("");

              setApprovedTime("");

              setCouponCode("");

              fetchAppointmentData();

              setShowChecklistModal(true);
            } else {
              toast.error(
                verifyData.message || "Payment verified but approval failed.",

                {
                  position: "top-right",
                }
              );
            }
          } catch (err) {
            toast.error("Failed to verify payment or approve appointment.", {
              position: "top-right",
            });
          }
        },

        theme: {
          color: "#10B981",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (err) {
      toast.error("Something went wrong while processing payment.", {
        position: "top-right",
      });
    } finally {
      setBtnLoading(false);
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();

    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }

    if (!rejectionReason) {
      toast.error("Please write the Reason for Rejection for approval.", {
        position: "top-right",
      });
      return;
    }
    setBtnLoading(true);
    try {
      const res = await fetch(
        "https://physiotherapy-1.onrender.com/apis/book-appointment/rejectedAppointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rejectionReason,
            appointmentId,
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Appointment reject successfully!", {
          position: "top-right",
        });
        setFormModelType(null);
        setRejectionReason("");
        setAppointmentId("");
      } else {
        // toast.error(data.message || "Something went wrong", {
        //   position: "top-right",
        // });
      }
    } catch (error) {
      // toast.error(error.message || "Failed to reject appointment.", {
      //   position: "top-right",
      // });
    } finally {
      setBtnLoading(false);
      fetchAppointmentData();
      setFormModelType(null);
      setRejectionReason("");
      setAppointmentId("");
    }
  };

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar activePage="/appointments" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Appointments" />
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold ">Appointments</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <select
                value={statusValue}
                onChange={statusfetchAppointmentData}
                className="py-2 px-4 rounded"
              >
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>

              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-b-2 pr-20  py-2 px-4 pl-4 rounded"
              />
            </div>
          </div>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-[#1E2A3A] text-white">
                <tr>
                  <th className="px-4 py-2">Serial No</th>
                  {/* <th className="px-4 py-2">Patient Name</th> */}
                  <th className="px-4 py-2">Patient Details</th>
                  <th className="px-4 py-2">Service Details</th>
                  <th className="px-4 py-2">Booking Date</th>
                  {showAppointmentInfo && (
                    <>
                      <th className="px-4 py-2">Appointment Date</th>
                      <th className="px-4 py-2">Approved Time</th>
                    </>
                  )}

                  {/* <th className="px-4 py-2">Appointment Date</th>

                  <th className="px-4 py-2">Approved Time</th> */}
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2"> Service Location</th>
                  <th className="px-4 py-2">Session Fee</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm sm:text-base">
                {loader ? (
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
                ) : allApointment.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center text-2xl font-medium"
                    >
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  [...allApointment].reverse().map((appo, index) => (
                    <tr key={appo._id}>
                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {index + 1}
                      </td>

                      {/* <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {appo?.fullName}
                      </td> */}

                      {appo.status === "approved" ? (
                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          <button
                            className="text-blue-600 underline"
                            onClick={() => {
                              setModalType("patient Details");
                              setModalContent(appo);
                            }}
                          >
                            View{" "}
                          </button>
                        </td>
                      ) : (
                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          <button
                            className="text-blue-600 underline"
                            onClick={() => {
                              setModalType("Want To Know More Details ?");
                              setModalContent(appo);
                            }}
                          >
                            View{" "}
                          </button>
                        </td>
                      )}

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        <button
                          className="text-blue-600 underline"
                          onClick={() => {
                            setModalType("Service Details");
                            setModalContent(appo?.therapyServiceId?.serviceId);
                          }}
                        >
                          View{" "}
                        </button>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px]  break-words whitespace-nowrap">
                        {new Date(appo?.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      {/* <td
                        id="appo data"
                        className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words"
                      ></td>
                      <td
                        id="slot date"
                        className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words"
                      ></td> */}

                      {showAppointmentInfo && (
                        <>
                          <td className="border border-gray-300 px-4 py-2">
                            {appo?.approvedDate
                              ? new Date(appo.approvedDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )
                              : "-"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {appo?.approvedTime || "-"}
                          </td>
                        </>
                      )}

                      <td
                        className={`border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words
    ${appo?.status === "approved" ? "text-green-600 font-semibold" : ""}
    ${appo?.status === "pending" ? "text-yellow-600 font-semibold" : ""}
    ${appo?.status === "rejected" ? "text-red-600 font-semibold" : ""}`}
                      >
                        {appo?.status}
                      </td>

                      {/* <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {appo?.therapyServiceId?.city}
                      </td> */}

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        <button
                          className="text-blue-600 underline"
                          onClick={() => {
                            setModalType("Address");
                            setModalContent(appo?.therapyServiceId);
                          }}
                        >
                          View{" "}
                        </button>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {appo?.therapyServiceId?.price}
                      </td>

                      {/* <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        <select
                          key={selectKey}
                          defaultValue=""
                          onChange={(e) => handleAction(e, appo?._id)}
                          className="border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="" disabled>
                            Action
                          </option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td> */}
                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {appo?.status === "pending" ? (
                          <select
                            key={selectKey}
                            defaultValue=""
                            onChange={(e) => handleAction(e, appo?._id)}
                            className="border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="" disabled>
                              Action
                            </option>
                            <option value="approved">Approv</option>
                            <option value="rejected">Reject</option>
                          </select>
                        ) : (
                          <span
                            className={`font-medium ${
                              appo?.status === "approved"
                                ? "text-green-600"
                                : appo?.status === "rejected"
                                ? "text-red-600"
                                : ""
                            }`}
                          >
                            {appo?.status.charAt(0).toUpperCase() +
                              appo?.status.slice(1)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            /> */}
          </div>
        </main>
      </div>

      {showChecklistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
              ✅ Physiotherapist Pre-Session Checklist
            </h2>
            <ol className="list-decimal pl-5 text-gray-800 space-y-2 text-sm">
              <li>
                Review patient history – Check reports, complaints & previous
                notes.
              </li>
              <li>
                Be on time & well-groomed – First impression builds lasting
                trust.
              </li>
              <li>Carry required tools – TheraBands, tape, etc.</li>
              <li>
                Be confident & communicate clearly – Don’t rush diagnosis in Day
                1; working diagnosis is okay over sessions.
              </li>
              <li>
                Avoid personal deals – Strictly follow platform pricing. Any
                misuse or manipulation may lead to blacklisting.
              </li>
              <li>
                Stay connected with admin – We may contact clients anytime for
                feedback & session review.
              </li>
              <li>
                Update treatment notes post-session – Helps maintain continuity
                and clarity in care.
              </li>
            </ol>

            <div className="text-center mt-6">
              <button
                onClick={() => setShowChecklistModal(false)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
              >
                Okay
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
            {modalType === "Want To Know More Details ?" && (
              <div>
                <p>Wants full details? Approve & unlock now!</p>
                <p>
                  <strong>Gender:</strong> {modalContent?.gender}
                </p>
                <p>
                  <strong>Age:</strong> {calculateAge(modalContent?.dob)} years
                  old
                </p>
                {/* <p>
                  <strong>Date of Birthday:</strong>{" "}
                  {new Date(modalContent?.dob).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p> */}
                <p>
                  <strong>Description:</strong> {modalContent?.description}
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
                {/* <p>
                  <strong>Date of Birthday:</strong>{" "}
                  {new Date(modalContent?.dob).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p> */}

                <p>
                  <strong>Age:</strong> {calculateAge(modalContent?.dob)} years
                  old
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
                {/* <p>
                  <strong>Title:</strong> {modalContent?.title}
                </p> */}
                <p>
                  <strong> Description:</strong> {modalContent?.description}
                </p>
              </div>
            )}

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
          </div>
        </div>
      )}

      {/* {
        formModelType  && formModelType ==="approved" ?(
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-[400px]">
        <h2 className="text-lg font-bold mb-4">Approve Appointment</h2>
        <input type="date" value={approvedDate} onChange={(e) => setApprovedDate(e.target.value)} className="border p-2 w-full mb-2" />
        <input type="time" value={approvedTime} onChange={(e) => setApprovedTime(e.target.value)} className="border p-2 w-full mb-4" />
        <div className="flex justify-end space-x-2">
          <button onClick={handleApproved} className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
          <button onClick={()=>setFormModelType((pre)=>!pre)} className="text-gray-500 px-4 py-2">Cancel</button>
        </div>
      </div>
    </div>
          
        ):(<h1>hey</h1>)
      } */}

      {formModelType && formModelType === "approved" ? (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Approve Appointment</h2>
            <input
              type="date"
              value={approvedDate}
              onChange={(e) => setApprovedDate(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="time"
              value={approvedTime}
              onChange={(e) => setApprovedTime(e.target.value)}
              className="border p-2 w-full mb-4"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Code (Optional)
              </label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="border p-2 w-full rounded"
              />
            </div>

            {/* <TimePicker
              onChange={setApprovedTime}
              value={approvedTime}
              disableClock={false} // show analog clock as well
              format="h:mm a" // 12-hour format with AM/PM
              className="mb-4 w-full border rounded"
            /> */}

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleApproved}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {btnLoading ? (
                  <div>
                    <ThreeDots
                      visible={true}
                      height="20"
                      width="40"
                      color="white"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
              <button
                onClick={() => {
                  setFormModelType(null);
                  setApprovedDate("");
                  setApprovedTime("");
                  setSelectKey((prev) => prev + 1);
                }}
                className="text-gray-500 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : formModelType === "rejected" ? (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Reject Appointment</h2>
            <textarea
              placeholder="Reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="border p-2 w-full h-28 resize-none mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleReject}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                {btnLoading ? (
                  <div>
                    <ThreeDots
                      visible={true}
                      height="20"
                      width="40"
                      color="white"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
              <button
                onClick={() => {
                  setFormModelType(null);
                  setSelectKey((prev) => prev + 1);
                  setRejectionReason("");
                }}
                className="text-gray-500 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Appointment;
