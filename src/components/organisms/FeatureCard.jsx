import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import StatusBadge from "@/components/molecules/StatusBadge";
import VoteButton from "@/components/molecules/VoteButton";
import { cn } from "@/utils/cn";

const FeatureCard = ({ 
  feature, 
  onClick, 
  onVote, 
  hasVoted, 
  className,
  index = 0 
}) => {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (e) => {
    e.stopPropagation();
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      await onVote(feature.Id);
    } finally {
      setIsVoting(false);
    }
  };

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const getCommentCount = () => {
    // This would normally come from the feature data
    return Math.floor(Math.random() * 15); // Mock comment count
  };

  return (
    <motion.div
    initial={{
        opacity: 0,
        y: 20
    }}
    animate={{
        opacity: 1,
        y: 0
    }}
    transition={{
        delay: index * 0.1,
        duration: 0.3
    }}
    whileHover={{
        y: -4,

        transition: {
            duration: 0.2
        }
    }}
    onClick={onClick}
    className={cn(
        "bg-white rounded-xl p-6 border border-surface-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group",
        className
    )}>
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
            <h3
                className="text-lg font-semibold text-surface-900 group-hover:text-primary-600 transition-colors duration-200 mb-2">
                {feature.title_c}
            </h3>
            <StatusBadge status={feature.status_c} />
        </div>
        <div className="flex items-center justify-center">
            <VoteButton
                votes={feature.votes_c || 0}
                hasVoted={hasVoted}
                onVote={handleVote}
                disabled={isVoting} />
        </div>
    </div>
    {/* Description */}
    <p className="text-surface-600 mb-4 line-clamp-3 leading-relaxed">
        {truncateText(feature.description_c)}
    </p>
    {/* Category Badge */}
    {feature.category_c && <div className="mb-4">
        <Badge variant="secondary" size="sm">
            {feature.category_c}
        </Badge>
    </div>}
    {/* Footer */}
    <div
        className="flex items-center justify-between text-sm text-surface-500 border-t border-surface-100 pt-4">
        <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
                <ApperIcon name="Calendar" className="w-4 h-4" />
                <span>
                    {formatDate(feature.CreatedOn)}
                </span>
            </div>
        </div>
        <div className="flex items-center space-x-1">
            <ApperIcon name="User" className="w-4 h-4" />
            <span>
                {feature.author_id_c}
            </span>
        </div>
    </div>
</motion.div>
  );
};

export default FeatureCard;