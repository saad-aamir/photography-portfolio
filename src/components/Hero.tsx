"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Logo from "./Logo";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=70"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0a0a0a]" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
          className="mb-6"
        >
          <Logo size={100} animated={false} minimal />
        </motion.div>

        <motion.h1
          className="font-serif text-4xl md:text-6xl lg:text-8xl tracking-tight leading-[0.95] italic"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="block text-[#B5D4C0]">shoreline</span>
          <span className="block mt-1 md:mt-2 text-white/90">stories</span>
        </motion.h1>

        <motion.p
          className="mt-6 md:mt-8 text-sm md:text-base text-white/50 tracking-widest max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
        >
          We believe every moment deserves to be remembered
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
          <motion.div
            className="w-full bg-[#6BAB80] absolute top-0"
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
