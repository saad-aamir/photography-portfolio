"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={ref} id="contact" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Info */}
        <div>
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
            className="text-white/50 mt-6 max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Open for collaborations, commissions, and creative partnerships.
          </motion.p>
          <motion.div
            className="mt-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="mailto:hello@bloomandshutter.com"
              className="block text-lg text-white/70 hover:text-[#6BAB80] transition-colors"
            >
              hello@bloomandshutter.com
            </a>
            <div className="flex gap-6 pt-4">
              {["Instagram", "Behance", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-[#6BAB80] transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Name */}
          <div className="form-group relative">
            <input
              type="text"
              required
              placeholder=" "
              className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#6BAB80] transition-colors duration-500 peer"
            />
            <label className="absolute left-0 top-3 text-sm text-white/30 transition-all duration-300 pointer-events-none origin-left">
              Your Name
            </label>
          </div>

          {/* Email */}
          <div className="form-group relative">
            <input
              type="email"
              required
              placeholder=" "
              className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#6BAB80] transition-colors duration-500 peer"
            />
            <label className="absolute left-0 top-3 text-sm text-white/30 transition-all duration-300 pointer-events-none origin-left">
              Email Address
            </label>
          </div>

          {/* Subject */}
          <div className="relative">
            <select
              required
              defaultValue=""
              className="w-full bg-transparent border-b border-white/10 py-3 text-white/50 outline-none focus:border-[#6BAB80] transition-colors duration-500 appearance-none"
            >
              <option value="" disabled className="bg-[#141414]">
                Select Subject
              </option>
              <option value="commission" className="bg-[#141414]">Commission</option>
              <option value="collaboration" className="bg-[#141414]">Collaboration</option>
              <option value="print" className="bg-[#141414]">Print Inquiry</option>
              <option value="other" className="bg-[#141414]">Other</option>
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30">
                <path d="M3 5l3 3 3-3" />
              </svg>
            </div>
          </div>

          {/* Message */}
          <div className="form-group relative">
            <textarea
              required
              rows={4}
              placeholder=" "
              className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#6BAB80] transition-colors duration-500 resize-none peer"
            />
            <label className="absolute left-0 top-3 text-sm text-white/30 transition-all duration-300 pointer-events-none origin-left">
              Your Message
            </label>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="group flex items-center gap-3 px-8 py-4 border border-[#6BAB80]/50 text-[#6BAB80] text-xs tracking-[0.3em] uppercase rounded-full hover:bg-[#6BAB80] hover:text-black transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {submitted ? (
              <span>Message Sent</span>
            ) : (
              <>
                <span>Send Message</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
