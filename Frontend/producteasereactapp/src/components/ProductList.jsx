import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import ProductForm from "./ProductForm";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleUpdateDone = () => {
    setEditProduct(null);
    loadProducts();
  };

  return (
    <div>
      <ProductForm
        onAdd={loadProducts}
        editProduct={editProduct}
        onUpdateDone={handleUpdateDone}
      />

      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 text-transparent bg-clip-text">
        📋 Product Dashboard
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-300">No products found. Start by adding one! 🎉</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:scale-[1.03] transition"
            >
              <h3 className="text-2xl font-bold text-pink-300">{p.name}</h3>
              <p className="text-gray-200 mb-4">{p.description}</p>
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-green-300">{p.quantity} pcs</span>
                <span className="text-yellow-300">₹{p.price.toFixed(2)}</span>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-black px-4 py-2 rounded-lg shadow font-medium"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-2 rounded-lg shadow font-medium"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
