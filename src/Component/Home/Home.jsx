import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import { Bar } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [selectedGraph, setSelectedGraph] = useState("appointments");
  const [frequency, setFrequency] = useState("monthly");
   const [allApointment, setAllAppointment] = useState([]);
    const [allActiveTreatment, setAllActiveTreatment] = useState([]);


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
          console.log("allActive", data);
          if (data.success) {
            setAllActiveTreatment(data.data);
          }
        } catch (err) {
          toast.error(err.message || "Something went wrong. Please try again.", {
            position: "top-right",
          });
        } 
      };

    useEffect(()=>{
      fetchAppointmentData();
      fetchActiveTreatment();
    } ,[])

  const [metrics, setMetrics] = useState({
    appointments: 42,
    earnings: 7250,
    activePatients: 18,
  });

  const summaryData = [
    {
      title: "Total Appointments",
      count: allApointment.length,
      icon: <FaCalendarCheck className="text-white text-3xl" />,
      bg: "bg-blue-500",
      graphType: "appointments",
    },
    // {
    //   title: "Today's Earnings",
    //   count: "₹" + metrics.earnings,
    //   icon: <FaRupeeSign className="text-white text-3xl" />,
    //   bg: "bg-green-500",
    //   graphType: "earnings",
    // },
    {
      title: "Active Patients",
      // count: metrics.activePatients,
       count: allActiveTreatment.length,
      icon: <FaUserInjured className="text-white text-3xl" />,
      bg: "bg-purple-500",
      graphType: "activePatients",
    },
  ];

  const upcomingAppointments = [
    { patient: "John Doe", time: "10:00 AM", treatment: "Neck Therapy" },
    { patient: "Jane Smith", time: "11:30 AM", treatment: "Knee Rehab" },
    { patient: "Michael Lee", time: "2:00 PM", treatment: "Back Pain Relief" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        appointments: prev.appointments + Math.floor(Math.random() * 5),
        earnings: prev.earnings + Math.floor(Math.random() * 1000),
        activePatients: prev.activePatients + Math.floor(Math.random() * 3),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const labels = {
    daily: Array.from({ length: 31 }, (_, i) => `${i + 1}`), // Days of the month (1-31)
    monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    yearly: ["2021", "2022", "2023", "2024"],
  };

  const generateData = (type) => {
    const baseData = {
      appointments: frequency === "daily" 
        ? Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)) 
        : frequency === "monthly"
        ? [10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120]
        : [300, 350, 400, 500],
        
      earnings: frequency === "daily" 
        ? Array.from({ length: 31 }, () => Math.floor(Math.random() * 1000)) 
        : frequency === "monthly"
        ? [5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000]
        : [50000, 60000, 70000, 80000],
        
      activePatients: frequency === "daily" 
        ? Array.from({ length: 31 }, () => Math.floor(Math.random() * 3)) 
        : frequency === "monthly"
        ? [8, 10, 12, 15, 18, 20, 22, 24, 26, 28, 30, 32]
        : [15, 20, 25, 30],
    };

    const colors = {
      appointments: "rgba(75, 192, 192, 0.6)",
      earnings: "rgba(46, 204, 113, 0.6)",
      activePatients: "rgba(231, 76, 60, 0.6)",
    };

    return {
      labels: labels[frequency],
      datasets: [
        {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} Data`,
          data: baseData[type],
          backgroundColor: colors[type],
          borderColor: colors[type].replace("0.6", "1"),
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar activePage="/" />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {summaryData.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl shadow-lg text-white flex items-center justify-between ${item.bg} cursor-pointer`}
                onClick={() => setSelectedGraph(item.graphType)}
              >
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <h3 className="text-2xl font-bold">{item.count}</h3>
                </div>
                <div>{item.icon}</div>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full overflow-hidden">
            <div className="mb-4">
              <label className="mr-2 font-semibold">Select Frequency:</label>
              <select
                className="border border-gray-300 rounded p-2"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div className="w-full h-[calc(100vh-320px)]">
              {selectedGraph && (
                <Bar
                  data={generateData(selectedGraph)}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              )}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow p-6 my-6">
            <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
            <ul className="space-y-4">
              {upcomingAppointments.map((appt, idx) => (
                <li key={idx} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="text-md font-medium">{appt.patient}</p>
                    <p className="text-sm text-gray-600">{appt.treatment}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{appt.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Home;
