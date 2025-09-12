import React from "react";
import { useNavigate } from "react-router-dom";

function Terms() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
         PhysNXT Physiotherapy – Terms & Conditions and Refund Policy
        </h1>
        <p className="text-gray-600 text-center mb-10">
          To maintain fairness and prevent misuse, PhysNXT follows a structured,
          coupon-based refund policy for commission disputes.
        </p>

        <div className="space-y-10">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1">
              1. No Cash Refunds
            </h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>
                PhysNXT does not offer direct cash refunds on commission
                charges.
              </li>
              <li>
                Instead, coupon codes of equivalent value are provided for
                future use (commission offset).
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1">
              2. Valid Refund Scenarios
            </h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>
                If a session is cancelled by the user or a no-show occurs, and
                you raise a dispute within 48 hours:
              </li>
              <li>
                <span className="text-green-600 font-semibold">
                  ✅ First verified case:
                </span>{" "}
                You receive a commission coupon code for the same value.
              </li>
              <li>
                <span className="text-red-600 font-semibold">
                  ❌ Second case (within 30–60 days):
                </span>{" "}
                No coupon issued.
              </li>
              <li>
                <span className="text-yellow-600 font-semibold">
                  ⚠️ Third or repeated cases:
                </span>{" "}
                Your account may be flagged for review or suspension.
              </li>
            </ul>
            <p className="italic text-sm text-gray-500 mt-2">
              “One genuine miss = coupon. Repeated misses = scrutiny.”
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1">
              3. Coupon Code Usage
            </h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>
                Coupons are non-transferable and valid for commission offset
                only.
              </li>
              <li>
                They cannot be exchanged for cash or used outside the platform.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1">
              4. Abuse & Misuse
            </h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>
                Misuse of the dispute system (frequent false claims) may lead
                to:
              </li>
              <li>Reduced platform visibility</li>
              <li>Temporary suspension</li>
              <li>Permanent account ban in serious cases</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1">
              5. Final Rights
            </h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>
                PhysNXT holds final rights on all refund decisions after
                internal verification.
              </li>
              <li>
                Continued use of the platform means you accept the updated
                refund policy.
              </li>
            </ul>
          </div>
        </div>
        <div className=" flex items-center  justify-center mt-4">
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Go to Sign UP
          </button>
        </div>
      </div>
    </div>
  );
}

export default Terms;
