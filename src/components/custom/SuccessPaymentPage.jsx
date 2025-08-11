import useTransactionStore from "@/stores/useTransactionStore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const SuccessPaymentPage = () => {
  const navigate = useNavigate();
  const { topupCoins } = useTransactionStore();

  const handleGoHome = async() => {
    await topupCoins(200);
    // window.location.href = "/"
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        <div className="text-green-500 mb-4">
          <svg
            className="mx-auto h-16 w-16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. We have received your payment
          successfully.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition duration-200"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPaymentPage;
