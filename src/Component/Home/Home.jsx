import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import { Bar, Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaUser,
  FaShoppingCart,
  FaRupeeSign,
  FaUndo,
  FaCalendarCheck,
  FaUserInjured,
  FaWallet,
  FaEdit,
  FaCog,
  FaMoneyBillWave,
  FaHeadset,
  FaChevronRight,
  FaClinicMedical,
  FaVideo,
  FaHome,
} from "react-icons/fa";
import Modal from "../Modal";
import ProfileModel from "../ProfileModel/ProfileModel";
import GetAllService from "../Pages/TherepyServices/GetAllService";
import AddServices from "../Pages/TherepyServices/AddServices";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [selectedGraph, setSelectedGraph] = useState("appointments");
  const [frequency, setFrequency] = useState("monthly");
  const [appointmentView, setAppointmentView] = useState("day");
  const [allAppointment, setAllAppointment] = useState([]);
  const [allActiveTreatment, setAllActiveTreatment] = useState([]);
  const [profile, setProfile] = useState({});
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [stats, setStats] = useState({
    todayEarnings: 0,
    upcomingAppointments: 0,
    completedSessions: 0,
    walletBalance: 0,
  });

  const navigate = useNavigate();

  const fetchAppointmentData = async () => {
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

      if (data.success) {
        setAllAppointment(data.data);
        // Calculate upcoming appointments count
        const upcoming = data.data.filter(
          (apt) => new Date(apt.date) >= new Date().setHours(0, 0, 0, 0)
        ).length;
        setStats((prev) => ({ ...prev, upcomingAppointments: upcoming }));
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.", {
        position: "top-right",
      });
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
      if (data.success) {
        setAllActiveTreatment(data.data);
        // Calculate completed sessions
        const completed = data.data.filter(
          (t) => t.status === "completed"
        ).length;
        setStats((prev) => ({ ...prev, completedSessions: completed }));
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.", {
        position: "top-right",
      });
    }
  };

  // fatch profile data function
  const fetchProfileDataTest = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }
    // setLoading(true);
    try {
      const response = await fetch(
        "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/getSinglePhysiotherapy",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("allProfile", data.data);
      if (data.success) {
        setProfile(data.data);
        // console.log("First Name:", data.data.physiotherapistId.firstName);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.", {
        position: "top-right",
      });
    } finally {
      // setLoading(false);
    }
  };

  const fetchStatsData = async () => {
    // In a real app, these would come from API calls
    setStats({
      todayEarnings: 7250,
      upcomingAppointments: allAppointment.length,
      completedSessions: allActiveTreatment.length,
      walletBalance: 12500,
    });
  };

  useEffect(() => {
    fetchAppointmentData();
    fetchActiveTreatment();
    fetchProfileDataTest();
  }, []);

  useEffect(() => {
    fetchStatsData();
  }, [allAppointment, allActiveTreatment]);

  const summaryData = [
    {
      title: "Today's Earnings",
      count: "₹" + stats.todayEarnings.toLocaleString(),
      icon: <FaRupeeSign className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-green-500 to-teal-600",
      graphType: "earnings",
    },
    {
      title: "Upcoming Appointments",
      count: stats.upcomingAppointments,
      icon: <FaCalendarCheck className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
      graphType: "appointments",
    },
    {
      title: "Completed Sessions",
      count: stats.completedSessions,
      icon: <FaUserInjured className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-purple-500 to-pink-600",
      graphType: "sessions",
    },
    {
      title: "Wallet Balance",
      count: "₹" + stats.walletBalance.toLocaleString(),
      icon: <FaWallet className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-amber-500 to-orange-600",
      graphType: "wallet",
    },
  ];

  const quickActions = [
    {
      title: "Edit Profile",
      icon: <FaEdit className="text-[#004B87] text-xl" />,
      bg: "bg-blue-50",
      // action: () => navigate("/profile"),
      action: () => setIsProfileModalVisible("edit profile"),
    },
    {
      title: "Manage Services",
      icon: <FaCog className="text-[#009688] text-xl" />,
      bg: "bg-green-50",
      // action: () => navigate("/therapy/addtherapy"),
      action: () => setIsProfileModalVisible("manage services"),
    },
    {
      title: "Wallet & Refunds",
      icon: <FaMoneyBillWave className="text-[#FFC107] text-xl" />,
      bg: "bg-yellow-50",
      action: () => navigate("/refund/reqrefund"),
    },
    {
      title: "Support",
      icon: <FaHeadset className="text-[#002B45] text-xl" />,
      bg: "bg-purple-50",
      action: () => navigate("/support"),
    },
  ];

  // Fixed: Use current date for mock data
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const upcomingAppointments = [
    {
      patient: "John Doe",
      service: "Neck Therapy",
      time: "10:00 AM",
      mode: "Clinic",
      status: "Confirmed",
      date: formatDate(today),
    },
    {
      patient: "Jane Smith",
      service: "Knee Rehab",
      time: "11:30 AM",
      mode: "Home",
      status: "Confirmed",
      date: formatDate(today),
    },
    {
      patient: "Michael Lee",
      service: "Back Pain Relief",
      time: "2:00 PM",
      mode: "Online",
      status: "Pending",
      date: formatDate(tomorrow),
    },
    {
      patient: "Sarah Johnson",
      service: "Post-Surgery Rehab",
      time: "4:30 PM",
      mode: "Clinic",
      status: "Confirmed",
      date: formatDate(tomorrow),
    },
    {
      patient: "Robert Brown",
      service: "Sports Injury",
      time: "9:00 AM",
      mode: "Clinic",
      status: "Confirmed",
      date: formatDate(dayAfterTomorrow),
    },
  ];

  const modeIcons = {
    Clinic: <FaClinicMedical className="text-[#004B87]" />,
    Online: <FaVideo className="text-[#009688]" />,
    Home: <FaHome className="text-[#FFC107]" />,
  };

  const statusColors = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const labels = {
    daily: Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 6 + i);
      return date.toLocaleDateString("en-US", { weekday: "short" });
    }),
    weekly: Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`),
    monthly: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  const generateData = (type) => {
    const baseData = {
      appointments:
        frequency === "daily"
          ? [4, 6, 7, 5, 9, 10, 8]
          : frequency === "weekly"
          ? [25, 30, 28, 35]
          : [120, 150, 130, 140, 160, 180, 175, 190, 210, 200, 220, 240],

      earnings:
        frequency === "daily"
          ? [3500, 4200, 3800, 5100, 6200, 5800, 6500]
          : frequency === "weekly"
          ? [22000, 25000, 24000, 28000]
          : [
              120000, 140000, 130000, 150000, 160000, 180000, 175000, 190000,
              210000, 200000, 220000, 240000,
            ],

      sessions:
        frequency === "daily"
          ? [8, 10, 9, 12, 15, 14, 16]
          : frequency === "weekly"
          ? [45, 50, 48, 55]
          : [200, 220, 210, 230, 250, 270, 260, 280, 300, 290, 310, 330],
    };

    const colors = {
      appointments: "#004B87",
      earnings: "#009688",
      sessions: "#FFC107",
    };

    return {
      labels: labels[frequency],
      datasets: [
        {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
          data: baseData[type],
          backgroundColor: colors[type],
          borderColor: colors[type],
          borderWidth: 2,
          borderRadius: 6,
          tension: type === "earnings" ? 0.4 : 0,
        },
      ],
    };
  };

  // Fixed: Correct date filtering logic
  const filterAppointmentsByView = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentView === "day") {
      return upcomingAppointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        return aptDate.toDateString() === today.toDateString();
      });
    } else {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return upcomingAppointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        return aptDate >= startOfWeek && aptDate <= endOfWeek;
      });
    }
  };

  const filteredAppointments = filterAppointmentsByView();

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar activePage="/" />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 p-4 bg-gray-50 overflow-y-auto overflow-x-hidden">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#002B45]">Daily Summary</h1>
          </div>

          {/* Stats Cards - Unchanged as requested */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {summaryData.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl shadow-sm text-white flex items-center justify-between ${item.bg} cursor-pointer transition-transform hover:scale-105`}
                onClick={() => {
                  if (item.title !== "Wallet Balance")
                    setSelectedGraph(item.graphType);
                }}
              >
                <div>
                  <p className="text-sm font-medium opacity-90">{item.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{item.count}</h3>
                </div>
                <div className="p-3 bg-white bg-opacity-20 rounded-full">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Chart and Appointments */}
            <div className="w-full lg:w-8/12">
              {/* Chart Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                  <h2 className="text-xl font-semibold text-[#002B45] mb-2 sm:mb-0">
                    Performance Overview
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <select
                      className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#004B87] focus:border-transparent"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                    <select
                      className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#004B87] focus:border-transparent"
                      value={selectedGraph}
                      onChange={(e) => setSelectedGraph(e.target.value)}
                    >
                      <option value="appointments">Appointments</option>
                      <option value="earnings">Earnings</option>
                      <option value="sessions">Sessions</option>
                    </select>
                  </div>
                </div>

                <div className="h-80">
                  {selectedGraph && (
                    <Bar
                      data={generateData(selectedGraph)}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: {
                              drawBorder: false,
                            },
                          },
                          x: {
                            grid: {
                              display: false,
                            },
                          },
                        },
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                  <h2 className="text-xl font-semibold text-[#002B45] mb-2 sm:mb-0">
                    Upcoming Appointments
                  </h2>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden w-full sm:w-auto">
                    <button
                      className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium transition-colors ${
                        appointmentView === "day"
                          ? "bg-[#004B87] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setAppointmentView("day")}
                    >
                      Day
                    </button>
                    <button
                      className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium transition-colors ${
                        appointmentView === "week"
                          ? "bg-[#004B87] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setAppointmentView("week")}
                    >
                      Week
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-500 text-sm border-b">
                        <th className="pb-3 font-medium">Patient Name</th>
                        <th className="pb-3 font-medium">Service</th>
                        <th className="pb-3 font-medium">Time</th>
                        <th className="pb-3 font-medium">Mode</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredAppointments.map((appt, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="py-4">
                            <div className="font-medium text-[#002B45]">
                              {appt.patient}
                            </div>
                          </td>
                          <td className="py-4 text-sm text-gray-700">
                            {appt.service}
                          </td>
                          <td className="py-4 text-sm text-gray-700">
                            {appt.time}
                          </td>
                          <td className="py-4">
                            <div className="flex items-center text-sm">
                              {modeIcons[appt.mode]}
                              <span className="ml-1">{appt.mode}</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                statusColors[appt.status]
                              }`}
                            >
                              {appt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredAppointments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No appointments scheduled for this {appointmentView}.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="w-full lg:w-4/12">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-[#002B45] mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                      onClick={action.action}
                    >
                      <div className={`p-3 rounded-full ${action.bg}`}>
                        {action.icon}
                      </div>
                      <div className="ml-4 flex-1 text-left">
                        <p className="font-medium text-[#002B45]">
                          {action.title}
                        </p>
                      </div>
                      <FaChevronRight className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-[#002B45] mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaUserInjured className="text-[#004B87]" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-[#002B45]">
                        New appointment booked
                      </p>
                      <p className="text-xs text-gray-500">
                        John Doe - Neck Therapy
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full">
                      <FaRupeeSign className="text-[#009688]" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-[#002B45]">
                        Payment received
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹1,500 for session completed
                      </p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <FaCalendarCheck className="text-[#002B45]" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-[#002B45]">
                        Appointment rescheduled
                      </p>
                      <p className="text-xs text-gray-500">
                        Sarah Johnson - Post-Surgery Rehab
                      </p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Profile Modal */}
      <Modal
        isOpen={isProfileModalVisible === "edit profile"}
        onClose={() => setIsProfileModalVisible(false)}
        title="Edit Profile"
        maxWidth={800}
      >
        <ProfileModel
          profile={profile}
          fetchProfileDataTest={fetchProfileDataTest}
        />
      </Modal>

      {/* Add service  Modal */}
      <Modal
        isOpen={isProfileModalVisible === "add service"}
        onClose={() => setIsProfileModalVisible(false)}
        title="Manage Services"
        maxWidth={1200}
      >
        <AddServices />
      </Modal>

      {/* Manage Service Modal */}
      <Modal
        isOpen={isProfileModalVisible === "manage services"}
        onClose={() => setIsProfileModalVisible(false)}
        title="Manage Services"
        maxWidth={1200}
      >
        <GetAllService />
      </Modal>
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../../Sidebar/Sidebar";
// import Header from "../../Header/Header";
// import { Bar } from "react-chartjs-2";
// import { ToastContainer, toast } from "react-toastify";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import {
//   FaUser,
//   FaShoppingCart,
//   FaRupeeSign,
//   FaUndo,
//   FaCalendarCheck,
//   FaUserInjured,
//   FaWallet,
// } from "react-icons/fa";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Home = () => {
//   const [selectedGraph, setSelectedGraph] = useState("appointments");
//   const [frequency, setFrequency] = useState("monthly");
//    const [allApointment, setAllAppointment] = useState([]);
//     const [allActiveTreatment, setAllActiveTreatment] = useState([]);

//  const navigate = useNavigate();
//    const fetchAppointmentData = async () => {
//       const token = Cookies.get("accessToken");
//       if (!token) {
//         toast.error("You are not logged in. Please log in.", {
//           position: "top-right",
//         });
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await fetch(
//           "https://physiotherapy-1.onrender.com/apis/book-appointment/getAllBookAppointment",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const data = await response.json();

//         if (data.success) {
//           setAllAppointment(data.data);
//         }
//       } catch (err) {
//         toast.error(err.message || "Something went wrong. Please try again.", {
//           position: "top-right",
//         });
//       }
//     };

//      const fetchActiveTreatment = async () => {
//         const token = Cookies.get("accessToken");
//         if (!token) {
//           toast.error("You are not logged in. Please log in.", {
//             position: "top-right",
//           });
//           navigate("/login");
//           return;
//         }

//         try {
//           const response = await fetch(
//             "https://physiotherapy-1.onrender.com/apis/therapy-progress/getAllActiveTherapy",
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           const data = await response.json();
//           console.log("allActive", data);
//           if (data.success) {
//             setAllActiveTreatment(data.data);
//           }
//         } catch (err) {
//           toast.error(err.message || "Something went wrong. Please try again.", {
//             position: "top-right",
//           });
//         }
//       };

//     useEffect(()=>{
//       fetchAppointmentData();
//       fetchActiveTreatment();
//     } ,[])

//   const [metrics, setMetrics] = useState({
//     appointments: 42,
//     earnings: 7250,
//     activePatients: 18,
//   });

//   const summaryData = [
//     {
//       title: "Upcoming Appointments",
//       count: allApointment.length,
//       icon: <FaCalendarCheck className="text-white text-3xl" />,
//       bg: "bg-blue-500",
//       graphType: "appointments",
//     },
//     {
//       title: "Today's Earnings",
//       count: "₹" + metrics.earnings,
//       icon: <FaRupeeSign className="text-white text-3xl" />,
//       bg: "bg-green-500",
//       graphType: "earnings",
//     },
//     {
//       title: "Completed Sessions",
//       // count: metrics.activePatients,
//        count: allActiveTreatment.length,
//       icon: <FaUserInjured className="text-white text-3xl" />,
//       bg: "bg-purple-500",
//       graphType: "activePatients",
//     },
//     {
//       title: "Wallet Balance",
//       // count: metrics.activePatients,
//        count: allActiveTreatment.length,
//       icon: <FaWallet className="text-white text-3xl" />,
//       bg: "bg-yellow-500",
//       graphType: "activePatients",
//     },
//   ];

//   const upcomingAppointments = [
//     { patient: "John Doe", time: "10:00 AM", treatment: "Neck Therapy" },
//     { patient: "Jane Smith", time: "11:30 AM", treatment: "Knee Rehab" },
//     { patient: "Michael Lee", time: "2:00 PM", treatment: "Back Pain Relief" },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMetrics((prev) => ({
//         ...prev,
//         appointments: prev.appointments + Math.floor(Math.random() * 5),
//         earnings: prev.earnings + Math.floor(Math.random() * 1000),
//         activePatients: prev.activePatients + Math.floor(Math.random() * 3),
//       }));
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   const labels = {
//     daily: Array.from({ length: 31 }, (_, i) => `${i + 1}`), // Days of the month (1-31)
//     monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//     yearly: ["2021", "2022", "2023", "2024"],
//   };

//   const generateData = (type) => {
//     const baseData = {
//       appointments: frequency === "daily"
//         ? Array.from({ length: 31 }, () => Math.floor(Math.random() * 10))
//         : frequency === "monthly"
//         ? [10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120]
//         : [300, 350, 400, 500],

//       earnings: frequency === "daily"
//         ? Array.from({ length: 31 }, () => Math.floor(Math.random() * 1000))
//         : frequency === "monthly"
//         ? [5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000]
//         : [50000, 60000, 70000, 80000],

//       activePatients: frequency === "daily"
//         ? Array.from({ length: 31 }, () => Math.floor(Math.random() * 3))
//         : frequency === "monthly"
//         ? [8, 10, 12, 15, 18, 20, 22, 24, 26, 28, 30, 32]
//         : [15, 20, 25, 30],
//     };

//     const colors = {
//       appointments: "rgba(75, 192, 192, 0.6)",
//       earnings: "rgba(46, 204, 113, 0.6)",
//       activePatients: "rgba(231, 76, 60, 0.6)",
//     };

//     return {
//       labels: labels[frequency],
//       datasets: [
//         {
//           label: `${type.charAt(0).toUpperCase() + type.slice(1)} Data`,
//           data: baseData[type],
//           backgroundColor: colors[type],
//           borderColor: colors[type].replace("0.6", "1"),
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   return (
//     <div className="flex h-screen overflow-x-hidden">
//       <Sidebar activePage="/" />
//       <div className="flex-1 flex flex-col overflow-x-hidden">
//         <Header />
//         <main className="flex-1 p-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
//           <h1 className="text-2xl font-bold">Daily Summary</h1>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
//             {summaryData.map((item, idx) => (
//               <div
//                 key={idx}
//                 className={`p-5 rounded-xl shadow-lg text-white flex items-center justify-between ${item.bg} cursor-pointer`}
//                 onClick={() => setSelectedGraph(item.graphType)}
//               >
//                 <div>
//                   <p className="text-sm font-medium">{item.title}</p>
//                   <h3 className="text-2xl font-bold">{item.count}</h3>
//                 </div>
//                 <div>{item.icon}</div>
//               </div>
//             ))}
//           </div>

//           {/* Chart Section */}
//           <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full overflow-hidden">
//             <div className="mb-4">
//               <label className="mr-2 font-semibold">Select Frequency:</label>
//               <select
//                 className="border border-gray-300 rounded p-2"
//                 value={frequency}
//                 onChange={(e) => setFrequency(e.target.value)}
//               >
//                 <option value="daily">Daily</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="yearly">Yearly</option>
//               </select>
//             </div>

//             <div className="w-full h-[calc(100vh-320px)]">
//               {selectedGraph && (
//                 <Bar
//                   data={generateData(selectedGraph)}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                   }}
//                 />
//               )}
//             </div>
//           </div>

//           {/* Upcoming Appointments */}
//           <div className="bg-white rounded-xl shadow p-6 my-6">
//             <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
//             <ul className="space-y-4">
//               {upcomingAppointments.map((appt, idx) => (
//                 <li key={idx} className="flex justify-between items-center border-b pb-2">
//                   <div>
//                     <p className="text-md font-medium">{appt.patient}</p>
//                     <p className="text-sm text-gray-600">{appt.treatment}</p>
//                   </div>
//                   <span className="text-sm font-semibold text-gray-700">{appt.time}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };
// export default Home;
