// import React, { useState, useEffect } from "react";
// import Sidebar from "../../../Sidebar/Sidebar";
// import Header from "../../../Header/Header";
// import Cookies from "js-cookie";
// import { TailSpin, ThreeDots } from "react-loader-spinner";
// import { ToastContainer, toast } from "react-toastify";
// import { RxCross2 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// import { FaRegEye } from "react-icons/fa";
// import { calculateAge } from "../../../utils";

// function Management() {
//   const [loader, setLoading] = useState(false);
//   const [allPatients, setAllPatients] = useState([]);
//   const [modalContent, setModalContent] = useState(null);
//   const [modalType, setModalType] = useState(null);
//   const navigate = useNavigate();

//   // Fetch patient data
//   const fetchPatients = async () => {
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
//       // This would be your actual API endpoint
//     //   const response = await fetch(
//     //     "https://your-api-endpoint/patients",
//     //     {
//     //       method: "GET",
//     //       headers: {
//     //         "Content-Type": "application/json",
//     //         Authorization: `Bearer ${token}`,
//     //       },
//     //     }
//     //   );
//     //   const data = await response.json();
//     //   if (data.success) {
//     //     setAllPatients(data.data);
//     //   }
//     } catch (err) {
//     //   toast.error(err.message || "Something went wrong. Please try again.", {
//     //     position: "top-right",
//     //   });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   return (
//     <div className="flex h-screen overflow-x-hidden">
//       <Sidebar activePage="/name-management" />
//       <div className="flex-1 flex flex-col overflow-x-hidden">
//         <Header title="Patient Management" />
//         <main className="flex-1 p-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
//             <h1 className="text-2xl font-bold mb-4">Patient Documentation</h1>
//           </div>
//           <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-[#002B45] text-white">
//                 <tr>
//                   <th className="py-3 px-4 text-sm text-left">Serial ID</th>
//                   <th className="py-3 px-4 text-sm text-left">Patient Name</th>
//                   <th className="py-3 px-4 text-sm text-left">Patient Details</th>
//                   <th className="py-3 px-4 text-sm text-left">Service Details</th>
//                   <th className="py-3 px-4 text-sm text-left">Booking Details</th>
//                   <th className="py-3 px-4 text-sm text-left">Medical History</th>
//                   <th className="py-3 px-4 text-sm text-left">Therapy Details</th>
//                   <th className="py-3 px-4 text-sm text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loader ? (
//                   <tr>
//                     <td colSpan={8} className="py-6 text-center">
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
//                 ) : allPatients.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={8}
//                       className="text-center text-2xl font-medium py-6"
//                     >
//                       No Data Found
//                     </td>
//                   </tr>
//                 ) : (
//                   allPatients.map((item, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                         {index + 1}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                         {item?.fullName}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-lg text-center max-w-[200px] whitespace-normal break-words">
//                         <button
//                           className="text-blue-600 underline"
//                           onClick={() => {
//                             setModalType("Patient Details");
//                             setModalContent(item);
//                           }}
//                         >
//                           <FaRegEye />
//                         </button>
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-lg text-center max-w-[200px] whitespace-normal break-words">
//                         <button
//                           className="text-blue-600 underline"
//                           onClick={() => {
//                             setModalType("Service Details");
//                             setModalContent(item?.services);
//                           }}
//                         >
//                           <FaRegEye />
//                         </button>
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-lg text-center max-w-[200px] whitespace-normal break-words">
//                         <button
//                           className="text-blue-600 underline"
//                           onClick={() => {
//                             setModalType("Booking Details");
//                             setModalContent(item?.bookings);
//                           }}
//                         >
//                           <FaRegEye />
//                         </button>
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-lg text-center max-w-[200px] whitespace-normal break-words">
//                         <button
//                           className="text-blue-600 underline"
//                           onClick={() => {
//                             setModalType("Medical History");
//                             setModalContent(item?.medicalHistory);
//                           }}
//                         >
//                           <FaRegEye />
//                         </button>
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-lg text-center max-w-[200px] whitespace-normal break-words">
//                         <button
//                           className="text-blue-600 underline"
//                           onClick={() => {
//                             setModalType("Therapy Details");
//                             setModalContent(item?.therapies);
//                           }}
//                         >
//                           <FaRegEye />
//                         </button>
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
//                         <select className="w-full px-3 py-2 rounded border border-gray-300">
//                           <option value="ACTIVE">Active</option>
//                           <option value="INACTIVE">Inactive</option>
//                           <option value="PENDING">Pending</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>

//       {modalContent && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h1 className="text-2xl font-semibold ">{modalType}</h1>
//               <button
//                 className="ml-auto text-red-600 font-semibold text-3xl"
//                 onClick={() => {
//                   setModalContent(null);
//                   setModalType(null);
//                 }}
//               >
//                 <RxCross2 />
//               </button>
//             </div>

//             {modalType === "Patient Details" && (
//               <div className="space-y-3">
//                 <p><strong>Name:</strong> {modalContent.fullName}</p>
//                 <p><strong>Email:</strong> {modalContent.email}</p>
//                 <p><strong>Phone:</strong> {modalContent.phoneNumber}</p>
//                 <p><strong>Gender:</strong> {modalContent.gender}</p>
//                 <p><strong>Age:</strong> {calculateAge(modalContent.dob)} years old</p>
//                 <p><strong>Address:</strong> {modalContent.address}</p>
//               </div>
//             )}

//             {modalType === "Service Details" && (
//               <div className="space-y-3">
//                 <p><strong>Service Name:</strong> {modalContent?.serviceName}</p>
//                 <p><strong>Duration:</strong> {modalContent?.duration}</p>
//                 <p><strong>Frequency:</strong> {modalContent?.frequency}</p>
//                 <p><strong>Therapist:</strong> {modalContent?.therapist}</p>
//               </div>
//             )}

