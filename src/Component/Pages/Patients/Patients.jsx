

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

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { calculateAge } from "../../../utils";

function Patients() {
  const [patientHistory, setPatientHistory] = useState([]);
  const [loader, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModalType, setActiveModalType] = useState(null);
  const [activeModelContent, setActiveModalContent] = useState(null);
  const navigate = useNavigate();

  const fetchPatientHistory = async () => {
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
        "https://physiotherapy-1.onrender.com/apis/therapy-progress/patientTherapyHistory",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("allHistory", data);
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
    fetchPatientHistory();
  }, []);

  const handleExport = (type, months) => {
    const now = new Date();
    const cutoffDate = new Date();
    cutoffDate.setMonth(now.getMonth() - months);

    const filteredData = patientHistory.filter((item) => {
      const therapies = item.therapies || [];
      return therapies.some((t) => new Date(t.sessionStart) >= cutoffDate);
    });

    if (type === "pdf") {
      exportPDF(filteredData);
    } else if (type === "excel") {
      exportExcel(filteredData);
    }
  };

  const exportPDF = (data) => {
    const doc = new jsPDF({ orientation: "portrait" });
    doc.setFontSize(16);
    doc.text("Patient Therapy History", 14, 15);

    let yPos = 25;

    data.forEach((item, index) => {
      const patient = item?.patientDetail || {};
      const service = item?.therapyServiceId?.serviceId || {};
      const therapies = item.therapies || [];

      // Add patient header
      doc.setFontSize(13);
      doc.text(
        `Patient #${index + 1} - ${patient.fullName || "N/A"}`,
        14,
        yPos
      );
      yPos += 7;

      // Add patient details block
      doc.setFontSize(10);
      const patientDetailsLines = [
        `Email: ${patient.email || "N/A"}`,
        `Phone: ${patient.phoneNumber || "N/A"}`,
        `Gender: ${patient.gender || "N/A"}`,
        `DOB: ${
          patient.dob ? new Date(patient.dob).toLocaleDateString() : "N/A"
        }`,
      ];
      patientDetailsLines.forEach((line) => {
        doc.text(line, 14, yPos);
        yPos += 5;
      });

      // Add service details block
      const serviceDetailsLines = [
        `Service Name: ${service.serviceName || "N/A"}`,
        `Features: ${(service.features || []).join(", ") || "N/A"}`,
        `Therapy Status: ${item.therapyStatus || "N/A"}`,
      ];
      serviceDetailsLines.forEach((line) => {
        doc.text(line, 14, yPos);
        yPos += 5;
      });

      // Add some spacing
      yPos += 5;

      // Add therapies table title
      if (therapies.length > 0) {
        doc.setFontSize(12);
        doc.text("Therapies:", 14, yPos);
        yPos += 6;

        const therapyTableData = therapies.map((t) => [
          new Date(t.sessionStart).toLocaleDateString(),
          `₹${t.charges}`,
          t.paymentStatus || "N/A",
          t.paymentMethod || "N/A",
          t.treatmentNotes || "N/A",
          t.nextAppointment
            ? new Date(t.nextAppointment).toLocaleDateString()
            : "N/A",
        ]);

        autoTable(doc, {
          startY: yPos,
          head: [
            [
              "Session Date",
              "Charges",
              "Payment Status",
              "Payment Method",
              "Treatment Notes",
              "Next Appointment",
            ],
          ],
          body: therapyTableData,
          styles: { fontSize: 9 },
          margin: { left: 14, right: 14 },
          theme: "grid",
          didDrawPage: (data) => {
            yPos = data.cursor.y + 10;
          },
        });
      } else {
        doc.setFontSize(10);
        doc.text("No therapies recorded.", 14, yPos);
        yPos += 10;
      }

      // Add a page break if not enough space for next patient
      if (
        index !== data.length - 1 &&
        yPos > doc.internal.pageSize.height - 50
      ) {
        doc.addPage();
        yPos = 20;
      } else {
        yPos += 10;
      }
    });

    doc.save("Patient_Therapy_History.pdf");
  };

  const exportExcel = (data) => {
    const combinedData = [];

    data.forEach((item, index) => {
      const patient = item?.patientDetail || {};
      const service = item?.therapyServiceId?.serviceId || {};
      const therapies = item?.therapies || [];

      // If no therapies, still push one row
      if (therapies.length === 0) {
        combinedData.push({
          "Patient #": `#${index + 1}`,
          "Patient Name": patient.fullName || "N/A",
          "Patient Email": patient.email || "N/A",
          Phone: patient.phoneNumber || "N/A",
          Gender: patient.gender || "N/A",
          DOB: patient.dob ? new Date(patient.dob).toLocaleDateString() : "N/A",
          "Service Name": service.serviceName || "N/A",
          "Service Features": (service.features || []).join(", "),
          "Therapy Status": item.therapyStatus || "N/A",
          "Session Date": "-",
          Charges: "-",
          "Payment Status": "-",
          "Payment Method": "-",
          "Treatment Notes": "-",
          "Next Appointment": "-",
        });
      } else {
        therapies.forEach((t) => {
          combinedData.push({
            "Patient #": `#${index + 1}`,
            "Patient Name": patient.fullName || "N/A",
            "Patient Email": patient.email || "N/A",
            Phone: patient.phoneNumber || "N/A",
            Gender: patient.gender || "N/A",
            DOB: patient.dob
              ? new Date(patient.dob).toLocaleDateString()
              : "N/A",
            "Service Name": service.serviceName || "N/A",
            "Service Features": (service.features || []).join(", "),
            "Therapy Status": item.therapyStatus || "N/A",
            "Session Date": new Date(t.sessionStart).toLocaleDateString(),
            Charges: t.charges,
            "Payment Status": t.paymentStatus,
            "Payment Method": t.paymentMethod,
            "Treatment Notes": t.treatmentNotes,
            "Next Appointment": t.nextAppointment
              ? new Date(t.nextAppointment).toLocaleDateString()
              : "N/A",
          });
        });
      }
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(combinedData);
    XLSX.utils.book_append_sheet(wb, ws, "Patient Therapies");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "Patient_History_Detailed.xlsx");
  };

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar activePage="/patients" />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header title="Patients" />
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h1 className="text-2xl font-bold mb-4">Patient List</h1>
            {/* <div className="relative w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search by name, contact, condition, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div> */}

            <div className="w-full sm:w-60">
              <select
                className="w-full p-2 sm:p-2.5 border rounded bg-white text-black text-sm sm:text-base"
                onChange={(e) => {
                  const [type, months] = e.target.value.split("-");
                  handleExport(type, parseInt(months));
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select export option
                </option>
                <option value="pdf-1">Export PDF (1 Month)</option>
                <option value="pdf-2">Export PDF (2 Months)</option>
                <option value="pdf-3">Export PDF (3 Months)</option>
                <option value="excel-1">Export Excel (1 Month)</option>
                <option value="excel-2">Export Excel (2 Months)</option>
                <option value="excel-3">Export Excel (3 Months)</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#1E2A3A] text-white">
                <tr>
                  <th className="py-3 px-4 text-sm text-left">Serial ID</th>
                  <th className="py-3 px-4 text-sm text-left">Patient Name</th>
                  {/* <th className="py-3 px-4 text-sm text-left">Patient Email</th> */}

                  <th className="py-3 px-4 text-sm text-left">
                    Patient Details
                  </th>

                  <th className="py-3 px-4 text-sm text-left">
                    Service Details
                  </th>

                  <th className="py-3 px-4 text-sm text-left">Therapies</th>
                  <th className="py-3 px-4 text-sm text-left">Status</th>
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
                 patientHistory.reverse().map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {index + 1}
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {item?.patientDetail?.fullName}
                      </td>
                      {/* <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                        {item?.patientDetail?.email}
                      </td> */}

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
                            console.log(
                              "log",
                              item?.therapyServiceId?.serviceId
                            );
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

                      <td
                        className={` text-gray-700 border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words ${
                          item?.therapies?.[0]?.therapyStatus === "COMPLETE"
                            ? "text-green-700 font-semibold "
                            : "text-red-700 font-medium"
                        }`}
                      >
                        {/* {item?.therapyStatus} */}
                        {item?.therapies?.[0]?.therapyStatus || "N/A"}
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
        // <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        //   <div className="bg-white p-6 rounded-lg min-w-[400px] max-w-full w-fit">
        //     <div className="flex justify-between items-center mb-4">
        //       <h1 className="text-2xl font-semibold ">{activeModalType}</h1>

        //       <button
        //         className="ml-auto  text-red-600 font-semibold text-3xl"
        //         onClick={() => {
        //           setActiveModalContent(null);
        //           setActiveModalType(null);
        //         }}
        //       >
        //         <RxCross2 />
        //       </button>
        //     </div>

        //     {activeModalType === "patient Details" && (
        //       <div>
        //         <p>
        //           <strong>Name:</strong> {activeModelContent.fullName}
        //         </p>
        //         <p>
        //           <strong>Email:</strong> {activeModelContent?.email}
        //         </p>
        //         <p>
        //           <strong>phoneNumber:</strong>{" "}
        //           {activeModelContent?.phoneNumber}
        //         </p>
        //         <p>
        //           <strong>Gender:</strong> {activeModelContent?.gender}
        //         </p>
        //         <p>
        //           <strong>Date of Birthday:</strong>{" "}
        //           {new Date(activeModelContent?.dob).toLocaleDateString(
        //             "en-GB",
        //             {
        //               day: "2-digit",
        //               month: "short",
        //               year: "numeric",
        //             }
        //           )}
        //         </p>
        //         <p>
        //           <strong>Description:</strong>{" "}
        //           {activeModelContent?.description}
        //         </p>
        //       </div>
        //     )}

        //     {activeModalType === "Service Details" && (
        //       <div>
        //         <p>
        //           <strong>Service Name:</strong>
        //           {activeModelContent.serviceName}
        //         </p>

        //         <p>
        //           <strong>Features:</strong>{" "}
        //           {activeModelContent.features.join(", ")}
        //         </p>
        //       </div>
        //     )}

        //     {activeModalType === "notes" && (
        //       <div>
        //         <p>{activeModelContent}</p>
        //       </div>
        //     )}

        //     {activeModalType === "therapies" &&
        //       Array.isArray(activeModelContent) && (
        //         <div>
        //           <table className="w-full border border-gray-300 text-left">
        //             <thead>
        //               <tr className="bg-gray-100">
        //                 <th className="p-2 border">Session Date</th>
        //                 <th className="p-2 border">Charges</th>
        //                 <th className="p-2 border">Payment Status</th>
        //                 <th className="p-2 border">Payment Method</th>
        //                 <th className="p-2 border">Treatment Notes</th>
        //                 <th className="p-2 border">Next Appointment</th>

        //               </tr>
        //             </thead>
        //             <tbody>
        //               {activeModelContent.map((session, index) => (
        //                 <tr key={session._id || index}>
        //                   <td className="p-2 border">
        //                     {new Date(session.sessionStart).toLocaleString()}
        //                   </td>
        //                   <td className="p-2 border">₹{session.charges}</td>
        //                   <td className="p-2 border">
        //                     {session.paymentStatus}
        //                   </td>
        //                   <td className="p-2 border">
        //                     {session.paymentMethod}
        //                   </td>
        //                   <td className="p-2 border">
        //                     {session.treatmentNotes}
        //                   </td>
        //                   <td className="p-2 border">
        //                     {session.nextAppointment
        //                       ? new Date(
        //                           session.nextAppointment
        //                         ).toLocaleDateString()
        //                       : "N/A"}
        //                   </td>

        //                 </tr>
        //               ))}
        //             </tbody>
        //           </table>
        //         </div>
        //       )}
        //   </div>
        // </div>
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

            {activeModalType === "patient Details" && (
              <div className="space-y-2 text-sm sm:text-base">
                <p>
                  <strong>Name:</strong> {activeModelContent.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {activeModelContent?.email}
                </p>
                <p>
                  <strong>Phone Number:</strong>{" "}
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
                  <strong>Date of Birth:</strong>{" "}
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

export default Patients;
