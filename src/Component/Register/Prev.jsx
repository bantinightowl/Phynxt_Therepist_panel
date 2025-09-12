  import React, { useState, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { ThreeDots } from "react-loader-spinner"; // Import the loader
  import { RxCross2 } from "react-icons/rx";
  import { faL } from "@fortawesome/free-solid-svg-icons";
  import { TiEye } from "react-icons/ti";
  import { RiEyeCloseLine } from "react-icons/ri";
  import { ToastContainer, toast } from "react-toastify";
  import { IoArrowBack } from "react-icons/io5";

  const SignUp = () => {
    const [sirName, setSirName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("");
    // const [certificate, setCertificate] = useState(null);
    const [certificates, setCertificates] = useState([]); // changed from single file

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [optLoading, setOtpLoading] = useState(false);
    const [otpVisible, setOtpVisible] = useState(false);
    const [otp, setOtp] = useState("");
    const [physiotherapistId, setPhysiotherapistId] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showVerificationModal, setShowVerificationModal] = useState(false);

    const navigate = useNavigate();

    const handleShowPassword = () => {
      setShowPassword((pre) => !pre);
    };
    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
      return regex.test(password);
    };
    const handleSignup = async (e) => {
      e.preventDefault();

      if (!validatePassword(password)) {
        setError(
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        );
        return;
      } else {
        setError("");
      }

      if (!agreedToTerms) {
        setError("Please agree to term and condition");
        return;
      } else {
        setError("");
      }

      const formData = new FormData();
      formData.append("sirName", sirName);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      certificates.forEach((file) => {
        formData.append("certificate", file);
      });
      formData.append("password", password);
      formData.append("termsAndCondition", true);

      try {
        setLoading(true);
        const response = await fetch(
          "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/registerPhysiotherapist",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Signup failed:", errorData);
          setError(errorData.message || "Signup failed");
          return;
        }

        const data = await response.json();
        console.log("Signup success:", data);
        setPhysiotherapistId(data.data.physiotherapistId);
        setOtpVisible(true);
      } catch (err) {
        console.error("Error submitting signup:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const handleOtpSubmit = async () => {
      console.log(physiotherapistId);
      if (!otp) {
        setOtpError("Please enter the OTP.");
        return;
      }
      const NumOtp = Number(otp);
      try {
        setOtpLoading(true);
        const response = await fetch(
          "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/verifyOtp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              otp: NumOtp,
              physiotherapistId, // Send physiotherapistId along with OTP
            }),
          }
        );

        const data = await response.json();
        if (data.success) {
          // OTP verified successfully, handle the success flow
          alert("OTP verified successfully!");
          setOtpVisible(false);
          setShowVerificationModal(true); // Close OTP popup
          // navigate("/login");
        } else {
          setOtpError(data.message || "OTP verification failed.");
        }
      } catch (err) {
        console.error("Error verifying OTP:", err);
        setOtpError("Something went wrong while verifying OTP.");
      } finally {
        setOtpLoading(false);
      }
    };

    return (
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat w-full h-full px-4 sm:px-0"
        style={{
          backgroundImage: "url('/assets/login2.png')",
          height: "100vh",
          width: "100vw",
          // Keeps original image size
          backgroundRepeat: "no-repeat", // Prevents repeating
          backgroundPosition: "top", // Aligns image to the top center
        }}
      >
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="flex items-center gap-2">
            <a
              href="https://physnxt.in/"
              className="text-xl hover:text-blue-800 mb-4 flex items-center"
            >
              <IoArrowBack className="text-2xl" />
            </a>

            <h2 className="text-2xl font-semibold text-left mb-4">Sign Up</h2>
          </div>
          {error && (
            <div className="text-red-600 font-semibold text-lg">{error}</div>
          )}
          <form onSubmit={handleSignup} encType="multipart/form-data">
            <div className="mb-4">
              <label
                htmlFor="sirName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Title (Optional)
              </label>
              <select
                id="title"
                value={sirName}
                onChange={(e) => setSirName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a title</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Email"
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="[0-9]{10}"
                  placeholder="Phone"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="certificate"
              >
                Upload your BPT/Physiotherapy degree certificate{" "}
                <span className="text-red-500 text-x font-normal">
                  (Max size 5 MB)
                </span>
              </label>
              <input
                type="file"
                id="certificate"
                accept=".jpg,.jpeg,.png"
                multiple // ✅ allow multiple selection
                onChange={(e) => setCertificates(Array.from(e.target.files))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="border rounded-lg flex items-center justify-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2  focus:outline-none "
                  required
                  placeholder="Password"
                />
                <button className="pr-2" onClick={handleShowPassword}>
                  {" "}
                  {showPassword ? <TiEye /> : <RiEyeCloseLine />}
                </button>
              </div>
            </div>

            <div className="mb-4 flex items-start gap-3 sm:gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
                className="mt-1 shrink-0"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 leading-relaxed"
              >
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => navigate("/terms")}
                  className="text-blue-500 hover:underline inline"
                >
                  Terms & Conditions and Refund policy
                </button>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <ThreeDots
                    visible={true}
                    height="30"
                    width="50"
                    color="white"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
            <div className="text-left mt-2 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </div>
          </form>
          {otpVisible && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg text-gray-700  mb-4">Verify OTP</h2>
                  <button>
                    <RxCross2
                      className="text-base text-gray-700"
                      onClick={() => setOtpVisible(false)}
                    />
                  </button>
                </div>
                {otpError && (
                  <div className="text-red-600 font-semibold text-lg">
                    {otpError}
                  </div>
                )}

                <div className="mb-4">
                  <label
                    htmlFor="otp"
                    className="block text-gray-700 text-sm  mb-2"
                  >
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="OTP"
                  />
                </div>
                <div className="flex  justify-center">
                  <button
                    type="button"
                    onClick={handleOtpSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    {optLoading ? (
                      <div className="flex items-center justify-center">
                        <ThreeDots
                          visible={true}
                          height="30"
                          width="50"
                          color="white"
                          radius="9"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                    ) : (
                      " Verify OTP"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          {showVerificationModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Registration Successful
                </h2>
                <p className="text-gray-700 mb-6">
                  Thank you for signing up. Once an admin verifies your profile,
                  you will be able to log in.
                </p>
                <button
                  onClick={() => {
                    setShowVerificationModal(false);
                    navigate("/login");
                  }}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  export default SignUp;
