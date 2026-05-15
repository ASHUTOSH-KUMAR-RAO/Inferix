"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Models", href: "#models" },
  { label: "Benchmark", href: "#benchmark" },
  { label: "Compare", href: "#compare" },
];

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-5 h-5 flex flex-col justify-center items-center gap-[5px]"
    >
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block h-[1.5px] bg-white/70 rounded-full origin-center"
        style={{ width: "20px" }}
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="block h-[1.5px] bg-white/70 rounded-full"
        style={{ width: "14px" }}
      />
      <motion.span
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block h-[1.5px] bg-white/70 rounded-full origin-center"
        style={{ width: "20px" }}
      />
    </motion.div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between px-5 md:px-8 h-14 bg-black/85 border-b border-white/[0.07] sticky top-0 z-50 backdrop-blur-xl"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 flex-shrink-0">
        <div className="w-6 h-6 rounded-[7px] bg-red-500/20 border border-red-500/40 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-red-500" />
        </div>
        <span className="text-white font-medium text-[15px]">Inferix</span>
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center">
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-[13px] text-white/40 px-4 cursor-pointer hover:text-white/80 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-3">
        {isSignedIn ? (
          <>
            <Link
              href="/dashboard"
              className="text-white/50 text-[13px] px-3 cursor-pointer hover:text-white/80 transition-colors"
            >
              Dashboard
            </Link>
            <UserButton />
          </>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="text-white/50 text-[13px] px-3 cursor-pointer hover:text-white/80 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="bg-white text-black text-[13px] font-medium px-4 py-[7px] rounded-[8px] hover:bg-white/90 transition-all"
            >
              Get started
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger >
            <motion.div
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.08 }}
              className="w-9 h-9 flex items-center justify-center rounded-[8px] bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <HamburgerIcon isOpen={open} />
            </motion.div>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-[#0a0a0a] border-white/[0.07] p-0 w-[260px]"
          >
            {/* Mobile Header */}
            <div className="flex items-center px-5 h-14 border-b border-white/[0.07]">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-[7px] bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <span className="text-white font-medium text-[15px]">
                  Inferix
                </span>
              </Link>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col px-3 py-4 gap-1">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center text-[14px] text-white/50 hover:text-white hover:bg-white/[0.06] px-3 py-2.5 rounded-[8px] transition-all"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Buttons */}
            <div className="absolute bottom-8 left-0 right-0 px-5 flex flex-col gap-2">
              {isSignedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="w-full text-center text-[13px] text-white/50 border border-white/10 py-2.5 rounded-[8px] hover:bg-white/[0.05] transition-all"
                  >
                    Dashboard
                  </Link>
                  <div className="flex justify-center">
                    <UserButton />
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="w-full text-center text-[13px] text-white/50 border border-white/10 py-2.5 rounded-[8px] hover:bg-white/[0.05] transition-all"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setOpen(false)}
                    className="w-full text-center bg-white text-black text-[13px] font-medium py-2.5 rounded-[8px] hover:bg-white/90 transition-all"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
