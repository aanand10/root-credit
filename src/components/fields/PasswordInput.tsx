import { useState } from "react";

interface PasswordInputProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (val: string) => void;
  onConfirmChange: (val: string) => void;
  errors: { password?: string; confirmPassword?: string };
}

export default function PasswordInput({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmChange,
  errors,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const isPasswordValid = password.length >= 6;
  const isMatchValid =
    confirmPassword === password && confirmPassword.length > 0;

  return (
    <div className="flex flex-col gap-5 text-left">
      {/* Password Field */}
      <div>
        <label className="block text-xs font-medium text-[#8896AB] mb-2">
          Password*
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className={`w-full border rounded-xl pl-4 pr-10 py-3.5 text-sm text-[#1A2340] placeholder-[#B0BCCF] outline-none transition-all duration-200 focus:ring-2 ${
              errors.password
                ? "border-[#E53E3E] focus:border-[#E53E3E] focus:ring-[#E53E3E]/20"
                : "border-[#D8E1EE] focus:border-[#2D5BE3] focus:ring-[#2D5BE3]/20"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D5BE3] hover:text-[#1A3FB5] focus:outline-none"
          >
            {showPassword ? (
              // Eye-off icon
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              // Eye icon
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>
        {errors.password ? (
          <p className="text-xs text-[#E53E3E] mt-1.5">{errors.password}</p>
        ) : (
          <p
            className={`text-xs mt-1.5 transition-colors duration-200 ${
              isPasswordValid ? "text-[#38A169]" : "text-[#9BA8BB]"
            }`}
          >
            Must be at least 6 characters
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-xs font-medium text-[#8896AB] mb-2">
          Confirm Password*
        </label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => onConfirmChange(e.target.value)}
            className={`w-full border rounded-xl pl-4 pr-10 py-3.5 text-sm text-[#1A2340] placeholder-[#B0BCCF] outline-none transition-all duration-200 focus:ring-2 ${
              errors.confirmPassword
                ? "border-[#E53E3E] focus:border-[#E53E3E] focus:ring-[#E53E3E]/20"
                : "border-[#D8E1EE] focus:border-[#2D5BE3] focus:ring-[#2D5BE3]/20"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D5BE3] hover:text-[#1A3FB5] focus:outline-none"
          >
            {showConfirm ? (
              // Eye-off icon
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              // Eye icon
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>
        {errors.confirmPassword ? (
          <p className="text-xs text-[#E53E3E] mt-1.5">
            {errors.confirmPassword}
          </p>
        ) : (
          <p
            className={`text-xs mt-1.5 transition-colors duration-200 ${
              isMatchValid ? "text-[#38A169]" : "text-[#9BA8BB]"
            }`}
          >
            Both passwords must match
          </p>
        )}
      </div>
    </div>
  );
}
