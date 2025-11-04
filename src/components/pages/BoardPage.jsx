import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { featureService } from "@/services/api/featureService";
import { productService } from "@/services/api/productService";
import { voteService } from "@/services/api/voteService";
import { toast } from "react-toastify";
import FeatureGrid from "@/components/organisms/FeatureGrid";
import ProductHeader from "@/components/organisms/ProductHeader";

const BoardPage = () => {
  const [features, setFeatures] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [votedFeatures, setVotedFeatures] = useState(new Set());
  
  const { productId = "1" } = useParams();
  const userId = "user123"; // Mock user ID for voting (in real app, would come from auth)

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      // Load product and features in parallel
      const [productData, featuresData, votesData] = await Promise.all([
        productService.getById(productId),
        featureService.getByProductId(productId),
        voteService.getUserVotes(userId)
      ]);

      setProduct(productData);
      setFeatures(featuresData);
      
// Set voted features - handle both lookup objects and direct IDs
      const votedSet = new Set(votesData.map(vote => 
        vote.feature_id_c?.Id || vote.feature_id_c
      ));
      setVotedFeatures(votedSet);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError("");
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [productId]);

const handleVote = async (featureId) => {
  setLoading(true);
  try {
    const isVoted = votedFeatures.has(featureId);
    
    if (isVoted) {
      // Remove vote
        await voteService.removeVote(userId, featureId);
        
        // Update local state
        const newVotedSet = new Set(votedFeatures);
        newVotedSet.delete(featureId);
        setVotedFeatures(newVotedSet);
        
        // Update vote count
        setFeatures(prev => prev.map(feature => 
          feature.Id === featureId 
            ? { ...feature, votes_c: (feature.votes_c || 0) - 1 }
            : feature
        ));
        
      } else {
        // Add vote
        await voteService.addVote(userId, featureId);
        
        // Update local state
        setVotedFeatures(prev => new Set([...prev, featureId]));
        
        setFeatures(prev => prev.map(feature => 
          feature.Id === featureId 
            ? { ...feature, votes_c: (feature.votes_c || 0) + 1 }
            : feature
        ));
        
        toast.success("Thanks for your vote!");
      }
    } catch (err) {
      toast.error("Failed to update vote");
      console.error("Error voting:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Header */}
        {product && (
          <div className="mb-8">
            <ProductHeader product={product} />
          </div>
        )}
        
        {/* Features Grid */}
        <FeatureGrid
          features={features}
          loading={loading}
          error={error}
          onRetry={handleRetry}
          onVote={handleVote}
          votedFeatures={votedFeatures}
        />
      </div>
    </div>
  );
};

export default BoardPage;