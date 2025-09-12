// import React, { useState , useEffect } from "react";
// import Sidebar from "../../../Sidebar/Sidebar";
// import Header from "../../../Header/Header"
// import Cookies from "js-cookie";
// import { TailSpin, ThreeDots } from "react-loader-spinner";
// import { ToastContainer, toast } from "react-toastify";
// import { RxCross2 } from "react-icons/rx";

// import { useAppContext } from "../../../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const Treatments = () => {

//   const { data, setData } = useAppContext();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentTreatment, setCurrentTreatment] = useState(null);
//   const[loader , setLoading ]= useState(false);
//   const [allActiveTreatment , setAllActiveTreatment] = useState([]);
//   const navigate = useNavigate();

//   const fetchAppointmentData = async () => {
//       const token = Cookies.get("accessToken");
//       if (!token) {
//         toast.error("You are not logged in. Please log in.", {
//           position: "top-right",
//         });
//         navigate("/login");
//         return;
//       }
//       setLoading(true);
//       try {
//         const response = await fetch(
//           "",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const data = await response.json();
//         console.log("allAppointmentData", data?.data);
//         if (data.success) {
//           setAllActiveTreatment(data.data);
//         }
//       } catch (err) {
//         toast.error(err.message || "Something went wrong. Please try again.", {
//           position: "top-right",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//   const handleEditClick = (treatment) => {
//     setCurrentTreatment({ ...treatment });
//     setIsModalOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentTreatment((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSaveChanges = () => {
//     setData((prev) =>
//       prev.map((item) =>
//         item.treatmentId === currentTreatment.treatmentId ? currentTreatment : item
//       )
//     );
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar activePage="/treatments" />
//       <div className="flex flex-col flex-1 w-full">
//         <Header title="Treatment Module" />
//         <div className="p-4 md:p-6">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800"> Active Treatment </h2>
//           <div className="overflow-x-auto">
//             <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
//               <thead className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
//                 <tr>
//                   <th className="py-3 px-4 text-sm text-left">Serial ID</th>
//                   <th className="py-3 px-4 text-sm text-left">Patient Name</th>
//                   <th className="py-3 px-4 text-sm text-left"> Appointment Date</th>
//                   <th className="py-3 px-4 text-sm text-left">Service Name</th>
//                   <th className="py-3 px-4 text-sm text-left">Service Description</th>
//                   <th className="py-3 px-4 text-sm text-left">Session Start</th>
//                   <th className="py-3 px-4 text-sm text-left">Charges</th>
//                   <th className="py-3 px-4 text-sm text-left">Payment Status</th>
//                   <th className="py-3 px-4 text-sm text-left">Treatment Notes</th>
//                   <th className="py-3 px-4 text-sm text-left">Next Appointment</th>
//                   <th className="py-3 px-4 text-sm text-left">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((treatment, index) => (
//                   treatment?.appointment_status === "Confirmed" &&
//                   <tr key={index} className="border-b hover:bg-gray-50">
//                     <td className="py-3 px-4 text-sm">{treatment.treatmentId || "-"}</td>
//                     <td className="py-3 px-4 text-sm">{treatment.patient_name || "-"}</td>
//                     <td className="py-3 px-4 text-sm">{treatment.date || "-"}</td>
//                     <td className="py-3 px-4 text-sm">{treatment.service_type || "-"}</td>
//                     <td className="py-3 px-4 text-sm">{treatment.service_description || "-"}</td>
//                     <td className="py-3 px-4 text-sm">{treatment.sessionDuration || "-"}</td>
//                     <td className="py-3 px-4 text-sm">{treatment.charges || "-"}</td>
//                     <td className="py-3 px-4 text-sm">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs ${treatment.paymentStatus === "Paid"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                           }`}
//                       >
//                         {treatment.paymentStatus || "-"}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4 text-sm">{treatment.treatmentNotes || "-"}</td>
//                     <td className="py-3 px-4 text-sm">{treatment.nextAppointment || "-"}</td>
//                     <td className="py-3 px-4 text-sm">
//                       <button
//                         onClick={() => handleEditClick(treatment)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {
//                   data.filter((data) => data.appointment_status === "Confirmed").length === 0 &&
//                   <tr>
//                     <td colSpan={10} className="text-center py-5">No Data Found</td>
//                   </tr>
//                 }
//               </tbody>
//             </table>
//           </div>

