// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { TiEye } from "react-icons/ti";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { RxCross2 } from "react-icons/rx";
// import { ThreeDots } from "react-loader-spinner";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [resetEmail, setResetEmail] = useState("");
//   const [resetError, setResetError] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [resetLoading, setResetLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPaswordError] = useState("");
//   const [physiotherapistId, setPhysiotherapistId] = useState("");
//   const [resetPasswordModal, setResetPasswordModal] = useState(false);
//   const navigate = useNavigate();

//   const handleShowPassword = () => {
//     setShowPassword((pre) => !pre);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     const existingToken = Cookies.get("accessToken");
//     const tokenTimestamp = Cookies.get("tokenTimestamp");
//     const now = Date.now();
//     try {
//       const response = await fetch(
//         // `${process.env.REACT_APP_BACKEND_URL}/apis/adminAuth/login`,
//         "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email: email, password: password }),
//         }
//       );
//       const data = await response.json();
//       console.log("Data: ", data);
//       if (data.data?.token) {
//         Cookies.set("accessToken", data.data.token, {
//           expires: 1,
//           secure: true,
//           sameSite: "Strict",
//         });

//         const userId = data?.data?.physiotherapist?._id;
//         if (userId) {
//           localStorage.setItem("userId", userId);
//           console.log("✅ userId stored in localStorage:", userId);
//         } else {
//           console.warn("⚠️ userId not found in response:", data);
//         }

