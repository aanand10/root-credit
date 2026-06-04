# Account Creation Flow (Figma to React)

A pixel-perfect, production-grade multi-step account creation wizard built from Figma design specifications using React, TypeScript, and Tailwind CSS v4.

---

## Live Demo

👉 **[Live Demo on Vercel](https://account-creation-flow-placeholder.vercel.app/)** *(Replace with your deployment URL)*

---

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript (strict types, zero `any` declarations)
- **Styling**: Tailwind CSS v4 (purely utility-driven, no custom CSS files)
- **State Management**: Custom React Hooks + Global state synchronization (`window.userlogin`)

---

## Architecture Decisions

- **Config-Driven Wizards**: The step progression is entirely driven by a configuration array (`STEPS`). Each step defines its layout, title, subtitle, and associated input field component.
- **Centralized Logic**: All state management, validation logic, back navigation, and continue actions are encapsulated within the custom `useFormFlow` hook. `App.tsx` remains light and only handles presentation layout.
- **Global State Synchronization**: All validated data is synced and persisted directly inside the `window.userlogin` object on every step change, following the user data storage contract.
- **Tailwind-Only Styling**: Implemented zero custom CSS rules or external component UI libraries. Extends Tailwind v4 using `@theme` inside the core CSS file for custom animations (e.g. error shake).
- **Isolated Fields**: Input components (`PhoneInput`, `OTPInput`, etc.) are fully isolated, stateless, and reusable modules that only receive inputs and report change events.

---

## Enhancements Beyond Figma

1. **OTP Auto-Advance & Backspace Focus Navigation**: Digits entered automatically shift focus forward. Pressing Backspace on an empty box shifts focus to the previous box.
2. **Resend OTP Cooldown**: Implemented a 30-second countdown timer on clicking "Resend OTP" to prevent API spamming.
3. **Password Strength Validation & Matching Indicator**: Dynamically color-codes validation rules below password fields (gray to green) when matching constraints are satisfied.
4. **Smooth Transitions**: Entering steps fade and slide in from the right (`translate-x-8 opacity-0` -> `translate-x-0 opacity-100`) via high-performance hardware-accelerated CSS transitions.
5. **Validation Shake Error Animation**: The OTP input container shakes horizontally (`animate-shake`) on validation failure to give distinct feedback.
6. **Keyboard Navigation**: Pressing `Enter` anywhere on the card automatically validates and clicks the "Continue" button, while bypassing default browser behavior.
7. **`window.userlogin` Initialization**: Initialized with default values on mount and logged to the developer console for debugging convenience.
8. **Mobile Responsiveness**: Clean, collapsible design layout. Below `md` breakpoint, the decorative left panel hides, card paddings adjust dynamically, and elements stack vertically.

---

## Folder Structure

```text
src/
├── assets/
│   └── left-Illustration.svg     # SVG illustration asset
├── config/
│   └── steps.ts                 # STEPS config array driving the wizard
├── components/
│   ├── LeftPanel.tsx            # Decorative panel (Illustration + Title)
│   ├── ProgressBar.tsx          # Card header progress indicator
│   ├── StepRenderer.tsx         # Mounts and animates step-specific inputs
│   ├── NavButtons.tsx           # Shared Back/Continue actions
│   ├── SuccessModal.tsx         # Account summary modal on completion
│   └── fields/
│       ├── AccountTypeSelector.tsx
│       ├── PhoneInput.tsx
│       ├── OTPInput.tsx
│       ├── NameInput.tsx
│       └── PasswordInput.tsx
├── hooks/
│   └── useFormFlow.ts           # Central state, validation, & sync hook
├── types/
│   └── index.ts                 # Type declarations & global window declarations
├── index.css                    # Tailwind CSS imports & theme extension
├── main.tsx                     # React application entry point
└── App.tsx                      # Root page layout coordinator
```

---

## Getting Started

Follow these steps to run the application locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## Design Decisions

We chose manual validation instead of importing a heavy form-handling library (like Formik or React Hook Form) to keep the project lightweight, dependency-free, and highly transparent. Because the steps require non-standard behaviors (such as automatic focus shifts between index-based OTP input boxes, manual click-to-trigger countdown loops, and custom matching-rule indicators), writing a focused validation function gives us direct control over intermediate states without fighting library abstractions. 

Additionally, we adopted a config-driven step wizard approach instead of separate route pages (e.g. `/step-1`, `/step-2`). This maintains clean, unified state transitions, avoids complex routing configurations, and allows developers to easily swap, insert, or delete steps in the workflow by modifying a single file: `src/config/steps.ts`.
