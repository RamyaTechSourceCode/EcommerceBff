export default function OrdersPage() {
  const orders = [
    {
      id: "O1001",
      customer: "John Doe",
      total: 249,
      status: "Shipped",
    },
    {
      id: "O1002",
      customer: "Jane Smith",
      total: 89,
      status: "Pending",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <div className="bg-white rounded-xl shadow p-4">
        {orders.map((o) => (
          <div
            key={o.id}
            className="flex justify-between border-b py-3"
          >
            <div>
              <p className="font-semibold">{o.id}</p>
              <p className="text-sm text-gray-500">
                {o.customer}
              </p>
            </div>

            <div className="text-right">
              <p>${o.total}</p>
              <p className="text-sm text-blue-600">
                {o.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}