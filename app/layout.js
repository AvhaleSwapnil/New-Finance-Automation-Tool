import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";

export const metadata = {
  title: "Financal Overview",
  description: "Advanced financial dashboard for monitoring and automating your business data.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans text-foreground bg-background">
        <div className="min-h-screen">
          <Sidebar />
          <div className="md:pl-[260px] flex flex-col min-h-screen">
            <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
