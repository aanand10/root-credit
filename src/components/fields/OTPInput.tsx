import React, { useRef, useState, useEffect } from "react";

interface OTPInputProps {
  otp: string[];
  onChange: (otp: string[]) => void;
  error?: string;
}

export default function OTPInput({ otp, onChange, error }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [cooldown, setCooldown] = useState<number>(0);

  // Focus the first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown === 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleInputChange = (index: number, val: string) => {
    // Keep only numeric characters
    const cleanDigit = val.replace(/\D/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = cleanDigit;
    onChange(newOtp);

    // Auto-advance if digit is entered
    if (cleanDigit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      const currentBoxVal = otp[index];

      if (!currentBoxVal && index > 0) {
        // If box is already empty, clear the previous box and shift focus to it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        onChange(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Just clear the current box
        const newOtp = [...otp];
        newOtp[index] = "";
        onChange(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (pastedText) {
      const newOtp = [...otp];
      for (let i = 0; i < 4; i++) {
        newOtp[i] = pastedText[i] || "";
      }
      onChange(newOtp);

      // Focus the appropriate box
      const targetIndex = Math.min(pastedText.length, 3);
      inputRefs.current[targetIndex]?.focus();
    }
  };

  const handleResendClick = () => {
    if (cooldown > 0) return;
    setCooldown(30);
    // Clear and refocus
    onChange(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full text-left">
      <p className="block text-xs font-medium text-[#8896AB] mb-2">
        An OTP has been sent to your mobile number{" "}
      </p>
      {/* Wrapper with conditional shake animation on error */}
      <div
        className={`flex gap-4 justify-between max-w-xs mx-0 mb-6 ${
          error ? "animate-shake" : ""
        }`}
      >
        {Array.from({ length: 4 }).map((_, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={otp[idx] || ""}
            onChange={(e) => handleInputChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            className={`w-16 h-16 text-center text-2xl font-bold border-[1.5px] rounded-xl outline-none transition-all duration-200 focus:ring-2 ${
              error
                ? "border-[#E53E3E] focus:border-[#E53E3E] focus:ring-[#E53E3E]/20"
                : "border-[#D8E1EE] focus:border-[#2D5BE3] focus:ring-[#2D5BE3]/20"
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="text-xs text-[#E53E3E] text-center mb-4">{error}</p>
      )}

      <div className="text-center text-sm text-[#8896AB]">
        Did not receive OTP?{" "}
        <button
          type="button"
          onClick={handleResendClick}
          disabled={cooldown > 0}
          className={`font-semibold transition-colors duration-200 ${
            cooldown > 0
              ? "text-[#B0BCCF] cursor-not-allowed"
              : "text-[#2D5BE3] hover:underline cursor-pointer"
          }`}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}
