import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const VoteButton = ({ 
  votes, 
  hasVoted, 
  onVote, 
  disabled = false,
  size = "md",
  className 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleVote = async () => {
    if (disabled || isAnimating) return;
    
    setIsAnimating(true);
    try {
      await onVote();
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const sizes = {
    sm: "px-2 py-1 text-xs min-w-[3rem]",
    md: "px-3 py-2 text-sm min-w-[4rem]",
    lg: "px-4 py-3 text-base min-w-[5rem]"
  };

  return (
    <motion.button
      onClick={handleVote}
      disabled={disabled || isAnimating}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        "inline-flex flex-col items-center justify-center font-semibold rounded-lg border-2 transition-all duration-200",
        hasVoted 
          ? "bg-gradient-to-b from-primary-50 to-primary-100 border-primary-300 text-primary-700" 
          : "bg-white border-surface-200 text-surface-600 hover:border-primary-300 hover:text-primary-600",
        disabled && "opacity-50 cursor-not-allowed",
        sizes[size],
        className
      )}
    >
      <motion.div
        animate={isAnimating ? { 
          scale: [1, 1.2, 1],
          rotate: [0, -5, 5, 0]
        } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <ApperIcon 
          name={hasVoted ? "ChevronUp" : "ChevronUp"} 
          className={cn(
            "w-4 h-4 mb-0.5",
            hasVoted ? "text-primary-600" : "text-surface-500"
          )} 
        />
      </motion.div>
      
      <motion.span
        key={votes}
        initial={{ scale: 1 }}
        animate={isAnimating ? { 
          scale: [1, 1.3, 1],
          color: hasVoted ? "#6366f1" : "#64748b"
        } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "font-bold leading-tight",
          hasVoted ? "text-primary-600" : "text-surface-700"
        )}
      >
        {votes}
      </motion.span>
    </motion.button>
  );
};

export default VoteButton;