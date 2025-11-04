import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const CommentItem = ({ comment }) => {
  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div className="p-4 bg-surface-50 rounded-lg border border-surface-200">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
          {comment.authorName.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-surface-900">
              {comment.authorName}
            </span>
            
            {comment.isOfficial && (
              <Badge variant="primary" size="sm">
                <ApperIcon name="Shield" className="w-3 h-3 mr-1" />
                Team
              </Badge>
            )}
            
            <span className="text-xs text-surface-500">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          
          <p className="text-surface-700 leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;