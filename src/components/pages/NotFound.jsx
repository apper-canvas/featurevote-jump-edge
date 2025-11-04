import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-surface-50">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        <div className="space-y-4">
          <ApperIcon 
            name="AlertTriangle" 
            size={64} 
            className="mx-auto text-accent-500" 
          />
          <h1 className="text-4xl font-bold text-surface-900">
            404
          </h1>
          <h2 className="text-xl font-semibold text-surface-700">
            Page Not Found
          </h2>
          <p className="text-surface-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-medium"
          >
            <ApperIcon name="Home" size={20} />
            Back to Home
          </Link>
          
          <div className="flex justify-center space-x-4 text-sm">
            <Link
              to="/submit"
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              Submit Feature
            </Link>
            <span className="text-surface-400">•</span>
            <Link
              to="/roadmap"
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              View Roadmap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;