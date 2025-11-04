import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitFeatureForm from "@/components/organisms/SubmitFeatureForm";
import { featureService } from "@/services/api/featureService";
import ApperIcon from "@/components/ApperIcon";

const SubmitPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      await featureService.create({
        productId: "product1", // In real app, would be dynamic
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: "submitted",
        authorId: `User${Math.floor(Math.random() * 1000)}` // Mock user
      });
      
      // Redirect to board with success message
      navigate("/?submitted=true");
    } catch (error) {
      throw error; // Let form handle the error
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="inline-flex items-center text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Board
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl border border-surface-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <SubmitFeatureForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={loading}
            />
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <ApperIcon name="Lightbulb" className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-surface-900 mb-2">
                Tips for Great Suggestions
              </h3>
              <ul className="text-sm text-surface-700 space-y-1">
                <li>• Be specific about the problem you're trying to solve</li>
                <li>• Describe how the feature would help other users</li>
                <li>• Include any relevant context or use cases</li>
                <li>• Check if a similar suggestion already exists</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;