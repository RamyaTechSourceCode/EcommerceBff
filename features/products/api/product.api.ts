import { Product } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// helper function (important for consistency)
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "API Error");
  }

  // No response body (204 No Content)
  if (res.status === 204) {
    return undefined as T;
  }

  // Empty response body (e.g. Ok() with no content)
  const text = await res.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

// GET all products
export const getProducts = () =>
  request<Product[]>("/products");

// GET single product
export const getProduct = (id: number) =>
  request<Product>(`/products/${id}`);

// CREATE product
export const createProductApi = (data: Partial<Product>) =>
  request<Product>("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });

// UPDATE product
export const updateProductApi = (id: number, data: Partial<Product>) =>
  request<Product>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// DELETE product
export const deleteProductApi = (id: string) =>
  request<void>(`/products/${id}`, {
    method: "DELETE",
  });