//             {modalType === "Booking Details" && (
//               <div className="space-y-3">
//                 <p><strong>Booking Date:</strong> {new Date(modalContent?.date).toLocaleDateString()}</p>
//                 <p><strong>Time Slot:</strong> {modalContent?.timeSlot}</p>
//                 <p><strong>Status:</strong> {modalContent?.status}</p>
//                 <p><strong>Location:</strong> {modalContent?.location}</p>
//               </div>
//             )}

//             {modalType === "Medical History" && (
//               <div className="space-y-3">
//                 <p><strong>Conditions:</strong> {modalContent?.conditions?.join(", ")}</p>
//                 <p><strong>Allergies:</strong> {modalContent?.allergies?.join(", ")}</p>
//                 <p><strong>Medications:</strong> {modalContent?.medications?.join(", ")}</p>
//                 <p><strong>Previous Surgeries:</strong> {modalContent?.surgeries?.join(", ")}</p>
//               </div>
//             )}

//             {modalType === "Therapy Details" && (
//               <div className="space-y-4">
//                 {modalContent?.map((therapy, index) => (
//                   <div key={index} className="border-b pb-3">
//                     <p><strong>Therapy Type:</strong> {therapy.type}</p>
//                     <p><strong>Duration:</strong> {therapy.duration}</p>
//                     <p><strong>Progress:</strong> {therapy.progress}</p>
//                     <p><strong>Notes:</strong> {therapy.notes}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// }

// export default Management;

import React, { useState } from "react";
import { FaUser, FaStethoscope, FaNotesMedical, FaSave } from "react-icons/fa";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("Assessment");
  const [formData, setFormData] = useState({
    subjective: "",
    objective: "",
    treatmentGoals: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form data saved!");
    // Here you would typically send the data to an API
  };

  const tabs = [
    {
      id: "Assessment",
      label: "Assessment",
      icon: <FaStethoscope className="mr-2" />,
    },
    {
      id: "TreatmentNotes",
      label: "Treatment Notes",
      icon: <FaNotesMedical className="mr-2" />,
    },
    {
      id: "FollowUpNotes",
      label: "Follow-up Notes",
      icon: <FaUser className="mr-2" />,
    },
  ];

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar activePage="/" />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 p-4 bg-[#0B1B33] text-white overflow-y-auto overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              Documentation
            </h1>

            {/* Tabs Navigation */}
            <div className="flex mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center px-4 py-3 text-sm md:text-base font-medium transition-all duration-300 ease-in-out ${
                    activeTab === tab.id
                      ? "text-teal-400 border-b-2 border-teal-400"
                      : "text-gray-400 hover:text-gray-300 border-b-2 border-transparent"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className=" transition-all duration-300">
              {/* Assessment Tab */}
              {activeTab === "Assessment" && (
                <div className="animate-fadeIn">
                  <div className=" bg-white text-[#002B45] rounded-lg shadow-lg p-4 md:p-6 mb-6">
                    <p className="font-bold">John Doe</p>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 my-2">
                      <span>Age: 45, Male</span>
                      <span>Service: Knee Rehab</span>
                    </div>
                    <p className="">Appointment Date: Apr 25,2025</p>
                  </div>

                  <form
                    className="bg-white text-[#002B45] rounded-lg shadow-lg p-4 md:p-6"
                    onSubmit={handleSubmit}
                  >
                    {/* <h3 className="text-lg font-bold mb-4">Assessment Form</h3> */}
                    <div className="space-y-4">
                      <div>
                        <label className="block font-medium mb-1">
                          Subjective
                        </label>
                        <textarea
                          name="subjective"
                          value={formData.subjective}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          rows="1"
                          placeholder="Patient's reported symptoms and feelings"
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-1">
                          Objective
                        </label>
                        <textarea
                          name="objective"
                          value={formData.objective}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          rows="1"
                          placeholder="Observations and measurements"
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-1">
                          Treatment Goals
                        </label>
                        <textarea
                          name="treatmentGoals"
                          value={formData.treatmentGoals}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          rows="1"
                          placeholder="Goals for patient treatment"
                        />
                      </div>

                      <button
                        type="submit"
                        className="flex items-center bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                      >
                        <FaSave className="mr-2" /> Save
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Treatment Notes Tab */}
              {activeTab === "TreatmentNotes" && (
                <div className="text-[#002B45] animate-fadeIn">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-100 rounded">
                      <p className="font-semibold">June 15, 2023</p>
                      <p>
                        Patient responded well to physical therapy session.
                        Increased range of motion noted in shoulder joint.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded">
                      <p className="font-semibold">June 8, 2023</p>
                      <p>
                        Initial treatment session focused on pain management and
                        gentle mobilization exercises.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded">
                      <p className="font-semibold">June 1, 2023</p>
                      <p>
                        Patient presented with moderate shoulder pain. Initial
                        assessment completed.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Follow-up Notes Tab */}
              {activeTab === "FollowUpNotes" && (
                <div className="text-[#002B45] animate-fadeIn">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-100 rounded">
                      <p className="font-semibold">Scheduled Follow-up:</p>
                      <p>Next appointment: June 22, 2023 at 10:00 AM</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded">
                      <p className="font-semibold">Recommendations:</p>
                      <p>
                        Continue home exercises twice daily. Apply ice if any
                        discomfort occurs.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded">
                      <p className="font-semibold">Long-term Plan:</p>
                      <p>
                        Schedule follow-up in 2 weeks to assess progress.
                        Consider additional imaging if no improvement.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
          `}</style>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
