import { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import { productService } from "@/services/api/productService";

const SubmitFeatureForm = ({ onSubmit, onCancel, loading = false }) => {
const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    productId: ""
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const productData = await productService.getAll();
        setProducts(productData);
        setProductsError(null);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProductsError("Failed to load products");
        toast.error("Failed to load products");
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "UI/UX Improvement",
    "New Feature",
    "Performance",
    "Integration",
    "Bug Fix",
    "Documentation",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters";
    }

if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.productId) {
      newErrors.productId = "Product selection is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

try {
      await onSubmit(formData);
      setFormData({ title: "", description: "", category: "", productId: "" });
      toast.success("Feature suggestion submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit feature suggestion");
      console.error("Error submitting feature:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          Submit a Feature Suggestion
        </h2>
        <p className="text-surface-600">
          Help us improve by sharing your ideas and suggestions
        </p>
      </div>

      <Input
        name="title"
        label="Feature Title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Brief, descriptive title for your feature request"
        error={errors.title}
        helperText={`${formData.title.length}/100 characters`}
        maxLength={100}
      />

<Select
        name="productId"
        label="Product"
        value={formData.productId}
        onChange={handleChange}
        error={errors.productId}
        disabled={productsLoading}
      >
        <option value="">
          {productsLoading ? "Loading products..." : "Select a product..."}
        </option>
        {products.map((product) => (
          <option key={product.Id} value={product.Id}>
            {product.name}
          </option>
        ))}
      </Select>

      <Select
        name="category"
        label="Category"
        value={formData.category}
        onChange={handleChange}
        error={errors.category}
      >
        <option value="">Select a category...</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>

      <Textarea
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Provide a detailed description of your feature request. Include what problem it solves and how it would help users."
        error={errors.description}
        helperText={`${formData.description.length}/1000 characters`}
        rows={6}
        maxLength={1000}
      />

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-surface-200">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          disabled={loading}
          size="lg"
        >
          {loading ? (
            <>
              <ApperIcon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <ApperIcon name="Send" className="w-5 h-5 mr-2" />
              Submit Feature
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SubmitFeatureForm;