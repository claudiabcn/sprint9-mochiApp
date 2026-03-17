import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "chip";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: Variant;
  className?: string;
}

export function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base = "transition-all duration-200 rounded-xl";

  const variants = {
    primary:
      "text-white font-semibold hover:opacity-90 " +
      "bg-gradient-to-r from-[#C4A9FF] to-[#FF9ECD]",

    secondary:
      "bg-[#F5F5FF] text-[#8B8BA5] hover:bg-[#EDE6FF]",

    ghost:
      "text-[#8B8BA5] hover:text-[#FF6B9D] hover:bg-[#FFF0F5]",

    chip:
      "text-xs font-medium px-2.5 py-1 rounded-lg bg-white text-[#8B8BA5]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className} ${
        disabled ? "opacity-50" : ""
      }`}
    >
      {children}
    </button>
  );
}