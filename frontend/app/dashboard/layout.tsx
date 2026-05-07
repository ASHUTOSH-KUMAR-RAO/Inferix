"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          collapsed ? "ml-[60px]" : "ml-[220px]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
