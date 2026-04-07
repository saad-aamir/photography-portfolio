"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return <span>{count}</span>;
}

function CameraLensAnimation({ isInView }: { isInView: boolean }) {
  const bladeCount = 8;
  const orbitCount = 3;

  return (
    <div className="relative aspect-square w-full max-w-[400px] mx-auto flex items-center justify-center">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-[#6BAB80]/20"
        animate={isInView ? { rotate: 360 } : {}}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Dashed orbit rings */}
      {[...Array(orbitCount)].map((_, i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute rounded-full border border-dashed"
          style={{
            inset: `${(i + 1) * 12}%`,
            borderColor: `rgba(107, 171, 128, ${0.08 + i * 0.04})`,
          }}
          animate={isInView ? { rotate: i % 2 === 0 ? 360 : -360 } : {}}
          transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Aperture blades */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="blade-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[...Array(bladeCount)].map((_, i) => {
          const angle = (i * 360) / bladeCount;
          const rad = (angle * Math.PI) / 180;
          const cx = 200 + Math.cos(rad) * 100;
          const cy = 200 + Math.sin(rad) * 100;
          return (
            <motion.line
              key={`blade-${i}`}
              x1="200"
              y1="200"
              x2={cx}
              y2={cy}
              stroke="#6BAB80"
              strokeWidth="1"
              filter="url(#blade-glow)"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={isInView ? { opacity: 0.5, pathLength: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * i }}
            />
          );
        })}

        {/* Inner aperture polygon */}
        <motion.polygon
          points={[...Array(bladeCount)]
            .map((_, i) => {
              const angle = (i * 360) / bladeCount - 90;
              const rad = (angle * Math.PI) / 180;
              return `${200 + Math.cos(rad) * 55},${200 + Math.sin(rad) * 55}`;
            })
            .join(" ")}
          fill="none"
          stroke="#6BAB80"
          strokeWidth="1.5"
          filter="url(#blade-glow)"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 0.6, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Center lens circles */}
        <motion.circle
          cx="200"
          cy="200"
          r="35"
          fill="none"
          stroke="#B5D4C0"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.7, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="18"
          fill="none"
          stroke="#E8F5EC"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.5, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="5"
          fill="#6BAB80"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 1, 0.6] } : {}}
          transition={{ duration: 1.2, delay: 1.2 }}
        />
      </svg>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 + 15) * (Math.PI / 180);
        const radius = 130 + (i % 3) * 20;
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-[#6BAB80]"
            style={{
              left: `calc(50% + ${Math.cos(angle) * radius}px)`,
              top: `calc(50% + ${Math.sin(angle) * radius}px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView
                ? {
                    opacity: [0, 0.8, 0.3, 0.8],
                    scale: [0, 1.2, 0.8, 1],
                  }
                : {}
            }
            transition={{
              duration: 3,
              delay: 0.15 * i,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}

      {/* Pulsing glow behind */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(107,171,128,0.15) 0%, transparent 70%)",
        }}
        animate={isInView ? { scale: [1, 1.4, 1], opacity: [0.5, 0.8, 0.5] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: 150, label: "Projects" },
    { number: 12, label: "Years" },
    { number: 30, label: "Awards" },
  ];

  return (
    <section ref={ref} id="about" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Animated camera lens */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <CameraLensAnimation isInView={isInView} />
        </motion.div>

        {/* Content */}
        <div>
          <motion.span
            className="text-xs tracking-[0.5em] uppercase text-[#6BAB80]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            About
          </motion.span>
          <motion.h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl mt-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            The Artist Behind
            <br />
            the Lens
          </motion.h2>
          <motion.p
            className="text-white/50 mt-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            With over a decade of experience capturing the extraordinary in the
            ordinary, I believe every frame tells a story waiting to be
            discovered. My work spans the realms of portraiture, fashion, street
            photography, and travel—each genre offering a unique canvas for
            visual storytelling.
          </motion.p>
          <motion.p
            className="text-white/50 mt-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Based between New York and London, I collaborate with brands,
            publications, and individuals who share a passion for imagery that
            moves, inspires, and endures.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex gap-10 md:gap-14 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-3xl md:text-4xl text-[#6BAB80]">
                  <AnimatedCounter target={stat.number} inView={isInView} />
                  <span className="text-[#6BAB80]/60">+</span>
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-white/30 mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
