import mockVotes from "@/services/mockData/votes.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const voteService = {
  async getAll() {
    await delay(300);
    return [...mockVotes];
  },

  async getUserVotes(userId) {
    await delay(250);
    return mockVotes.filter(v => v.userId === userId).map(v => ({ ...v }));
  },

  async getFeatureVotes(featureId) {
    await delay(250);
    return mockVotes.filter(v => v.featureId === parseInt(featureId)).map(v => ({ ...v }));
  },

  async addVote(userId, featureId) {
    await delay(300);
    const existingVote = mockVotes.find(v => v.userId === userId && v.featureId === parseInt(featureId));
    if (existingVote) {
      throw new Error("User has already voted for this feature");
    }
    
    const newVote = {
      userId,
      featureId: parseInt(featureId),
      timestamp: new Date().toISOString()
    };
    mockVotes.push(newVote);
    return { ...newVote };
  },

  async removeVote(userId, featureId) {
    await delay(300);
    const index = mockVotes.findIndex(v => v.userId === userId && v.featureId === parseInt(featureId));
    if (index === -1) {
      throw new Error("Vote not found");
    }
    mockVotes.splice(index, 1);
    return true;
  },

  async hasUserVoted(userId, featureId) {
    await delay(200);
    return mockVotes.some(v => v.userId === userId && v.featureId === parseInt(featureId));
  }
};