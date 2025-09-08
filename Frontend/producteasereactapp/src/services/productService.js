import axios from "axios";
import config from "../config";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${config.backend_url}/products`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${config.backend_url}/products`, product);
    return response.data;
  } catch (err) {
    console.error("Failed to add product:", err);
    throw err;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${config.backend_url}/products/${id}`, product);
    return response.data;
  } catch (err) {
    console.error("Failed to update product:", err);
    throw err;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${config.backend_url}/products/${id}`);
  } catch (err) {
    console.error("Failed to delete product:", err);
    throw err;
  }
};
