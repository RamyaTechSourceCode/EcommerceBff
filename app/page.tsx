"use client";

export default function Home() {
  
  const login = () => {
     const redirectUri = encodeURIComponent(
    `${window.location.origin}/products`
  );

  window.location.href =
    `http://localhost:5291/bff/login?redirect_uri=${redirectUri}`;
   
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Entra ID Login
        </h1>

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign in with Microsoft
        </button>
      </div>
    </main>
  );
}