//           {/* Edit Modal */}
//           {isModalOpen && currentTreatment && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//               <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
//                 <h3 className="text-xl font-bold mb-4">Edit Treatment Details</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium">Session Duration</label>
//                     <input
//                       type="text"
//                       name="sessionDuration"
//                       value={currentTreatment.sessionDuration}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Charges</label>
//                     <input
//                       type="text"
//                       name="charges"
//                       value={currentTreatment.charges}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Treatment Notes</label>
//                     <textarea
//                       name="treatmentNotes"
//                       value={currentTreatment.treatmentNotes}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                       rows="3"
//                     ></textarea>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium">Next Appointment</label>
//                     <input
//                       type="date"
//                       name="nextAppointment"
//                       value={currentTreatment.nextAppointment}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-end space-x-3">
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSaveChanges}
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Treatments;

import React, { useState, useEffect } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";
import Cookies from "js-cookie";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { calculateAge } from "../../../utils";

const Treatments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState(null);
  const [loader, setLoading] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState("approved");
  const [allApprovedTreatment, setAllApprovedTreatment] = useState([]);
  const [allActiveTreatment, setAllActiveTreatment] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [addTherapyModel, setAddTherapyModel] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");

  const [sessionStart, setSessionStart] = useState("");
  const [charges, setCharges] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  const [paymentMethod, setPaymentMethod] = useState("PENDING");
  // const [treatmentNotes, setTreatmentNotes] = useState("");
  const [therapyStatus, setTherapyStatus] = useState("ONGOING");
  const [activeModalType, setActiveModalType] = useState(null);
  const [activeModelContent, setActiveModalContent] = useState(null);
  const [nextAppointment, setNextAppoinment] = useState(null);
  const [activeEdit, setActiveEdit] = useState(false);
  const [editId, setEditID] = useState("");
  const [openRows, setOpenRows] = useState({});

  const [complaint, setComplaint] = useState("");
  const [pain, setPain] = useState("");
  const [medical, setMedical] = useState("");
  const [observation, setObservation] = useState("");
  const [goal, setGoal] = useState("");
  const [period, setPeriod] = useState("");

  const navigate = useNavigate();

  const fetchApprovedTreatment = async () => {
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
        "https://physiotherapy-1.onrender.com/apis/book-appointment/getApprovedAppointmentsForPhysiotherapist",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("allAppooved", data?.data);

      if (data.success) {
        setAllApprovedTreatment(data.data);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveTreatment = async () => {
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
        "https://physiotherapy-1.onrender.com/apis/therapy-progress/getAllActiveTherapy",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("allActive", data);
      if (data.success) {
        setAllActiveTreatment(data.data);
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
    fetchActiveTreatment();
    fetchApprovedTreatment();
  }, []);

  const active = (id) => {
    console.log("idimp", appointmentId);
    setAddTherapyModel((pre) => !pre);
    setAppointmentId(id);
  };

  const handleAddThearpy = async (e) => {
    e.preventDefault();

    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }

    if (!sessionStart) {
      toast.error("Please write when you start Session approval.", {
        position: "top-right",
      });
      return;
    }

    const data = {
      appointmentId,

      sessionStart,
      nextAppointment,
      charges: Number(charges),
      paymentStatus,
      paymentMethod,
      complaint,
      pain,
      medical,
      observation,
      goal,
      period,

      // therapyStatus,
    };
    setBtnLoading(true);
    try {
      const res = await fetch(
        "https://physiotherapy-1.onrender.com/apis/therapy-progress/addActiveTherapy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      console.log("bha", appointmentId);
      if (result.success) {
        toast.success("Appointment Add to Active Thearpy successfully!", {
          position: "top-right",
        });

        setAppointmentId("");
        setSessionStart("");
        setCharges("");
        setPaymentMethod("");

        setTherapyStatus("");
        setComplaint(null);
        setPain(null);
        setMedical(null);
        setObservation(null);
        setGoal(null);
        setPeriod(null);
      } else {
        toast.error(data.message || "Something went wrong", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(
        error.message || "Failed to Add appointment  into Active Threapy.",
        {
          position: "top-right",
        }
      );
    } finally {
      setBtnLoading(false);
      setAddTherapyModel(false);
      setAppointmentId("");
      setSessionStart("");
      setCharges("");
      setPaymentMethod("");

      setTherapyStatus("");
      fetchApprovedTreatment();
      setComplaint(null);
      setPain(null);
      setMedical(null);
      setObservation(null);
      setGoal(null);
      setPeriod(null);
    }
  };

  const handleEditClick = (treatment) => {
    setCurrentTreatment({ ...treatment });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTreatment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSaveChanges = () => {
  //   setData((prev) =>
  //     prev.map((item) =>
  //       item.treatmentId === currentTreatment.treatmentId
  //         ? currentTreatment
  //         : item
  //     )
  //   );
  //   setIsModalOpen(false);
  // };
  const handleChangeOfContent = (e) => {
    setSelectedContent(e.target.value);
    fetchActiveTreatment();
    fetchApprovedTreatment();
  };

  const handleChnageStatusThearpy = async (e, id) => {
    const statusValue = e.target.value;
    setTherapyStatus(statusValue);
    e.preventDefault();

    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }
    const data = {
      therapyStatus: statusValue, // use the latest value directly
    };

    try {
      const res = await fetch(
        `https://physiotherapy-1.onrender.com/apis/therapy-progress/updateTherapyStatus/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success(" Active Thearpy Status Change  successfully!", {
          position: "top-right",
        });

        setTherapyStatus("");
      } else {
        toast.error(data.message || "Something went wrong", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to Change  Active Threapy Status.", {
        position: "top-right",
      });
    } finally {
      fetchActiveTreatment();
      fetchApprovedTreatment();
    }
  };

  const handleUpdateAddThearpy = async (e, id) => {
    e.preventDefault();

    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }

    const data = {
      nextAppointment,
      charges: Number(charges),
      paymentStatus,
      paymentMethod,

      // treatmentNotes,
    };
    setBtnLoading(true);
    try {
      const res = await fetch(
        `https://physiotherapy-1.onrender.com/apis/therapy-progress/updateActiveTherapy/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      console.log("bha", appointmentId);
      if (result.success) {
        toast.success(" Active Thearpy Edit successfully!", {
          position: "top-right",
        });

        setAppointmentId("");
        setSessionStart("");
        setCharges("");
        setPaymentMethod("");

        setTherapyStatus("");
      } else {
        toast.error(data.message || "Something went wrong", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(
        error.message || "Failed to Add appointment  into Active Threapy.",
        {
          position: "top-right",
        }
      );
    } finally {
      setAppointmentId("");
      setSessionStart("");
      setCharges("");
      setPaymentMethod("");

      setTherapyStatus("");
      setBtnLoading(false);
      setActiveEdit(false);
      setAddTherapyModel(false);
      fetchApprovedTreatment();
      fetchActiveTreatment();
    }
  };
  const toggleTherapists = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar activePage="/treatments" />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header title="Treatment Module" />
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
          <div lassName="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {" "}
              Clinical Assessments{" "}
            </h2>
            {/* <select
              onChange={(e) => handleChangeOfContent(e)}
              className="p-2 pr-4 rounded"
            >
              <option disabled>select Treatment</option>
              <option value="approved">Aprroved Appointment</option>
              <option value="active">Active Treamment</option>
            </select> */}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
              {/* Dynamic Table Head */}
              <thead className="bg-[#1E2A3A] text-white">
                {selectedContent === "approved" ? (
                  <tr>
                    <th className="px-4 py-2">Serial No</th>
                    <th className="px-4 py-2">Patient Name</th>
                    <th className="px-4 py-2">Patient Details</th>
                    <th className="px-4 py-2">Service Details</th>
                      {/* <th className="py-3 px-4 text-sm text-left">
                      Service location
                    </th> */}

                    <th className="px-4 py-2">Booking Date</th>

                    <th className="px-4 py-2">Appointment Date</th>
                    <th className="px-4 py-2">Approved Time</th>

                    {/* <th className="px-4 py-2"> Service Location</th>
                    <th className="px-4 py-2">Price</th> */}
                    <th className="px-4 py-2">Action</th>
                  </tr>
                ) : selectedContent === "active" ? (
                  <tr>
                    <th className="py-3 px-4 text-sm text-left">Serial ID</th>
                    <th className="py-3 px-4 text-sm text-left">
                      Patient Name
                    </th>
                    <th className="py-3 px-4 text-sm text-left">
                      Patient email
                    </th>

                    <th className="py-3 px-4 text-sm text-left">
                      Patient Details
                    </th>

                    <th className="py-3 px-4 text-sm text-left">
                      Service Details
                    </th>

                  

                    <th className="py-3 px-4 text-sm text-left">Therapies</th>
                    <th className="py-3 px-4 text-sm text-left">Status</th>
                    <th className="py-3 px-4 text-sm text-left">Action</th>
                  </tr>
                ) : null}
              </thead>

              {/* Table Body */}
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
                ) : selectedContent === "approved" ? (
                  allApprovedTreatment.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center text-2xl font-medium"
                      >
                        No Data Found
                      </td>
                    </tr>
                  ) : (
                 [...allApprovedTreatment].reverse().map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          {item.fullName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          <button
                            className="text-blue-600 underline"
                            onClick={() => {
                              setModalType("patient Details");
                              setModalContent(item);
                            }}
                          >
                            View{" "}
                          </button>
                        </td>

                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          <button
                            className="text-blue-600 underline"
                            onClick={() => {
                              setModalType("Service Details");
                              setModalContent(
                                item?.therapyServiceId?.serviceId
                              );
                            }}
                          >
                            View{" "}
                          </button>
                        </td>

                          {/* <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          <button
                            className="text-blue-600 underline"
                            onClick={() => {
                              setModalType("Address");
                              setModalContent(
                                item?.therapyServiceId
                              );
                            }}
                          >
                            View{" "}
                          </button>
                        </td> */}


                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px]  break-words whitespace-nowrap">
                          {new Date(item?.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </td>

                        <td className="border border-gray-300 px-4 py-2">
                          {item?.approvedDate
                            ? new Date(item.approvedDate).toLocaleDateString(
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
                          {item?.approvedTime || "-"}
                        </td>

                        {/* <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          {item?.therapyServiceId?.city}
                        </td> */}
                        {/* <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          {item?.therapyServiceId?.price}
                        </td> */}

                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          <button
                            className="bg-blue-600 px-1 py-1 text-white font-medium  whitespace-nowrap rounded"
                            onClick={() => active(item?._id)}
                          >
                            Active Thearpy
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                ) : selectedContent === "active" ? (
                  allActiveTreatment.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center text-2xl font-medium"
                      >
                        No Data Found
                      </td>
                    </tr>
                  ) : (
                    allActiveTreatment.map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          {index + 1}
                        </td>

                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          {item?.patientDetail?.fullName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          {item?.patientDetail?.email}
                        </td>

                        <td className="border border-gray-300 px-4 py-2 max-w-[200px] whitespace-normal break-words text-lg text-center ">
                          <button
                            className="text-blue-600 underline"
                            onClick={() => {
                              setActiveModalType("patient Details");
                              setActiveModalContent(item?.patientDetail);
                            }}
                          >
                            <FaRegEye />
                          </button>
                        </td>

                        <td className="border border-gray-300 px-4 py-2  text-lg text-center max-w-[200px] whitespace-normal break-words">
                          <button
                            className="text-blue-600 underline"
                            onClick={() => {
                              setActiveModalType("Service Details");
                              setActiveModalContent(
                                item?.therapyServiceId?.serviceId
                              );
                            }}
                          >
                            <FaRegEye />
                          </button>
                        </td>

                        <td className="border border-gray-300 px-4 py-2 text-lg text-center max-w-[200px] whitespace-normal break-words">
                          <button
                            className="text-blue-600 underline"
                            onClick={() => {
                              setActiveModalType("therapies");
                              setActiveModalContent(item?.therapies);
                            }}
                          >
                            <FaRegEye />
                          </button>
                        </td>

                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          {item?.therapyStatus}
                        </td>

                        <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          <select
                            value={therapyStatus}
                            onChange={(e) =>
                              handleChnageStatusThearpy(e, item?.appointmentId)
                            }
                            className="w-full  px-3 py-2 rounded"
                          >
                            <option value="ONGOING">Ongoing</option>
                            <option value="COMPLETE">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {activeModelContent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold ">{activeModalType}</h1>

              <button
                className="ml-auto  text-red-600 font-semibold text-3xl"
                onClick={() => {
                  setActiveModalContent(null);
                  setActiveModalType(null);
                }}
              >
                <RxCross2 />
              </button>
            </div>

            {activeModalType === "patient Details" && (
              <div>
                <p>
                  <strong>Name:</strong> {activeModelContent.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {activeModelContent?.email}
                </p>
                <p>
                  <strong>phoneNumber:</strong>{" "}
                  {activeModelContent?.phoneNumber}
                </p>
                <p>
                  <strong>Gender:</strong> {activeModelContent?.gender}
                </p>
                <p>
                  <strong>Date of Birthday:</strong>{" "}
                  {new Date(activeModelContent?.dob).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {activeModelContent?.description}
                </p>
              </div>
            )}


             {activeModalType === "Address" && (
              <div>
                <p>
                  <strong>Country:</strong> {modalContent.country}
                </p>

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

            {activeModalType === "Service Details" && (
              <div>
                <p>
                  <strong>Service Name:</strong>
                  {activeModelContent.serviceName}
                </p>

                <p>
                  <strong>Features:</strong>{" "}
                  {activeModelContent.features.join(", ")}
                </p>
              </div>
            )}

            {activeModalType === "notes" && (
              <div>
                <p>{activeModelContent}</p>
              </div>
            )}

            {activeModalType === "therapies" &&
              Array.isArray(activeModelContent) && (
                <div>
                  <table className="w-full border border-gray-300 text-left">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Session Date</th>
                        <th className="p-2 border">Amount Paid by Patien</th>
                        <th className="p-2 border">Payment Status</th>
                        <th className="p-2 border">Payment Method Used</th>
                        <th className="p-2 border">Treatment Notes</th>
                        <th className="p-2 border">Next Appointment</th>
                        <th className="p-2 border">Actions</th>
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
                          <td className="p-2 border">
                            <button
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                              onClick={() => {
                                setActiveModalContent(null);
                                setActiveModalType(null);
                                setEditID(session._id);
                                setActiveEdit(true);
                                setNextAppoinment(
                                  session.nextAppointment || ""
                                );
                                setCharges(session.charges || "");
                                setPaymentStatus(
                                  session.paymentStatus || "PAID"
                                );
                                setPaymentMethod(
                                  session.paymentMethod || "CASH"
                                );

                                setTherapyStatus(
                                  session.therapyStatus || "ONGOING"
                                );
                              }}
                            >
                              Edit
                            </button>
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

            {modalType === "patient Details" && (
              <div>
                <p>
                  <strong>Name:</strong> {modalContent.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {modalContent?.email}
                </p>
                <p>
                  <strong>Status:</strong> {modalContent?.phoneNumber}
                </p>
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


             {modalType === "Address" && (
              <div>
                <p>
                  <strong>Country:</strong> {modalContent.country}
                </p>

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

      {activeEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4 text-center">
              Active Thearpy
            </h2>

            <form
              onSubmit={(e) => handleUpdateAddThearpy(e, editId)}
              className="max-w-4xl mx-auto p-6 border rounded-lg shadow bg-white"
            >
              <h2 className="text-xl font-semibold mb-4">Submit Treatment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">
                    Next Appoinement
                  </label>
                  <input
                    type="datetime-local"
                    value={nextAppointment}
                    onChange={(e) => setNextAppoinment(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Amount Paid by Patien
                  </label>
                  <input
                    type="number"
                    value={charges}
                    onChange={(e) => setCharges(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="PAID">Paid</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Payment Method Used
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="CASH">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="CARD">CARD</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>

                {/* <div className="md:col-span-2">
                  <label className="block font-medium mb-1">
                    Treatment Notes
                  </label>
                  <textarea
                    value={treatmentNotes}
                    onChange={(e) => setTreatmentNotes(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows="3"
                    required
                  />
                </div> */}

                <div className="col-span-2">
                  <label className="block font-medium mb-1">
                    Therapy Status
                  </label>
                  <select
                    value={therapyStatus}
                    onChange={(e) => setTherapyStatus(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETE">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-6 gap-3">
                <button
                  type="button"
                  onClick={() => setActiveEdit((pre) => !pre)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
              </div>
            </form>
          </div>
        </div>
      )}

      {addTherapyModel && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4 text-center">
              Active Thearpy
            </h2>

            <form
              onSubmit={handleAddThearpy}
              className="max-w-4xl mx-auto p-6 border rounded-lg shadow bg-white"
            >
              <h2 className="text-xl font-semibold mb-4">Submit Treatment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">
                    Session Start
                  </label>
                  <input
                    type="datetime-local"
                    value={sessionStart}
                    onChange={(e) => setSessionStart(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Next Appointment
                  </label>
                  <input
                    type="datetime-local"
                    value={nextAppointment}
                    onChange={(e) => setNextAppoinment(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Amount Paid by Patient
                  </label>
                  <input
                    type="number"
                    value={charges}
                    onChange={(e) => setCharges(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    . Patient Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="PAID">Paid</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Payment Method Used
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="CASH">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="CARD">CARD</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Patient Complaint & Onset History (subjective history)
                  </label>
                  <textarea
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Pain assessment
                  </label>
                  <textarea
                    value={pain}
                    onChange={(e) => setPain(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Medical/Surgical History + Medications
                  </label>
                  <textarea
                    value={medical}
                    onChange={(e) => setMedical(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                     Observation & Assessment Findings
                  </label>
                  <textarea
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                     Provisional Diagnosis & Therapy Goals
                  </label>
                  <textarea
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                     Treatment Goals
                  </label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="SHORT">Choose Treament Goal</option>
                    <option value="SHORT">Short Term</option>
                    <option value="LONG">Long Term</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-6 gap-3">
                <button
                  type="button"
                  onClick={() => setAddTherapyModel((pre) => !pre)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Treatments;
