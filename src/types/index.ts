export type AccountType = 'personal' | 'business' | '';

export type FormData = {
  accountType: AccountType;
  countryCode: string;
  mobileNumber: string;
  otp: string[];
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export type FieldType = 'account-type' | 'phone' | 'otp' | 'name' | 'password';

export type StepConfig = {
  id: number;
  title: string;
  subtitle?: string;
  fieldType: FieldType;
};

export type FormErrors = Partial<Record<keyof FormData | 'otp', string>>;

declare global {
  interface Window {
    userlogin: {
      currentStep: number;
      completedSteps: number[];
      formData: FormData;
    };
  }
}
