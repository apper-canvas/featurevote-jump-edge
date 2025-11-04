import { useState, useEffect } from "react";
import { featureService } from "@/services/api/featureService";
import { productService } from "@/services/api/productService";
import StatusBadge from "@/components/molecules/StatusBadge";
import VoteButton from "@/components/molecules/VoteButton";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const RoadmapPage = () => {
  const [features, setFeatures] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productId = "product1";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [productData, featuresData] = await Promise.all([
        productService.getById(productId),
        featureService.getByProductId(productId)
      ]);

      setProduct(productData);
      setFeatures(featuresData);
    } catch (err) {
      setError("Failed to load roadmap data");
      console.error("Error loading roadmap:", err);
    } finally {
      setLoading(false);
    }
  };

  const statusColumns = [
    { key: "submitted", title: "Submitted", icon: "Clock" },
    { key: "under-review", title: "Under Review", icon: "Eye" },
    { key: "planned", title: "Planned", icon: "Calendar" },
    { key: "in-progress", title: "In Progress", icon: "Zap" },
    { key: "staging", title: "In Staging", icon: "TestTube" },
    { key: "live", title: "Live", icon: "CheckCircle" }
  ];

  const getFeaturesByStatus = (status) => {
    return features.filter(feature => feature.status === status);
  };

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer w-64 mb-8"></div>
          <Loading type="cards" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-surface-900 mb-2">
            Product Roadmap
          </h1>
          <p className="text-surface-600">
            Track the progress of feature suggestions from idea to implementation
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {statusColumns.map((column) => {
            const columnFeatures = getFeaturesByStatus(column.key);
            
            return (
              <div key={column.key} className="bg-white rounded-xl border border-surface-200 overflow-hidden">
                {/* Column Header */}
                <div className="p-4 border-b border-surface-200 bg-surface-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name={column.icon} className="w-4 h-4 text-surface-600" />
                      <h3 className="font-semibold text-surface-900 text-sm">
                        {column.title}
                      </h3>
                    </div>
                    <span className="text-xs font-medium text-surface-500 bg-surface-100 px-2 py-1 rounded-full">
                      {columnFeatures.length}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-4 space-y-3 max-h-[80vh] overflow-y-auto">
                  {columnFeatures.length === 0 ? (
                    <div className="text-center py-8">
                      <ApperIcon name="Package" className="w-8 h-8 text-surface-300 mx-auto mb-2" />
                      <p className="text-xs text-surface-500">No features</p>
                    </div>
                  ) : (
                    columnFeatures.map((feature, index) => (
                      <motion.div
                        key={feature.Id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 border border-surface-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-surface-900 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {feature.title}
                          </h4>
                          
                          <VoteButton
                            votes={feature.votes}
                            hasVoted={false}
                            onVote={() => {}}
                            size="sm"
                            disabled={true}
                          />
                        </div>
                        
                        {feature.category && (
                          <div className="mb-2">
                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-surface-100 text-surface-700 rounded-full">
                              <ApperIcon name="Tag" className="w-3 h-3 mr-1" />
                              {feature.category}
                            </span>
                          </div>
                        )}
                        
                        <p className="text-xs text-surface-600 line-clamp-3 mb-3">
                          {feature.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-surface-500">
                          <span className="flex items-center">
                            <ApperIcon name="User" className="w-3 h-3 mr-1" />
                            {feature.authorId}
                          </span>
                          
                          <span className="flex items-center">
                            <ApperIcon name="Clock" className="w-3 h-3 mr-1" />
                            {formatDate(feature.createdAt)}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-surface-200 text-center">
            <div className="text-2xl font-bold text-surface-900 mb-1">
              {features.length}
            </div>
            <div className="text-sm text-surface-500">Total Features</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-surface-200 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {getFeaturesByStatus("in-progress").length}
            </div>
            <div className="text-sm text-surface-500">In Progress</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-surface-200 text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {getFeaturesByStatus("live").length}
            </div>
            <div className="text-sm text-surface-500">Shipped</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-surface-200 text-center">
            <div className="text-2xl font-bold text-accent-600 mb-1">
              {features.reduce((sum, feature) => sum + feature.votes, 0)}
            </div>
            <div className="text-sm text-surface-500">Total Votes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;