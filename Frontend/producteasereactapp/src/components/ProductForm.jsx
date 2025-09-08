import { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../services/productService";

export default function ProductForm({ onAdd, editProduct, onUpdateDone }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || "",
        description: editProduct.description || "",
        quantity: editProduct.quantity || "",
        price: editProduct.price || "",
      });
    } else {
      setFormData({ name: "", description: "", quantity: "", price: "" });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name: formData.name,
      description: formData.description,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
    };
    try {
      if (editProduct) {
        await updateProduct(editProduct.id, product);
        onUpdateDone();
      } else {
        await addProduct(product);
        onAdd();
      }
      setFormData({ name: "", description: "", quantity: "", price: "" });
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 bg-gray-900 bg-opacity-80 p-10 rounded-2xl shadow-2xl"
    >
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="p-5 text-lg rounded-lg bg-gray-700 text-white placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="p-5 text-lg rounded-lg bg-gray-700 text-white placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        className="p-5 text-lg rounded-lg bg-gray-700 text-white placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        required
        min={0}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="p-5 text-lg rounded-lg bg-gray-700 text-white placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        required
        min={0}
        step="0.01"
      />
      <button
        type="submit"
        className="md:col-span-2 mt-6 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-5 rounded-xl font-bold text-xl shadow-lg transition transform hover:scale-105"
      >
        {editProduct ? "Update Product" : "➕ Add Product"}
      </button>
    </form>
  );
}
