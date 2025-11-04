import mockFeatures from "@/services/mockData/features.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const featureService = {
  async getAll() {
    await delay(300);
    return [...mockFeatures];
  },

  async getById(id) {
    await delay(250);
    const feature = mockFeatures.find(f => f.Id === parseInt(id));
    if (!feature) {
      throw new Error("Feature not found");
    }
    return { ...feature };
  },

  async getByProductId(productId) {
    await delay(350);
    const productIdNum = parseInt(productId.replace('product', ''));
    return mockFeatures.filter(f => f.productId === productIdNum).map(f => ({ ...f }));
  },

  async create(featureData) {
    await delay(400);
    const newFeature = {
      Id: Math.max(...mockFeatures.map(f => f.Id), 0) + 1,
      ...featureData,
      productId: parseInt(featureData.productId.replace('product', '')),
      votes: 1, // Creator gets first vote
      voterIds: [featureData.authorId],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockFeatures.push(newFeature);
    return { ...newFeature };
  },

  async update(id, updates) {
    await delay(350);
    const index = mockFeatures.findIndex(f => f.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Feature not found");
    }
    mockFeatures[index] = { 
      ...mockFeatures[index], 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    return { ...mockFeatures[index] };
  },

  async delete(id) {
    await delay(300);
    const index = mockFeatures.findIndex(f => f.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Feature not found");
    }
    mockFeatures.splice(index, 1);
    return true;
  }
};