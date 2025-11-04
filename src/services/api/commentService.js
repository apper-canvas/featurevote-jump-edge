import mockComments from "@/services/mockData/comments.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const commentService = {
  async getAll() {
    await delay(300);
    return [...mockComments];
  },

  async getById(id) {
    await delay(250);
    const comment = mockComments.find(c => c.Id === parseInt(id));
    if (!comment) {
      throw new Error("Comment not found");
    }
    return { ...comment };
  },

  async getByFeatureId(featureId) {
    await delay(350);
    return mockComments
      .filter(c => c.featureId === parseInt(featureId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(c => ({ ...c }));
  },

  async create(commentData) {
    await delay(400);
    const newComment = {
      Id: Math.max(...mockComments.map(c => c.Id), 0) + 1,
      ...commentData,
      featureId: parseInt(commentData.featureId),
      authorId: commentData.authorName.toLowerCase().replace(/\s+/g, ''),
      createdAt: new Date().toISOString()
    };
    mockComments.push(newComment);
    return { ...newComment };
  },

  async update(id, updates) {
    await delay(350);
    const index = mockComments.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Comment not found");
    }
    mockComments[index] = { 
      ...mockComments[index], 
      ...updates 
    };
    return { ...mockComments[index] };
  },

  async delete(id) {
    await delay(300);
    const index = mockComments.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Comment not found");
    }
    mockComments.splice(index, 1);
    return true;
  }
};