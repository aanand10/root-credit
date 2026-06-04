# EXECUTION PLAN

> Feed each PROMPT block to your LLM one at a time, in order.
> Wait for the LLM to finish and confirm before moving to the next step.
> Do NOT combine steps — each builds on the previous output.

---

## STEP 1 — Project Scaffold

**What gets created:**

- Vite + React + TypeScript project - already done so skip it
- Tailwind CSS configured - already done so skip it
- Custom shake animation added to tailwind config
- Folder structure created
- `window.userlogin` TypeScript declaration added

---

**PROMPT 1:**

```
Scaffold a new Vite + React + TypeScript project called "account-creation-flow".

Do the following:

1. Initialize the project with vite using the react-ts template.

2. Install and configure Tailwind CSS v3 with PostCSS.

3. In tailwind.config.js, extend the theme with a custom shake keyframe animation:
   - keyframes.shake: 0%/100% translateX(0), 25% translateX(-6px), 75% translateX(6px)
   - animation.shake: 'shake 0.3s ease-in-out'

4. Create this exact folder structure under src/:
   src/
   ├── config/
   │   └── steps.ts
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
   │   └── useFormFlow.ts
   ├── types/
   │   └── index.ts
   └── App.tsx

5. In src/types/index.ts, declare the global window type extension:
   declare global {
     interface Window {
       userlogin: {
         currentStep: number;
         completedSteps: number[];
         formData: {
           accountType: 'personal' | 'business' | '';
           countryCode: string;
           mobileNumber: string;
           otp: string[];
           firstName: string;
           lastName: string;
           password: string;
           confirmPassword: string;
         };
       };
     }
   }

6. Leave all component files as empty placeholder exports for now.

Output: Confirm the file structure and the tailwind config content.
```

---

## STEP 2 — Types + Steps Config

**What gets created:**

- All shared TypeScript types
- The STEPS config array that drives screen rendering

---

**PROMPT 2:**

```
We are building a config-driven multi-step account creation form.

Fill in src/types/index.ts and src/config/steps.ts.

--- src/types/index.ts ---

Export these types (plus keep the window declaration from before):

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

--- src/config/steps.ts ---

Export a STEPS array of type StepConfig[] with exactly these 5 entries:

Step 1: id=1, title="To join us tell us what type of account you are opening", fieldType='account-type'
Step 2: id=2, title="OTP Verification", subtitle="Mobile Number*", fieldType='phone'
Step 3: id=3, title="OTP Verification", subtitle="An OTP has been sent to your mobile number", fieldType='otp'
Step 4: id=4, title="What is your name?", fieldType='name'
Step 5: id=5, title="Create Password for your account", fieldType='password'

Output: Full content of both files.
```

---

## STEP 3 — useFormFlow Hook

**What gets created:**

- Central hook managing all form state, navigation, validation, and window.userlogin sync

---

**PROMPT 3:**

```
Create src/hooks/useFormFlow.ts — this is the central state management hook for the multi-step form.

It must:

1. INITIAL STATE:
   - currentStep: number = 1
   - completedSteps: number[] = []
   - showModal: boolean = false
   - formData: FormData = {
       accountType: '', countryCode: '+1', mobileNumber: '',
       otp: ['', '', '', ''], firstName: '', lastName: '',
       password: '', confirmPassword: ''
     }
   - errors: FormErrors = {}

2. On mount (useEffect), initialize window.userlogin with the initial state shape.

3. SYNC FUNCTION — syncToWindow():
   Writes current React state to window.userlogin:
   window.userlogin = { currentStep, completedSteps, formData }
   Call this after every successful Continue action.

4. VALIDATION — validateStep(step: number): FormErrors
   Returns an errors object. Rules:
   - Step 1: accountType must not be ''  → error: 'Please select an account type'
   - Step 2: mobileNumber must be non-empty, digits only, min 7 chars → error: 'Enter a valid mobile number'
   - Step 3: all 4 otp digits must be non-empty strings → error: 'Enter all 4 digits'
   - Step 4: firstName non-empty → 'First name is required'; lastName non-empty → 'Last name is required'
   - Step 5: password length >= 6 → 'Must be at least 6 characters'; confirmPassword === password → 'Passwords do not match'

5. HANDLE CONTINUE — handleContinue():
   - Run validateStep(currentStep)
   - If errors exist → setErrors(errors), return
   - If no errors:
     - Add currentStep to completedSteps
     - If currentStep === 5 → setShowModal(true), syncToWindow(), return
     - Else → increment currentStep, syncToWindow()

6. HANDLE BACK — handleBack():
   - If currentStep > 1 → decrement currentStep
   - Clear errors

7. HANDLE FIELD CHANGE — updateField(field: keyof FormData, value: any):
   - Updates that field in formData
   - Clears the error for that field

8. Export: { currentStep, completedSteps, formData, errors, showModal, handleContinue, handleBack, updateField, setShowModal }

Import types from '../types/index'.
```

