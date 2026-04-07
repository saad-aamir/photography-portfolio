"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Logo from "./Logo";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="border-t border-white/5 py-10 px-6 md:px-12">
      <motion.div
        className="max-w-[1400px] mx-auto flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Logo size={60} animated={false} minimal />
        <span className="font-serif text-sm tracking-[0.3em] text-[#6BAB80]/50 italic">
          bloom &amp; shutter
        </span>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </span>
          <span className="text-white/10">|</span>
          <a
            href="/admin"
            className="text-xs text-white/10 hover:text-[#6BAB80]/60 transition-colors"
          >
            Admin
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
