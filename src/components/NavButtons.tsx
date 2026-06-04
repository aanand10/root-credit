interface NavButtonsProps {
  onBack: () => void;
  onContinue: () => void;
  isFirstStep?: boolean;
  isLoading?: boolean;
}

export default function NavButtons({
  onBack,
  onContinue,
  isFirstStep = false,
  isLoading = false,
}: NavButtonsProps) {
  return (
    <div className="flex gap-4 pt-6">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep}
        className={`flex-1 border border-[#D8E1EE] text-[#2D5BE3] font-semibold rounded-full py-3.5 text-sm transition-all duration-200 hover:bg-[#F0F4FF] active:scale-95 ${
          isFirstStep ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        Back
      </button>

      <button
        type="button"
        onClick={onContinue}
        disabled={isLoading}
        className="flex-1 bg-[#2D5BE3] text-white font-semibold rounded-full py-3.5 text-sm transition-all duration-200 hover:bg-[#1A3FB5] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[52px]"
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
}
