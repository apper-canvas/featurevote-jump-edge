import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { productService } from '@/services/api/productService';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { ApperIcon } from '@/components/ApperIcon';

function CreateProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Product name must be at least 2 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please correct the errors below');
      return;
    }

    setLoading(true);
    
    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        ownerId: 1 // Default owner ID for demo purposes
      };
      
      await productService.create(productData);
      
      toast.success('Product created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
              <ApperIcon name="Plus" size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Product</h1>
            <p className="text-gray-600 text-lg">Add a new product to your portfolio</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Product Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name..."
                    className={`w-full px-4 py-3 text-base border-2 rounded-2xl transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
                      errors.name 
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 focus:bg-white'
                    }`}
                    disabled={loading}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm flex items-center gap-2">
                      <ApperIcon name="AlertCircle" size={16} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Product Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                    Product Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your product, its features, and benefits..."
                    rows={5}
                    className={`w-full px-4 py-3 text-base border-2 rounded-2xl transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none ${
                      errors.description 
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-100' 
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 focus:bg-white'
                    }`}
                    disabled={loading}
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm flex items-center gap-2">
                      <ApperIcon name="AlertCircle" size={16} />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-2xl font-semibold text-base transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating Product...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <ApperIcon name="Plus" size={20} />
                        Create Product
                      </div>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={() => {
                      setFormData({ name: '', description: '' });
                      setErrors({});
                    }}
                    disabled={loading}
                    className="flex-1 sm:flex-initial bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-2xl font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ApperIcon name="X" size={20} />
                      Clear Form
                    </div>
                  </Button>
                </div>
              </form>
            </div>

            {/* Form Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 text-center">
                * Required fields must be completed before submitting
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProductPage;