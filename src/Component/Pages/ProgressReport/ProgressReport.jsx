import React, { useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import Header from '../../../Header/Header';
import Pagination from '../../../Pagination/Pagination';
import { useAppContext } from '../../../context/AppContext';

const ProgressReport = () => {

  const { data, setData } = useAppContext();

  // const [progressReports, setProgressReports] = useState([
  //   {
  //     id: 1,
  //     patientName: 'John Doe',
  //     physiotherapistName: 'Dr. Smith',
  //     date: '2024-04-20',
  //     treatmentType: 'Physical Therapy',
  //     initialCondition: 'Severe back pain',
  //     currentCondition: 'Mild back pain',
  //     exercisesAssigned: 'Stretching and core strengthening',
  //     therapistObservations: 'Good improvement',
  //     patientFeedback: 'Feeling better day by day',
  //     progressScore: '80%',
  //     nextReviewDate: '2024-05-20',
  //     status: 'Ongoing',
  //   },
  //   {
  //     id: 2,
  //     patientName: 'Jane Doe',
  //     physiotherapistName: 'Dr. Brown',
  //     date: '2024-04-22',
  //     treatmentType: 'Sports Injury Rehab',
  //     initialCondition: 'Knee ligament tear',
  //     currentCondition: 'Recovering',
  //     exercisesAssigned: 'Resistance band exercises',
  //     therapistObservations: 'Moderate progress',
  //     patientFeedback: 'Able to walk properly',
  //     progressScore: '70%',
  //     nextReviewDate: '2024-05-25',
  //     status: 'Ongoing',
  //   },
  //   // Add more dummy reports if needed
  // ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    physiotherapistName: '',
    date: '',
    treatmentType: '',
    initialCondition: '',
    currentCondition: '',
    exercisesAssigned: '',
    therapistObservations: '',
    patientFeedback: '',
    progressScore: '',
    nextReviewDate: '',
    status: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = data.slice(indexOfFirstReport, indexOfLastReport);

  const totalPages = Math.ceil(data.length / reportsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (report) => setSelectedReport(report);
  const closeModal = () => setSelectedReport(null);

  const handleAddChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: data.length + 1,
      ...formData,
    };
    setData([newReport, ...data]);
    setShowAddModal(false);
    setFormData({
      patientName: '',
      physiotherapistName: '',
      date: '',
      treatmentType: '',
      initialCondition: '',
      currentCondition: '',
      exercisesAssigned: '',
      therapistObservations: '',
      patientFeedback: '',
      progressScore: '',
      nextReviewDate: '',
      status: '',
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);

  const handleEditClick = (report) => {
    setCurrentReport({ ...report });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSaveChanges = () => {
    setData((prev) =>
      prev.map((item) =>
        item.id === currentReport.id ? currentReport : item
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage="/progress-reports" />
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Progress Reports</h2>
              {/* <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Add
              </button> */}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm md:text-base text-gray-700">
                <thead className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-xs md:text-sm">
                  <tr>
                    <th className="px-3 py-2 text-left">Date</th>
                    <th className="px-3 py-2 text-left">Patient</th>
                    {/* <th className="px-3 py-2">Physiotherapist</th> */}
                    <th className="px-3 py-2 text-left">Treatment Type</th>
                    <th className="px-3 py-2 text-left">Patient Feedback</th>
                    <th className="px-3 py-2 text-left">Progress</th>
                    <th className="px-3 py-2 text-left">Next Review</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((report) => (
                    report.appointment_status === "Confirmed" &&
                    <tr key={report.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2">{report.date || "-"}</td>
                      <td className="px-3 py-2">{report.patient_name}</td>
                      {/* <td className="px-3 py-2">{report.physiotherapistName}</td> */}
                      <td className="px-3 py-2">
                        <button
                          onClick={() => openModal(report)}
                          className="text-blue-600 hover:underline text-sm md:text-base"
                        >
                          View Details
                        </button>
                      </td>
                      <td className="px-3 py-2">{report.patientFeedback || "-"}</td>
                      <td className="px-3 py-2 font-semibold">{report.progressScore || "-"}</td>
                      <td className="px-3 py-2">{report.nextAppointment || "-"}</td>
                      <td className="px-3 py-2">{report.status || "-"}</td>
                      <td className="py-3 px-4 text-sm">
                        <button
                          onClick={() => handleEditClick(report)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {
                    data.filter((data) => data.appointment_status === "Confirmed").length === 0 &&
                    <tr>
                      <td colSpan={10} className="text-center py-5">No Data Found</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
          {isModalOpen && currentReport && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h3 className="text-xl font-bold mb-4">Edit Report</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Initial Condition</label>
                    <input
                      type="text"
                      name="initialCondition"
                      value={currentReport?.initialCondition}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Current Condition</label>
                    <input
                      type="text"
                      name="currentCondition"
                      value={currentReport?.currentCondition}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Exercises Assigned</label>
                    <textarea
                      name="exercisesAssigned"
                      value={currentReport?.exercisesAssigned}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      rows="3"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Therapist Observations</label>
                    <input
                      type="text"
                      name="therapistObservations"
                      value={currentReport?.therapistObservations}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Patient Feedback</label>
                    <input
                      type="text"
                      name="patientFeedback"
                      value={currentReport?.patientFeedback}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Progress Score</label>
                    <input
                      type="text"
                      name="progressScore"
                      value={currentReport?.progressScore}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                 
                  <div>
                    <label className="block text-sm font-medium">Status</label>
                    <input
                      type="text"
                      name="status"
                      value={currentReport?.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                 
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
      {selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">Treatment Details</h3>
            <div className="space-y-3 text-gray-700 text-sm md:text-base">
              <p><span className="font-semibold">Treatment Type:</span> {selectedReport.service_type || "-"}</p>
              <p><span className="font-semibold">Treatment Description:</span> {selectedReport.service_description || "-"}</p>
              <p><span className="font-semibold">Initial Condition:</span> {selectedReport.initialCondition || "-"}</p>
              <p><span className="font-semibold">Current Condition:</span> {selectedReport.currentCondition || "-"}</p>
              <p><span className="font-semibold">Exercises Assigned:</span> {selectedReport.exercisesAssigned || "-"}</p>
              <p><span className="font-semibold">Therapist Notes:</span> {selectedReport.therapistObservations || "-"}</p>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">Add New Progress Report</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              {Object.keys(formData).map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="text-sm font-semibold capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
                  {key === 'status' ? (
                    <select
                      name={key}
                      value={formData[key]}
                      onChange={handleAddChange}
                      className="border rounded px-3 py-2"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : key === 'date' || key === 'nextReviewDate' ? (
                    <input
                      type="date"
                      name={key}
                      value={formData[key]}
                      onChange={handleAddChange}
                      className="border rounded px-3 py-2"
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleAddChange}
                      className="border rounded px-3 py-2"
                      required
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white text-sm rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProgressReport;
