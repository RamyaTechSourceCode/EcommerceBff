import './index.css';

export const metadata = {
  title: 'Cloud Inventory System',
  description: 'Next.js application secured via .NET YARP Gateway BFF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900 bg-slate-50">
        {children}
      </body>
    </html>
  );
}
