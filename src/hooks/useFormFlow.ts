import { useState, useEffect } from "react";
import type { FormData, FormErrors } from "../types";

const INITIAL_FORM_DATA: FormData = {
  accountType: "",
  countryCode: "+1",
  mobileNumber: "",
  otp: ["", "", "", ""],
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

export function useFormFlow() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize window.userlogin on mount
  useEffect(() => {
    window.userlogin = {
      currentStep: 1,
      completedSteps: [],
      formData: { ...INITIAL_FORM_DATA },
    };
    console.log("window.userlogin initialized", window.userlogin);
  }, []);

  // Helper to sync local react state with window.userlogin
  const syncToWindow = (
    nextStep: number,
    nextCompleted: number[],
    nextData: FormData
  ) => {
    window.userlogin = {
      currentStep: nextStep,
      completedSteps: nextCompleted,
      formData: { ...nextData },
    };
    console.log("window.userlogin synced", window.userlogin);
  };

  const validateStep = (step: number, data: FormData): FormErrors => {
    const stepErrors: FormErrors = {};

    if (step === 1) {
      if (!data.accountType) {
        stepErrors.accountType = "Please select an account type";
      }
    } else if (step === 2) {
      const isDigits = /^\d+$/.test(data.mobileNumber);
      if (!data.mobileNumber.trim()) {
        stepErrors.mobileNumber = "Enter a valid mobile number";
      } else if (!isDigits || data.mobileNumber.length < 7 || data.mobileNumber.length > 15) {
        stepErrors.mobileNumber = "Enter a valid mobile number";
      }
    } else if (step === 3) {
      if (
        !data.otp ||
        data.otp.length !== 4 ||
        data.otp.some((digit) => !digit)
      ) {
        stepErrors.otp = "Enter all 4 digits";
      }
    } else if (step === 4) {
      if (!data.firstName.trim()) {
        stepErrors.firstName = "First name is required";
      }
      if (!data.lastName.trim()) {
        stepErrors.lastName = "Last name is required";
      }
    } else if (step === 5) {
      if (data.password.length < 6) {
        stepErrors.password = "Must be at least 6 characters";
      }
      if (data.confirmPassword !== data.password) {
        stepErrors.confirmPassword = "Passwords do not match";
      }
    }

    return stepErrors;
  };

  const handleContinue = () => {
    // If already loading, ignore double clicks
    if (isLoading) return;

    const stepErrors = validateStep(currentStep, formData);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    // Clear previous errors if validation passes
    setErrors({});

    // Simulate loading for nice feedback
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const nextCompleted = completedSteps.includes(currentStep)
        ? completedSteps
        : [...completedSteps, currentStep];

      setCompletedSteps(nextCompleted);

      if (currentStep === 5) {
        setShowModal(true);
        syncToWindow(currentStep, nextCompleted, formData);
      } else {
        const nextStep = currentStep + 1;
        
        // If moving to step 3, make sure OTP is reset/initialized to default empties
        let updatedData = formData;
        if (currentStep === 2) {
          updatedData = { ...formData, otp: ["", "", "", ""] };
          setFormData(updatedData);
        }

        setCurrentStep(nextStep);
        syncToWindow(nextStep, nextCompleted, updatedData);
      }
    }, 600); // 600ms simulation time
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const nextStep = currentStep - 1;
      setCurrentStep(nextStep);
      setErrors({});
      // Sync back navigation to window
      syncToWindow(nextStep, completedSteps, formData);
    }
  };

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };
      return updated;
    });

    // Clear error for this field
    setErrors((prev) => {
      const updated = { ...prev };
      if (field === "otp") {
        delete updated.otp;
      } else {
        delete updated[field as keyof FormErrors];
      }
      return updated;
    });
  };

  return {
    currentStep,
    completedSteps,
    formData,
    errors,
    showModal,
    isLoading,
    handleContinue,
    handleBack,
    updateField,
    setShowModal,
  };
}
