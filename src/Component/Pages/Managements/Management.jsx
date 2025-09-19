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
import {
  FaUser,
  FaStethoscope,
  FaNotesMedical,
  FaSave,
  FaCalendar,
  FaChevronDown,
} from "react-icons/fa";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("Assessment");
  const [isTherapyDropdownOpen, setIsTherapyDropdownOpen] = useState(false);

  // State for Assessment tab
  const [assessmentData, setAssessmentData] = useState({
    subjective: "",
    objective: "",
    impression: "",
  });

  // State for Treatment Notes tab
  const [treatmentData, setTreatmentData] = useState({
    therapies: [],
    otherTherapy: "",
    treatmentPlan: "",
    outcome: "",
    outcomeNotes: "",
  });

  // State for Follow-Up Notes tab
  const [followUpData, setFollowUpData] = useState({
    followUpDate: "",
    nextSessionPlan: "",
    homeExerciseProgram: "",
  });

  // Mock data - in a real app this would come from props or API
  const patientInfo = {
    name: "John Doe",
    age: "45",
    gender: "Male",
    service: "Knee Rehab",
    appointmentDate: "Apr 25, 2025",
    therapist: "Dr. Sarah Johnson",
  };

  const therapyOptions = [
    "Manual Therapy",
    "Exercises Rehab",
    "Electrotherapy",
    "Taping",
    "Dry Needling",
    "Others",
  ];

  const outcomeOptions = ["Improved", "No Change", "Worsened"];

  const handleAssessmentChange = (e) => {
    const { name, value } = e.target;
    setAssessmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTreatmentChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      // Handle therapies selection
      const therapy = value;
      setTreatmentData((prev) => {
        if (prev.therapies.includes(therapy)) {
          return {
            ...prev,
            therapies: prev.therapies.filter((t) => t !== therapy),
            ...(therapy === "Others" ? { otherTherapy: "" } : {}),
          };
        } else {
          return {
            ...prev,
            therapies: [...prev.therapies, therapy],
          };
        }
      });
    } else {
      setTreatmentData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFollowUpChange = (e) => {
    const { name, value } = e.target;
    setFollowUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form data saved!");
    // Here you would typically send the data to an API
  };

  const toggleTherapyDropdown = () => {
    setIsTherapyDropdownOpen(!isTherapyDropdownOpen);
  };

  const tabs = [
    {
      id: "Assessment",
      label: "Assessment",
      icon: <FaStethoscope className="mr-1 md:mr-2 hidden md:block" />,
    },
    {
      id: "TreatmentNotes",
      label: "Treatment",
      icon: <FaNotesMedical className="mr-1 md:mr-2 hidden md:block" />,
    },
    {
      id: "FollowUpNotes",
      label: "Follow-up",
      icon: <FaUser className="mr-1 md:mr-2 hidden md:block" />,
    },
  ];

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar activePage="/" />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 p-2 md:p-4 bg-[#0B1B33] text-white overflow-y-auto overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">
              Documentation
            </h1>

            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto mb-4 md:mb-6 hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center px-3 py-2 md:px-4 md:py-3 text-xs md:text-base font-medium transition-all duration-300 ease-in-out flex-shrink-0 ${
                    activeTab === tab.id
                      ? "text-teal-400 border-b-2 border-teal-400"
                      : "text-gray-400 hover:text-gray-300 border-b-2 border-transparent"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span className="ml-1 md:ml-2">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="transition-all duration-300">
              {/* Assessment Tab */}
              {activeTab === "Assessment" && (
                <div className="animate-fadeIn">
                  <div className="bg-white text-[#002B45] rounded-lg shadow-lg p-3 md:p-6 mb-4 md:mb-6">
                    <p className="font-bold text-base md:text-lg">{patientInfo.name}</p>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-8 my-1 md:my-2">
                      <p className="text-sm md:text-base">
                        Age/Gender:{" "}
                        <span className="font-semibold">
                          {" "}
                          {patientInfo.age}, {patientInfo.gender}
                        </span>
                      </p>
                      <p className="text-sm md:text-base">
                        Service:{" "}
                        <span className="font-semibold">
                          {" "}
                          {patientInfo.service}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm md:text-base">
                      Appointment Date:{" "}
                      <span className="font-semibold">
                        {" "}
                        {patientInfo.appointmentDate}
                      </span>
                    </p>
                  </div>

                  <form
                    className="bg-white text-[#002B45] rounded-lg shadow-lg p-3 md:p-6"
                    onSubmit={handleSubmit}
                  >
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <label className="block font-medium mb-1 text-sm md:text-base">
                          Subjective History
                        </label>
                        <textarea
                          name="subjective"
                          value={assessmentData.subjective}
                          onChange={handleAssessmentChange}
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                          rows="1"
                          placeholder="Patient complaints, history, pain, functional limitations..."
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-1 text-sm md:text-base">
                          Objective Findings
                        </label>
                        <textarea
                          name="objective"
                          value={assessmentData.objective}
                          onChange={handleAssessmentChange}
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                          rows="1"
                          placeholder="ROM, strength, posture, special tests, observations..."
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-1 text-sm md:text-base">
                          Assessment / Impression
                        </label>
                        <textarea
                          name="impression"
                          value={assessmentData.impression}
                          onChange={handleAssessmentChange}
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                          rows="1"
                          placeholder="Physio's clinical judgment / provisional diagnosis..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="flex items-center justify-center bg-teal-500 text-white px-3 py-2 md:px-4 md:py-2 rounded hover:bg-teal-600 transition-colors text-sm md:text-base"
                      >
                        <FaSave className="mr-1 md:mr-2" /> Save Assessment
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Treatment Notes Tab */}
              {activeTab === "TreatmentNotes" && (
                <div className="animate-fadeIn">
                  <div className="bg-white text-[#002B45] rounded-lg shadow-lg p-3 md:p-6 mb-4 md:mb-6">
                    <p className="font-bold text-base md:text-lg">{patientInfo.name}</p>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-8 my-1 md:my-2">
                      <p className="text-sm md:text-base">
                        Service:{" "}
                        <span className="font-semibold">
                          {" "}
                          {patientInfo.service}
                        </span>
                      </p>
                      <p className="text-sm md:text-base">
                        Therapist:{" "}
                        <span className="font-semibold">
                          {" "}
                          {patientInfo.therapist}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm md:text-base">
                      Session Date:{" "}
                      <span className="font-semibold">
                        {" "}
                        {new Date().toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  <form
                    className="bg-white text-[#002B45] rounded-lg shadow-lg p-3 md:p-6"
                    onSubmit={handleSubmit}
                  >
                    <div className="space-y-4 md:space-y-6">
                      <div className="relative">
                        <label className="block font-medium mb-1 text-sm md:text-base">
                          Therapies Used
                        </label>
                        <div
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer text-sm md:text-base"
                          onClick={toggleTherapyDropdown}
                        >
                          <div className="flex justify-between items-center">
                            <span className="flex flex-wrap gap-1 md:gap-2">
                              {treatmentData.therapies.length === 0
                                ? "Select therapies..."
                                : treatmentData.therapies.map(
                                    (therapy, index) => (
                                      <span
                                        key={index}
                                        className="px-1 py-0.5 md:px-2 md:py-1 text-xs md:text-sm bg-[#002B45] text-white rounded"
                                      >
                                        {therapy}
                                      </span>
                                    )
                                  )}
                            </span>
                            <FaChevronDown
                              className={`transform text-sm md:text-base ${
                                isTherapyDropdownOpen ? "rotate-180" : ""
                              } transition-transform`}
                            />
                          </div>
                        </div>

                        {isTherapyDropdownOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                            {therapyOptions.map((therapy) => (
                              <div
                                key={therapy}
                                className="px-3 py-1 md:px-4 md:py-2 cursor-pointer hover:bg-gray-100 text-sm md:text-base"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTreatmentChange({
                                    target: {
                                      type: "checkbox",
                                      value: therapy,
                                      checked:
                                        !treatmentData.therapies.includes(
                                          therapy
                                        ),
                                    },
                                  });
                                }}
                              >
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={treatmentData.therapies.includes(
                                      therapy
                                    )}
                                    onChange={() => {}}
                                    className="w-3 h-3 md:w-4 md:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <label className="ml-2 text-sm font-medium">
                                    {therapy}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {treatmentData.therapies.includes("Others") && (
                          <div className="mt-2 md:mt-4">
                            <label className="block text-xs md:text-sm font-medium mb-1">
                              Please specify other therapy:
                            </label>
                            <input
                              type="text"
                              name="otherTherapy"
                              value={treatmentData.otherTherapy}
                              onChange={handleTreatmentChange}
                              className="w-full p-1 md:p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                              placeholder="Enter other therapy..."
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block font-medium mb-1 text-sm md:text-base">
                          Treatment / Rehab Plan
                        </label>
                        <textarea
                          name="treatmentPlan"
                          value={treatmentData.treatmentPlan}
                          onChange={handleTreatmentChange}
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                          rows="1"
                          placeholder="Enter treatment/rehab plan for this session..."
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-1 text-sm md:text-base">
                          Post-Treatment Outcome
                        </label>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <select
                            name="outcome"
                            value={treatmentData.outcome}
                            onChange={handleTreatmentChange}
                            className="p-1 md:p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                          >
                            <option value="">Select outcome</option>
                            {outcomeOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>

                          <input
                            type="text"
                            name="outcomeNotes"
                            value={treatmentData.outcomeNotes}
                            onChange={handleTreatmentChange}
                            className="flex-1 p-1 md:p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                            placeholder="Optional notes..."
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="flex items-center justify-center bg-teal-500 text-white px-3 py-2 md:px-4 md:py-2 rounded hover:bg-teal-600 transition-colors text-sm md:text-base"
                      >
                        <FaSave className="mr-1 md:mr-2" /> Save Treatment Notes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Follow-Up Notes Tab */}
              {activeTab === "FollowUpNotes" && (
                <div className="animate-fadeIn">
                  <div className="bg-white text-[#002B45] rounded-lg shadow-lg p-3 md:p-6 mb-4 md:mb-6">
                    <p className="font-bold text-base md:text-lg">{patientInfo.name}</p>
                    <p className="text-sm md:text-base">
                      Service:{" "}
                      <span className="font-semibold">
                        {" "}
                        {patientInfo.service}
                      </span>
                    </p>
                  </div>

                  <form
                    className="bg-white text-[#002B45] rounded-lg shadow-lg p-3 md:p-6"
                    onSubmit={handleSubmit}
                  >
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <label className="block font-medium mb-1 text-sm md:text-base">
                          Follow-up Date
                        </label>
                        <div className="relative">
                          <FaCalendar className="absolute left-2 top-2 md:left-3 md:top-3 text-gray-400 text-sm md:text-base" />
                          <input
                            type="date"
                            name="followUpDate"
                            value={followUpData.followUpDate}
                            onChange={handleFollowUpChange}
                            className="w-full pl-7 md:pl-10 p-1 md:p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium mb-1 text-sm md:text-base">
                          Next Session Plan
                        </label>
                        <textarea
                          name="nextSessionPlan"
                          value={followUpData.nextSessionPlan}
                          onChange={handleFollowUpChange}
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                          rows="1"
                          placeholder="Enter focus area for next session..."
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-1 text-sm md:text-base">
                          Home Exercise Program
                        </label>
                        <textarea
                          name="homeExerciseProgram"
                          value={followUpData.homeExerciseProgram}
                          onChange={handleFollowUpChange}
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                          rows="1"
                          placeholder="Enter home exercise program or paste exercises..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="flex items-center justify-center bg-teal-500 text-white px-3 py-2 md:px-4 md:py-2 rounded hover:bg-teal-600 transition-colors text-sm md:text-base"
                      >
                        <FaSave className="mr-1 md:mr-2" /> Save Follow-up Notes
                      </button>
                    </div>
                  </form>
                </div>
              )}
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
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentation;