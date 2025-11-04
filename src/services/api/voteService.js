import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";
import React from "react";

export const voteService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('vote_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "feature_id_c"}},
          {"field": {"Name": "timestamp_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching votes:", error?.response?.data?.message || error);
      toast.error("Failed to load votes");
      return [];
    }
  },

  async getUserVotes(userId) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('vote_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "feature_id_c"}},
          {"field": {"Name": "timestamp_c"}}
        ],
        where: [{
          "FieldName": "user_id_c",
          "Operator": "EqualTo",
          "Values": [userId]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching votes for user ${userId}:`, error?.response?.data?.message || error);
      toast.error("Failed to load user votes");
      return [];
    }
  },

  async getFeatureVotes(featureId) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('vote_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "feature_id_c"}},
          {"field": {"Name": "timestamp_c"}}
        ],
        where: [{
          "FieldName": "feature_id_c",
          "Operator": "EqualTo",
          "Values": [parseInt(featureId)]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching votes for feature ${featureId}:`, error?.response?.data?.message || error);
      toast.error("Failed to load feature votes");
      return [];
    }
  },

  async addVote(userId, featureId) {
    try {
      const apperClient = getApperClient();
      
      // Check if user has already voted
      const existingVotes = await this.getUserVotes(userId);
      const hasVoted = existingVotes.some(vote => 
        vote.feature_id_c?.Id === parseInt(featureId) || 
        vote.feature_id_c === parseInt(featureId)
      );
      
      if (hasVoted) {
        toast.error("You have already voted for this feature");
        return null;
      }

      const response = await apperClient.createRecord('vote_c', {
        records: [{
          user_id_c: userId,
          feature_id_c: parseInt(featureId),
          timestamp_c: new Date().toISOString()
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
          console.error(`Failed to create ${failed.length} votes:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Vote added successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error adding vote:", error?.response?.data?.message || error);
      toast.error("Failed to add vote");
      return null;
    }
  },

  async removeVote(userId, featureId) {
    try {
      const apperClient = getApperClient();
      
      // Find the vote to delete
      const userVotes = await this.getUserVotes(userId);
      const voteToDelete = userVotes.find(vote => 
        vote.feature_id_c?.Id === parseInt(featureId) || 
        vote.feature_id_c === parseInt(featureId)
      );
      
      if (!voteToDelete) {
        toast.error("Vote not found");
        return false;
      }

      const response = await apperClient.deleteRecord('vote_c', {
        RecordIds: [voteToDelete.Id]
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
          console.error(`Failed to delete ${failed.length} votes:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Vote removed successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error removing vote:", error?.response?.data?.message || error);
      toast.error("Failed to remove vote");
      return false;
    }
  },

  async hasUserVoted(userId, featureId) {
    try {
      const userVotes = await this.getUserVotes(userId);
      return userVotes.some(vote => 
        vote.feature_id_c?.Id === parseInt(featureId) || 
        vote.feature_id_c === parseInt(featureId)
      );
    } catch (error) {
      console.error("Error checking user vote:", error?.response?.data?.message || error);
      return false;
}
  }
};