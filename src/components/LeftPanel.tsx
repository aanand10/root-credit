import leftIllustration from "../assets/left-Illustration.svg";

export default function LeftPanel() {
  return (
    <div className="h-full flex flex-col justify-between px-10 py-12 !pr-0 select-none">
      <div>
        <p className="text-sm text-[#6B7A99] font-normal uppercase tracking-wider">
          Let's get started
        </p>
        <h1 className="text-4xl font-extrabold text-[#0D1B3E] mt-2 leading-tight">
          Create your account
        </h1>
        <p className="text-sm text-[#6B7A99] mt-3">
          Follow the steps to create your account
        </p>
      </div>

      <div className="w-full flex items-end justify-center mt-auto pt-8">
        <img
          src={leftIllustration}
          alt="Account creation illustration"
          className="w-full h-auto max-h-[320px] object-contain"
        />
      </div>
    </div>
  );
}
