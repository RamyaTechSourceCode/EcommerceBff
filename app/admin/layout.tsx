import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>

        <nav className="space-y-3">
          <Link className="block hover:text-blue-300" href="/admin/products">
            Products
          </Link>
          <Link className="block hover:text-blue-300" href="/admin/orders">
            Orders
          </Link>
          <Link className="block hover:text-blue-300" href="/admin/inventory">
            Inventory
          </Link>
           <Link className="block hover:text-blue-300" href="/admin/agents">
            Agents
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <input
            placeholder="Search products, orders..."
            className="w-1/2 border rounded-lg px-3 py-2"
          />

          <div className="text-sm text-gray-600">
            Admin User
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}