//         // console.log("Reached in timeout");
//         toast.success("Login successful! Redirecting...", {
//           position: "top-right",
//         });
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1500);
//       } else {
//         toast.error(data.message || "Invalid credentials!", {
//           position: "top-right",
//         }); // Error toast
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       toast.error("An error occurred. Please try again later.", {
//         position: "top-right",
//       }); // Error toast
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleForgetEmail = async (e) => {
//     e.preventDefault();
//     setResetError(""); // Reset error message for password reset
//     if (!resetEmail) {
//       setResetError("Please enter your email.");
//       return;
//     }
//     setResetLoading(true); // Set loading for OTP request
//     try {
//       const response = await fetch(
//         "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/forgetPasswordSendOtp",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email: resetEmail }),
//         }
//       );
//       const data = await response.json();
//       console.log("forget Password", data);
//       if (response.ok) {
//         setOtpSent(true);
//         setPhysiotherapistId(data?.data.physiotherapistId);
//         alert("OTP has been sent to your email.");
//       } else {
//         setResetError(data.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       setResetError("An error occurred. Please try again later.");
//     } finally {
//       setResetLoading(false); // Reset OTP loading state
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     console.log(physiotherapistId);
//     setResetError("");
//     if (!otp) {
//       setResetError("Please enter OTP.");
//       return;
//     }
//     setResetLoading(true);
//     const otpNum = Number(otp);
//     try {
//       const response = await fetch(
//         " https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/forgetVerifyOtp",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ otp: otpNum, physiotherapistId }),
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         alert("OTP verified successfully.");
//         setShowModal(false);
//         setResetPasswordModal(true);
//       } else {
//         setResetError(data.message || "Failed to reset password.");
//       }
//     } catch (error) {
//       setResetError("An error occurred. Please try again later.");
//     } finally {
//       setResetLoading(false);
//     }
//   };

//   const validatePassword = (password) => {
//     const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
//     return regex.test(password);
//   };
//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setResetError(""); // Reset error message for password reset
//     if (!newPassword) {
//       setError("Please enter OTP and new password.");
//       return;
//     }
//     if (!validatePassword(newPassword)) {
//       setError(
//         "Password must be at least 8 characters, include one uppercase letter and one special character."
//       );
//       return;
//     } else {
//       setError("");
//     }

//     if (newPassword !== confirmPassword) {
//       setError("New Password and Confirm Password should me same ");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch(
//         "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/forgetPassword",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             physiotherapistId,
//             newPassword: newPassword,
//             confirmPassword: confirmPassword,
//           }),
//         }
//       );
//       const data = await response.json();
//       console.log("reset", data);
//       if (response.ok) {
//         alert("Password reset successfully.");
//         setShowModal(false);
//         navigate("/dashboard");
//       } else {
//         setError(data.message || "Failed to reset password.");
//       }
//     } catch (error) {
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   // const otpVerification = async (e)=>{
//   //   setResetError(""); // Reset error message for password reset
//   //   if (!otp) {
//   //     setResetError("Please enter OTP and new password.");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await fetch(
//   //       // https://aluminibackend-1.onrender.com/apis/adminAuth/forgetVerifyOtp
//   //       `https://physiotherapy-1.onrender.com/apis/adminAuth/forgetVerifyOtp`,
//   //       {
//   //         method: "POST",
//   //         headers: {"Content-Type": "application/json",},
//   //         body: JSON.stringify({  }),
//   //       }
//   //     );
//   //     const data = await response.json();
//   //     if (response.ok) {
//   //       alert("Password reset successfully.");
//   //       setShowModal(false);
//   //     } else {
//   //       setResetError(data.message || "Failed to reset password.");
//   //     }
//   //   }

//   // }

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat w-full h-full px-4 sm:px-0"
//       style={{
//         backgroundImage: "url('/assets/login2.png')",
//         height: "100vh",
//         width: "100vw",
//         // Keeps original image size
//         backgroundRepeat: "no-repeat", // Prevents repeating
//         backgroundPosition: "top", // Aligns image to the top center
//       }}
//     >
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//       />
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
//         <h2 className="text-2xl font-semibold text-left mb-2">Login</h2>
//         <p className="text-left text-gray-600 mb-6">
//           Please enter your login credentials
//         </p>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="email"
//             >
//               User Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <div className="flex items-center justify-between border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-2 focus:outline-none   "
//                 required
//               />
//               <button
//                 className="pr-2"
//                 onClick={handleShowPassword}
//                 type="button"
//               >
//                 {showPassword ? <TiEye /> : <RiEyeCloseLine />}
//               </button>
//             </div>
//           </div>
//           {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//           <div className="text-right mt-4">
//             <Link
//               to="#"
//               className="text-red-500 hover:underline"
//               onClick={() => setShowModal(true)}
//             >
//               Forgot Password?
//             </Link>
//           </div>
//           <div className="text-left mt-2">
//             <span className="text-gray-600">Don't have an account? </span>
//             <Link to="/signup" className="text-blue-500 hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </form>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h3 className="text-xl font-semibold mb-4">Reset Your Password</h3>
//             {!otpSent ? (
//               <form onSubmit={handleForgetEmail}>
//                 <div className="mb-4">
//                   <label
//                     className="block text-gray-700 text-sm font-bold mb-2"
//                     htmlFor="resetEmail"
//                   >
//                     Enter your email address
//                   </label>
//                   <input
//                     type="email"
//                     id="resetEmail"
//                     value={resetEmail}
//                     onChange={(e) => setResetEmail(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//                 {resetError && (
//                   <div className="text-red-500 text-sm mb-4">{resetError}</div>
//                 )}
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//                   disabled={resetLoading}
//                 >
//                   {resetLoading ? "Sending OTP..." : "Send OTP"}
//                 </button>
//               </form>
//             ) : (
//               // <form onSubmit={handleResetPassword}>
//               //   <div className="mb-4">
//               //     <label className="block text-gray-700 text-sm font-bold mb-2"htmlFor="otp">
//               //       OTP
//               //     </label>
//               //     <input type="text"id="otp" value={otp} onChange={(e) => setOtp(e.target.value)}
//               //       className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               //       required
//               //     />
//               //   </div>
//               //   {resetError && (
//               //     <div className="text-red-500 text-sm mb-4">{resetError}</div>
//               //   )}
//               //   <button type="submit"className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600" disabled={resetLoading}>
//               //     {resetLoading ? "Resetting Password..." : "Reset Password"}
//               //   </button>
//               // </form>

//               <form onSubmit={handleVerifyOtp}>
//                 <div className="mb-4">
//                   <label
//                     className="block text-gray-700 text-sm font-bold mb-2"
//                     htmlFor="otp"
//                   >
//                     OTP
//                   </label>
//                   <input
//                     type="number"
//                     id="otp"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//                   disabled={resetLoading}
//                 >
//                   {resetLoading ? "Resetting Password..." : "otp"}
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}

//       {resetPasswordModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <div className="  flex   justify-between">
//               <h3 className="text-lg font-semibold mb-4 text-center">
//                 Reset Your Password
//               </h3>
//               <div>
//                 <RxCross2
//                   className="text-xl"
//                   onClick={() => setResetPasswordModal(false)}
//                 />
//               </div>
//             </div>
//             <form onSubmit={handleResetPassword}>
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="newpassword"
//                 >
//                   New Password
//                 </label>
//                 <div className="flex items-center justify-between border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="newpassword"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="w-full px-3 py-2  focus:outline-none"
//                     required
//                   />
//                   <button
//                     className="pr-2"
//                     onClick={handleShowPassword}
//                     type="button"
//                   >
//                     {" "}
//                     {showPassword ? <TiEye /> : <RiEyeCloseLine />}
//                   </button>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     className="block text-gray-700 text-sm font-bold mb-2"
//                     htmlFor="confirmpassword"
//                   >
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     id="otp"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                   {error && (
//                     <div className="text-red-500 text-sm mb-4">{error}</div>
//                   )}
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <ThreeDots
//                       visible={true}
//                       height="30"
//                       width="50"
//                       color="white"
//                       radius="9"
//                       ariaLabel="three-dots-loading"
//                       wrapperStyle={{}}
//                       wrapperClass=""
//                     />
//                   </div>
//                 ) : (
//                   "Reset Your Password"
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiEye } from "react-icons/ti";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { ThreeDots } from "react-loader-spinner";
import { IoArrowBack } from "react-icons/io5";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPaswordError] = useState("");
  const [physiotherapistId, setPhysiotherapistId] = useState("");
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((pre) => !pre);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const existingToken = Cookies.get("accessToken");
    const tokenTimestamp = Cookies.get("tokenTimestamp");
    const now = Date.now();
    try {
      const response = await fetch(
        "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );
      const data = await response.json();
      console.log("Data: ", data);
      if (data.data?.token) {
        Cookies.set("accessToken", data.data.token, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });

        const userId = data?.data?.physiotherapist?._id;
        if (userId) {
          localStorage.setItem("userId", userId);
          console.log("✅ userId stored in localStorage:", userId);
        } else {
          console.warn("⚠️ userId not found in response:", data);
        }

        toast.success("Login successful! Redirecting...", {
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error(data.message || "Invalid credentials!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
      });
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleForgetEmail = async (e) => {
    e.preventDefault();
    setResetError("");
    if (!resetEmail) {
      setResetError("Please enter your email.");
      return;
    }
    setResetLoading(true);
    try {
      const response = await fetch(
        "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/forgetPasswordSendOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: resetEmail }),
        }
      );
      const data = await response.json();
      console.log("forget Password", data);
      if (response.ok) {
        setOtpSent(true);
        setPhysiotherapistId(data?.data.physiotherapistId);
        toast.success("OTP has been sent to your email.", {
          position: "top-right",
        });
      } else {
        setResetError(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setResetError("An error occurred. Please try again later.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log(physiotherapistId);
    setResetError("");
    if (!otp) {
      setResetError("Please enter OTP.");
      return;
    }
    setResetLoading(true);
    const otpNum = Number(otp);
    try {
      const response = await fetch(
        " https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/forgetVerifyOtp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: otpNum, physiotherapistId }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("OTP verified successfully.", {
          position: "top-right",
        });
        setShowModal(false);
        setResetPasswordModal(true);
      } else {
        setResetError(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setResetError("An error occurred. Please try again later.");
    } finally {
      setResetLoading(false);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError("");
    if (!newPassword) {
      setError("Please enter OTP and new password.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters, include one uppercase letter and one special character."
      );
      return;
    } else {
      setError("");
    }

    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password should be same");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/forgetPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            physiotherapistId,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          }),
        }
      );
      const data = await response.json();
      console.log("reset", data);
      if (response.ok) {
        toast.success("Password reset successfully.", {
          position: "top-right",
        });
        setShowModal(false);
        navigate("/dashboard");
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat w-full relative" style={{ backgroundImage: "url('/assets/login2.png')" }}>
      {/* Overlay to improve readability */}
      <div className="absolute  inset-0 bg-[#0B1B33] bg-opacity-80"></div>

      <div className="relative flex items-center justify-center h-screen z-10 py-8 px-4 sm:px-6 lg:px-8">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
        
        <div className="max-w-4xl  mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Left decorative panel */}
            <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-[#002B45] to-[#0B1B33] p-6 text-white">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-white bg-opacity-20 p-4 rounded-full mb-6">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Welcome Back</h3>
                <p className="text-sm text-center text-blue-100">Sign in to access your dashboard and continue your practice</p>
              </div>
            </div>
            
            {/* Main form content */}
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <a href="https://physnxt.in/" className="text-xl hover:text-blue-800 flex items-center text-[#004B87]">
                  <IoArrowBack className="text-2xl" />
                </a>
                <h2 className="text-2xl font-bold text-left text-[#004B87]">Login to Your Account</h2>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="mb-4">
                  <label className="block text-[#002B45] text-sm font-medium mb-2" htmlFor="email">
                    User Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors"
                    required
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#002B45] text-sm font-medium mb-2" htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-[#009688] rounded-lg flex items-center focus-within:ring-2 focus-within:ring-[#004B87] focus-within:border-[#004B87] focus-within:shadow-md transition-colors">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 focus:outline-none bg-transparent"
                      required
                      placeholder="Enter your password"
                    />
                    <button type="button" className="px-2 text-gray-500 hover:text-[#004B87]" onClick={handleShowPassword}>
                      {showPassword ? <TiEye className="text-xl" /> : <RiEyeCloseLine className="text-xl" />}
                    </button>
                  </div>
                </div>
                
                {error && (
                  <div className="text-red-600 font-semibold text-sm p-3 bg-red-50 rounded-md border border-red-200">{error}</div>
                )}
                
                <button 
                  type="submit" 
                  className="w-full bg-[#009688] text-white py-3 rounded-lg hover:bg-[#00897b] focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <ThreeDots 
                        height="30" 
                        width="50"
                        color="white"
                        radius="9"
                        ariaLabel="loading"
                      />
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
                
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="text-[#004B87] text-sm font-medium hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                
                <div className="text-center mt-4 text-sm text-[#002B45]">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-[#004B87] hover:underline font-medium">
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Forgot Password Modal */}
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-70 z-50 p-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Reset Your Password</h2>
                <button 
                  onClick={() => {
                    setShowModal(false);
                    setOtpSent(false);
                    setResetEmail("");
                    setResetError("");
                  }} 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <RxCross2 className="text-xl" />
                </button>
              </div>
              
              {!otpSent ? (
                <form onSubmit={handleForgetEmail} className="space-y-4">
                  <div className="mb-4">
                    <label className="block text-[#002B45] text-sm font-medium mb-2" htmlFor="resetEmail">
                      Enter your email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="resetEmail"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors"
                      required
                      placeholder="Enter your registered email"
                    />
                  </div>
                  
                  {resetError && (
                    <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md border border-red-200">{resetError}</div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="w-full bg-[#004B87] text-white py-2.5 rounded-lg hover:bg-[#003B6F] focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                    disabled={resetLoading}
                  >
                    {resetLoading ? (
                      <div className="flex items-center justify-center">
                        <ThreeDots 
                          height="20" 
                          width="40" 
                          color="white" 
                          ariaLabel="loading"
                        />
                        <span className="ml-2">Sending OTP...</span>
                      </div>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="mb-4">
                    <label className="block text-[#002B45] text-sm font-medium mb-2" htmlFor="otp">
                      Enter OTP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors"
                      required
                      placeholder="Enter 6-digit OTP"
                    />
                  </div>
                  
                  {resetError && (
                    <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md border border-red-200">{resetError}</div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="w-full bg-[#004B87] text-white py-2.5 rounded-lg hover:bg-[#003B6F] focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                    disabled={resetLoading}
                  >
                    {resetLoading ? (
                      <div className="flex items-center justify-center">
                        <ThreeDots 
                          height="20" 
                          width="40" 
                          color="white" 
                          ariaLabel="loading"
                        />
                        <span className="ml-2">Verifying OTP...</span>
                      </div>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
        
        {/* Reset Password Modal */}
        {resetPasswordModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-70 z-50 p-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Reset Your Password</h2>
                <button 
                  onClick={() => setResetPasswordModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <RxCross2 className="text-xl" />
                </button>
              </div>
              
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="mb-4">
                  <label className="block text-[#002B45] text-sm font-medium mb-2" htmlFor="newpassword">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-[#009688] rounded-lg flex items-center focus-within:ring-2 focus-within:ring-[#004B87] focus-within:border-[#004B87] focus-within:shadow-md transition-colors">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newpassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 focus:outline-none bg-transparent"
                      required
                      placeholder="Enter new password"
                    />
                    <button type="button" className="pr-3 text-gray-500 hover:text-[#004B87]" onClick={handleShowPassword}>
                      {showPassword ? <TiEye className="text-xl" /> : <RiEyeCloseLine className="text-xl" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Password must be at least 8 characters with one uppercase letter and one special character
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#002B45] text-sm font-medium mb-2" htmlFor="confirmpassword">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors"
                    required
                    placeholder="Confirm your new password"
                  />
                </div>
                
                {error && (
                  <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md border border-red-200">{error}</div>
                )}
                
                <button 
                  type="submit" 
                  className="w-full bg-[#004B87] text-white py-2.5 rounded-lg hover:bg-[#003B6F] focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <ThreeDots 
                        height="20" 
                        width="40" 
                        color="white" 
                        ariaLabel="loading"
                      />
                      <span className="ml-2">Resetting Password...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Login;