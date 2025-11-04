import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gradient-to-r from-surface-100 to-surface-50 text-surface-800 border border-surface-200",
    primary: "bg-gradient-to-r from-primary-100 to-primary-50 text-primary-800 border border-primary-200",
    secondary: "bg-gradient-to-r from-secondary-100 to-secondary-50 text-secondary-800 border border-secondary-200",
    success: "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200",
    warning: "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200",
    danger: "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200",
    info: "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200",
    submitted: "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200",
    "under-review": "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200",
    planned: "bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200",
    "in-progress": "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200",
    staging: "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200",
    live: "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };
  
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center font-medium rounded-full whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;