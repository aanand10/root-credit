import { useEffect } from "react";
import { useFormFlow } from "./hooks/useFormFlow";
import { STEPS } from "./config/steps";
import LeftPanel from "./components/LeftPanel";
import ProgressBar from "./components/ProgressBar";
import StepRenderer from "./components/StepRenderer";
import NavButtons from "./components/NavButtons";
import SuccessModal from "./components/SuccessModal";
import screenBgPattern from "./assets/screen-bg-pattern.svg";

export default function App() {
  const {
    currentStep,
    formData,
    errors,
    showModal,
    isLoading,
    handleContinue,
    handleBack,
    updateField,
    setShowModal,
  } = useFormFlow();

  const currentStepConfig = STEPS[currentStep - 1];

  // Global keydown listener to trigger handleContinue on Enter
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        // Prevent double submit if focus is already on a button
        if (document.activeElement?.tagName === "BUTTON") {
          return;
        }
        e.preventDefault();
        handleContinue();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [handleContinue]);

  return (
    <div
      className="min-h-screen bg-[#F3F5F8] flex  font-sans bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${screenBgPattern})` }}
    >
      {/* Left column ~45% */}
      <div className="hidden md:flex w-[45%]">
        <LeftPanel />
      </div>

      {/* Right column ~55% */}
      <div className="flex-1 flex items-center justify-center p-4  sm:p-8 !pl-0">
        <div className="bg-white rounded-2xl shadow-md w-full h-full max-w-xl overflow-hidden flex flex-col">
          {/* Progress bar — flush to top of card, no padding */}
          <ProgressBar currentStep={currentStep} totalSteps={5} />

          {/* Card content with padding */}
          <div className="px-6 py-8 sm:px-10 sm:py-10 flex flex-col justify-between flex-1">
            <div>
              <StepRenderer
                step={currentStepConfig}
                formData={formData}
                errors={errors}
                updateField={updateField}
              />
            </div>
            <NavButtons
              onBack={handleBack}
              onContinue={handleContinue}
              isFirstStep={currentStep === 1}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <SuccessModal formData={formData} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
