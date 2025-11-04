import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const productService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "owner_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching products:", error?.response?.data?.message || error);
      toast.error("Failed to load products");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const productId = typeof id === 'string' ? parseInt(id.replace('product', '')) : parseInt(id);
      
      const response = await apperClient.getRecordById('product_c', productId, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "owner_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load product");
      return null;
    }
  },

  async create(productData) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.createRecord('product_c', {
        records: [{
          name_c: productData.name,
          description_c: productData.description,
          owner_id_c: productData.ownerId || "default_owner"
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} products:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Product created successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating product:", error?.response?.data?.message || error);
      toast.error("Failed to create product");
      return null;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      
      // Filter updates to only include updateable fields
      const updateableFields = {};
      if (updates.name_c !== undefined) updateableFields.name_c = updates.name_c;
      if (updates.description_c !== undefined) updateableFields.description_c = updates.description_c;
      if (updates.owner_id_c !== undefined) updateableFields.owner_id_c = updates.owner_id_c;

      const response = await apperClient.updateRecord('product_c', {
        records: [{
          Id: parseInt(id),
          ...updateableFields
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} products:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Product updated successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating product:", error?.response?.data?.message || error);
      toast.error("Failed to update product");
      return null;
    }
  }
};