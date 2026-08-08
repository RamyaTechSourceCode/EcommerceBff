# 💻 E-COMMERCE CLIENT USER INTERFACE

A high-performance, enterprise-grade storefront web application built using **React, Next.js, and TypeScript**. This interface serves as the client consumer layer for the distributed microservices ecosystem, featuring native cloud identity integration, centralized data fetch grids, and secure state handling.

---

## 🏗️ SYSTEM LAYOUT & INTEGRATION FLOW

The user interface connects directly to backend services through a secure API reverse proxy architecture, eliminating cross-origin mapping conflicts.

```text
  [ React Client Engine ]
             │
             ├─► [ 1. Request Protected Resource ] ──► [ YARP Gateway (BFF) ]
             │                                                 │
             ◄─ [ 2. HTTP-Only Cookie Exchanged ] ◄────────────┤ 
             │                                                 ├─► [ 3. Validate Token / OAuth2 ] ──► [ Azure Entra ID ]
             │                                                 │
             ├─► [ 4. Forward Authorized Requests ]            ▼
             ▼                                      [ Extract JWT from BFF Cache ]
[ YARP Reverse Proxy Gateway ]                                 │
             │                                                 │
             ├─► [ /api/products ] ────────────────────────────┼──► [ Product Service ]
             ├─► [ /api/orders ]   ────────────────────────────┼──► [ Order Service ]
             ├─► [ /api/catalogs ] ────────────────────────────┼──► [ Catalog Service ]
             └─► [ /api/inventory ] ───────────────────────────┘──► [ Inventory Service ]
```

### CORE INTERFACE COMPONENTS

*   **THE BFF PATTERN USING HTTP-ONLY COOKIES**: Securely handles authorization context by establishing a Backend-for-Frontend topology. The React frontend never stores tokens or secret keys in browser storage. Instead, the YARP gateway manages the OAuth2 handshake, saves the raw JWT tokens in secure server memory, and issues encrypted, `HTTP-Only`, `SameSite=Strict`, and `Secure` cookies to the client browser.
*   **ROUTE PROTECTION**: Uses Next.js Middleware pipelines to intercept unauthenticated navigation loops and protect private customer account pathways.
*   **GATEWAY CONSUMPTION**: Proxies all asynchronous requests through the YARP gateway, automatically including the authentication cookie in the header pipeline.
*   **DATA QUERY STATE**: Powered by React Query to handle client-side caching, automated background refetches, and instantaneous loading state transitions.

---

## 📂 PROJECT DIRECTORY STRUCTURE

The project directory layout scales modularly around domain-driven feature groupings:

*   **`@/components`**: Holds global user interface layout modules (e.g., `Navbar.tsx`, `Footer.tsx`).
*   **`@/features`**: Groups components, custom hooks, and state actions around microservice contexts (e.g., `@/features/products/components/ProductGrid.tsx`).
*   **`@/hooks`**: Isolates shared client utility wrappers (e.g., tracking current auth contexts).
*   **`@/services`**: Configures global API client configurations and interceptors.
*   **`@/middleware.ts`**: Protects secure workspace pages at the application root level.

---

## 🛠️ LOCAL DEVELOPMENT & QUICKSTART

### PREREQUISITES

*   [Node.js LTS Version](https://nodejs.org) (v20 or higher recommended)
*   [Package Manager](https://npmjs.com) (npm or yarn installed)

### 1. CLONE THE REPOSITORY
```bash
git clone https://github.com
cd EcommerceBff
```

### 2. CONFIGURE LOCAL CONFIGURATION SAFETY
Create a `.env.local` file inside the root directory to hold your client environment pointers:

```text
NEXT_PUBLIC_AZURE_AD_CLIENT_ID=YOUR_CLIENT_ID_PLACEHOLDER
NEXT_PUBLIC_AZURE_AD_TENANT_ID=YOUR_TENANT_ID_PLACEHOLDER
NEXT_PUBLIC_AZURE_AD_REDIRECT_URI=http://localhost:3000
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:5000
```
> ⚠️ **SECURITY POLICY**: Never commit actual environment variable values or security client secrets to public repositories.

### 3. INSTALLATION & EXECUTION
Install project dependencies and execute the development server:
```bash
npm install
npm run dev
```

---

## 🔬 FRONTEND DESIGN PATTERNS

### SECURE COOKIE-BASED FETCH PIPELINE

All outbound data requests pass through standard HTTP endpoints. The browser natively carries the session cookies, eliminating JavaScript token leakage vectors:

```typescript
// Example of how you call your other microservices securely:
fetch(`${process.env.NEXT_PUBLIC_BFF_URL}/api/products`, {
  credentials: "include" // <--- This carries your auth context automatically
})
.then(res => res.json())
.then(data => console.log(data));
```

### SCALABLE ALIASED PATH CONFIGURATION

Avoids complex relative reference pollution (`../../components`) by initializing standard path aliasing across `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"],
      "@/features/*": ["features/*"],
      "@/hooks/*": ["hooks/*"]
    }
  }
}
```
