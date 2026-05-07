"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  LayoutDashboard,
  GitCompare,
  BarChart2,
  FileText,
  Settings,
  BookTemplate,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: MessageSquare, label: "Chat", href: "/dashboard/chat" },
  { icon: GitCompare, label: "Compare", href: "/dashboard/compare" },
  { icon: BarChart2, label: "Benchmark", href: "/dashboard/benchmark" },
  { icon: BookTemplate, label: "Templates", href: "/dashboard/templates" },
  { icon: FileText, label: "Report", href: "/dashboard/report" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 60 : 220 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full bg-[#0d0d0d] border-r border-white/[0.06] z-40 flex flex-col overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b border-white/[0.06] flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-6 h-6 rounded-[7px] bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-red-500" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-white font-medium text-[15px] whitespace-nowrap overflow-hidden"
              >
                Inferix
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                className={`flex items-center gap-3 px-2.5 py-2 rounded-[8px] cursor-pointer transition-colors ${
                  isActive
                    ? "bg-red-500/10 text-red-400"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? "text-red-400" : "text-white/40"
                  }`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[13px] whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom — User + Collapse */}
      <div className="px-2 py-3 border-t border-white/[0.06] flex flex-col gap-2 flex-shrink-0">
        {/* User Button */}
        <div
          className={`flex items-center gap-3 px-2.5 py-2 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <UserButton />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[12px] text-white/30 whitespace-nowrap overflow-hidden"
              >
                My Account
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-3 px-2.5 py-2 rounded-[8px] text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 flex-shrink-0" />
              <span className="text-[13px] whitespace-nowrap">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
