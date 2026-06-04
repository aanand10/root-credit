import type { AccountType } from "../../types";

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (val: AccountType) => void;
  error?: string;
}

export default function AccountTypeSelector({
  value,
  onChange,
  error,
}: AccountTypeSelectorProps) {
  const options: { id: "personal" | "business"; label: string }[] = [
    {
      id: "personal",
      label: "Personal",
    },
    {
      id: "business",
      label: "Business",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        {options.map((option) => {
          const isSelected = value === option.id;
          return (
            <div
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`flex items-center justify-between border-[1.5px] rounded-xl px-5 py-4 cursor-pointer transition-all duration-200 hover:bg-[#F0F4FF] hover:border-[#2D5BE3] ${
                isSelected
                  ? "border-[#2D5BE3] bg-[#F0F4FF]"
                  : "border-[#D8E1EE] bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* SVG Icon */}
                <div
                  className={`transition-colors duration-200 ${
                    isSelected ? "text-[#2D5BE3]" : "text-[#8896AB]"
                  }`}
                >
                  {option.id === "personal" ? (
                    // User icon
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  ) : (
                    // Business briefcase icon
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </div>

                <div className="text-left">
                  <p
                    className={`font-semibold text-sm transition-colors duration-200 ${
                      isSelected ? "text-[#2D5BE3]" : "text-[#1A2340]"
                    }`}
                  >
                    {option.label}
                  </p>
                </div>
              </div>

              {/* Checkmark circle */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? "bg-[#2D5BE3] scale-100"
                    : "bg-transparent scale-0"
                }`}
              >
                {isSelected && (
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {error && (
        <p className="text-xs text-[#E53E3E] mt-1 text-left">{error}</p>
      )}
    </div>
  );
}
