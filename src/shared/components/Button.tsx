import { ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "chip"
  | "outline"
  | "circle";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
}

export function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
  ariaLabel,
}: ButtonProps) {
  const base = "transition-all duration-200";

  const variants = {
    primary:
      "rounded-xl text-white font-semibold bg-gradient-to-r from-[#C4A9FF] to-[#FF9ECD] hover:opacity-90",
    secondary: "rounded-xl bg-[#F5F5FF] text-[#8B8BA5] hover:bg-[#EDE6FF]",
    ghost: "rounded-xl text-[#8B8BA5] hover:text-[#C4A9FF] hover:bg-[#FFF0F5]",
    chip: "rounded-xl text-xs font-medium bg-white text-[#8B8BA5]",
    outline:
      "rounded-xl bg-white border border-[#C4A9FF]/20 text-[#4A4A6A] font-medium hover:bg-[#F5E6FF] text-left w-full",
    circle:
      "rounded-full border border-[#C4A9FF]/30 text-[#C4A9FF] hover:bg-[#F5E6FF] flex items-center justify-center flex-shrink-0",
  };

  const sizes = {
    sm: variant === "circle" ? "w-8 h-8 text-sm" : "px-2 py-1 text-xs",
    md: variant === "circle" ? "w-10 h-10 text-base" : "px-4 py-2 text-sm",
    lg: variant === "circle" ? "w-12 h-12 text-lg" : "px-5 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? "opacity-50" : ""
      }`}
    >
      {children}
    </button>
  );
}
