import { useState, useEffect } from "react";
import type { FormData } from "../types";

interface SuccessModalProps {
  formData: FormData;
  onClose: () => void;
}

export default function SuccessModal({ formData, onClose }: SuccessModalProps) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      {/* Modal card */}
      <div
        className={`bg-white rounded-2xl p-10 w-full max-w-md shadow-2xl transition-all duration-300 transform ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Checkmark icon centered */}
        <div className="w-16 h-16 rounded-full border-2 border-[#2D5BE3] flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-[#2D5BE3]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-xl font-bold text-[#1A2340] text-center mt-2">
          You're all set!
        </h2>
        <p className="text-sm text-[#8896AB] text-center mt-1 mb-6">
          Here's a quick summary of your account details
        </p>

        {/* Summary Card */}
        <div className="bg-[#F5F7FA] rounded-xl p-5 space-y-3">
          {/* Account Type */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8896AB]">Account Type</span>
            <span className="text-sm font-bold text-[#1A2340]">
              {capitalize(formData.accountType)}
            </span>
          </div>

          {/* Hardcoded Email */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8896AB]">Email</span>
            <span className="text-sm font-bold text-[#1A2340]">
              jo••••@example.com
            </span>
          </div>

          {/* Name */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8896AB]">Name</span>
            <span className="text-sm font-bold text-[#1A2340]">
              {formData.firstName} {formData.lastName}
            </span>
          </div>

          {/* Mobile Number */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8896AB]">Mobile Number</span>
            <span className="text-sm font-bold text-[#1A2340]">
              {formData.countryCode} {formData.mobileNumber}
            </span>
          </div>
        </div>

        {/* Security Note Row */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4 text-[#38A169]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="text-xs text-[#6B7A99]">
            Your account is secured with bank-grade security
          </span>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full bg-[#2D5BE3] text-white font-semibold rounded-full py-3.5 text-sm transition-all duration-200 hover:bg-[#1A3FB5] active:scale-95 cursor-pointer text-center block"
        >
          Go To Dashboard
        </button>
      </div>
    </div>
  );
}
