import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Login/Login";
import SignUp from "./Component/Register/Signup";
import Patients from "./Component/Pages/Patients/Patients";
import Appointment from "./Component/Pages/Appointment/Appointment";
import Treatments from "./Component/Pages/Treatments/Treatments";
import ProgressReport from "./Component/Pages/ProgressReport/ProgressReport";
import FeedbackQueries from "./Component/Pages/Feedback/FeedbackQueries";
import AboutUs from "./Component/Pages/AboutUs/AboutUs";
import TherapyServices from "./Component/Pages/TherepyServices/TherapyServices ";
import AddServices from "./Component/Pages/TherepyServices/AddServices";
import GetAllService from "./Component/Pages/TherepyServices/GetAllService";
import ServiceDetailPage from "./Component/Pages/TherepyServices/ServiceDetailPage";
import Blog from "./Component/Pages/Blog/Blog";
import GetAllBlog from "./Component/Pages/Blog/GetAllBlog";
import CreateBlog from "./Component/Pages/Blog/CreateBlog";
import AddMoreDetails from "./Component/Pages/TherepyServices/AddMoreDetails";
import Question from "./Component/Pages/Question/Question";
import ClinicalAssessments from "./Component/Pages/ClinicalAssessments/ClinicalAssessments";
import { useEffect } from "react";
import socket from "./socket";
import { useDispatch } from "react-redux";
import NotificationsPage from "./Header/Notification/Notification";
import { addNotification } from "./redux/notificationSlice";
import Terms from "./Component/Pages/Terms/Terms";
import Refund from "./Component/Pages/Refund/Refund";
import Bharti from "./Component/Pages/Bharti/Bharti";
import ReqRefund from "./Component/Pages/Refund/ReqRefund";
import AllRefund from "./Component/Pages/Refund/AllRefund";
import Welcome from "./Component/Register/Welcome";
import AdditionalInfo from "./Component/Register/AdditionalInfo";
import Management from "./Component/Pages/Managements/Management";
import Referral from "./Component/Pages/Referral/Referral";
import PhysiotherapistOnboarding from "./Component/Register/PhysiotherapistOnboarding";


function App() {
  const dispatch = useDispatch();

  //   useEffect(() => {
  //   console.log("🔄 useEffect for socket notifications started");

  //   const userId = localStorage.getItem("userId");
  //   console.log("📂 Retrieved userId from localStorage:", userId);

  //   if (userId) {
  //     console.log("🚀 Emitting join event with userId:", userId);
  //     socket.emit("join", userId);

  //     // Confirm socket connection status before listening
  //     if (socket.connected) {
  //       console.log("✅ Socket is connected with id:", socket.id);
  //     } else {
  //       console.warn("⚠️ Socket is NOT connected yet");
  //     }

  //     socket.on("notification", (data) => {
  //       console.log("📩 Notification received:", data);
  //       dispatch(addNotification(data));
  //     });
  //   } else {
  //     console.warn("⚠️ No userId found in localStorage, cannot join socket room");
  //   }

  //   // Cleanup function
  //   return () => {
  //     console.log("🧹 Cleaning up socket notification listener");
  //     socket.off("notification");
  //   };
  // }, [dispatch]);

  //test

  // useEffect(() => {
  //   console.log("🔄 useEffect for socket notifications started");

  //   const userId = localStorage.getItem("userId");
  //   console.log("📂 Retrieved userId from localStorage:", userId);

  //   if (userId) {
  //     console.log("🚀 Emitting join event with userId:", userId);
  //     socket.emit("join", userId);

  //     // Confirm socket connection status before listening
  //     if (socket.connected) {
  //       console.log("✅ Socket is connected with id:", socket.id);
  //     } else {
  //       console.warn("⚠️ Socket is NOT connected yet");
  //     }

  //     socket.on("notification", (data) => {
  //       console.log("📩 Notification received:", data);
  //       dispatch(addNotification(data));
  //     });
  //   } else {
  //     console.warn("⚠️ No userId found in localStorage, cannot join socket room");
  //   }

  //   // Cleanup function
  //   return () => {
  //     console.log("🧹 Cleaning up socket notification listener");
  //     socket.off("notification");
  //   };
  // }, [dispatch]);

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   console.log("🆔 Frontend userId from localStorage:", userId);

  //   const handleConnect = () => {
  //     console.log("✅ Connected to socket:", socket.id);
  //     if (userId) {
  //       console.log("🚀 Emitting join event with userId:", userId);
  //       socket.emit("join", userId);
  //     }
  //   };

  //   socket.on("connect", handleConnect);

  //   if (userId) {
  //     socket.on("notification", (data) => {
  //       console.log("📩 Notification received:", data);
  //       dispatch(addNotification(data));
  //     });
  //   }

  //   return () => {
  //     socket.off("connect", handleConnect);
  //     socket.off("notification");
  //   };
  // }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("🆔 Frontend userId from localStorage:", userId);

    const handleConnect = () => {
      console.log("✅ Connected to socket:", socket.id);
      if (userId) {
        console.log("🚀 Emitting join event with userId:", userId);
        socket.emit("join", userId);
      }
    };

    const handleNotification = (data) => {
      console.log("📩 Notification received:", data);
      dispatch(addNotification(data));

      // Add this part to handle appointment notifications
      if (data.type === "appointment") {
        // Dispatch a custom event that your Appointment component can listen to
        window.dispatchEvent(
          new CustomEvent("newAppointment", {
            detail: data,
          })
        );

        // Or alternatively, you could use a ref to call a function
        // if you have direct access to the Appointment component
      }
    };

    socket.on("connect", handleConnect);

    if (userId) {
      socket.on("notification", handleNotification);
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("notification", handleNotification);
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/additional-info" element={<AdditionalInfo />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/complete-profile" element={<PhysiotherapistOnboarding />} />

        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/assesments" element={<ClinicalAssessments />} />
        <Route path="/management" element={<Management />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/referral" element={<Referral />} />

        <Route path="/therapy" element={<TherapyServices />}>
          <Route path="addtherapy" element={<AddServices />} />
          <Route path="alltherapy" element={<GetAllService />} />
          <Route path="details/:serviceId" element={<ServiceDetailPage />} />
          <Route
            path="add-more-details/:imageId"
            element={<AddMoreDetails />}
          />
        </Route>
        <Route path="/treatments" element={<Treatments />} />
        {/* <Route path="/progress-reports" element={<ProgressReport />} /> */}
        <Route path="/feedback" element={<FeedbackQueries />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/blog" element={<Blog />}>
          <Route path="allblog" element={<GetAllBlog />} />
          <Route path="createblog" element={<CreateBlog />} />
        </Route>

        <Route path="/question" element={<Question />} />

        <Route path="/refund" element={<Refund />}>
          <Route path="reqrefund" element={<ReqRefund />} />
          <Route path="allrefund" element={<AllRefund />} />
        </Route>
        {/* <Route path="/refund" element={<Refund/>} /> */}
        <Route path="/contact" element={<Bharti />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
