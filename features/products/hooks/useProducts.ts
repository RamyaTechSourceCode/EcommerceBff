"use client";

import { useEffect, useState } from "react";
import { getProducts,createProductApi,updateProductApi,deleteProductApi } from "../api/product.api";
import { Product } from "../types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unexpected error occurred.");
    }
  } finally {
      setLoading(false);
    }
  }
  
    async function createProduct(data: Product) {
    await createProductApi(data);
    await fetchProducts();
  }

  async function updateProduct(id:string, data: Product) {
    await updateProductApi(id, data);
    await fetchProducts();
  }

   async function deleteProduct(data: Product) {
    await deleteProductApi(data);
   // await fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
 };
}