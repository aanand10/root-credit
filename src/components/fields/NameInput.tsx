interface NameInputProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (val: string) => void;
  onLastNameChange: (val: string) => void;
  errors: { firstName?: string; lastName?: string };
}

export default function NameInput({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  errors,
}: NameInputProps) {
  return (
    <div className="flex flex-col gap-5 text-left">
      {/* First Name Field */}
      <div>
        <label className="block text-xs font-medium text-[#8896AB] mb-2">
          First Name*
        </label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          className={`w-full border rounded-xl px-4 py-3.5 text-sm text-[#1A2340] placeholder-[#B0BCCF] outline-none transition-all duration-200 focus:ring-2 ${
            errors.firstName
              ? "border-[#E53E3E] focus:border-[#E53E3E] focus:ring-[#E53E3E]/20"
              : "border-[#D8E1EE] focus:border-[#2D5BE3] focus:ring-[#2D5BE3]/20"
          }`}
        />
        {errors.firstName && (
          <p className="text-xs text-[#E53E3E] mt-1.5">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name Field */}
      <div>
        <label className="block text-xs font-medium text-[#8896AB] mb-2">
          Last Name*
        </label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
          className={`w-full border rounded-xl px-4 py-3.5 text-sm text-[#1A2340] placeholder-[#B0BCCF] outline-none transition-all duration-200 focus:ring-2 ${
            errors.lastName
              ? "border-[#E53E3E] focus:border-[#E53E3E] focus:ring-[#E53E3E]/20"
              : "border-[#D8E1EE] focus:border-[#2D5BE3] focus:ring-[#2D5BE3]/20"
          }`}
        />
        {errors.lastName && (
          <p className="text-xs text-[#E53E3E] mt-1.5">{errors.lastName}</p>
        )}
      </div>
    </div>
  );
}
