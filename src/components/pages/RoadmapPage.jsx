import React, { useEffect, useState } from "react";
import { featureService } from "@/services/api/featureService";
import { productService } from "@/services/api/productService";
import { format } from "date-fns";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Layout from "@/components/organisms/Layout";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import StatusBadge from "@/components/molecules/StatusBadge";
import VoteButton from "@/components/molecules/VoteButton";
import Badge from "@/components/atoms/Badge";
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
return features.filter(feature => feature.status_c === status);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-surface-200 rounded shimmer w-64 mb-4"></div>
            <div className="h-4 bg-surface-200 rounded shimmer w-96"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-surface-200">
                <div className="h-6 bg-surface-200 rounded shimmer mb-4"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="bg-surface-50 rounded-lg p-4">
                      <div className="h-4 bg-surface-200 rounded shimmer mb-2"></div>
                      <div className="h-3 bg-surface-200 rounded shimmer w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadData} />
        </div>
      </Layout>
    );
  }
const statusOrder = ['submitted', 'under-review', 'planned', 'in-progress', 'staging', 'live'];
  const roadmapColumns = statusOrder.map(status => ({
    status,
    features: getFeaturesByStatus(status)
  }));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-surface-900 mb-4">
            Product Roadmap
          </h1>
          <p className="text-lg text-surface-600">
            Track the progress of features from submission to launch. Features move through our development pipeline based on community feedback and business priorities.
          </p>
        </div>

{/* Roadmap Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {roadmapColumns.map(({ status, features }) => (
            <div key={status} className="bg-white rounded-xl shadow-sm border border-surface-200">
              <div className="p-6 border-b border-surface-100">
                <div className="flex items-center justify-between mb-2">
                  <StatusBadge status={status} size="lg" />
                  <span className="text-sm font-medium text-surface-500 bg-surface-100 px-2 py-1 rounded-full">
                    {features.length}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {features.length === 0 ? (
                  <div className="text-center py-8">
                    <ApperIcon name="Package" className="w-8 h-8 text-surface-300 mx-auto mb-2" />
                    <p className="text-sm text-surface-500">No features in this stage</p>
                  </div>
                ) : (
                  features.map((feature) => (
                    <div
                      key={feature.Id}
                      className="p-4 border border-surface-200 rounded-lg hover:border-primary-200 hover:shadow-sm transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-surface-900 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
                          {feature.title_c}
                        </h4>
                        <VoteButton 
                          size="sm"
                          votes={feature.votes_c || 0}
                          hasVoted={false} // For now, not implementing voting in roadmap
                          disabled={true}
                        />
                      </div>

                      {feature.category_c && (
                        <Badge 
                          variant="secondary" 
                          size="sm" 
                          className="mb-3"
                        >
                          {feature.category_c}
                        </Badge>
                      )}

                      <p className="text-xs text-surface-600 line-clamp-3 mb-3">
                        {feature.description_c}
                      </p>

                      <div className="flex items-center justify-between text-xs text-surface-500">
                        <div className="flex items-center space-x-3">
                          <span>
                            By {feature.author_id_c}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Calendar" className="w-3 h-3" />
                          <span>
                            {formatDate(feature.CreatedOn)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 border border-primary-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-surface-900 mb-1">
                {features.length}
              </div>
              <div className="text-sm text-surface-600">Total Features</div>
            </div>
<div>
              <div className="text-2xl font-bold text-surface-900 mb-1">
                {roadmapColumns.find(col => col.status === 'live')?.features.length || 0}
              </div>
              <div className="text-sm text-surface-600">Live Features</div>
            </div>
<div>
              <div className="text-2xl font-bold text-surface-900 mb-1">
                {roadmapColumns.find(col => col.status === 'in-progress')?.features.length || 0}
              </div>
              <div className="text-sm text-surface-600">In Development</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-surface-900 mb-1">
                {features.reduce((sum, feature) => sum + (feature.votes_c || 0), 0)}
              </div>
              <div className="text-sm text-surface-600">Total Votes</div>
            </div>
          </div>
        </div>
</div>
    </Layout>
  );
};

export default RoadmapPage;