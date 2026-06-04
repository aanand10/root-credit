# CONTEXT.md — Design System & Figma Notes

## Layout

- **Two-column split**: Left ~45% (illustration), Right ~55% (form card)
- Background: `#F3F5F8` (very light blue-gray)
- Right panel: white card, `border-radius: ~16px`, subtle shadow
- Card has consistent padding ~40px on all sides

## Progress Bar

- Full-width bar at the very top of the right card
- Height: ~4px
- Track color: `#E0E6F0` (light blue-gray)
- Fill color: `#2D5BE3` (primary blue)
- Step fill widths (approximate):
  - Step 1 → 20% (no bar visible / very thin — actually 0% shown before step 1)
  - Step 2 → 20%
  - Step 3 → 40%
  - Step 4 → 60%
  - Step 5 → 100%

## Color Palette

| Token              | Value     | Usage                                       |
| ------------------ | --------- | ------------------------------------------- |
| `--primary`        | `#2D5BE3` | Buttons, links, focus borders, checkmarks   |
| `--primary-dark`   | `#1A3FB5` | Button hover                                |
| `--navy`           | `#0D1B3E` | Page title "Create your account"            |
| `--dark`           | `#1A2340` | Card headings                               |
| `--gray-label`     | `#8896AB` | Input labels, placeholders                  |
| `--gray-hint`      | `#9BA8BB` | Hint text ("Must be at least 6 characters") |
| `--border-default` | `#D8E1EE` | Input border default                        |
| `--border-focus`   | `#2D5BE3` | Input border focus                          |
| `--border-error`   | `#E53E3E` | Input border error                          |
| `--bg-page`        | `#F3F5F8` | Page background                             |
| `--bg-card`        | `#FFFFFF` | Form card background                        |
| `--bg-input`       | `#FFFFFF` | Input background                            |
| `--text-error`     | `#E53E3E` | Error messages                              |
| `--text-success`   | `#38A169` | Valid state hints                           |

## Typography

| Element                              | Size    | Weight | Color           |
| ------------------------------------ | ------- | ------ | --------------- |
| "Let's get started"                  | 14px    | 400    | `#6B7A99`       |
| "Create your account"                | 36–40px | 800    | `#0D1B3E`       |
| "Follow the steps..."                | 14px    | 400    | `#6B7A99`       |
| Card title (e.g. "OTP Verification") | 20px    | 700    | `#1A2340`       |
| Input label                          | 12–13px | 500    | `#8896AB`       |
| Input text                           | 15px    | 400    | `#1A2340`       |
| Placeholder                          | 15px    | 400    | `#B0BCCF`       |
| Hint text                            | 12px    | 400    | `#9BA8BB`       |
| Button text                          | 15px    | 600    | White / Primary |

## Components Detail

### Account Type Selector (Step 1)

- Two cards stacked vertically, full width
- Border: `1.5px solid #D8E1EE` default → `1.5px solid #2D5BE3` selected
- Icon: person outline (Personal), briefcase (Business)
- Icon color: `#8896AB` default → `#2D5BE3` selected
- Label: bold blue when selected, dark gray when not
- Right side: blue circle with white checkmark when selected (hidden otherwise)
- Border radius: `12px`
- Padding: `18px 20px`
- Hover: slight background tint `#F0F4FF`

### Phone Input (Step 2)

- Two-part row: country code dropdown (left) + number input (right)
- Country code box: `~90px` wide, flag emoji + dial code + chevron
- Rounded `12px` border on both
- Gap between them: `12px`
- Number input takes remaining width

### OTP Input (Step 3)

- 4 boxes in a row
- Each box: `~72px × 72px`, `border-radius: 12px`
- Border: `1.5px solid #D8E1EE` → blue on focus
- Font size inside: `24px`, bold, centered
- Gap between boxes: `16px`
- "Did not receive OTP? Resend OTP" — Resend is `#2D5BE3` bold link

### Name Input (Step 4)

- Two stacked inputs: First Name, Last Name
- Label above each input
- Full width, `border-radius: 12px`
- Padding: `14px 16px`

### Password Input (Step 5)

- Two stacked password fields
- Show/hide eye icon on the right inside the input
- Eye icon color: `#2D5BE3` (blue tint)
- Hint below each: "Must be atleast 6 characters" / "Both passwords must match"
- Hint turns green on valid

### Navigation Buttons

- Full row at bottom of card
- Back: outline, `border: 1.5px solid #D8E1EE`, text `#2D5BE3`, pill shape
- Continue: solid `#2D5BE3`, white text, pill shape
- Both: `border-radius: 50px`, `height: ~52px`
- Back takes ~45% width, Continue takes ~50% width (with gap)

### Success Modal

