import React, { useState, useEffect } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";
import Cookies from "js-cookie";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

import { useAppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { calculateAge } from "../../../utils";

function ClinicalAssessments() {
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
  const [paymentStatus, setPaymentStatus] = useState("PAID");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  // const [treatmentNotes, setTreatmentNotes] = useState("");
  const [therapyStatus, setTherapyStatus] = useState("ONGOING");
  const [activeModalType, setActiveModalType] = useState(null);
  const [activeModelContent, setActiveModalContent] = useState(null);
  const [nextAppointment, setNextAppoinment] = useState(null);
  const [activeEdit, setActiveEdit] = useState(false);
  const [editId, setEditID] = useState("");
  const [openRows, setOpenRows] = useState({});

  const [complaint, setComplaint] = useState(null);
  const [pain, setPain] = useState(null);
  const [medical, setMedical] = useState(null);
  const [observation, setObservation] = useState(null);
  const [goal, setGoal] = useState(null);
  const [period, setPeriod] = useState("");

  const navigate = useNavigate();

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
  }, []);

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
    }
  };

  // const handleUpdateAddThearpy = async (e, id) => {
  //   e.preventDefault();

  //   const token = Cookies.get("accessToken");
  //   if (!token) {
  //     toast.error("You are not logged in. Please log in.", {
  //       position: "top-right",
  //     });
  //     navigate("/login");
  //     return;
  //   }

  //   const data = {
  //     nextAppointment,
  //     charges: Number(charges),
  //     paymentStatus,
  //     paymentMethod,

  //     // treatmentNotes,
  //   };
  //   setBtnLoading(true);
  //   try {
  //     const res = await fetch(
  //       `https://physiotherapy-1.onrender.com/apis/therapy-progress/updateActiveTherapy/${id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(data),
  //       }
  //     );

  //     const result = await res.json();
  //     console.log("bha", appointmentId);
  //     if (result.success) {
  //       toast.success(" Active Thearpy Edit successfully!", {
  //         position: "top-right",
  //       });

  //       setAppointmentId("");
  //       setSessionStart("");
  //       setCharges("");
  //       setPaymentMethod("");

  //       setTherapyStatus("");
  //     } else {
  //       toast.error(data.message || "Something went wrong", {
  //         position: "top-right",
  //       });
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error.message || "Failed to Add appointment  into Active Threapy.",
  //       {
  //         position: "top-right",
  //       }
  //     );
  //   } finally {
  //     setAppointmentId("");
  //     setSessionStart("");
  //     setCharges("");
  //     setPaymentMethod("");

  //     setTherapyStatus("");
  //     setBtnLoading(false);
  //     setActiveEdit(false);
  //     setAddTherapyModel(false);

  //     fetchActiveTreatment();
  //   }
  // };
  const handleNewAddThearpy = async (e) => {
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
      sessionStart,
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
        `https://physiotherapy-1.onrender.com/apis/therapy-progress/nextAppointmentInActiveTherapy/${appointmentId}`,
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
        setAppointmentId("");
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
      setAppointmentId("");
      setTherapyStatus("");
      fetchActiveTreatment();
      setComplaint(null);
      setPain(null);
      setMedical(null);
      setObservation(null);
      setGoal(null);
      setPeriod(null);
    }
  };

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar activePage="/assesments" />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header title=" Treatment Plan" />
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h1 className="text-2xl font-bold mb-4">Treament Plan</h1>
          </div>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#1E2A3A] text-white">
                <tr>
                  <th className="py-3 px-4 text-sm text-left">Serial ID</th>
                  <th className="py-3 px-4 text-sm text-left">Patient Name</th>
                  <th className="py-3 px-4 text-sm text-left">Patient email</th>

                  <th className="py-3 px-4 text-sm text-left">
                    Patient Details
                  </th>

                  <th className="py-3 px-4 text-sm text-left">
                    Service Details
                  </th>
                  {/* <th className="py-3 px-4 text-sm text-left">
                    Service location
                  </th> */}

                  <th className="py-3 px-4 text-sm text-left">Therapies</th>
                  <th className="py-3 px-4 text-sm text-left">
                    Treatment Goals
                  </th>

                  {/* <th className="py-3 px-4 text-sm text-left">Status</th> */}
                  <th className="py-3 px-4 text-sm text-left">Action</th>
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
                ) : allActiveTreatment.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="text-center text-2xl font-medium"
                    >
                      No Data Found
                    </td>
                  </tr>
                ) : (
                 [...allActiveTreatment].reverse().map((item, index) => (
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
                            setActiveModalContent(item?.therapyServiceId);
                          }}
                        >
                          <FaRegEye />
                        </button>
                      </td>

                      {/* <td className="border border-gray-300 px-4 py-2  text-lg text-center max-w-[200px] whitespace-normal break-words">
                        <button
                          className="text-blue-600 underline"
                          onClick={() => {
                            setActiveModalType("Address");
                            setActiveModalContent(item?.therapyServiceId);
                          }}
                        >
                          <FaRegEye />
                        </button>
                      </td> */}

                      <td className="border border-gray-300 px-4 py-2 text-lg text-center max-w-[200px] whitespace-normal break-words">
                        <button
                          className="text-blue-600 underline"
                          onClick={() => {
                            setActiveModalType("therapies");
                            setAppointmentId(item?.appointmentId);
                            setActiveModalContent(item?.therapies);
                          }}
                        >
                          <FaRegEye />
                        </button>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {item?.therapies?.map((therapy, idx) => (
                          <div key={idx}>{therapy.period}</div>
                        ))}
                      </td>

                      {/* <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {item?.therapyStatus}
                      </td> */}

                      {/* <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
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
                      </td> */}

                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm max-w-[200px] whitespace-normal break-words">
                        <select
                          value={therapyStatus}
                          onChange={(e) =>
                            handleChnageStatusThearpy(e, item?.appointmentId)
                          }
                          className="w-full min-w-0 px-2 py-1 sm:px-3 sm:py-2 rounded border border-gray-300 text-xs sm:text-sm bg-white"
                        >
                          <option value="ONGOING">Ongoing</option>
                          <option value="COMPLETE">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
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
                  <strong>Age:</strong> {calculateAge(activeModelContent?.dob)}{" "}
                  years old
                </p>
                {/* <p>
                  <strong>Date of Birthday:</strong>{" "}
                  {new Date(activeModelContent?.dob).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p> */}
                <p>
                  <strong>Description:</strong>{" "}
                  {activeModelContent?.description}
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

            {activeModalType === "Address" && (
              <div>
                <p>
                  <strong>Country:</strong>
                </p>

                <p>
                  <strong>State:</strong>
                </p>
                <p>
                  <strong>City:</strong>
                </p>
                <p>
                  <strong>Locality:</strong>
                </p>
                <p>
                  <strong>fullAddress:</strong>
                </p>
              </div>
            )}

            {activeModalType === "notes" && (
              <div>
                <p>{activeModelContent}</p>
              </div>
            )}

            {activeModalType === "therapies" && (
              <div className="max-h-[75vh] overflow-y-auto space-y-6 p-4">
                {activeModelContent.map((session, index) => (
                  <div
                    key={session._id || index}
                    className="border rounded-lg shadow-md p-4 bg-white"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <strong>Session Start</strong>{" "}
                        {new Date(session.sessionStart).toLocaleDateString()}
                      </div>

                      <div>
                        <strong>Next Appoinment</strong>{" "}
                        {session.nextAppointment
                          ? new Date(
                              session.nextAppointment
                            ).toLocaleDateString()
                          : "N/A"}
                      </div>
                      <div>
                        <strong>Amount Paid by Patient:</strong> ₹
                        {session.charges}
                      </div>
                      <div>
                        <strong>Payment Status:</strong> {session.paymentStatus}
                      </div>
                      <div>
                        <strong>Payment Method Used:</strong>{" "}
                        {session.paymentMethod}
                      </div>
                    </div>

                    {/* Divider */}
                    <hr className="my-3 border-gray-300" />

                    <div className="space-y-2 text-sm text-gray-700">
                      {session.complaint && (
                        <div>
                          <strong className="block text-gray-800">
                            Patient Complaint & Onset History:
                          </strong>
                          <p className="whitespace-pre-wrap">
                            {session.complaint}
                          </p>
                        </div>
                      )}
                      {session.pain && (
                        <div>
                          <strong className="block text-gray-800">
                            Pain Assessment:
                          </strong>
                          <p className="whitespace-pre-wrap">{session.pain}</p>
                        </div>
                      )}
                      {session.medical && (
                        <div>
                          <strong className="block text-gray-800">
                            Medical/Surgical History + Medications:
                          </strong>
                          <p className="whitespace-pre-wrap">
                            {session.medical}
                          </p>
                        </div>
                      )}
                      {session.observation && (
                        <div>
                          <strong className="block text-gray-800">
                            Observation & Assessment Findings:
                          </strong>
                          <p className="whitespace-pre-wrap">
                            {session.observation}
                          </p>
                        </div>
                      )}
                      {session.goal && (
                        <div>
                          <strong className="block text-gray-800">
                            Provisional Diagnosis & Therapy Goals:
                          </strong>
                          <p className="whitespace-pre-wrap">{session.goal}</p>
                        </div>
                      )}
                      {session.period && (
                        <div>
                          <strong className="block text-gray-800">
                            Treatment Goals (Short & Long Term):
                          </strong>
                          <p className="whitespace-pre-wrap">
                            {session.period}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add New Session Button */}
                <div className="text-center mt-6">
                  <button
                    className="px-5 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
                    onClick={() => {
                      setAddTherapyModel(true);

                      setActiveModalContent(null);
                    }}
                  >
                    ➕ Add New Session
                  </button>
                </div>
              </div>
            )}
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
              onSubmit={handleNewAddThearpy}
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
                    Patient Payment Status
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

                {/* <div>
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
                     */}
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
}

export default ClinicalAssessments;
