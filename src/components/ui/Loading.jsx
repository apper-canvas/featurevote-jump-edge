import { cn } from "@/utils/cn";

const Loading = ({ className, type = "cards" }) => {
  if (type === "cards") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-surface-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-6 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer w-3/4"></div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <div className="w-12 h-8 bg-gradient-to-r from-primary-100 to-primary-50 rounded shimmer"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer"></div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer"></div>
              <div className="h-3 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer w-5/6"></div>
              <div className="h-3 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer w-4/6"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="w-20 h-6 bg-gradient-to-r from-secondary-100 to-secondary-50 rounded-full shimmer"></div>
              <div className="w-16 h-5 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "modal") {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="h-8 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer w-3/4"></div>
          <div className="h-6 bg-gradient-to-r from-secondary-100 to-secondary-50 rounded-full shimmer w-24"></div>
        </div>
        
        <div className="space-y-3">
          <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer w-5/6"></div>
          <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer w-4/6"></div>
          <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer w-3/6"></div>
        </div>
        
        <div className="flex items-center space-x-6 py-4 border-t border-surface-200">
          <div className="w-20 h-10 bg-gradient-to-r from-primary-100 to-primary-50 rounded shimmer"></div>
          <div className="w-16 h-6 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer"></div>
        </div>
        
        <div className="space-y-4">
          <div className="h-6 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer w-32"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border border-surface-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-surface-200 to-surface-100 rounded-full shimmer"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer w-24"></div>
                  <div className="h-3 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer"></div>
                  <div className="h-3 bg-gradient-to-r from-surface-200 to-surface-100 rounded shimmer w-4/5"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
  );
};

export default Loading;