"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

const placeholderTestimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    name: "Emily & James",
    role: "Wedding Clients",
    quote:
      "Sussex Light Photography captured our wedding day with such warmth and artistry. Every photo feels like reliving the most beautiful moments of our lives.",
  },
  {
    id: "placeholder-2",
    name: "Sarah Thompson",
    role: "Family Portrait Session",
    quote:
      "They have an incredible ability to make everyone feel at ease. Our children were laughing and being themselves, and the photos are absolutely magical.",
  },
  {
    id: "placeholder-3",
    name: "David & Priya",
    role: "Engagement Shoot",
    quote:
      "We were nervous about being in front of the camera, but Min and Zen made it feel effortless. The results were beyond anything we imagined.",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [testimonials, setTestimonials] = useState<Testimonial[]>(placeholderTestimonials);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      } catch {
        // Keep placeholders on error
      }
    };
    fetchTestimonials();
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length, next]);

  const testimonial = testimonials[current];

  return (
    <section ref={ref} id="testimonials" className="py-24 md:py-32 px-6 md:px-12">
      {/* Header */}
      <motion.div
        className="text-center mb-16 max-w-[1400px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-xs tracking-[0.5em] uppercase text-[#6BAB80]">
          Kind Words
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
          Testimonials
        </h2>
      </motion.div>

      {/* Testimonial Carousel */}
      <motion.div
        className="max-w-[800px] mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative bg-[#141414] border border-white/5 rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col items-center justify-center text-center">
          {/* Decorative quotation mark */}
          <div className="absolute top-6 left-8 md:top-8 md:left-12 select-none pointer-events-none">
            <span className="font-serif text-6xl md:text-8xl text-[#6BAB80]/15 leading-none">
              &ldquo;
            </span>
          </div>
          <div className="absolute bottom-6 right-8 md:bottom-8 md:right-12 select-none pointer-events-none">
            <span className="font-serif text-6xl md:text-8xl text-[#6BAB80]/15 leading-none">
              &rdquo;
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <p className="text-white/70 text-base md:text-lg leading-relaxed italic max-w-[600px] mx-auto">
                {testimonial?.quote}
              </p>
              <div className="mt-8">
                <p className="font-serif text-lg md:text-xl text-white">
                  {testimonial?.name}
                </p>
                {testimonial?.role && (
                  <p className="text-xs tracking-[0.3em] uppercase text-[#6BAB80] mt-1.5">
                    {testimonial.role}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#6BAB80] hover:border-[#6BAB80]/40 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-[#6BAB80] w-6"
                      : "bg-white/15 hover:bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#6BAB80] hover:border-[#6BAB80]/40 transition-colors"
              aria-label="Next testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
