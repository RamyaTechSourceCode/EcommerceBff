"use client";

import { useState, useEffect } from "react";

export default function ProductModal({
  product,
  onClose,
  onSuccess,
  createProduct,
  updateProduct,
}: {
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
  createProduct: (p: Product) => Promise<void>;
  updateProduct: (id: string, p: Product) => Promise<void>;
}) {
  const isEdit = !!product;

  const [form, setForm] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    category: "",
    status: "Active",
  });

  // 🔥 populate form when editing
  useEffect(() => {
    if (product) {
       setForm({
      id: product.productId,
      name: product.name,
      description: product.description ?? "",
      category: product.category ?? "",
      price: product.price,
      stockQuantity: product.availableStock ?? 0,
      status: product.status,
    });
    } else {
      setForm({
        id: "",
        name: "",
        description: "",
        price: 0,
        stockQuantity: 0,
        category: "",
        status: "Active",
      });
    }
  }, [product]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "availableStock"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isEdit && product) {
      await updateProduct(form.id, form);
    } else {
      await createProduct(form);
    }

    onSuccess();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded"
          />

          <input
            name="stockQuantity"
            type="number"
            value={form.stockQuantity}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border p-2 rounded"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-2 rounded"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Deleted">Deleted</option>
          </select>

          {/* ACTIONS */}
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded"
            >
              {isEdit ? "Update" : "Create"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}