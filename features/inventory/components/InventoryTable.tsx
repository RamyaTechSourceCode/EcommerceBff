// features/inventory/components/InventoryTable.tsx
"use client";

import { InventoryItem } from "../api/inventory.api";

interface InventoryTableProps {
  items: InventoryItem[];
}

export function InventoryTable({ items }: InventoryTableProps) {
  if (!items || items.length === 0) {
  return (
    <div className="p-8 text-center text-gray-500 border border-dashed rounded-xl bg-gray-50">
      No warehouse stock rows matching this page.
    </div>
  );
}

  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm border-gray-200">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
          <tr>
            <th className="p-4">Product ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Description</th>
            <th className="p-4">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => (
            <tr key={item.productId} className="hover:bg-gray-50/70 transition-colors">
              <td className="p-4 font-mono text-xs text-gray-400 select-all">
                {item.productId}
              </td>
              <td className="p-4 font-medium text-gray-900">
                {item.name} 
              </td>
              <td className="p-4 text-amber-600 font-medium">
                {item.description}
              </td>
               <td className="p-4 text-amber-600 font-medium">
                {item.price}
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  item.availableStock > 0 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {item.availableStock > 0 ? `${item.availableStock} available` : "Out of Stock"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
