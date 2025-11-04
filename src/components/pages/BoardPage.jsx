import { useState, useEffect } from "react";
import ProductHeader from "@/components/organisms/ProductHeader";
import FeatureGrid from "@/components/organisms/FeatureGrid";
import { featureService } from "@/services/api/featureService";
import { productService } from "@/services/api/productService";
import { voteService } from "@/services/api/voteService";
import { toast } from "react-toastify";

const BoardPage = () => {
  const [features, setFeatures] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [votedFeatures, setVotedFeatures] = useState(new Set());

  // Mock user ID for voting (in real app, would come from auth)
  const userId = "user123";
  const productId = "product1";

  useEffect(() => {
    loadData();
  }, []);

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
      
      // Set voted features
      const votedSet = new Set(votesData.map(vote => vote.featureId));
      setVotedFeatures(votedSet);
    } catch (err) {
      setError("Failed to load data");
      console.error("Error loading board data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (featureId) => {
    const hasVoted = votedFeatures.has(featureId);

    try {
      if (hasVoted) {
        // Remove vote
        await voteService.removeVote(userId, featureId);
        setVotedFeatures(prev => {
          const newSet = new Set(prev);
          newSet.delete(featureId);
          return newSet;
        });
        
        // Update feature vote count
        setFeatures(prev => prev.map(feature => 
          feature.Id === featureId 
            ? { ...feature, votes: feature.votes - 1 }
            : feature
        ));
        
        toast.success("Vote removed!");
      } else {
        // Add vote
        await voteService.addVote(userId, featureId);
        setVotedFeatures(prev => new Set(prev).add(featureId));
        
        // Update feature vote count
        setFeatures(prev => prev.map(feature => 
          feature.Id === featureId 
            ? { ...feature, votes: feature.votes + 1 }
            : feature
        ));
        
        toast.success("Vote added!");
      }
    } catch (err) {
      toast.error("Failed to update vote");
      console.error("Error voting:", err);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductHeader product={product} />
        
        <FeatureGrid
          features={features}
          loading={loading}
          error={error}
          onRetry={loadData}
          onVote={handleVote}
          votedFeatures={votedFeatures}
        />
      </div>
    </div>
  );
};

export default BoardPage;