- Centered overlay, backdrop `rgba(0,0,0,0.4)`
- White card: `border-radius: 20px`, `padding: 40px`
- Blue circle checkmark icon at top (outline circle, checkmark inside)
- "You're all set!" — bold dark, ~22px
- Subtitle — gray, 14px
- Summary card: light gray bg `#F5F7FA`, `border-radius: 12px`, rows of label+value
- Labels: gray left, values: **bold dark** right
- Security note: small green shield icon + text
- "Go To Dashboard" — full-width pill blue button

## Left Panel

- Static — no interactivity
- Illustration: person with phone/form graphic, coral/orange + navy line art
- "Let's get started" — small gray label above title
- "Create your account" — large bold navy heading
- "Follow the steps to create your account" — small gray body
- No scroll, illustration anchored to bottom-left

## Responsive Notes

- Design appears desktop-first (~1280px)
- Mobile: stack panels vertically (left panel collapses or hides illustration)
- Min width for proper display: ~768px (tablet)

## Tailwind Class Reference

All styling is **Tailwind-only** — no custom CSS files, no inline styles, no styled-components.

### Key Tailwind Patterns

| UI Element            | Tailwind Classes                                                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page background       | `bg-[#F3F5F8] min-h-screen`                                                                                                                                                        |
| Right card            | `bg-white rounded-2xl shadow-md`                                                                                                                                                   |
| Progress bar track    | `w-full h-1 bg-[#E0E6F0] rounded-full`                                                                                                                                             |
| Progress bar fill     | `h-1 bg-[#2D5BE3] rounded-full transition-all duration-500 ease-in-out`                                                                                                            |
| Input default         | `w-full border border-[#D8E1EE] rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200`                                                                           |
| Input focus           | `focus:border-[#2D5BE3] focus:ring-2 focus:ring-[#2D5BE3]/20`                                                                                                                      |
| Input error           | `border-[#E53E3E] focus:border-[#E53E3E] focus:ring-[#E53E3E]/20`                                                                                                                  |
| Error message         | `text-xs text-[#E53E3E] mt-1`                                                                                                                                                      |
| Hint text             | `text-xs text-[#9BA8BB] mt-1`                                                                                                                                                      |
| Valid hint            | `text-xs text-[#38A169] mt-1`                                                                                                                                                      |
| Account type card     | `flex items-center justify-between border border-[#D8E1EE] rounded-xl px-5 py-4 cursor-pointer transition-all duration-200 hover:bg-[#F0F4FF] hover:border-[#2D5BE3]`              |
| Account card selected | `border-[#2D5BE3] bg-[#F0F4FF]`                                                                                                                                                    |
| OTP box               | `w-16 h-16 text-center text-2xl font-bold border border-[#D8E1EE] rounded-xl outline-none transition-all duration-200 focus:border-[#2D5BE3] focus:ring-2 focus:ring-[#2D5BE3]/20` |
| Back button           | `flex-1 border border-[#D8E1EE] text-[#2D5BE3] font-semibold rounded-full py-3 transition-all duration-200 hover:bg-[#F0F4FF]`                                                     |
| Continue button       | `flex-1 bg-[#2D5BE3] text-white font-semibold rounded-full py-3 transition-all duration-200 hover:bg-[#1A3FB5] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`    |
| Modal backdrop        | `fixed inset-0 bg-black/40 flex items-center justify-center z-50`                                                                                                                  |
| Modal card            | `bg-white rounded-2xl p-10 w-full max-w-md shadow-xl`                                                                                                                              |
| Modal scale-in        | `transition-all duration-300 scale-100 opacity-100` (from `scale-95 opacity-0`)                                                                                                    |

### Step Transition Animation

Use conditional Tailwind classes on the step wrapper:

```tsx
// Entering: slide in from right
className={`transition-all duration-300 ${
  isEntering ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
}`}
```

For exit + enter, toggle a `key` prop on the step wrapper so React remounts it and triggers the enter animation naturally.

### Shake Animation (OTP error)

Add to `tailwind.config.js`:

```js
extend: {
  keyframes: {
    shake: {
      '0%, 100%': { transform: 'translateX(0)' },
      '25%': { transform: 'translateX(-6px)' },
      '75%': { transform: 'translateX(6px)' },
    },
  },
  animation: {
    shake: 'shake 0.3s ease-in-out',
  },
}
```

Then apply `animate-shake` class conditionally on OTP row when validation fails.

## window.userlogin Contract

```ts
// Initialized on app mount, updated on every validated Continue click
window.userlogin = {
  currentStep: number,           // 1–5, reflects active step
  completedSteps: number[],      // steps validated and passed, e.g. [1, 2, 3]
  formData: {
    accountType: 'personal' | 'business' | '',
    countryCode: string,         // e.g. '+1'
    mobileNumber: string,
    otp: string[],               // ['8','6','4','2']
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
  }
}
```

**Sync pattern in `useFormFlow.ts`:**

```ts
// After every successful validation + state update:
window.userlogin = {
  currentStep: nextStep,
  completedSteps: [...completedSteps, currentStep],
  formData: { ...formData },
};
```

Updated on every `Continue` click after successful validation.
