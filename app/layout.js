"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import "./globals.css";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="antialiased font-sans text-foreground bg-background">
        <div className="min-h-screen">
          <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <div className="md:pl-[260px] flex flex-col min-h-screen">
            <main className="flex-1 p-4 sm:p-6 lg:p-10 pt-20 md:pt-6 lg:pt-10 max-w-7xl mx-auto w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

