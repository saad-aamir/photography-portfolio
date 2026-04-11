"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[800px] mx-auto text-center">
        <motion.span
          className="text-xs tracking-[0.5em] uppercase text-[#6BAB80]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.span>
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Let&apos;s Create
          <br />
          Together
        </motion.h2>
        <motion.p
          className="text-white/50 mt-6 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Open for collaborations, commissions, and creative partnerships.
        </motion.p>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="mailto:tenandscale@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#6BAB80]/50 text-[#6BAB80] text-xs tracking-[0.3em] uppercase rounded-full hover:bg-[#6BAB80] hover:text-black transition-all duration-500"
          >
            <span>tenandscale@gmail.com</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <a
            href="tel:+447413565121"
            className="text-sm text-white/50 hover:text-[#6BAB80] transition-colors"
          >
            +44 7413 565121
          </a>
        </motion.div>
        <motion.div
          className="flex justify-center gap-8 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {["Instagram", "Behance", "LinkedIn"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-[#6BAB80] transition-colors duration-300"
            >
              {social}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
