"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/properties", label: "Residences" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Homepage hero has its own nav
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 bg-background-dark">
      <div className="px-8 flex h-16 md:h-20 items-center justify-between">
        <div className="flex items-center space-x-12">
          <Link
            href="/"
            className="text-sm tracking-widest font-medium uppercase text-white/80 hover:text-white transition-colors"
          >
            Rajdhany
          </Link>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link text-xs tracking-[0.2em] uppercase transition-all",
                  pathname === link.href
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/contact"
            className="hidden sm:flex items-center text-xs tracking-[0.1em] uppercase border-b border-white/30 pb-1 text-white hover:border-white transition-all"
          >
            Get Consultation <span className="ml-2 text-sm">&#x2197;</span>
          </Link>
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background-dark border-t border-white/10 px-8 py-6 flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-xs tracking-[0.2em] uppercase py-3 px-4 transition-colors",
                  pathname === link.href
                    ? "text-white bg-white/5"
                    : "text-white/60 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
