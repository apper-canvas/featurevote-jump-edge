import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className, 
  label, 
  error, 
  helperText,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-surface-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full px-4 py-3 border-2 border-surface-200 rounded-lg bg-white text-surface-900 placeholder-surface-400 resize-vertical",
          "focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200",
          error && "border-red-500 focus:border-red-500 focus:ring-red-100",
          "disabled:bg-surface-50 disabled:text-surface-500 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-surface-500">{helperText}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;