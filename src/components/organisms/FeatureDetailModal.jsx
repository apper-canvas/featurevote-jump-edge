import { useState, useEffect } from "react";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";
import VoteButton from "@/components/molecules/VoteButton";
import StatusBadge from "@/components/molecules/StatusBadge";
import CommentItem from "@/components/molecules/CommentItem";
import Textarea from "@/components/atoms/Textarea";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import { commentService } from "@/services/api/commentService";

const FeatureDetailModal = ({ 
  feature, 
  isOpen, 
  onClose, 
  onVote, 
  hasVoted 
}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    if (isOpen && feature) {
      loadComments();
    }
  }, [isOpen, feature]);

  const loadComments = async () => {
    if (!feature) return;
    
    setLoading(true);
    setError("");
    
    try {
      const data = await commentService.getByFeatureId(feature.Id);
      setComments(data);
    } catch (err) {
      setError("Failed to load comments");
      console.error("Error loading comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      await onVote(feature.Id);
    } finally {
      setIsVoting(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submittingComment) return;

    setSubmittingComment(true);
    
    try {
      const comment = await commentService.create({
        featureId: feature.Id,
        content: newComment.trim(),
        authorName: `User${Math.floor(Math.random() * 1000)}`,
        isOfficial: Math.random() > 0.8 // 20% chance of being official
      });
      
      setComments(prev => [comment, ...prev]);
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (err) {
      toast.error("Failed to add comment");
      console.error("Error adding comment:", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  if (!feature) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      className="max-h-[90vh] overflow-hidden flex flex-col"
    >
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-surface-900 mb-3">
                {feature.title}
              </h1>
              <StatusBadge status={feature.status} size="lg" />
            </div>
            
            <VoteButton
              votes={feature.votes}
              hasVoted={hasVoted}
              onVote={handleVote}
              disabled={isVoting}
              size="lg"
            />
          </div>

          {/* Category */}
          {feature.category && (
            <div>
              <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-surface-100 to-surface-50 text-surface-700 rounded-full border border-surface-200">
                <ApperIcon name="Tag" className="w-4 h-4 mr-2" />
                {feature.category}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-surface-900 mb-3">Description</h3>
          <div className="prose max-w-none">
            <p className="text-surface-700 leading-relaxed whitespace-pre-wrap">
              {feature.description}
            </p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between py-4 border-t border-b border-surface-200 mb-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm text-surface-500">
              <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
              Created {formatDate(feature.createdAt)}
            </div>
            
            <div className="flex items-center text-sm text-surface-500">
              <ApperIcon name="User" className="w-4 h-4 mr-2" />
              By {feature.authorId}
            </div>
          </div>
          
          <div className="flex items-center text-sm text-surface-500">
            <ApperIcon name="MessageCircle" className="w-4 h-4 mr-2" />
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-surface-900">
            Comments ({comments.length})
          </h3>

          {/* Add Comment Form */}
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts on this feature..."
              rows={3}
              className="resize-none"
            />
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-surface-500">
                {newComment.length}/500 characters
              </div>
              
              <Button 
                type="submit" 
                disabled={!newComment.trim() || submittingComment || newComment.length > 500}
                size="md"
              >
                {submittingComment ? (
                  <>
                    <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                    Add Comment
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Comments List */}
          {loading ? (
            <Loading type="modal" />
          ) : error ? (
            <Error message={error} onRetry={loadComments} />
          ) : comments.length === 0 ? (
            <Empty
              title="No comments yet"
              description="Be the first to share your thoughts on this feature!"
              icon="MessageCircle"
            />
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem key={comment.Id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FeatureDetailModal;