---

## STEP 4 — ProgressBar + NavButtons + LeftPanel

**What gets created:**

- Three simple shared components used on every screen

---

**PROMPT 4:**

```
Create these 3 components. Use Tailwind CSS only — no custom CSS or inline styles.

--- src/components/ProgressBar.tsx ---

Props: { currentStep: number; totalSteps: number }

Renders a full-width progress bar at the top of the form card:
- Outer div: w-full h-1 bg-[#E0E6F0] rounded-full overflow-hidden
- Inner div (fill): h-full bg-[#2D5BE3] rounded-full transition-all duration-500 ease-in-out
- Width of fill = (currentStep / totalSteps) * 100 + '%'  (use inline style for the dynamic width only)

--- src/components/NavButtons.tsx ---

Props: {
  onBack: () => void;
  onContinue: () => void;
  isFirstStep?: boolean;
  isLoading?: boolean;
}

Renders two buttons side by side in a row (gap-4, pt-6):
- Back button:
  - Tailwind: flex-1 border border-[#D8E1EE] text-[#2D5BE3] font-semibold rounded-full py-3.5 text-sm transition-all duration-200 hover:bg-[#F0F4FF] active:scale-95
  - Disabled and opacity-40 if isFirstStep is true
- Continue button:
  - Tailwind: flex-1 bg-[#2D5BE3] text-white font-semibold rounded-full py-3.5 text-sm transition-all duration-200 hover:bg-[#1A3FB5] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
  - Shows "Continue" text normally; if isLoading shows an inline SVG spinner (animate-spin, w-5 h-5, white)

--- src/components/LeftPanel.tsx ---

No props.

Renders the static left column:
- Outer: h-full flex flex-col justify-between px-10 py-12
- Top section:
  - <p> "Let's get started" — text-sm text-[#6B7A99]
  - <h1> "Create your account" — text-4xl font-extrabold text-[#0D1B3E] mt-2 leading-tight
  - <p> "Follow the steps to create your account" — text-sm text-[#6B7A99] mt-3
- Bottom section:
  - An SVG illustration placeholder (a rounded rect 100% wide, ~280px tall, bg-[#F0F4FF] rounded-2xl flex items-center justify-center)
  - Inside it write a <p> "Illustration" in text-[#B0BCCF] text-sm (we'll replace with real SVG later)

Output: Full content of all 3 files.
```

---

## STEP 5 — Field Components (5 components)

**What gets created:**

- All 5 step-specific field components

---

**PROMPT 5:**

