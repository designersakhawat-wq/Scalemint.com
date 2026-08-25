import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "dark" | "outline" | "secondary";
  className?: string;
  href?: string;
  target?: string;
}

export function Button({ 
  children, 
  variant = "primary", 
  className = "",
  href,
  target,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none text-sm";
  
  const variants = {
    primary: "bg-brand-electric text-white shadow-lg shadow-brand-electric/30 hover:shadow-brand-electric/50 hover:bg-blue-600",
    dark: "bg-brand-navy text-white hover:bg-brand-navy/90 border border-white/10",
    outline: "border-2 border-brand-electric text-brand-electric hover:bg-brand-electric/10",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
  };

  const combinedClasses = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} target={target} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
