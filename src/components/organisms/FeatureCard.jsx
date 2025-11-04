import { useState } from "react";
import { cn } from "@/utils/cn";
import { formatDistanceToNow } from "date-fns";
import VoteButton from "@/components/molecules/VoteButton";
import StatusBadge from "@/components/molecules/StatusBadge";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        "bg-white rounded-xl p-6 border border-surface-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-surface-900 group-hover:text-primary-600 transition-colors duration-200 mb-2">
            {feature.title}
          </h3>
          <StatusBadge status={feature.status} />
        </div>
        
        <div className="flex items-center space-x-3 ml-4">
          <VoteButton
            votes={feature.votes}
            hasVoted={hasVoted}
            onVote={handleVote}
            disabled={isVoting}
            size="md"
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-surface-600 leading-relaxed mb-4">
        {truncateText(feature.description)}
      </p>

      {/* Category */}
      {feature.category && (
        <div className="mb-4">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-surface-100 to-surface-50 text-surface-700 rounded-full border border-surface-200">
            <ApperIcon name="Tag" className="w-3 h-3 mr-1" />
            {feature.category}
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-surface-500">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <ApperIcon name="MessageCircle" className="w-4 h-4 mr-1" />
            {getCommentCount()} comments
          </span>
          
          <span className="flex items-center">
            <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
            {formatDate(feature.createdAt)}
          </span>
        </div>
        
        <div className="flex items-center text-xs text-surface-400">
          <ApperIcon name="User" className="w-3 h-3 mr-1" />
          {feature.authorId}
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;