```
Create all 5 field components under src/components/fields/. Tailwind only.

Color tokens to use throughout:
- Primary blue: #2D5BE3
- Border default: #D8E1EE
- Border focus: #2D5BE3 (via focus:border-[#2D5BE3] focus:ring-2 focus:ring-[#2D5BE3]/20)
- Border error: #E53E3E
- Label color: #8896AB
- Hint/helper: #9BA8BB
- Valid color: #38A169
- Error text: #E53E3E

Base input class (reuse across all text inputs):
"w-full border border-[#D8E1EE] rounded-xl px-4 py-3.5 text-sm text-[#1A2340] placeholder-[#B0BCCF] outline-none transition-all duration-200 focus:border-[#2D5BE3] focus:ring-2 focus:ring-[#2D5BE3]/20"

Error state replaces border classes with: "border-[#E53E3E] focus:border-[#E53E3E] focus:ring-[#E53E3E]/20"

--- AccountTypeSelector.tsx ---

Props: { value: AccountType; onChange: (val: AccountType) => void; error?: string }

Renders 2 clickable cards stacked vertically (gap-4):

Card base: "flex items-center gap-4 border-[1.5px] border-[#D8E1EE] rounded-xl px-5 py-4 cursor-pointer transition-all duration-200 hover:bg-[#F0F4FF] hover:border-[#2D5BE3]"
Card selected adds: "border-[#2D5BE3] bg-[#F0F4FF]"

Each card has:
- Left: SVG icon (use a simple inline SVG person outline for Personal, briefcase for Business)
  - Icon color: #8896AB default, #2D5BE3 selected
- Middle: label text ("Personal" / "Business") font-semibold
  - Text color: #1A2340 default, #2D5BE3 selected
- Right: when selected, show a filled blue circle (bg-[#2D5BE3] w-6 h-6 rounded-full) with a white checkmark SVG inside. Hidden otherwise.

If error, show error text below cards.

--- PhoneInput.tsx ---

Props: {
  countryCode: string;
  mobileNumber: string;
  onCountryChange: (val: string) => void;
  onNumberChange: (val: string) => void;
  error?: string;
}

Renders:
- Label: "Mobile Number*" text-xs font-medium text-[#8896AB] mb-2
- A flex row with gap-3:
  - Country code select: w-28 border border-[#D8E1EE] rounded-xl px-3 py-3.5 text-sm text-[#1A2340] outline-none focus:border-[#2D5BE3] appearance-none bg-white cursor-pointer
    - Options: 🇺🇸 +1, 🇮🇳 +91, 🇬🇧 +44, 🇦🇺 +61, 🇨🇦 +1 CA, 🇩🇪 +49
  - Number input: flex-1, base input class, type="tel", placeholder="Enter mobile number"
    - Only allow numeric input (filter non-digits on onChange)
- Error text below if error

--- OTPInput.tsx ---

Props: {
  otp: string[];
  onChange: (otp: string[]) => void;
  error?: string;
}

Renders:
- Subtitle: "An OTP has been sent to your mobile number" — text-sm text-[#8896AB] mb-4
- A flex row gap-4:
  - 4 individual input boxes. Each:
    - "w-16 h-16 text-center text-2xl font-bold border-[1.5px] border-[#D8E1EE] rounded-xl outline-none transition-all duration-200 focus:border-[#2D5BE3] focus:ring-2 focus:ring-[#2D5BE3]/20"
    - maxLength=1, type="text", inputMode="numeric"
    - On change: accept only single digit, update otp array, auto-focus next box
    - On keyDown Backspace: if current box empty, focus previous box
    - Error state: add "border-[#E53E3E]" and apply "animate-shake" on the row wrapper
- Below: "Did not receive OTP? " + a Resend OTP button
  - Resend: text-[#2D5BE3] font-semibold hover:underline
  - Implement 30s cooldown: after click, disable and show "Resend in 28s" countdown. Re-enable after timer ends.
  - Use useRef for input refs (array of 4)

--- NameInput.tsx ---

Props: {
  firstName: string;
  lastName: string;
  onFirstNameChange: (val: string) => void;
  onLastNameChange: (val: string) => void;
  errors: { firstName?: string; lastName?: string };
}

Renders 2 labeled inputs stacked (gap-5):
- Each: label on top (text-xs font-medium text-[#8896AB] mb-2), then input below
- First Name placeholder: "Oliver"
- Last Name placeholder: "Last Name"
- Apply error border class if respective error exists
- Show error text below each input

--- PasswordInput.tsx ---

Props: {
  password: string;
  confirmPassword: string;
  onPasswordChange: (val: string) => void;
  onConfirmChange: (val: string) => void;
  errors: { password?: string; confirmPassword?: string };
}

Renders 2 password fields stacked (gap-5):

Each field:
- Label above
- Input wrapper: relative
- Input: base class + type toggles between "password" and "text" based on show state
- Eye icon button: absolute right-3 top-1/2 -translate-y-1/2, onClick toggles show/hide
  - Use inline SVG eye / eye-off icons, color #2D5BE3
- Maintain separate showPassword and showConfirm boolean states
- Below first field: hint "Must be atleast 6 characters"
  - Color: #9BA8BB default → #38A169 when password.length >= 6
- Below second field: hint "Both passwords must match"
  - Color: #9BA8BB default → #38A169 when confirmPassword === password && confirmPassword.length > 0
  - Show error text if errors.confirmPassword exists

Output: Full content of all 5 files.
```

