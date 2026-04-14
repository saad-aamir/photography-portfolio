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

function FamilySketchAnimation({ isInView }: { isInView: boolean }) {
  const line = (d: string, delay: number, color = "#B5D4C0", width = 1.5) => (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={isInView ? { pathLength: 1, opacity: 0.8 } : {}}
      transition={{ duration: 1.5, delay, ease: "easeInOut" }}
    />
  );

  return (
    <div className="relative aspect-square w-full max-w-[420px] mx-auto flex items-center justify-center">
      <svg viewBox="0 0 400 450" className="w-full h-full">
        <defs>
          <filter id="sketch-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#sketch-glow)">
          {/* Ground / shoreline */}
          {line("M30,380 Q100,370 200,375 Q300,380 370,370", 0, "#4A7C5B", 1)}
          {line("M50,388 Q150,382 250,385 Q330,388 360,383", 0.1, "#4A7C5B", 0.8)}

          {/* Person 1 - Min (left) */}
          {/* Head */}
          <motion.ellipse
            cx="140" cy="145" rx="22" ry="25"
            fill="none" stroke="#B5D4C0" strokeWidth="1.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.8 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
          {/* Hair */}
          {line("M118,138 Q112,120 120,108 Q130,98 142,97 Q155,98 162,110 Q166,120 160,135", 0.4, "#B5D4C0", 1.2)}
          {line("M118,140 Q108,155 105,172 Q103,185 108,195", 0.45, "#B5D4C0", 1)}
          {/* Body */}
          {line("M130,170 Q125,195 122,220 Q120,250 122,280 Q124,310 128,340 Q130,355 135,370", 0.5, "#B5D4C0", 1.8)}
          {/* Dress/jacket */}
          {line("M122,280 Q110,310 105,340 Q102,355 108,368 Q115,375 130,372 Q140,368 142,355 Q145,330 140,300", 0.6, "#B5D4C0", 1.4)}
          {/* Arm reaching to person 2 */}
          {line("M130,210 Q150,205 170,202 Q185,200 195,205", 0.7, "#B5D4C0", 1.5)}
          {/* Smile */}
          {line("M134,150 Q140,155 146,150", 1.4, "#B5D4C0", 1)}
          {/* Eyes */}
          <motion.circle cx="133" cy="142" r="1.8" fill="#B5D4C0"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.8 } : {}}
            transition={{ delay: 1.3 }} />
          <motion.circle cx="148" cy="142" r="1.8" fill="#B5D4C0"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.8 } : {}}
            transition={{ delay: 1.3 }} />

          {/* Person 2 - Zen (right) */}
          {/* Head */}
          <motion.ellipse
            cx="260" cy="135" rx="24" ry="27"
            fill="none" stroke="#9AC4A8" strokeWidth="1.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.8 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
          {/* Hair */}
          {line("M236,128 Q238,110 248,103 Q260,97 272,102 Q282,110 283,125", 0.4, "#9AC4A8", 1.2)}
          {/* Body */}
          {line("M270,162 Q275,190 278,220 Q280,250 278,280 Q276,320 272,350 Q270,365 268,375", 0.5, "#9AC4A8", 2)}
          {/* Jacket */}
          {line("M262,162 Q255,190 252,220 Q250,255 252,285 Q255,315 260,345 Q265,360 270,370 Q278,375 288,368 Q296,358 298,335 Q300,305 298,275 Q295,245 290,220 Q286,195 282,175", 0.55, "#9AC4A8", 1.5)}
          {/* Arm around Min */}
          {line("M252,215 Q235,210 218,208 Q205,207 195,210", 0.7, "#9AC4A8", 1.5)}
          {/* Camera in other hand */}
          <motion.rect x="295" y="230" width="35" height="25" rx="4"
            fill="none" stroke="#E8F5EC" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
            transition={{ duration: 1, delay: 0.9 }} />
          <motion.circle cx="312" cy="242" r="8" fill="none" stroke="#E8F5EC" strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 0.8, delay: 1 }} />
          <motion.circle cx="312" cy="242" r="3" fill="#6BAB80"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : {}}
            transition={{ delay: 1.1 }} />
          {/* Arm to camera */}
          {line("M282,200 Q290,210 298,220 Q305,225 308,230", 0.85, "#9AC4A8", 1.3)}
          {/* Smile */}
          {line("M254,140 Q260,145 266,140", 1.4, "#9AC4A8", 1)}
          {/* Eyes */}
          <motion.circle cx="252" cy="132" r="1.8" fill="#9AC4A8"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.8 } : {}}
            transition={{ delay: 1.3 }} />
          <motion.circle cx="267" cy="132" r="1.8" fill="#9AC4A8"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.8 } : {}}
            transition={{ delay: 1.3 }} />

          {/* Child (between them, slightly in front) */}
          <motion.ellipse
            cx="200" cy="210" rx="15" ry="17"
            fill="none" stroke="#E8F5EC" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          />
          {/* Child hair */}
          {line("M186,205 Q185,192 192,186 Q200,182 208,186 Q214,192 213,202", 0.85, "#E8F5EC", 1)}
          {/* Child body */}
          {line("M195,227 Q192,250 190,275 Q188,300 190,325 Q192,345 195,365", 0.9, "#E8F5EC", 1.4)}
          {line("M205,227 Q208,250 210,275 Q212,300 210,325 Q208,345 205,365", 0.9, "#E8F5EC", 1.4)}
          {/* Child arms up to parents */}
          {line("M188,245 Q175,238 165,235", 1, "#E8F5EC", 1.2)}
          {line("M212,245 Q225,238 235,235", 1, "#E8F5EC", 1.2)}
          {/* Child smile */}
          {line("M195,215 Q200,219 205,215", 1.5, "#E8F5EC", 0.8)}
          {/* Child eyes */}
          <motion.circle cx="194" cy="208" r="1.5" fill="#E8F5EC"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.7 } : {}}
            transition={{ delay: 1.4 }} />
          <motion.circle cx="206" cy="208" r="1.5" fill="#E8F5EC"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.7 } : {}}
            transition={{ delay: 1.4 }} />

          {/* Small pet (dog) at the side */}
          {line("M80,340 Q75,330 78,320 Q82,312 90,315 Q96,318 95,325", 1.1, "#6BAB80", 1.2)}
          {line("M90,325 Q95,335 92,345 Q88,355 82,358 Q76,356 74,348 Q73,342 78,338", 1.15, "#6BAB80", 1.2)}
          {/* Tail */}
          {line("M74,342 Q68,335 65,328", 1.2, "#6BAB80", 1)}
          {/* Ears */}
          {line("M78,318 Q74,310 77,305", 1.2, "#6BAB80", 1)}
          {line("M88,315 Q92,308 90,303", 1.2, "#6BAB80", 1)}
          {/* Dog eye */}
          <motion.circle cx="82" cy="322" r="1.2" fill="#6BAB80"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.7 } : {}}
            transition={{ delay: 1.3 }} />

          {/* Hearts floating */}
          {line("M195,170 Q192,165 195,160 Q198,165 195,170", 1.6, "#6BAB80", 1)}
          {line("M210,155 Q207,150 210,145 Q213,150 210,155", 1.7, "#6BAB80", 0.8)}

          {/* Botanical leaves - left */}
          {line("M35,320 Q20,295 15,270 Q22,285 35,320", 0.2, "#4A7C5B", 1)}
          {line("M40,335 Q22,315 18,295 Q25,308 40,335", 0.25, "#4A7C5B", 0.8)}

          {/* Botanical leaves - right */}
          {line("M365,310 Q380,285 385,260 Q378,278 365,310", 0.2, "#4A7C5B", 1)}
          {line("M360,328 Q378,308 382,288 Q375,300 360,328", 0.25, "#4A7C5B", 0.8)}
        </g>

        {/* Twinkling stars */}
        <g fill="#6BAB80">
          <motion.circle cx="60" cy="80" r="1.5"
            animate={isInView ? { opacity: [0.1, 0.8, 0.1] } : {}}
            transition={{ duration: 3, delay: 1.5, repeat: Infinity }} />
          <motion.circle cx="340" cy="60" r="1.8"
            animate={isInView ? { opacity: [0.1, 0.8, 0.1] } : {}}
            transition={{ duration: 2.5, delay: 1.8, repeat: Infinity }} />
          <motion.circle cx="180" cy="50" r="1.2"
            animate={isInView ? { opacity: [0.1, 0.8, 0.1] } : {}}
            transition={{ duration: 3.5, delay: 2, repeat: Infinity }} />
          <motion.circle cx="310" cy="90" r="1.5"
            animate={isInView ? { opacity: [0.1, 0.8, 0.1] } : {}}
            transition={{ duration: 2.8, delay: 1.6, repeat: Infinity }} />
        </g>
      </svg>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: 20, label: "Projects" },
    { number: 5, label: "Years" },
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
          <FamilySketchAnimation isInView={isInView} />
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
            Sussex Light Photography
          </motion.h2>
          <motion.p
            className="text-white/50 mt-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Five years ago, we put down roots in Sussex — and fell even deeper
            in love with the people and places around us.
          </motion.p>
          <motion.p
            className="text-white/50 mt-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            We&apos;re Sussex Light Photography, a Sussex-based photography duo
            specialising in natural, heartfelt family and portrait photography.
          </motion.p>
          <motion.p
            className="text-white/50 mt-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Our passions fit together almost as naturally as we do. Min brings a
            quiet, instinctive eye for direction and vision — the feeling of a
            moment before the shutter clicks. Zen brings the camera, the craft,
            and over five years of experience photographing people and places
            across Europe and Asia. Together, we became something more than the
            sum of our parts.
          </motion.p>
          <motion.p
            className="text-white/50 mt-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            We started this business with one simple belief: that beautifully
            captured memories shouldn&apos;t be a luxury. Whether it&apos;s a
            milestone birthday, a family photoshoot in Sussex, a couple&apos;s
            portrait, or something in between — your story is worth telling, and
            we want to be the ones to tell it.
          </motion.p>
          <motion.p
            className="text-white/50 mt-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            We specialise in natural, candid photography that captures real
            connection — creating timeless images for families and individuals
            across Sussex.
          </motion.p>
          <motion.p
            className="text-white/40 mt-6 leading-relaxed font-serif italic text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            &ldquo;We know how fleeting these moments are. We&apos;re here to
            make sure you never have to let them go.&rdquo;
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex gap-10 md:gap-14 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
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
