import { useState, useEffect } from "react";
import type { StepConfig, FormData, FormErrors } from "../types";
import AccountTypeSelector from "./fields/AccountTypeSelector";
import PhoneInput from "./fields/PhoneInput";
import OTPInput from "./fields/OTPInput";
import NameInput from "./fields/NameInput";
import PasswordInput from "./fields/PasswordInput";

interface StepRendererProps {
  step: StepConfig;
  formData: FormData;
  errors: FormErrors;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

export default function StepRenderer({
  step,
  formData,
  errors,
  updateField,
}: StepRendererProps) {
  const [isEntering, setIsEntering] = useState<boolean>(false);

  useEffect(() => {
    setIsEntering(false);
    const frame = requestAnimationFrame(() => {
      setIsEntering(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [step.id]);

  const renderField = () => {
    switch (step.fieldType) {
      case "account-type":
        return (
          <AccountTypeSelector
            value={formData.accountType}
            onChange={(val) => updateField("accountType", val)}
            error={errors.accountType}
          />
        );
      case "phone":
        return (
          <PhoneInput
            countryCode={formData.countryCode}
            mobileNumber={formData.mobileNumber}
            onCountryChange={(val) => updateField("countryCode", val)}
            onNumberChange={(val) => updateField("mobileNumber", val)}
            error={errors.mobileNumber}
          />
        );
      case "otp":
        return (
          <OTPInput
            otp={formData.otp}
            onChange={(val) => updateField("otp", val)}
            error={errors.otp}
          />
        );
      case "name":
        return (
          <NameInput
            firstName={formData.firstName}
            lastName={formData.lastName}
            onFirstNameChange={(val) => updateField("firstName", val)}
            onLastNameChange={(val) => updateField("lastName", val)}
            errors={{
              firstName: errors.firstName,
              lastName: errors.lastName,
            }}
          />
        );
      case "password":
        return (
          <PasswordInput
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            onPasswordChange={(val) => updateField("password", val)}
            onConfirmChange={(val) => updateField("confirmPassword", val)}
            errors={{
              password: errors.password,
              confirmPassword: errors.confirmPassword,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      key={step.id}
      className={`transition-all duration-300 ease-out transform ${
        isEntering
          ? "translate-x-0 opacity-100"
          : "translate-x-8 opacity-0"
      }`}
    >
      {step.fieldType === "account-type" ? (
        <h2 className="text-xl text-[#1A2340] font-normal mb-8 text-left leading-snug">
          To join us tell us{" "}
          <strong className="font-bold text-[#1A2340]">
            what type of account
          </strong>{" "}
          you are opening
        </h2>
      ) : (
        <h2 className="text-xl font-bold text-[#1A2340] mb-8 text-left leading-snug">
          {step.title}
        </h2>
      )}

      <div className="mb-8">{renderField()}</div>
    </div>
  );
}
