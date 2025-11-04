import { forwardRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import { motion, AnimatePresence } from "framer-motion";

const Modal = forwardRef(({ 
  className, 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "md",
  showCloseButton = true,
  ...props 
}, ref) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "relative w-full bg-white rounded-xl shadow-2xl",
                sizes[size],
                className
              )}
              onClick={(e) => e.stopPropagation()}
              {...props}
            >
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 border-b border-surface-200">
                  {title && (
                    <h2 className="text-xl font-semibold text-surface-900">
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="p-1 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-full transition-colors duration-200"
                    >
                      <ApperIcon name="X" className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
              
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
});

Modal.displayName = "Modal";

export default Modal;