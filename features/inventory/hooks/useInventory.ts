import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchInventoryApi } from "../api/inventory.api";

export function useInventory(page: number, size: number) {
  return useQuery({
    // Include page coordinates in the key so changes trigger automatic cache updates
    queryKey: ["inventory", page, size],
    queryFn: () => fetchInventoryApi(page, size),
    // Keeps current view visible while background pagination loads
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
  });
}
