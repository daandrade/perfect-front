import { Product } from '../src/types/Product';

// Simulação de banco de dados em memória
let products: Product[] = [
  {
    id: '1',
    name: 'Smartphone X',
    description: 'Último modelo com câmera de 108MP',
    price: 2999.99,
    category: 'Eletrônicos',
    stock: 50,
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15'
  },
  {
    id: '2',
    name: 'Notebook Pro',
    description: '16GB RAM, SSD 512GB, Intel i7',
    price: 5499.99,
    category: 'Eletrônicos',
    stock: 30,
    createdAt: '2023-02-20',
    updatedAt: '2023-02-20'
  }
];

export const getProducts = async (): Promise<Product[]> => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...products];
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return products.find(product => product.id === id);
};

export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newProduct: Product = {
    ...productData,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = products.findIndex(product => product.id === id);
  if (index === -1) {
    throw new Error('Produto não encontrado');
  }
  
  const updatedProduct = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString()
  };
  
  products[index] = updatedProduct;
  return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  products = products.filter(product => product.id !== id);
};