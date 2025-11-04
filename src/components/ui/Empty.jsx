import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Empty = forwardRef(({ 
  className, 
  title = "No data found",
  description = "There's nothing here yet",
  actionLabel,
  onAction,
  icon = "Lightbulb",
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center",
        className
      )}
      {...props}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-surface-900 mb-3">
        {title}
      </h3>
      
      <p className="text-surface-600 mb-8 max-w-md">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg inline-flex items-center"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          {actionLabel}
        </button>
      )}
    </div>
  );
});

Empty.displayName = "Empty";

export default Empty;