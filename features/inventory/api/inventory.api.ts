export interface InventoryItem {
  productId: string;
  name: string;
  description?: string;
  price: number;
  availableStock: number;
}

export interface PagedInventoryResponse {
  items: InventoryItem[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export async function fetchInventoryApi(pageNumber: number, pageSize: number): Promise<PagedInventoryResponse> {
  const response = await fetch(`/api/catalogs/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  if (!response.ok) {
    throw new Error("Failed to pull data from YARP gateway");
  }
   const data = await response.json();

  return {
    items: data.data as InventoryItem[],
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    totalPages: data.totalPages,
    totalCount: data.totalRecords,
  };
}
