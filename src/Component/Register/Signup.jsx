import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { RxCross2 } from "react-icons/rx";
import { TiEye } from "react-icons/ti";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import logo from "../../assets/physio_logo.jfif";
import { useDispatch } from "react-redux";
import { setRegisterInfo } from "../../redux/UserSlice";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // New states for email verification
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpVisible, setEmailOtpVisible] = useState(false);
  const [emailOtpLoading, setEmailOtpLoading] = useState(false);
  const [emailOtpError, setEmailOtpError] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  // New states for mobile verification
  const [mobileOtp, setMobileOtp] = useState("");
  const [mobileOtpVisible, setMobileOtpVisible] = useState(false);
  const [mobileOtpLoading, setMobileOtpLoading] = useState(false);
  const [mobileOtpError, setMobileOtpError] = useState("");
  const [mobileVerified, setMobileVerified] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((pre) => !pre);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((pre) => !pre);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  // Function to send OTP to email
  const sendEmailOtp = async () => {
    if (!email) {
      setError("Please enter your email first");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setEmailOtpLoading(true);
      // In a real application, you would call your API here
      // For demo purposes, we'll simulate an API call
      setTimeout(() => {
        setEmailOtpLoading(false);
        setEmailOtpVisible(true);
        setError("");
      }, 1500);
    } catch (err) {
      setEmailOtpLoading(false);
      setError("Failed to send OTP. Please try again.");
    }
  };

  // Function to verify email OTP
  const verifyEmailOtp = async () => {
    if (!emailOtp) {
      setEmailOtpError("Please enter the OTP");
      return;
    }

    try {
      setEmailOtpLoading(true);
      // In a real application, you would call your API here
      // For demo purposes, we'll simulate verification with any 6-digit code
      setTimeout(() => {
        setEmailOtpLoading(false);
        if (emailOtp.length === 6) {
          setEmailVerified(true);
          setEmailOtpVisible(false);
          setEmailOtpError("");
        } else {
          setEmailOtpError("Invalid OTP. Please try again.");
        }
      }, 1500);
    } catch (err) {
      setEmailOtpLoading(false);
      setEmailOtpError("Failed to verify OTP. Please try again.");
    }
  };

  // Function to send OTP to mobile
  const sendMobileOtp = async () => {
    if (!phone) {
      setError("Please enter your phone number first");
      return;
    }

    // Simple phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      setMobileOtpLoading(true);
      // In a real application, you would call your API here
      // For demo purposes, we'll simulate an API call
      setTimeout(() => {
        setMobileOtpLoading(false);
        setMobileOtpVisible(true);
        setError("");
      }, 1500);
    } catch (err) {
      setMobileOtpLoading(false);
      setError("Failed to send OTP. Please try again.");
    }
  };

  // Function to verify mobile OTP
  const verifyMobileOtp = async () => {
    if (!mobileOtp) {
      setMobileOtpError("Please enter the OTP");
      return;
    }

    try {
      setMobileOtpLoading(true);
      // In a real application, you would call your API here
      // For demo purposes, we'll simulate verification with any 4-digit code
      setTimeout(() => {
        setMobileOtpLoading(false);
        if (mobileOtp.length === 6) {
          setMobileVerified(true);
          setMobileOtpVisible(false);
          setMobileOtpError("");
        } else {
          setMobileOtpError("Invalid OTP. Please try again.");
        }
      }, 1500);
    } catch (err) {
      setMobileOtpLoading(false);
      setMobileOtpError("Failed to verify OTP. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Split full name into first and last name
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    } else {
      setError("");
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to term and condition");
      return;
    } else {
      setError("");
    }

    if (!emailVerified || !mobileVerified) {
      setError("Please verify your email and mobile number before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("referralCode", referralCode);
    certificates.forEach((file) => {
      formData.append("certificate", file);
    });
    formData.append("password", password);
    formData.append("termsAndCondition", true);

    try {
      setLoading(true);
      // const response = await fetch(
      //   "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/registerPhysiotherapist",
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // );

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   console.error("Signup failed:", errorData);
      //   setError(errorData.message || "Signup failed");
      //   return;
      // }

      // const data = await response.json();
      // console.log("Signup success:", data);
      dispatch(setRegisterInfo({fullName, email,phone, referralCode}));
      // setShowVerificationModal(true);
      // navigate("/welcome");
      
      navigate("/complete-profile");
    } catch (err) {
      console.error("Error submitting signup:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset verification status if email changes
  useEffect(() => {
    if (emailVerified) setEmailVerified(false);
  }, [email]);

  // Reset verification status if phone changes
  useEffect(() => {
    if (mobileVerified) setMobileVerified(false);
  }, [phone]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat w-full relative"
      style={{ backgroundImage: "url('/assets/login2.png')" }}
    >
      {/* Overlay to improve readability */}
      <div className="absolute inset-0 bg-[#0B1B33] bg-opacity-80"></div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Company Logo and Name */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="PHYNXT Logo" className="w-40 h-15" />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-left text-[#002B45]">
                Sign Up
              </h2>
            </div>

            {error && (
              <div className="text-red-600 font-semibold text-sm mb-4 p-3 bg-red-50 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSignup}
              encType="multipart/form-data"
              className="space-y-4"
            >
              <div className="mb-4">
                <label
                  className="block text-[#002B45] text-sm font-medium mb-2"
                  htmlFor="fullName"
                >
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-[#009688] focus:shadow-md transition-colors"
                  required
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email and Phone in same row for large screens */}
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="w-full lg:w-1/2">
                  <label
                    className="block text-[#002B45] text-sm font-medium mb-2"
                    htmlFor="email"
                  >
                    Email<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-[#009688] focus:shadow-md transition-colors pr-10"
                      required
                      placeholder="Email"
                      disabled={emailVerified}
                    />
                    {emailVerified && (
                      <FaCheckCircle className="absolute right-3 top-3.5 text-green-500 text-lg" />
                    )}
                  </div>
                  {!emailVerified && (
                    <div className="text-right mt-2">
                      <button
                        type="button"
                        onClick={sendEmailOtp}
                        disabled={emailOtpLoading}
                        className="text-[#009688] text-sm font-medium hover:underline disabled:text-blue-300 disabled:cursor-not-allowed"
                      >
                        {emailOtpLoading ? (
                          <span className="flex items-center justify-end">
                            <ThreeDots
                              height="20"
                              width="30"
                              color="#004B87"
                              ariaLabel="loading"
                            />
                          </span>
                        ) : (
                          "Verify Email"
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-1/2">
                  <label
                    className="block text-[#002B45] text-sm font-medium mb-2"
                    htmlFor="phone"
                  >
                    Phone<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-[#009688] focus:shadow-md transition-colors pr-10"
                      required
                      pattern="[0-9]{10}"
                      placeholder="Phone"
                      disabled={mobileVerified}
                    />
                    {mobileVerified && (
                      <FaCheckCircle className="absolute right-3 top-3.5 text-green-500 text-lg" />
                    )}
                  </div>
                  {!mobileVerified && (
                    <div className="text-right mt-2">
                      <button
                        type="button"
                        onClick={sendMobileOtp}
                        disabled={mobileOtpLoading}
                        className="text-[#009688] text-sm font-medium hover:underline disabled:text-blue-300 disabled:cursor-not-allowed"
                      >
                        {mobileOtpLoading ? (
                          <span className="flex items-center justify-end">
                            <ThreeDots
                              height="20"
                              width="30"
                              color="#004B87"
                              ariaLabel="loading"
                            />
                          </span>
                        ) : (
                          "Verify Phone"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-[#002B45] text-sm font-medium mb-2"
                  htmlFor="certificate"
                >
                  Upload your BPT/Physiotherapy degree certificate{" "}
                  <span className="text-red-500 text-xs font-normal">
                    (Max size 5 MB)<span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="file"
                  id="certificate"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  onChange={(e) => setCertificates(Array.from(e.target.files))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-[#009688] focus:shadow-md transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#009688] hover:file:bg-blue-100"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="w-full">
                  <label
                    className="block text-[#002B45] text-sm font-medium mb-2"
                    htmlFor="password"
                  >
                    Password<span className="text-red-500">*</span>
                  </label>
                  <div className="border border-gray-300 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-[#009688] focus-within:border-[#009688] focus-within:shadow-md transition-colors">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 focus:outline-none bg-transparent"
                      required
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="pr-3 text-gray-500 hover:text-[#004B87]"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? (
                        <TiEye className="text-xl" />
                      ) : (
                        <RiEyeCloseLine className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="w-full">
                  <label
                    className="block text-[#002B45] text-sm font-medium mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password<span className="text-red-500">*</span>
                  </label>
                  <div className="border border-gray-300 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-[#009688] focus-within:border-[#009688] focus-within:shadow-md transition-colors">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 focus:outline-none bg-transparent"
                      required
                      placeholder="Confirm Password"
                    />
                    <button
                      type="button"
                      className="pr-3 text-gray-500 hover:text-[#004B87]"
                      onClick={handleShowConfirmPassword}
                    >
                      {showConfirmPassword ? (
                        <TiEye className="text-xl" />
                      ) : (
                        <RiEyeCloseLine className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-[#002B45] text-sm font-medium mb-2"
                  htmlFor="referralCode"
                >
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  id="referralCode"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-[#009688] focus:shadow-md transition-colors"
                  placeholder="Enter referral code if you have one"
                />
              </div>

              <div className="mb-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  className="mt-1 shrink-0 w-4 h-4 text-[#004B87] bg-gray-100 border-gray-300 rounded focus:ring-[#004B87] focus:ring-2"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-[#002B45] leading-relaxed"
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/terms")}
                    className="text-[#009688] hover:underline inline font-medium"
                  >
                    Terms & Conditions and Refund policy
                  </button>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#009688] text-white py-3 rounded-lg hover:bg-[#00897b] focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                disabled={
                  !emailVerified || !mobileVerified || !agreedToTerms || loading
                }
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
                  "Sign Up"
                )}
              </button>

              <div className="text-center mt-4 text-sm text-[#002B45]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#009688] hover:underline font-medium"
                >
                  Sign In
                </Link>
              </div>

              {/* Security note */}
              <div className="text-center mt-4 text-xs text-gray-500 flex items-center justify-center">
                <span className="mr-1">🔒</span> Your details are safe & secured
                with PhysNXT.
              </div>
            </form>
          </div>
        </div>

        {/* Email OTP Modal */}
        {emailOtpVisible && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-70 z-50 p-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Verify Email
                </h2>
                <button
                  onClick={() => setEmailOtpVisible(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={emailOtpLoading}
                >
                  <RxCross2 className="text-xl" />
                </button>
              </div>

              {emailOtpError && (
                <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-md border border-red-200">
                  {emailOtpError}
                </div>
              )}

              <p className="text-sm text-gray-600 mb-4">
                Enter the verification code sent to{" "}
                <span className="font-medium">{email}</span>
              </p>

              <div className="mb-5">
                <label
                  htmlFor="emailOtp"
                  className="block text-[#002B45] text-sm font-medium mb-2"
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="emailOtp"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-[#009688] focus:shadow-md transition-colors"
                  required
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  disabled={emailOtpLoading}
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={verifyEmailOtp}
                  className="bg-[#004B87] text-white py-2.5 px-8 rounded-lg hover:bg-[#003B6F] focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                  disabled={emailOtpLoading}
                >
                  {emailOtpLoading ? (
                    <div className="flex items-center">
                      <ThreeDots
                        height="20"
                        width="40"
                        color="white"
                        ariaLabel="loading"
                      />
                      <span className="ml-2">Verifying...</span>
                    </div>
                  ) : (
                    "Verify Email"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile OTP Modal */}
        {mobileOtpVisible && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-70 z-50 p-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Verify Mobile
                </h2>
                <button
                  onClick={() => setMobileOtpVisible(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={mobileOtpLoading}
                >
                  <RxCross2 className="text-xl" />
                </button>
              </div>

              {mobileOtpError && (
                <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-md border border-red-200">
                  {mobileOtpError}
                </div>
              )}

              <p className="text-sm text-gray-600 mb-4">
                Enter the verification code sent to{" "}
                <span className="font-medium">{phone}</span>
              </p>

              <div className="mb-5">
                <label
                  htmlFor="mobileOtp"
                  className="block text-[#002B45] text-sm font-medium mb-2"
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="mobileOtp"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-[#009688] focus:shadow-md transition-colors"
                  required
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  disabled={mobileOtpLoading}
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={verifyMobileOtp}
                  className="bg-[#004B87] text-white py-2.5 px-8 rounded-lg hover:bg-[#003B6F] focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                  disabled={mobileOtpLoading}
                >
                  {mobileOtpLoading ? (
                    <div className="flex items-center">
                      <ThreeDots
                        height="20"
                        width="40"
                        color="white"
                        ariaLabel="loading"
                      />
                      <span className="ml-2">Verifying...</span>
                    </div>
                  ) : (
                    "Verify Mobile"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;

//import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ThreeDots } from "react-loader-spinner";
// import { RxCross2 } from "react-icons/rx";
// import { TiEye } from "react-icons/ti";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { IoArrowBack } from "react-icons/io5";
// import { FaCheckCircle } from "react-icons/fa";

// const SignUp = () => {
//   const [sirName, setSirName] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [service, setService] = useState("");
//   const [certificates, setCertificates] = useState([]);
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [agreedToTerms, setAgreedToTerms] = useState(false);
//   const [showVerificationModal, setShowVerificationModal] = useState(false);

//   // New states for email verification
//   const [emailOtp, setEmailOtp] = useState("");
//   const [emailOtpVisible, setEmailOtpVisible] = useState(false);
//   const [emailOtpLoading, setEmailOtpLoading] = useState(false);
//   const [emailOtpError, setEmailOtpError] = useState("");
//   const [emailVerified, setEmailVerified] = useState(false);

//   // New states for mobile verification
//   const [mobileOtp, setMobileOtp] = useState("");
//   const [mobileOtpVisible, setMobileOtpVisible] = useState(false);
//   const [mobileOtpLoading, setMobileOtpLoading] = useState(false);
//   const [mobileOtpError, setMobileOtpError] = useState("");
//   const [mobileVerified, setMobileVerified] = useState(false);

//   const navigate = useNavigate();

//   const handleShowPassword = () => {
//     setShowPassword((pre) => !pre);
//   };

//   const validatePassword = (password) => {
//     const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
//     return regex.test(password);
//   };

//   // Function to send OTP to email
//   const sendEmailOtp = async () => {
//     if (!email) {
//       setError("Please enter your email first");
//       return;
//     }

//     // Simple email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     try {
//       setEmailOtpLoading(true);
//       // In a real application, you would call your API here
//       // For demo purposes, we'll simulate an API call
//       setTimeout(() => {
//         setEmailOtpLoading(false);
//         setEmailOtpVisible(true);
//         setError("");
//       }, 1500);
//     } catch (err) {
//       setEmailOtpLoading(false);
//       setError("Failed to send OTP. Please try again.");
//     }
//   };

//   // Function to verify email OTP
//   const verifyEmailOtp = async () => {
//     if (!emailOtp) {
//       setEmailOtpError("Please enter the OTP");
//       return;
//     }

//     try {
//       setEmailOtpLoading(true);
//       // In a real application, you would call your API here
//       // For demo purposes, we'll simulate verification with any 6-digit code
//       setTimeout(() => {
//         setEmailOtpLoading(false);
//         if (emailOtp.length === 6) {
//           setEmailVerified(true);
//           setEmailOtpVisible(false);
//           setEmailOtpError("");
//         } else {
//           setEmailOtpError("Invalid OTP. Please try again.");
//         }
//       }, 1500);
//     } catch (err) {
//       setEmailOtpLoading(false);
//       setEmailOtpError("Failed to verify OTP. Please try again.");
//     }
//   };

//   // Function to send OTP to mobile
//   const sendMobileOtp = async () => {
//     if (!phone) {
//       setError("Please enter your phone number first");
//       return;
//     }

//     // Simple phone validation
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(phone)) {
//       setError("Please enter a valid 10-digit phone number");
//       return;
//     }

//     try {
//       setMobileOtpLoading(true);
//       // In a real application, you would call your API here
//       // For demo purposes, we'll simulate an API call
//       setTimeout(() => {
//         setMobileOtpLoading(false);
//         setMobileOtpVisible(true);
//         setError("");
//       }, 1500);
//     } catch (err) {
//       setMobileOtpLoading(false);
//       setError("Failed to send OTP. Please try again.");
//     }
//   };

//   // Function to verify mobile OTP
//   const verifyMobileOtp = async () => {
//     if (!mobileOtp) {
//       setMobileOtpError("Please enter the OTP");
//       return;
//     }

//     try {
//       setMobileOtpLoading(true);
//       // In a real application, you would call your API here
//       // For demo purposes, we'll simulate verification with any 4-digit code
//       setTimeout(() => {
//         setMobileOtpLoading(false);
//         if (mobileOtp.length ===6) {
//           setMobileVerified(true);
//           setMobileOtpVisible(false);
//           setMobileOtpError("");
//         } else {
//           setMobileOtpError("Invalid OTP. Please try again.");
//         }
//       }, 1500);
//     } catch (err) {
//       setMobileOtpLoading(false);
//       setMobileOtpError("Failed to verify OTP. Please try again.");
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!validatePassword(password)) {
//       setError(
//         "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
//       );
//       return;
//     } else {
//       setError("");
//     }

//     if (!agreedToTerms) {
//       setError("Please agree to term and condition");
//       return;
//     } else {
//       setError("");
//     }

//     if (!emailVerified || !mobileVerified) {
//       setError("Please verify your email and mobile number before submitting");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("sirName", sirName);
//     formData.append("firstName", firstName);
//     formData.append("lastName", lastName);
//     formData.append("email", email);
//     formData.append("phone", phone);
//     certificates.forEach((file) => {
//       formData.append("certificate", file);
//     });
//     formData.append("password", password);
//     formData.append("termsAndCondition", true);

//     try {
//       setLoading(true);
//       const response = await fetch(
//         "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/registerPhysiotherapist",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Signup failed:", errorData);
//         setError(errorData.message || "Signup failed");
//         return;
//       }

//       const data = await response.json();
//       console.log("Signup success:", data);
//       // setShowVerificationModal(true);
//       navigate("/welcome");
//     } catch (err) {
//       console.error("Error submitting signup:", err);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reset verification status if email changes
//   useEffect(() => {
//     if (emailVerified) setEmailVerified(false);
//   }, [email]);

//   // Reset verification status if phone changes
//   useEffect(() => {
//     if (mobileVerified) setMobileVerified(false);
//   }, [phone]);

//   return (
//     <div className="min-h-screen bg-cover bg-center bg-no-repeat w-full relative" style={{ backgroundImage: "url('/assets/login2.png')" }}>
//       {/* Overlay to improve readability */}
//       <div className="absolute inset-0 bg-[#0B1B33] bg-opacity-80"></div>

//       <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="md:flex">
//             {/* Left decorative panel */}
//             <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-[#002B45] to-[#0B1B33] p-6 text-white">
//               <div className="flex flex-col items-center justify-center h-full">
//                 <div className="bg-white bg-opacity-20 p-4 rounded-full mb-6">
//                   <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-center mb-4">Join Our Community</h3>
//                 <p className="text-sm text-center text-blue-100">Sign up to connect with patients and grow your practice</p>
//               </div>
//             </div>

//             {/* Main form content */}
//             <div className="md:w-3/5 p-6 md:p-8">
//               <div className="flex items-center gap-2 mb-6">
//                 <a href="https://physnxt.in/" className="text-xl hover:text-blue-800 flex items-center text-[#004B87]">
//                   <IoArrowBack className="text-2xl" />
//                 </a>
//                 <h2 className="text-2xl font-bold text-left text-[#004B87]">Create Your Account</h2>
//               </div>

//               {error && (
//                 <div className="text-red-600 font-semibold text-sm mb-4 p-3 bg-red-50 rounded-md border border-red-200">{error}</div>
//               )}

//               <form onSubmit={handleSignup} encType="multipart/form-data" className="space-y-4">
//                 <div className="mb-4">
//                   <label htmlFor="sirName" className="block text-[#002B45] text-sm font-medium mb-2">
//                     Title (Optional)
//                   </label>
//                   <select
//                     id="title"
//                     value={sirName}
//                     onChange={(e) => setSirName(e.target.value)}
//                     className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors"
//                   >
//                     <option value="">Select a title</option>
//                     <option value="Dr.">Dr.</option>
//                   </select>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-4 mb-4">
//                   <div className="w-full sm:w-1/2">
//                     <label className="block text-[#002B45] text-sm font-medium mb-2" htmlFor="firstName">
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors"
//                       required
//                       placeholder="First Name"
//                     />
//                   </div>
//                   <div className="w-full sm:w-1/2">
//                     <label
//                       className="block text-[#002B45] text-sm font-medium mb-2"
//                       htmlFor="lastName"
//                     >
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       id="lastName"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors"
//                       required
//                       placeholder="Last Name"
//                     />
//                   </div>
//                 </div>

//                 {/* Email and Phone in same row for large screens */}
//                 <div className="flex flex-col lg:flex-row gap-4 mb-4">
//                   <div className="w-full lg:w-1/2">
//                     <label
//                       className="block text-[#002B45] text-sm font-medium mb-2"
//                       htmlFor="email"
//                     >
//                       Email
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors pr-10"
//                         required
//                         placeholder="Email"
//                         disabled={emailVerified}
//                       />
//                       {emailVerified && (
//                         <FaCheckCircle className="absolute right-3 top-3.5 text-green-500 text-lg" />
//                       )}
//                     </div>
//                     {!emailVerified && (
//                       <div className="text-right mt-2">
//                         <button
//                           type="button"
//                           onClick={sendEmailOtp}
//                           disabled={emailOtpLoading}
//                           className="text-[#004B87] text-sm font-medium hover:underline disabled:text-blue-300 disabled:cursor-not-allowed"
//                         >
//                           {emailOtpLoading ? (
//                             <span className="flex items-center justify-end">
//                               <ThreeDots height="20" width="30" color="#004B87" ariaLabel="loading" />
//                             </span>
//                           ) : "Verify Email"}
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="w-full lg:w-1/2">
//                     <label
//                       className="block text-[#002B45] text-sm font-medium mb-2"
//                       htmlFor="phone"
//                     >
//                       Phone
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="tel"
//                         id="phone"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors pr-10"
//                         required
//                         pattern="[0-9]{10}"
//                         placeholder="Phone"
//                         disabled={mobileVerified}
//                       />
//                       {mobileVerified && (
//                         <FaCheckCircle className="absolute right-3 top-3.5 text-green-500 text-lg" />
//                       )}
//                     </div>
//                     {!mobileVerified && (
//                       <div className="text-right mt-2">
//                         <button
//                           type="button"
//                           onClick={sendMobileOtp}
//                           disabled={mobileOtpLoading}
//                           className="text-[#004B87] text-sm font-medium hover:underline disabled:text-blue-300 disabled:cursor-not-allowed"
//                         >
//                           {mobileOtpLoading ? (
//                             <span className="flex items-center justify-end">
//                               <ThreeDots height="20" width="30" color="#004B87" ariaLabel="loading" />
//                             </span>
//                           ) : "Verify Phone"}
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     className="block text-[#002B45] text-sm font-medium mb-2"
//                     htmlFor="certificate"
//                   >
//                     Upload your BPT/Physiotherapy degree certificate{" "}
//                     <span className="text-red-500 text-xs font-normal">
//                       (Max size 5 MB)
//                     </span>
//                   </label>
//                   <input
//                     type="file"
//                     id="certificate"
//                     accept=".jpg,.jpeg,.png"
//                     multiple
//                     onChange={(e) => setCertificates(Array.from(e.target.files))}
//                     className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#004B87] hover:file:bg-blue-100"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     className="block text-[#002B45] text-sm font-medium mb-2"
//                     htmlFor="password"
//                   >
//                     Password
//                   </label>
//                   <div className="border border-[#009688] rounded-lg flex items-center focus-within:ring-2 focus-within:ring-[#004B87] focus-within:border-[#004B87] focus-within:shadow-md transition-colors">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full px-4 py-2.5 focus:outline-none bg-transparent"
//                       required
//                       placeholder="Password"
//                     />
//                     <button type="button" className="pr-3 text-gray-500 hover:text-[#004B87]" onClick={handleShowPassword}>
//                       {showPassword ? <TiEye className="text-xl" /> : <RiEyeCloseLine className="text-xl" />}
//                     </button>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-2">
//                     Password must be at least 8 characters with one uppercase letter and one special character
//                   </p>
//                 </div>

//                 <div className="mb-6 flex items-start gap-3">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     checked={agreedToTerms}
//                     onChange={() => setAgreedToTerms(!agreedToTerms)}
//                     className="mt-1 shrink-0 w-4 h-4 text-[#004B87] bg-gray-100 border-gray-300 rounded focus:ring-[#004B87] focus:ring-2"
//                   />
//                   <label htmlFor="terms" className="text-sm text-[#002B45] leading-relaxed">
//                     I agree to the{" "}
//                     <button type="button" onClick={() => navigate("/terms")} className="text-[#004B87] hover:underline inline font-medium">
//                       Terms & Conditions and Refund policy
//                     </button>
//                   </label>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#009688] text-white py-3 rounded-lg hover:bg-[#00897b] focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
//                   disabled={!emailVerified || !mobileVerified || !agreedToTerms || loading}
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center">
//                       <ThreeDots
//                         height="30"
//                         width="50"
//                         color="white"
//                         radius="9"
//                         ariaLabel="loading"
//                       />
//                     </div>
//                   ) : (
//                     "Create Account"
//                   )}
//                 </button>

//                 <div className="text-center mt-4 text-sm text-[#002B45]">
//                   Already have an account?{" "}
//                   <Link to="/login" className="text-[#004B87] hover:underline font-medium">
//                     Sign In
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Email OTP Modal */}
//         {emailOtpVisible && (
//           <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-70 z-50 p-4">
//             <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-800">Verify Email</h2>
//                 <button
//                   onClick={() => setEmailOtpVisible(false)}
//                   className="text-gray-500 hover:text-gray-700 transition-colors"
//                   disabled={emailOtpLoading}
//                 >
//                   <RxCross2 className="text-xl" />
//                 </button>
//               </div>

//               {emailOtpError && (
//                 <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-md border border-red-200">{emailOtpError}</div>
//               )}

//               <p className="text-sm text-gray-600 mb-4">
//                 Enter the verification code sent to <span className="font-medium">{email}</span>
//               </p>

//               <div className="mb-5">
//                 <label
//                   htmlFor="emailOtp"
//                   className="block text-[#002B45] text-sm font-medium mb-2"
//                 >
//                   Verification Code
//                 </label>
//                 <input
//                   type="text"
//                   id="emailOtp"
//                   value={emailOtp}
//                   onChange={(e) => setEmailOtp(e.target.value)}
//                   className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors"
//                   required
//                   placeholder="Enter 6-digit OTP"
//                   maxLength="6"
//                   disabled={emailOtpLoading}
//                 />
//               </div>

//               <div className="flex justify-center">
//                 <button
//                   onClick={verifyEmailOtp}
//                   className="bg-[#004B87] text-white py-2.5 px-8 rounded-lg hover:bg-[#003B6F] focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
//                   disabled={emailOtpLoading}
//                 >
//                   {emailOtpLoading ? (
//                     <div className="flex items-center">
//                       <ThreeDots
//                         height="20"
//                         width="40"
//                         color="white"
//                         ariaLabel="loading"
//                       />
//                       <span className="ml-2">Verifying...</span>
//                     </div>
//                   ) : (
//                     "Verify Email"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Mobile OTP Modal */}
//         {mobileOtpVisible && (
//           <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-70 z-50 p-4">
//             <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-800">Verify Mobile</h2>
//                 <button
//                   onClick={() => setMobileOtpVisible(false)}
//                   className="text-gray-500 hover:text-gray-700 transition-colors"
//                   disabled={mobileOtpLoading}
//                 >
//                   <RxCross2 className="text-xl" />
//                 </button>
//               </div>

//               {mobileOtpError && (
//                 <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-md border border-red-200">{mobileOtpError}</div>
//               )}

//               <p className="text-sm text-gray-600 mb-4">
//                 Enter the verification code sent to <span className="font-medium">{phone}</span>
//               </p>

//               <div className="mb-5">
//                 <label
//                   htmlFor="mobileOtp"
//                   className="block text-[#002B45] text-sm font-medium mb-2"
//                 >
//                   Verification Code
//                 </label>
//                 <input
//                   type="text"
//                   id="mobileOtp"
//                   value={mobileOtp}
//                   onChange={(e) => setMobileOtp(e.target.value)}
//                   className="w-full px-4 py-2.5 border border-[#009688] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] focus:shadow-md transition-colors"
//                   required
//                   placeholder="Enter 6-digit OTP"
//                   maxLength="6"
//                   disabled={mobileOtpLoading}
//                 />
//               </div>

//               <div className="flex justify-center">
//                 <button
//                   onClick={verifyMobileOtp}
//                   className="bg-[#004B87] text-white py-2.5 px-8 rounded-lg hover:bg-[#003B6F] focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
//                   disabled={mobileOtpLoading}
//                 >
//                   {mobileOtpLoading ? (
//                     <div className="flex items-center">
//                       <ThreeDots
//                         height="20"
//                         width="40"
//                         color="white"
//                         ariaLabel="loading"
//                       />
//                       <span className="ml-2">Verifying...</span>
//                     </div>
//                   ) : (
//                     "Verify Mobile"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SignUp;
