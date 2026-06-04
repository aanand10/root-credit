import React from "react";

interface PhoneInputProps {
  countryCode: string;
  mobileNumber: string;
  onCountryChange: (val: string) => void;
  onNumberChange: (val: string) => void;
  error?: string;
}

export default function PhoneInput({
  countryCode,
  mobileNumber,
  onCountryChange,
  onNumberChange,
  error,
}: PhoneInputProps) {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Filter non-digits
    const cleanValue = e.target.value.replace(/\D/g, "");
    onNumberChange(cleanValue);
  };

  const countries = [
    { code: "+1", label: "🇺🇸 +1", name: "US" },
    { code: "+91", label: "🇮🇳 +91", name: "IN" },
    { code: "+44", label: "🇬🇧 +44", name: "UK" },
    { code: "+61", label: "🇦🇺 +61", name: "AU" },
    { code: "+49", label: "🇩🇪 +49", name: "DE" },
  ];

  const maxLengthMap: Record<string, number> = {
    "+1": 10,
    "+91": 10,
    "+44": 10,
    "+61": 9,
    "+49": 11,
  };
  const currentMaxLength = maxLengthMap[countryCode] || 15;

  return (
    <div className="w-full text-left">
      <label className="block text-xs font-medium text-[#8896AB] mb-2">
        Mobile Number*
      </label>
      <div className="flex gap-3">
        {/* Country Code Select Wrapper */}
        <div className="relative w-28">
          <select
            value={countryCode}
            onChange={(e) => onCountryChange(e.target.value)}
            className="w-full h-full border border-[#D8E1EE] rounded-xl pl-3 pr-8 py-3.5 text-sm text-[#1A2340] outline-none focus:border-[#2D5BE3] focus:ring-2 focus:ring-[#2D5BE3]/20 appearance-none bg-white cursor-pointer transition-all duration-200"
          >
            {countries.map((c) => (
              <option key={`${c.code}-${c.name}`} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
          {/* Custom Chevron Down Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#8896AB]">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Mobile Number Input */}
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={currentMaxLength}
          placeholder="Enter mobile number"
          value={mobileNumber}
          onChange={handlePhoneChange}
          className={`flex-1 border rounded-xl px-4 py-3.5 text-sm text-[#1A2340] placeholder-[#B0BCCF] outline-none transition-all duration-200 focus:ring-2 ${
            error
              ? "border-[#E53E3E] focus:border-[#E53E3E] focus:ring-[#E53E3E]/20"
              : "border-[#D8E1EE] focus:border-[#2D5BE3] focus:ring-[#2D5BE3]/20"
          }`}
        />
      </div>
      {error && <p className="text-xs text-[#E53E3E] mt-1.5">{error}</p>}
    </div>
  );
}
