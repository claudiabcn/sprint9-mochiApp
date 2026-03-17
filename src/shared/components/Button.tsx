import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "chip";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  const base = "rounded-xl transition-all duration-200";

  const variants = {
    primary: "text-white font-semibold bg-gradient-to-r from-[#C4A9FF] to-[#FF9ECD] hover:opacity-90",
    secondary: "bg-[#F5F5FF] text-[#8B8BA5] hover:bg-[#EDE6FF]",
    ghost: "text-[#8B8BA5] hover:text-[#C4A9FF] hover:bg-[#FFF0F5]",
    chip: "text-xs font-medium bg-white text-[#8B8BA5]",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? "opacity-50" : ""
      }`}
    >
      {children}
    </button>
  );
}