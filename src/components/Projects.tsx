"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/images";
import Lightbox from "./Lightbox";

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openProject = (images: string[]) => {
    setLightboxImages(images);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  return (
    <section ref={ref} id="projects" className="py-24 md:py-32 px-6 md:px-12">
      {/* Header */}
      <motion.div
        className="text-center mb-16 max-w-[1400px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-xs tracking-[0.5em] uppercase text-[#6BAB80]">
          Collections
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
          Projects
        </h2>
      </motion.div>

      {/* Project cards */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3]"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            onClick={() => openProject(project.images)}
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#6BAB80]">
                {project.count} Photos
              </span>
              <h3 className="font-serif text-2xl md:text-3xl mt-2">{project.title}</h3>
              <p className="text-sm text-white/50 mt-2 max-w-sm">{project.description}</p>
              <span className="inline-block mt-4 text-xs tracking-[0.2em] uppercase text-[#6BAB80] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                View Collection &rarr;
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev === 0 ? lightboxImages.length - 1 : prev - 1
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev === lightboxImages.length - 1 ? 0 : prev + 1
          )
        }
      />
    </section>
  );
}
