import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Error = forwardRef(({ 
  className, 
  message = "Something went wrong", 
  onRetry, 
  showRetry = true,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-red-200 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-surface-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-surface-600 mb-6 max-w-md">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2 inline" />
          Try Again
        </button>
      )}
    </div>
  );
});

Error.displayName = "Error";

export default Error;