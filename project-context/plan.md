# Account Creation Flow — PLAN.md

## Problem

Build a multi-step account creation flow with 5 screens. Each screen collects specific user data, validates it, and progresses the user through the funnel. A progress bar reflects completion. A success modal appears at the end.

---

## Screens Overview

| Step | Screen Title             | Key Inputs                        | Notes                                                    |
| ---- | ------------------------ | --------------------------------- | -------------------------------------------------------- |
| 1    | Account Type             | accountType (Personal / Business) | Card-style selector, single choice                       |
| 2    | OTP Verification — Phone | mobileNumber, countryCode         | Phone input with country code dropdown                   |
| 3    | OTP Verification — Code  | otp[0..3]                         | 4 individual digit boxes, auto-advance, resend link      |
| 4    | Name                     | firstName, lastName               | Two text inputs                                          |
| 5    | Create Password          | password, confirmPassword         | Show/hide toggle, inline validation hints                |
| ✅   | Success Modal            | —                                 | Overlay modal with account summary + Go To Dashboard CTA |

---

## Flow Sequence

```
[Step 1: Account Type]
       ↓ Continue
[Step 2: Mobile Number + Country Code]
       ↓ Continue  → (simulate OTP send)
[Step 3: OTP Entry (4-digit)]
       ↓ Continue
[Step 4: Name Entry]
       ↓ Continue
[Step 5: Password Creation]
       ↓ Continue
[Success Modal — "You're all set!"]
       ↓ Go To Dashboard
[End / Reset]
```

Back button at each step goes to the previous step (Step 1 Back is a no-op or disabled).

---

## Progress Bar

- Located at the top of the right panel (form card)
- Total steps: 5
- Completion = (currentStep / totalSteps) \* 100
- Animates smoothly on step change (CSS transition)
- Blue filled portion, gray unfilled

---

## Architecture

### Screen Config (config-driven rendering)

Each screen is defined in a `STEPS` config array:

```ts
type FieldConfig = {
  name: string; // key in formData
  type: "text" | "password" | "tel" | "otp" | "account-type";
  label?: string;
  placeholder?: string;
  hint?: string; // inline hint below field (e.g. "Must be at least 6 characters")
  required?: boolean;
};

type StepConfig = {
  id: number;
  title: string;
  subtitle?: string; // e.g. "An OTP has been sent to your mobile number"
  fields: FieldConfig[];
};
```

### Component Map

```
<App>
  ├── <LeftPanel>           — Illustration + "Create your account" headline (static)
  └── <RightPanel>
        ├── <ProgressBar>   — top bar, driven by currentStep/totalSteps
        ├── <StepRenderer>  — renders current step config → correct field components
        │     ├── <AccountTypeSelector>   (Step 1)
        │     ├── <PhoneInput>            (Step 2)
        │     ├── <OTPInput>              (Step 3)
        │     ├── <NameInput>             (Step 4)
        │     └── <PasswordInput>         (Step 5)
        └── <NavButtons>    — Back + Continue (shared across all steps)

<SuccessModal>              — overlay, shown after Step 5 Continue
```

### State Shape

```ts
// Stored on window.userlogin (and mirrored in React state for reactivity)
window.userlogin = {
  currentStep: 1, // 1–5
  completedSteps: [], // e.g. [1, 2, 3]
  formData: {
    accountType: "", // 'personal' | 'business'
    countryCode: "+1",
    mobileNumber: "",
    otp: ["", "", "", ""],
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  },
};
```

On each `Continue` click:

1. Validate current step fields
2. If valid → push step to `completedSteps`, increment `currentStep`, sync to `window.userlogin`
3. If Step 5 → show `<SuccessModal>`

---

## Validation Rules Per Step

| Step | Field           | Rule                                |
| ---- | --------------- | ----------------------------------- |
| 1    | accountType     | Must select one                     |
| 2    | mobileNumber    | Non-empty, digits only, min 7 chars |
| 3    | otp             | All 4 digits filled                 |
| 4    | firstName       | Non-empty                           |
| 4    | lastName        | Non-empty                           |
| 5    | password        | Min 6 characters                    |
| 5    | confirmPassword | Must match password                 |

Errors shown inline below each field in red. Continue button disabled or triggers validation on click.

---

## Interaction States

| Element           | States                                                                    |
| ----------------- | ------------------------------------------------------------------------- |
| Account type card | Default → Hover (border highlight) → Selected (blue border + checkmark)   |
| Text inputs       | Default → Focus (blue border) → Error (red border + message) → Filled     |
| OTP boxes         | Default → Focus (blue border, scale up slightly) → Filled → Error (shake) |
| Password fields   | Toggle show/hide icon; hint text turns green when valid                   |
| Back button       | Outline style → Hover (slight bg fill)                                    |
| Continue button   | Solid blue → Hover (darken) → Loading (spinner) → Disabled (muted)        |
| Resend OTP link   | Blue text → Hover underline → Cooldown timer (grayed out)                 |

---

## Animations & Transitions

- **Step transition**: Slide-in from right / slide-out to left (CSS `translate-x` + `opacity`)
- **Progress bar**: CSS `transition: width 400ms ease`
- **OTP boxes**: Auto-focus next on digit entry; shake animation on wrong OTP
- **Success modal**: Fade + scale in (`scale-95 opacity-0` → `scale-100 opacity-100`)
- **Form errors**: Fade in from top with slight slide (`animate-fade-in`)

---

## Tech Stack

- **React + TypeScript** — component tree and state
- **Tailwind CSS** — ALL styling, layout, animations, and transitions (no external CSS or styled-components)
- **No animation libraries** — all transitions via Tailwind utility classes (`transition`, `duration-300`, `ease-in-out`, `translate-x`, `opacity`, `scale`)
- **No external form library** — manual validation to keep it transparent and lightweight

---

## Enhancements Over Figma

1. **OTP auto-advance** — cursor moves to next box automatically on digit entry
2. **Resend OTP cooldown** — 30s timer before resend is active again
3. **Password strength indicator** — subtle bar below password field
4. **window.userlogin sync** — all data persisted to `window.userlogin` at every validated step
5. **Keyboard navigation** — Enter key triggers Continue; Backspace in OTP goes back a box
6. **Accessible** — labels, aria-invalid, focus management between steps

---

## File Structure

```
src/
├── config/
│   └── steps.ts             # STEPS config array
├── components/
│   ├── LeftPanel.tsx
│   ├── ProgressBar.tsx
│   ├── StepRenderer.tsx
│   ├── NavButtons.tsx
│   ├── SuccessModal.tsx
│   └── fields/
│       ├── AccountTypeSelector.tsx
│       ├── PhoneInput.tsx
│       ├── OTPInput.tsx
│       ├── NameInput.tsx
│       └── PasswordInput.tsx
├── hooks/
│   └── useFormFlow.ts       # step logic, validation, window.userlogin sync
├── types/
│   └── index.ts
└── App.tsx
```

---

## Context Notes (CONTEXT.md highlights)

- Left panel is **purely decorative** — illustration + headline, no interactivity
- Right panel is a **white card** floating on a light gray background
- Progress bar sits **above** the card title, spanning the full card width
- All inputs use **rounded-xl** borders with subtle gray default, blue on focus
- Typography: title is **bold dark navy**, labels are **small gray**, placeholders are **light gray**
- Button pair: Back is outline (blue text), Continue is solid blue fill — both fully rounded pill shape
- Country code selector in Step 2 is a **dropdown with flag emoji + dial code**
- OTP boxes are **square, large, centered** with one digit each
- Success modal has a **dimmed backdrop** over the entire page
