"use client";

import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BFF_URL}/bff/user`,
      {
        credentials: "include",
      }
    )
      .then((r) => r.json())
      .then(setUser)
      .catch(console.error);
  }, []);

  if (!user) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-bold mb-4">
          User Information
        </h1>

        <pre className="text-sm overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}