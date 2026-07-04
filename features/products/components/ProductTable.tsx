"use client";

import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductModal from "./ProductModal";

export default function ProductTable() {
  const {
    products,
    loading,
    error,
    refetch,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>

        <button
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map((p) => (
          <div
            key={p.productId}
            className="bg-white p-5 rounded-xl shadow border"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{p.name}</h3>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  p.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {p.status}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-1">{p.description}</p>

            <div className="mt-3 text-sm space-y-1">
              <p>💰 ${p.price}</p>

              <p>
                📦 Stock:{" "}
                <span
                  className={
                    p.availableStock > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {p.availableStock}
                </span>
              </p>

              <p>🏷 {p.category}</p>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setSelected(p);
                  setOpen(true);
                }}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  if (!confirm("Delete this product?")) return;
                  await deleteProduct(p.productId);
                  refetch();
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <ProductModal
          product={selected}
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            refetch();
          }}
          createProduct={createProduct}
          updateProduct={updateProduct}
        />
      )}
    </div>
  );
}