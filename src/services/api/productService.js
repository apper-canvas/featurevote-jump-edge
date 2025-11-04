import mockProducts from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...mockProducts];
  },

  async getById(id) {
    await delay(250);
    const product = mockProducts.find(p => p.Id === parseInt(id.replace('product', '')));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async create(productData) {
    await delay(400);
    const newProduct = {
      Id: Math.max(...mockProducts.map(p => p.Id), 0) + 1,
      ...productData,
      createdAt: new Date().toISOString()
    };
    mockProducts.push(newProduct);
    return { ...newProduct };
  },

  async update(id, updates) {
    await delay(350);
    const index = mockProducts.findIndex(p => p.Id === parseInt(id.replace('product', '')));
    if (index === -1) {
      throw new Error("Product not found");
    }
    mockProducts[index] = { ...mockProducts[index], ...updates, updatedAt: new Date().toISOString() };
    return { ...mockProducts[index] };
  },

  async delete(id) {
    await delay(300);
    const index = mockProducts.findIndex(p => p.Id === parseInt(id.replace('product', '')));
    if (index === -1) {
      throw new Error("Product not found");
    }
    mockProducts.splice(index, 1);
    return true;
  }
};