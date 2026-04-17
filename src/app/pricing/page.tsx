"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface PricingTier {
  name: string;
  price: string;
  duration: string;
  images: string;
  guests: string;
  description: string;
  highlight?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "Package A",
    price: "£100",
    duration: "30 minutes",
    images: "5 edited images",
    guests: "Up to 4 people",
    description:
      "A beautifully focused session, perfect for couples and small families. Ideal if you are looking for a handful of stunning portraits without a large time commitment.",
  },
  {
    name: "Package B",
    price: "£135",
    duration: "45 minutes",
    images: "8 edited images",
    guests: "Up to 4 people",
    description:
      "A little more time to relax, laugh, and let the real moments unfold. This is our most popular choice for families and couples who want a broader selection of images.",
    highlight: true,
  },
  {
    name: "Package C",
    price: "£199",
    duration: "1 hour",
    images: "15 edited images",
    guests: "Up to 6 people",
    description:
      "Our most comprehensive session — perfect for larger families, extended groups, or anyone who wants plenty of variety. More time means more magic.",
  },
];

const included = [
  "A private online gallery with your high-resolution, edited images",
  "Natural, candid direction — no stiff or forced poses",
  "An outdoor location of your choice across Sussex",
  "Pets are always welcome at every session, completely free of charge",
];

export default function PricingPage() {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <a href="/" className="font-serif text-sm tracking-[0.2em] text-[#6BAB80]/80 italic">
          Sussex Light
        </a>
        <a
          href="/#contact"
          className="text-xs tracking-[0.25em] uppercase text-white/60 hover:text-[#6BAB80] transition-colors"
        >
          Get in Touch
        </a>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 text-center">
        <motion.span
          className="text-xs tracking-[0.5em] uppercase text-[#6BAB80]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Pricing
        </motion.span>
        <motion.h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Simple, Honest Pricing
        </motion.h1>
        <motion.p
          className="text-white/50 mt-4 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Beautiful memories shouldn&apos;t break the bank. Choose the session that
          feels right for you — no hidden fees, no surprises.
        </motion.p>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`relative rounded-2xl p-8 border transition-all duration-500 ${
                tier.highlight
                  ? "bg-[#6BAB80]/5 border-[#6BAB80]/30"
                  : "bg-[#141414] border-white/5"
              } ${hoveredTier === index ? "border-[#6BAB80]/50 scale-[1.02]" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              onMouseEnter={() => setHoveredTier(index)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] tracking-[0.3em] uppercase bg-[#6BAB80] text-black px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="font-serif text-xl">{tier.name}</h3>

              <div className="mt-4 mb-6">
                <span className="font-serif text-4xl text-[#6BAB80]">{tier.price}</span>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6BAB80" strokeWidth="1.5" className="shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {tier.duration}
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6BAB80" strokeWidth="1.5" className="shrink-0">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  {tier.images}
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6BAB80" strokeWidth="1.5" className="shrink-0">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {tier.guests}
                </div>
              </div>

              <p className="text-sm text-white/40 leading-relaxed mb-8">
                {tier.description}
              </p>

              <a
                href="/#contact"
                className={`block text-center text-xs tracking-[0.25em] uppercase py-3.5 rounded-full border transition-all duration-500 ${
                  tier.highlight
                    ? "bg-[#6BAB80] text-black border-[#6BAB80] hover:bg-[#5a9a6f]"
                    : "border-[#6BAB80]/40 text-[#6BAB80] hover:bg-[#6BAB80] hover:text-black"
                }`}
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-[800px] mx-auto">
          <motion.h2
            className="font-serif text-2xl md:text-3xl text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            What&apos;s Included
          </motion.h2>
          <motion.p
            className="text-white/40 text-sm text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            All sessions include the following as standard:
          </motion.p>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {included.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 bg-[#141414] border border-white/5 rounded-xl px-6 py-4"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6BAB80"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm text-white/60">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location note */}
      <section className="px-6 md:px-12 pb-20">
        <motion.div
          className="max-w-[700px] mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-white/40 text-sm leading-relaxed">
            Sessions are available at a location of your choosing across Sussex.
            We also have recommendations and scout beforehand to ensure there are
            no surprises on the day!
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 pb-24">
        <motion.div
          className="max-w-[600px] mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-white/50 text-sm leading-relaxed">
            Please do not hesitate to get in touch if you have any questions,
            would like to discuss a bespoke arrangement, or are ready to book —
            we would be thrilled to hear from you.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-3 mt-8 px-8 py-4 border border-[#6BAB80]/50 text-[#6BAB80] text-xs tracking-[0.3em] uppercase rounded-full hover:bg-[#6BAB80] hover:text-black transition-all duration-500"
          >
            <span>Get in Touch</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif text-sm tracking-[0.3em] text-[#6BAB80]/50 italic">
            Sussex Light Photography
          </span>
          <span className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </span>
        </div>
      </footer>
    </div>
  );
}
