import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`block w-full rounded-lg border px-3 py-2.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-colors dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:border-slate-600 dark:focus:border-blue-500 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`block w-full rounded-lg border px-3 py-2.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-colors dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:border-slate-600 dark:focus:border-blue-500 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
