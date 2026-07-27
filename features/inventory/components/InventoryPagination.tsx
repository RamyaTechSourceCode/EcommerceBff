// features/inventory/components/InventoryPagination.tsx
"use client";

interface InventoryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
}

export function InventoryPagination({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}: InventoryPaginationProps) {
  return (
    <div className="flex justify-between items-center mt-4 px-1">
      <span className="text-xs text-gray-400">
        Page <span className="font-medium text-gray-600">{currentPage}</span> of{" "}
        <span className="font-medium text-gray-600">{totalPages}</span> ({totalCount} rows tracked)
      </span>
      
      <div className="flex gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1.5 border rounded-lg text-xs font-medium bg-white text-gray-700 hover:bg-gray-50 border-gray-200 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all shadow-sm"
        >
          Previous
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 border rounded-lg text-xs font-medium bg-white text-gray-700 hover:bg-gray-50 border-gray-200 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all shadow-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
