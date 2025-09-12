import React, { useEffect, useState } from "react";
import Header from "../../../Header/Header";
import Sidebar from "../../../Sidebar/Sidebar";
import Pagination from "../../../Pagination/Pagination";
import { calculateAge } from "../../../utils";

import Cookies from "js-cookie";
import { useFetcher, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { RxCross2 } from "react-icons/rx";
import { FaRegEye } from "react-icons/fa";

const ReqRefund = () => {
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
  const [loadingAppointmentId, setLoadingAppointmentId] = useState(null);


  console.log(allApointment, "all apointment")

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
      console.log("refunds", data?.data);
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

  const handleRequestCoupon = async (appointmentId) => {
  const token = Cookies.get("accessToken");
  if (!token) {
    toast.error("You are not logged in. Please log in.", {
      position: "top-right",
    });
    navigate("/login");
    return;
  }
  setBtnLoading(true);
  setLoadingAppointmentId(appointmentId);
  try {
    const res = await fetch(
      `https://physiotherapy-1.onrender.com/apis/requestCoupon/requestCoupon`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ appointmentId }),
      }
    );
    const result = await res.json();

    if (result.success) {
      toast.success("Your Coupon Request added successfully!", {
        position: "top-right",
      });

      // ✅ Remove the refunded appointment from the table
      setAllAppointment((prev) =>
        prev.filter((appo) => appo._id !== appointmentId)
      );
    } else {
      toast.error(result.message || "Something went wrong.");
    }
  } catch (error) {
    console.error("coupon request", error);
    toast.error(error.message || "Something went wrong. Please try again.");
  } finally {
    setBtnLoading(false);
    setLoadingAppointmentId(null);
  }
};



  // const handleRequestCoupon = async (appointmentId) => {
  //   const token = Cookies.get("accessToken");
  //   if (!token) {
  //     toast.error("You are not logged in. Please log in.", {
  //       position: "top-right",
  //     });
  //     navigate("/login");
  //     return;
  //   }
  //   setBtnLoading(true);
  //   setLoadingAppointmentId(appointmentId);
  //   try {
  //     const res = await fetch(
  //       `https://physiotherapy-1.onrender.com/apis/requestCoupon/requestCoupon`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ appointmentId }),
  //       }
  //     );
  //     const result = await res.json();

  //     if (result.success) {
  //       toast.success("Your Coupon Request added successfully!", {
  //         position: "top-right",
  //       });
  //       fetchAppointmentData();
  //     } else {
  //       toast.error(result.message);
  //     }
  //   } catch (error) {
  //     console.error("coupon request", error);
  //     toast.error(error.message || "Something want wrong plz try again");
  //   } finally {
  //     fetchAppointmentData();
  //     setLoadingAppointmentId(null);
  //   }
  // };

  return (

    <div>

   
    <div className="flex h-screen overflow-x-hidden">
      

      <div className="flex-1 flex flex-col overflow-hidden">
      
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold ">Refunds</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4"></div>
          </div>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-[#1E2A3A] text-white">
                <tr>
                  <th className="px-4 py-2">Serial No</th>
                  <th className="px-4 py-2">Patient Name</th>
                  <th className="px-4 py-2">Patient Details</th>
                  <th className="px-4 py-2">Service Details</th>
                  <th className="px-4 py-2">Booking Date</th>
                  {showAppointmentInfo && (
                    <>
                      <th className="px-4 py-2">Appointment Date</th>
                      <th className="px-4 py-2">Approved Time</th>
                    </>
                  )}

                  
                  {/* <th className="px-4 py-2"> Service Location</th> */}
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

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {appo?.fullName}
                      </td>

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
                              setModalType("Want Details ?");
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

                      

                      {/* <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {appo?.therapyServiceId?.city}
                      </td> */}

                      {/* <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                          <button
                            className="text-blue-600 underline"
                            onClick={() => {
                              setModalType("Address");
                              setModalContent(
                                appo?.therapyServiceId
                              );
                            }}
                          >
                            View{" "}
                          </button>
                        </td> */}


                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {appo?.therapyServiceId?.price}
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {appo.couponRequest ? (
                          <button
                            disabled
                            className="bg-gray-400 text-white text-sm px-2 py-1 rounded font-medium cursor-not-allowed"
                          >
                            Req Coupon
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRequestCoupon(appo?._id)}
                            className={`bg-blue-950 text-white text-sm px-2 py-1 rounded font-medium whitespace-nowrap text-center`}
                          >
                            {loadingAppointmentId === appo._id ? (
                              <ThreeDots
                                visible={true}
                                height="20"
                                width="40"
                                color="#fff"
                                radius="9"
                                ariaLabel="three-dots-loading"
                              />
                            ) : (
                              "Req Coupon"
                            )}
                          </button>
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
            {modalType === "Want Details ?" && (
              <div>
                <p>Wants to See Details Just Approved Appoiment</p>
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
    </div>
     </div>
  );
};

export default ReqRefund;
