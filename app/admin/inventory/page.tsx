export default function InventoryPage() {
  const items = [
    { sku: "WH-100", stock: 34, warehouse: "SG-A1" },
    { sku: "GM-220", stock: 0, warehouse: "SG-B2" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Inventory</h2>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">SKU</th>
              <th>Stock</th>
              <th>Warehouse</th>
            </tr>
          </thead>

          <tbody>
            {items.map((i) => (
              <tr key={i.sku} className="border-b">
                <td className="py-2">{i.sku}</td>
                <td
                  className={
                    i.stock > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {i.stock}
                </td>
                <td>{i.warehouse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}