export type Product = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  availableStock: number;
  status: "Active" | "Inactive";
};

export type ProductInput = Omit<Product, "id">;