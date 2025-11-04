import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useNavigate } from "react-router-dom";

const ProductHeader = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 border border-surface-200 rounded-xl p-8 mb-8">
      <div className="max-w-4xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-surface-600 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate("/submit")}
              size="lg"
              className="shadow-md"
            >
              <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
              Submit Feature Idea
            </Button>
            
            <Button
              onClick={() => navigate("/roadmap")}
              variant="outline"
              size="lg"
            >
              <ApperIcon name="Map" className="w-5 h-5 mr-2" />
              View Roadmap
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-surface-200">
          <div className="flex items-center text-sm text-surface-600">
            <ApperIcon name="Lightbulb" className="w-4 h-4 mr-2 text-primary-500" />
            Community-driven feedback
          </div>
          
          <div className="flex items-center text-sm text-surface-600">
            <ApperIcon name="Users" className="w-4 h-4 mr-2 text-secondary-500" />
            Open for suggestions
          </div>
          
          <div className="flex items-center text-sm text-surface-600">
            <ApperIcon name="Zap" className="w-4 h-4 mr-2 text-accent-500" />
            Transparent development
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;