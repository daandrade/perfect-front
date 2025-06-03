import axios from 'axios';
import { Product } from '../src/types/Product';

const API_BASE_URL = 'http://localhost:8000/api';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.data.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      category: 'General', 
      stock: product.stock || 0,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      user_id: product.user_id
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    const product = response.data.data;
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      category: 'General',
      stock: product.stock || 0,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      user_id: product.user_id
    };
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData);
    const product = response.data.data;
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      category: 'General',
      stock: product.stock || 0,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      user_id: product.user_id
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData);
    const product = response.data.data;
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      category: 'General',
      stock: product.stock || 0,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      user_id: product.user_id
    };
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};