---

## STEP 6 — StepRenderer

**What gets created:**

- The component that reads the current step config and renders the correct field component

---

**PROMPT 6:**

```
Create src/components/StepRenderer.tsx.

Props:
{
  step: StepConfig;
  formData: FormData;
  errors: FormErrors;
  updateField: (field: keyof FormData, value: any) => void;
}

This component:
1. Renders the step title as: <h2 className="text-xl font-bold text-[#1A2340] mb-8">{step.title}</h2>
   - Exception for Step 1 (fieldType='account-type'): render title as mixed bold/normal using the design:
     "To join us tell us " <strong>what type of account</strong> " you are opening"
     Use text-[#1A2340] font-normal for normal parts, font-bold for bold part.

2. Based on step.fieldType, renders the matching field component:
   - 'account-type' → <AccountTypeSelector value={formData.accountType} onChange={(val) => updateField('accountType', val)} error={errors.accountType} />
   - 'phone' → <PhoneInput countryCode={formData.countryCode} mobileNumber={formData.mobileNumber} onCountryChange={(val) => updateField('countryCode', val)} onNumberChange={(val) => updateField('mobileNumber', val)} error={errors.mobileNumber} />
   - 'otp' → <OTPInput otp={formData.otp} onChange={(val) => updateField('otp', val)} error={errors.otp} />
   - 'name' → <NameInput firstName={formData.firstName} lastName={formData.lastName} onFirstNameChange={(val) => updateField('firstName', val)} onLastNameChange={(val) => updateField('lastName', val)} errors={{ firstName: errors.firstName, lastName: errors.lastName }} />
   - 'password' → <PasswordInput password={formData.password} confirmPassword={formData.confirmPassword} onPasswordChange={(val) => updateField('password', val)} onConfirmChange={(val) => updateField('confirmPassword', val)} errors={{ password: errors.password, confirmPassword: errors.confirmPassword }} />

3. Wrap the content in a div with key={step.id}. Apply enter animation class:
   "animate-in" pattern using Tailwind:
   - Wrap with: className="transition-all duration-300 translate-x-0 opacity-100"
   - Use the key prop to trigger remount on step change so Tailwind transition fires

Output: Full file content.
```

---

## STEP 7 — SuccessModal

**What gets created:**

- The completion overlay modal with account summary

---

**PROMPT 7:**

```
Create src/components/SuccessModal.tsx.

Props:
{
  formData: FormData;
  onClose: () => void;
}

This is a full-screen overlay modal shown after Step 5 completion.

Structure:
1. Backdrop: fixed inset-0 bg-black/40 z-50 flex items-center justify-center
   - onClick backdrop → do NOT close (modal is dismissible only via button)

2. Modal card: bg-white rounded-2xl p-10 w-full max-w-md mx-4 shadow-2xl
   - Entrance animation: use Tailwind classes. Mount with opacity-0 scale-95, then transition to opacity-100 scale-100 using a useState + useEffect with 10ms delay trick:
     const [visible, setVisible] = useState(false);
     useEffect(() => { setTimeout(() => setVisible(true), 10); }, []);
     className={`transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}

