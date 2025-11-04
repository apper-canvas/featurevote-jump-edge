import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import { commentService } from "@/services/api/commentService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Modal from "@/components/atoms/Modal";
import Textarea from "@/components/atoms/Textarea";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import StatusBadge from "@/components/molecules/StatusBadge";
import VoteButton from "@/components/molecules/VoteButton";
import CommentItem from "@/components/molecules/CommentItem";

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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feature) {
      loadComments();
    }
  }, [feature]);

  const handleVote = async () => {
    if (!onVote) return;
    await onVote(feature.Id);
    // The parent component will handle the vote update
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmittingComment(true);
      
      await commentService.create({
        featureId: feature.Id,
        content: newComment.trim(),
        authorName: `User${Math.floor(Math.random() * 1000)}`,
        isOfficial: Math.random() > 0.8 // 20% chance of being official
      });
      
      setNewComment("");
      await loadComments(); // Reload comments
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  if (!isOpen || !feature) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Feature Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Feature Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold text-surface-900 flex-1 mr-4">
              {feature.title_c}
            </h1>
            <StatusBadge status={feature.status_c} size="lg" />
          </div>
          
          <div className="flex items-center space-x-4">
            <VoteButton 
              votes={feature.votes_c || 0}
              hasVoted={hasVoted}
              onVote={handleVote}
              size="lg"
            />
            
            <div className="flex items-center space-x-4 text-sm text-surface-500">
              {feature.category_c && (
                <Badge variant="secondary" size="md">
                  {feature.category_c}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Feature Description */}
        <div className="prose max-w-none">
          <div className="bg-surface-50 rounded-lg p-6 border border-surface-200">
            <h3 className="text-lg font-semibold text-surface-900 mb-3">Description</h3>
            <p className="text-surface-700 leading-relaxed whitespace-pre-wrap">
              {feature.description_c}
            </p>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-surface-500 py-4 border-t border-surface-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" className="w-4 h-4" />
              <span>
                Created {formatDate(feature.CreatedOn)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="User" className="w-4 h-4" />
              <span>
                By {feature.author_id_c}
              </span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-4 border-t border-surface-200 pt-6">
          <h3 className="text-lg font-semibold text-surface-900">
            Discussion ({comments.length})
          </h3>

          {/* Add Comment Form */}
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts or ask a question..."
              rows={3}
              className="w-full"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!newComment.trim() || submittingComment}
                size="sm"
              >
                {submittingComment ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Posting...
                  </span>
                ) : (
                  <>
                    <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                    Post Comment
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Comments List */}
          {loading ? (
            <Loading type="modal" />
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={loadComments} variant="outline" size="sm">
                <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8">
              <ApperIcon name="MessageSquare" className="w-8 h-8 text-surface-300 mx-auto mb-3" />
              <p className="text-surface-500">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {comments.map((comment) => (
                <CommentItem key={comment.Id} comment={{
                  ...comment,
                  authorName: comment.author_name_c,
                  content: comment.content_c,
                  isOfficial: comment.is_official_c,
                  createdAt: comment.CreatedOn
                }} />
              ))}
            </div>
)}
        </div>
      </div>
    </Modal>
  );
};

export default FeatureDetailModal;