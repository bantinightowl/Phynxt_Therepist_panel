import React from "react";

import { VscShare } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

import { IoIosEye } from "react-icons/io";
import { TailSpin } from "react-loader-spinner";
import { all } from "axios";
import { FaRegEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { calculateAge } from "../../../utils";

function AllRefund() {
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
  const [statusFilter, setStatusFilter] = useState("approved");
  const [modalType, setModalType] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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
          `https://physiotherapy-1.onrender.com/apis/requestCoupon/getAllRequestCoupon/${statusFilter}`,
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
        if (data.success && Array.isArray(data.data)) {
          setAllService(data.data);
          console.log("coupon", data?.data);
        } else {
          setAllService([]); // clear old data
        }
      } catch (err) {
        toast.error(err.message || "Something went wrong. Please try again.", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [statusFilter]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h1 className="text-2xl text-gray-800 font-bold sm:mb-6  mb-2 md:text-left">
          All Refund
        </h1>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            console.log("Dropdown changed to:", e.target.value);
          }}
          className="py-2 px-4 rounded"
        >
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px] bg-white shadow-md rounded-lg">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-[#1E2A3A] text-white">
              <tr>
                <th className="  text-base border-l border-t-0  border-gray-300 px-4 py-2">
                  Serial No.
                </th>
                <th className="  text-base border-l border-t-0  border-gray-300 px-4 py-2">
                  Patient Name
                </th>
                <th className="px-4 py-2">Patient Email</th>
                <th className="px-4 py-2">Patient Details</th>
                <th className="px-4 py-2">Service Name</th>
                <th className="px-4 py-2">Service Details</th>
                <th className="px-4 py-2">Session Fee</th>
                <th className="px-4 py-2">Amount</th>

                <th className="px-4 py-2">Status</th>

                {statusFilter === "approved" && (
                  <th className="px-4 py-2">Coupon</th>
                )}
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
            [...allService].reverse().map((appo, index) => (
                  <tr key={appo._id}>
                    <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                      {index + 1}
                    </td>

                    <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                      {appo.appointmentId?.patientId?.fullName}
                    </td>

                    <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                      {appo.appointmentId?.patientId?.fullName}
                    </td>

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

                    <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                      {
                        appo?.appointmentId?.therapyServiceId?.serviceId
                          ?.serviceName
                      }
                    </td>

                    <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                      <button
                        className="text-blue-600 underline"
                        onClick={() => {
                          setModalType("service Details");
                          setModalContent(appo);
                        }}
                      >
                        View{" "}
                      </button>
                    </td>

                    <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                      {appo?.appointmentId?.therapyServiceId?.price}
                    </td>

                    <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                      {appo?.amount}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                      {appo?.status}
                    </td>

                    {statusFilter === "approved" && (
                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {appo?.couponId?.code || "N/A"}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
                <p>Wants to See More Details Just Approved Appoiment</p>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default AllRefund;
