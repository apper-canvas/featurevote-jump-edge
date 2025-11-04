import { useState, useMemo } from "react";
import FeatureCard from "@/components/organisms/FeatureCard";
import FeatureDetailModal from "@/components/organisms/FeatureDetailModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import SortControls from "@/components/molecules/SortControls";
import StatusFilter from "@/components/molecules/StatusFilter";
import ApperIcon from "@/components/ApperIcon";

const FeatureGrid = ({ 
  features, 
  loading, 
  error, 
  onRetry, 
  onVote, 
  votedFeatures 
}) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [sortBy, setSortBy] = useState("votes-desc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedFeatures = useMemo(() => {
    let filtered = [...features];

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(feature => feature.status === statusFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case "votes-desc":
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case "votes-asc":
        filtered.sort((a, b) => a.votes - b.votes);
        break;
      case "date-desc":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "date-asc":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [features, sortBy, statusFilter]);

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-surface-900">
            {filteredAndSortedFeatures.length} Feature{filteredAndSortedFeatures.length !== 1 ? 's' : ''}
            {statusFilter !== "all" && (
              <span className="text-surface-500 font-normal ml-2">
                · {statusFilter.replace('-', ' ')}
              </span>
            )}
          </h2>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden p-2 text-surface-600 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-colors"
          >
            <ApperIcon name="Filter" className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <SortControls
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="lg:hidden p-4 bg-surface-50 rounded-lg border border-surface-200">
          <StatusFilter
            selectedStatus={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>
      )}

      {/* Layout Container */}
      <div className="flex gap-6">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 p-4 bg-white rounded-lg border border-surface-200">
            <StatusFilter
              selectedStatus={statusFilter}
              onStatusChange={setStatusFilter}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="flex-1">
          {filteredAndSortedFeatures.length === 0 ? (
            <Empty
              title="No features found"
              description={
                statusFilter !== "all"
                  ? `No features found with status "${statusFilter.replace('-', ' ')}"`
                  : "No feature suggestions have been submitted yet. Be the first!"
              }
              actionLabel="Submit First Feature"
              onAction={() => window.location.href = "/submit"}
              icon="Lightbulb"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedFeatures.map((feature, index) => (
                <FeatureCard
                  key={feature.Id}
                  feature={feature}
                  index={index}
                  hasVoted={votedFeatures.has(feature.Id)}
                  onClick={() => setSelectedFeature(feature)}
                  onVote={onVote}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Feature Detail Modal */}
      <FeatureDetailModal
        feature={selectedFeature}
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onVote={onVote}
        hasVoted={selectedFeature ? votedFeatures.has(selectedFeature.Id) : false}
      />
    </div>
  );
};

export default FeatureGrid;