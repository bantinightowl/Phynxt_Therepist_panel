import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/additional-info");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full px-4 py-6 sm:px-0 sm:py-0"
      style={{
        backgroundImage: "url('/assets/login2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl animate-fadeIn my-6 sm:my-0">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Updated to match sidebar color scheme */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-[#002B45] to-[#0B1B33] flex items-center justify-center p-6 sm:p-8 text-white">
            <div className="text-center py-4 sm:py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-blue-100/20 mb-4 sm:mb-6">
                <svg
                  className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Registration Successful!
              </h2>
              <p className="opacity-90 text-sm sm:text-base">Welcome to our community</p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Thank you for joining us!
            </h3>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 font-medium text-sm sm:text-base">
                    Your account has been created successfully
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Please wait while our admin team reviews your registration.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 font-medium text-sm sm:text-base">
                    Complete your profile while you wait
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Adding more information helps us personalize your experience
                    and verify your account faster.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 font-medium text-sm sm:text-base">
                    What happens next?
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Once approved, you'll receive full access to all platform
                    features and resources.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6 sm:mb-8">
              <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Next Steps:</h4>
              <ul className="text-blue-700 text-xs sm:text-sm list-disc pl-4 sm:pl-5 space-y-1">
                <li>Check your email for confirmation message</li>
                <li>
                  Complete your professional profile with additional details
                </li>
              </ul>
            </div>

            <button
              onClick={handleContinue}
              className="w-full bg-[#004B87] hover:bg-[#00315e] text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm sm:text-base"
            >
              Continue
            </button>

            <p className="text-center text-gray-500 text-xs sm:text-sm mt-4">
              You will be notified via email once your account is approved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;