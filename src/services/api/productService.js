import mockProducts from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock product data since products.json only contains metadata
const mockProductsData = [
  {
    Id: 1,
    name: "TaskFlow Pro",
    description: "The ultimate project management and collaboration platform for modern teams. Streamline workflows, enhance productivity, and deliver exceptional results.",
    ownerId: "owner123",
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const productService = {
  async getAll() {
    await delay(300);
    return [...mockProductsData];
  },

  async getById(id) {
    await delay(250);
    const productId = typeof id === 'string' ? parseInt(id.replace('product', '')) : parseInt(id);
    const product = mockProductsData.find(p => p.Id === productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async create(productData) {
    await delay(400);
    const newProduct = {
      Id: Math.max(...mockProductsData.map(p => p.Id), 0) + 1,
      ...productData,
      createdAt: new Date().toISOString()
    };
    mockProductsData.push(newProduct);
    return { ...newProduct };
  },

  async update(id, updates) {
    await delay(350);
    const index = mockProductsData.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Product not found");
    }
    mockProductsData[index] = { 
      ...mockProductsData[index], 
      ...updates
    };
    return { ...mockProductsData[index] };
  }
};