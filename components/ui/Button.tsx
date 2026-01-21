import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white" | "outline-white";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-slate-900",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 shadow-sm hover:shadow-md dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:focus:ring-offset-slate-900",
      outline:
        "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-blue-500 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:border-slate-500 dark:focus:ring-offset-slate-900",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-900",
      // White button for use on colored backgrounds (hero sections, CTAs)
      white:
        "bg-white text-blue-600 hover:bg-gray-100 focus:ring-white shadow-md hover:shadow-lg dark:bg-white dark:text-blue-600 dark:hover:bg-gray-100",
      // Outline white for colored backgrounds
      "outline-white":
        "border-2 border-white text-white hover:bg-white/10 focus:ring-white dark:border-white dark:text-white dark:hover:bg-white/10",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
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
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
