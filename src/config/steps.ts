import type { StepConfig } from "../types";

export const STEPS: StepConfig[] = [
  {
    id: 1,
    title: "To join us tell us what type of account you are opening",
    fieldType: "account-type",
  },
  {
    id: 2,
    title: "OTP Verification",
    subtitle: "Mobile Number*",
    fieldType: "phone",
  },
  {
    id: 3,
    title: "OTP Verification",
    subtitle: "An OTP has been sent to your mobile number",
    fieldType: "otp",
  },
  {
    id: 4,
    title: "What is your name?",
    fieldType: "name",
  },
  {
    id: 5,
    title: "Create Password for your account",
    fieldType: "password",
  },
];
