import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const commentService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('comment_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "author_id_c"}},
          {"field": {"Name": "author_name_c"}},
          {"field": {"Name": "content_c"}},
          {"field": {"Name": "is_official_c"}},
          {"field": {"Name": "feature_id_c"}},
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
      console.error("Error fetching comments:", error?.response?.data?.message || error);
      toast.error("Failed to load comments");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('comment_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "author_id_c"}},
          {"field": {"Name": "author_name_c"}},
          {"field": {"Name": "content_c"}},
          {"field": {"Name": "is_official_c"}},
          {"field": {"Name": "feature_id_c"}},
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
      console.error(`Error fetching comment ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load comment");
      return null;
    }
  },

  async getByFeatureId(featureId) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('comment_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "author_id_c"}},
          {"field": {"Name": "author_name_c"}},
          {"field": {"Name": "content_c"}},
          {"field": {"Name": "is_official_c"}},
          {"field": {"Name": "feature_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        where: [{
          "FieldName": "feature_id_c",
          "Operator": "EqualTo",
          "Values": [parseInt(featureId)]
        }],
        orderBy: [{
          "fieldName": "CreatedOn",
          "sorttype": "DESC"
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching comments for feature ${featureId}:`, error?.response?.data?.message || error);
      toast.error("Failed to load comments");
      return [];
    }
  },

  async create(commentData) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.createRecord('comment_c', {
        records: [{
          author_id_c: commentData.authorName.toLowerCase().replace(/\s+/g, ''),
          author_name_c: commentData.authorName,
          content_c: commentData.content,
          is_official_c: commentData.isOfficial || false,
          feature_id_c: parseInt(commentData.featureId)
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
          console.error(`Failed to create ${failed.length} comments:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Comment added successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating comment:", error?.response?.data?.message || error);
      toast.error("Failed to create comment");
      return null;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      
      // Filter updates to only include updateable fields
      const updateableFields = {};
      if (updates.author_id_c !== undefined) updateableFields.author_id_c = updates.author_id_c;
      if (updates.author_name_c !== undefined) updateableFields.author_name_c = updates.author_name_c;
      if (updates.content_c !== undefined) updateableFields.content_c = updates.content_c;
      if (updates.is_official_c !== undefined) updateableFields.is_official_c = updates.is_official_c;
      if (updates.feature_id_c !== undefined) updateableFields.feature_id_c = parseInt(updates.feature_id_c);

      const response = await apperClient.updateRecord('comment_c', {
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
          console.error(`Failed to update ${failed.length} comments:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Comment updated successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating comment:", error?.response?.data?.message || error);
      toast.error("Failed to update comment");
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord('comment_c', {
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
          console.error(`Failed to delete ${failed.length} comments:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Comment deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting comment:", error?.response?.data?.message || error);
      toast.error("Failed to delete comment");
      return false;
    }
  }
};