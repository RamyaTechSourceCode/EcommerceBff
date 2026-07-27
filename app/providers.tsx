"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Enforce a stable client instance using useState.
  // This prevents Next.js from accidentally rebuilding the query cache on component re-renders.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Consider data fresh for 1 minute before checking back with YARP
            refetchOnWindowFocus: false, // Prevents aggressive network spam when you switch tabs
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