3. Inside the card (top to bottom):
   a. Checkmark icon — centered:
      - A circle: w-16 h-16 rounded-full border-2 border-[#2D5BE3] flex items-center justify-center mx-auto mb-4
      - Inside: SVG checkmark (stroke #2D5BE3, strokeWidth 2.5)

   b. Title: "You're all set!" — text-xl font-bold text-[#1A2340] text-center mt-2

   c. Subtitle: "Here's a quick summary of your account details" — text-sm text-[#8896AB] text-center mt-1 mb-6

   d. Summary card: bg-[#F5F7FA] rounded-xl p-5 space-y-3
      Four rows, each: flex justify-between items-center
      - "Account Type" | formData.accountType (capitalize) — font-bold
      - "Email" | "jo••••@example.com" (hardcoded placeholder)
      - "Name" | formData.firstName + ' ' + formData.lastName — font-bold
      - "Mobile Number" | formData.countryCode + formData.mobileNumber — font-bold
      Left label: text-sm text-[#8896AB]
      Right value: text-sm font-bold text-[#1A2340]

   e. Security note row (mt-4): flex items-center justify-center gap-2
      - Small green shield SVG icon (stroke #38A169)
      - Text: "Your account is secured with bank-grade security" — text-xs text-[#6B7A99]

   f. "Go To Dashboard" button (mt-6):
      - w-full bg-[#2D5BE3] text-white font-semibold rounded-full py-3.5 text-sm transition-all duration-200 hover:bg-[#1A3FB5] active:scale-95
      - onClick → onClose()

Output: Full file content.
```

---

## STEP 8 — App.tsx (Wire Everything Together)

**What gets created:**

- The root component that assembles all pieces into the final working app

---

**PROMPT 8:**

```
Create src/App.tsx — the root component that wires everything together.

It must:

1. Import and use the useFormFlow hook.

2. Import STEPS from config/steps.ts.

3. Derive currentStepConfig = STEPS[currentStep - 1]

4. Overall layout (full viewport, two columns):
   <div className="min-h-screen bg-[#F3F5F8] flex items-stretch">
     {/* Left column ~45% */}
     <div className="hidden md:flex w-[45%] ...">
       <LeftPanel />
     </div>

     {/* Right column ~55% */}
     <div className="flex-1 flex items-center justify-center p-8">
       <div className="bg-white rounded-2xl shadow-md w-full max-w-xl overflow-hidden">
         {/* Progress bar — flush to top of card, no padding */}
         <ProgressBar currentStep={currentStep} totalSteps={5} />

         {/* Card content with padding */}
         <div className="px-10 py-10">
           <StepRenderer
             key={currentStep}
             step={currentStepConfig}
             formData={formData}
             errors={errors}
             updateField={updateField}
           />
           <NavButtons
             onBack={handleBack}
             onContinue={handleContinue}
             isFirstStep={currentStep === 1}
           />
         </div>
       </div>
     </div>
   </div>

5. Render <SuccessModal> conditionally when showModal is true:
   {showModal && <SuccessModal formData={formData} onClose={() => setShowModal(false)} />}

6. Import and reference all types correctly. No TypeScript errors.

Output: Full file content.
```

---

## STEP 9 — Illustration SVG (LeftPanel Enhancement)

**What gets created:**

- Replaces the placeholder in LeftPanel with the actual SVG illustration matching the Figma design

---

**PROMPT 9:**

```
Update src/components/LeftPanel.tsx.

Replace the placeholder illustration div with an inline SVG that matches the Figma design:
- A person sitting cross-legged holding a phone
- Behind them: a large floating form/card UI graphic
- Decorative elements: plant leaves, sparkle stars, dollar/message bubbles
- Color palette: coral/orange (#F4815A) for clothing, dark navy (#0D1B3E) for outlines, light blue (#E8EFF9) for the form card background
- Style: flat line-art illustration, no fills on the body — outline strokes

The SVG should:
- Be viewBox="0 0 500 400"
- Have width="100%" and be responsive
- Sit in the bottom section of the left panel

If generating a precise SVG is complex, create a high-quality stylized SVG placeholder that uses the correct color palette and feels consistent with the design. Use geometric shapes that suggest the illustration (figure + form card + plants).

Output: Full updated LeftPanel.tsx content.
```

---

## STEP 10 — Final Polish & QA

**What gets created:**

- Bug fixes, missing edge cases, final interaction refinements

---

**PROMPT 10:**

```
Review all files created so far and fix the following:

1. KEYBOARD NAVIGATION:
   - In NavButtons, add an onKeyDown handler on the Continue button: if Enter key is pressed anywhere on the form card, trigger handleContinue. Add a global keydown listener in App.tsx useEffect that calls handleContinue on Enter (clean up on unmount).

2. OTP BACKSPACE FIX:
   - In OTPInput, ensure that pressing Backspace on an already-empty box moves focus to the previous box.

3. MOBILE RESPONSIVE:
   - In App.tsx, on screens smaller than md, stack the layout vertically. Left panel is hidden on mobile (already done with hidden md:flex). The right panel card should use px-6 py-8 on mobile instead of px-10 py-10.

4. PROGRESS BAR STEP MAPPING:
   - Confirm progress bar widths: Step 1 = 20%, Step 2 = 40%, Step 3 = 60%, Step 4 = 80%, Step 5 = 100%

5. WINDOW SYNC VERIFICATION:
   - In useFormFlow, confirm window.userlogin is also initialized properly in a useEffect on mount (not just on continue). Console.log('window.userlogin initialized', window.userlogin) on mount so it's verifiable in DevTools.

6. TYPE SAFETY:
   - Ensure no 'any' types remain. Replace with proper types everywhere.
   - Ensure FormErrors covers all fields including otp as a string (not string[]).

7. OTP SIMULATION:
   - In PhoneInput / Step 2, when Continue is clicked (handled by useFormFlow), simulate "OTP sent" by setting otp to ['','','',''] (already default). No real API call needed.

Output: List every file changed and show the specific diffs / updated sections.
```

---

## STEP 11 — README

**What gets created:**

- Professional README for the GitHub repo submission

---

**PROMPT 11:**

```
Write a professional README.md for the GitHub repo submission of this project.

Include these sections:

1. **Project Overview** — What this is (multi-step account creation flow, Figma to React)

2. **Live Demo** — [placeholder: add Vercel/Netlify URL here]

3. **Tech Stack** — React, TypeScript, Vite, Tailwind CSS

4. **Architecture Decisions**:
   - Config-driven step rendering (STEPS array)
   - Custom useFormFlow hook for all state, validation, and navigation
   - window.userlogin for persistent form state across steps
   - Tailwind-only styling — no CSS files, no styled-components
   - Component structure: field components are fully isolated and independently testable

5. **Enhancements Beyond Figma**:
   - OTP auto-advance + Backspace navigation
   - Resend OTP 30s cooldown timer
   - Password strength hint (color changes on validity)
   - Step transition animation (slide + fade via Tailwind)
   - Shake animation on OTP validation error
   - Keyboard: Enter key triggers Continue
   - window.userlogin initialized on mount, synced on every validated step
   - Mobile responsive layout

6. **Folder Structure** (the full src/ tree)

7. **Getting Started**:
   npm install
   npm run dev

8. **Design Decisions** — 1 short paragraph explaining why you chose manual validation over a form library, and why config-driven steps instead of separate route pages.

Output: Full README.md content in markdown.
```

---

## STEP 12 — Deploy

**What to do (manual steps, not LLM):**

```
1. Push the project to a new GitHub repo:
   git init
   git add .
   git commit -m "feat: account creation flow — Figma to React"
   git remote add origin https://github.com/YOUR_USERNAME/account-creation-flow.git
   git push -u origin main

2. Deploy to Vercel:
   - Go to vercel.com → New Project → Import from GitHub
   - Framework: Vite
   - Build command: npm run build
   - Output dir: dist
   - Deploy

3. Update README.md Live Demo link with the Vercel URL.

4. Submit:
   - GitHub repo link
   - Vercel live URL
   - README already in repo
```

---

## EXECUTION CHECKLIST

| Step | Task                                 | Status |
| ---- | ------------------------------------ | ------ |
| 1    | Project scaffold + Tailwind config   | ⬜     |
| 2    | Types + Steps config                 | ⬜     |
| 3    | useFormFlow hook                     | ⬜     |
| 4    | ProgressBar + NavButtons + LeftPanel | ⬜     |
| 5    | All 5 field components               | ⬜     |
| 6    | StepRenderer                         | ⬜     |
| 7    | SuccessModal                         | ⬜     |
| 8    | App.tsx root assembly                | ⬜     |
| 9    | Illustration SVG                     | ⬜     |
| 10   | Polish + QA pass                     | ⬜     |
| 11   | README                               | ⬜     |
| 12   | Deploy                               | ⬜     |

---

## IMPORTANT RULES FOR YOUR LLM

- Feed ONE prompt at a time. Do not batch.
- Always paste PLAN.md + CONTEXT.md as system context before starting.
- If the LLM generates a file with TypeScript errors, ask it to fix them before proceeding.
- After Step 8, run `npm run dev` locally and visually verify each step renders correctly before running Step 10.
- If any component looks wrong visually, fix it before continuing — downstream steps depend on it.
