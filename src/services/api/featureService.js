import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const featureService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('feature_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "author_id_c"}},
          {"field": {"Name": "votes_c"}},
          {"field": {"Name": "voter_ids_c"}},
          {"field": {"Name": "product_id_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching features:", error?.response?.data?.message || error);
      toast.error("Failed to load features");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('feature_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "author_id_c"}},
          {"field": {"Name": "votes_c"}},
          {"field": {"Name": "voter_ids_c"}},
          {"field": {"Name": "product_id_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching feature ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load feature");
      return null;
    }
  },

  async getByProductId(productId) {
    try {
      const apperClient = getApperClient();
      const productIdNum = typeof productId === 'string' ? 
        (productId.startsWith('product') ? parseInt(productId.replace('product', '')) : parseInt(productId)) : 
        parseInt(productId);
        
      const response = await apperClient.fetchRecords('feature_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "author_id_c"}},
          {"field": {"Name": "votes_c"}},
          {"field": {"Name": "voter_ids_c"}},
          {"field": {"Name": "product_id_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        where: [{
          "FieldName": "product_id_c",
          "Operator": "EqualTo",
          "Values": [productIdNum]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching features for product ${productId}:`, error?.response?.data?.message || error);
      toast.error("Failed to load features");
      return [];
    }
  },

  async create(featureData) {
    try {
      const apperClient = getApperClient();
      const productIdNum = typeof featureData.productId === 'string' ? 
        parseInt(featureData.productId.replace('product', '')) : 
        parseInt(featureData.productId);

      const response = await apperClient.createRecord('feature_c', {
        records: [{
          title_c: featureData.title,
          description_c: featureData.description,
          category_c: featureData.category,
          status_c: featureData.status || "submitted",
          author_id_c: featureData.authorId,
          votes_c: 1, // Creator gets first vote
          voter_ids_c: JSON.stringify([featureData.authorId]),
          product_id_c: productIdNum
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
          console.error(`Failed to create ${failed.length} features:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Feature created successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating feature:", error?.response?.data?.message || error);
      toast.error("Failed to create feature");
      return null;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      
      // Filter updates to only include updateable fields
      const updateableFields = {};
      if (updates.title_c !== undefined) updateableFields.title_c = updates.title_c;
      if (updates.description_c !== undefined) updateableFields.description_c = updates.description_c;
      if (updates.category_c !== undefined) updateableFields.category_c = updates.category_c;
      if (updates.status_c !== undefined) updateableFields.status_c = updates.status_c;
      if (updates.author_id_c !== undefined) updateableFields.author_id_c = updates.author_id_c;
      if (updates.votes_c !== undefined) updateableFields.votes_c = updates.votes_c;
      if (updates.voter_ids_c !== undefined) updateableFields.voter_ids_c = typeof updates.voter_ids_c === 'string' ? updates.voter_ids_c : JSON.stringify(updates.voter_ids_c);
      if (updates.product_id_c !== undefined) updateableFields.product_id_c = parseInt(updates.product_id_c);

      const response = await apperClient.updateRecord('feature_c', {
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
          console.error(`Failed to update ${failed.length} features:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Feature updated successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating feature:", error?.response?.data?.message || error);
      toast.error("Failed to update feature");
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord('feature_c', {
        RecordIds: [parseInt(id)]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} features:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Feature deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting feature:", error?.response?.data?.message || error);
      toast.error("Failed to delete feature");
      return false;
    }
  }
};