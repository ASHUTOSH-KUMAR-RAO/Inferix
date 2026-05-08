"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";
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
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navGroups = [
  {
    group: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: MessageSquare, label: "Chat", href: "/dashboard/chat" },
      { icon: GitCompare, label: "Compare", href: "/dashboard/compare" },
      { icon: BarChart2, label: "Benchmark", href: "/dashboard/benchmark" },
    ],
  },
  {
    group: "Tools",
    items: [
      { icon: BookTemplate, label: "Templates", href: "/dashboard/templates" },
      { icon: FileText, label: "Report", href: "/dashboard/report" },
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

const tooltipContentClass =
  "bg-[#1a1a1a] border border-white/[0.12] text-white/85 text-[12px] px-2.5 py-1.5 rounded-[7px]";

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    // delay={0} — Base UI ka syntax, instant tooltip
    <TooltipProvider delay={0}>
      <motion.aside
        animate={{ width: collapsed ? 60 : 220 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full bg-[#0d0d0d] border-r border-white/[0.06] z-40 flex flex-col overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center h-14 px-[14px] border-b border-white/[0.06] flex-shrink-0">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-7 h-7 bg-red-500 rounded-[8px] flex items-center justify-center flex-shrink-0">
              <div className="w-2.5 h-2.5 bg-black/40 rounded-[3px]" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[15px] font-semibold text-white/90 tracking-[-0.4px] whitespace-nowrap overflow-hidden"
                >
                  Inferix
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2.5 px-2 flex flex-col gap-0.5 overflow-y-auto">
          {navGroups.map((group, gi) => (
            <div key={group.group}>
              {gi > 0 && <div className="h-px bg-white/[0.05] mx-2 my-1.5" />}

              {/* Group label */}
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] text-white/20 uppercase tracking-[0.8px] px-2.5 py-1.5 overflow-hidden"
                  >
                    {group.group}
                  </motion.div>
                )}
              </AnimatePresence>

              {group.items.map((item) => {
                const isActive = pathname === item.href;

                const navLink = (
                  <Link
                    href={item.href}
                    className={`
                      relative flex items-center gap-2.5 py-2 rounded-[8px]
                      transition-all duration-150 w-full
                      ${collapsed ? "justify-center px-2" : "px-2.5"}
                      ${
                        isActive
                          ? "bg-red-500/10 text-red-400"
                          : "text-white/40 hover:bg-white/[0.05] hover:text-white/70"
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-[20%] bottom-[20%] w-[2.5px] bg-red-500 rounded-r-[2px]" />
                    )}
                    <item.icon
                      className={`w-4 h-4 flex-shrink-0 transition-all ${
                        isActive
                          ? "text-red-400 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]"
                          : "text-white/40"
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
                  </Link>
                );

                return collapsed ? (
                  <Tooltip key={item.href}>
                    <TooltipTrigger className="w-full">
                      {navLink}
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className={tooltipContentClass}
                    >
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div key={item.href}>{navLink}</div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-2 py-2.5 border-t border-white/[0.06] flex flex-col gap-1.5 flex-shrink-0">
          {/* User */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger className="w-full">
                <div className="flex justify-center py-2 px-2 rounded-[8px] hover:bg-white/[0.04] transition-colors cursor-pointer">
                  <UserButton />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className={tooltipContentClass}>
                {user?.firstName || "My Account"}
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] hover:bg-white/[0.04] transition-colors cursor-pointer">
              <UserButton />
              <div className="overflow-hidden">
                <div className="text-[12px] text-white/60 whitespace-nowrap">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-[10px] text-white/25 whitespace-nowrap">
                  Free plan
                </div>
              </div>
            </div>
          )}

          {/* Collapse button — collapsed state */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger className="w-full">
                {/* button ki jagah div */}
                <div
                  onClick={() => setCollapsed(!collapsed)}
                  className="flex justify-center py-2 px-2 rounded-[8px] text-white/25 hover:text-white/55 hover:bg-white/[0.04] transition-all w-full cursor-pointer"
                >
                  <motion.div
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className={tooltipContentClass}>
                Expand sidebar
              </TooltipContent>
            </Tooltip>
          ) : (
            // expanded state mein normal button theek hai
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] text-white/25 hover:text-white/55 hover:bg-white/[0.04] transition-all w-full"
            >
              <motion.div
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.div>
              <span className="text-[13px] whitespace-nowrap">Collapse</span>
            </button>
          )}
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
