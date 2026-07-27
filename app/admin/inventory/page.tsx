// app/admin/inventory/page.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useInventory } from "@/features/inventory/hooks/useInventory";
import { InventoryTable } from "@/features/inventory/components/InventoryTable";
import { InventoryPagination } from "@/features/inventory/components/InventoryPagination";
import Providers from "@/app/providers"; // <-- Import your providers package here

// 1. Rename your inner view component
function InventoryPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;

  const { data, isLoading, isError, isFetching } = useInventory(currentPage, pageSize);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) return <div className="p-6 text-sm text-gray-500">Synchronizing warehouse metrics...</div>;
  if (isError || !data) return <div className="p-6 text-sm text-red-500">Failed to connect via YARP Gateway.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Warehouse Inventory Panel</h1>
        {isFetching && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Syncing Cache</span>}
      </div>

      <InventoryTable items={data.items} />

      <InventoryPagination
        currentPage={currentPage}
        totalPages={data.totalPages}
        totalCount={data.totalCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

// 2. Export a default wrapper that guarantees Context is initialized immediately
export default function InventoryPage() {
  return (
    <Providers>
      <InventoryPageContent />
    </Providers>
  );
}
