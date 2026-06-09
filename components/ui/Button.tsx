"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  title?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  className = "",
  disabled,
  title,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex cursor-pointer items-center justify-center font-semibold tracking-wide rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100";

  const variants = {
    primary:
      "bg-wood-accent text-wood-base hover:opacity-95 shadow-[0_4px_20px_var(--color-wood-accent-glow)] focus:ring-wood-accent/50",
    secondary:
      "bg-wood-surface text-wood-text-primary border border-wood-border hover:bg-wood-surface-hover hover:border-wood-border-focus focus:ring-wood-border-focus",
    outline:
      "bg-transparent text-wood-text-secondary border border-wood-border hover:bg-wood-surface/40 hover:text-wood-text-primary focus:ring-wood-border",
    danger:
      "bg-red-950/40 text-red-400 border border-red-900/50 hover:bg-red-900/30 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
  };

  return (
    <button
      title={title}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
      onClick={onClick}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        icon && <span className="flex items-center shrink-0">{icon}</span>
      )}

      <span>{children}</span>
    </button>
  );
}
