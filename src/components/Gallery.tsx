"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { galleryImages, GalleryImage } from "@/lib/images";
import Lightbox from "./Lightbox";

const categories = ["All", "Portraits", "Fashion", "Street", "Travel"];

interface UploadedPhoto {
  id: string;
  src: string;
  title: string;
  category: string;
  aspect: "tall" | "wide" | "square";
}

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);

  // Fetch uploaded photos
  useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => setUploadedPhotos(data))
      .catch(() => {});
  }, []);

  // Merge static gallery images with uploaded photos
  const allImages: GalleryImage[] = [
    ...galleryImages,
    ...uploadedPhotos.map((p) => ({
      id: p.id as unknown as number,
      src: p.src,
      alt: p.title,
      category: p.category,
      title: p.title,
      aspect: p.aspect,
    })),
  ];

  const filtered =
    activeCategory === "All"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section ref={ref} id="gallery" className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-xs tracking-[0.5em] uppercase text-[#6BAB80]">
          Portfolio
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
          Selected Works
        </h2>
      </motion.div>

      {/* Category filters */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs tracking-[0.25em] uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
              activeCategory === cat
                ? "border-[#6BAB80] text-[#6BAB80] bg-[#6BAB80]/10"
                : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Masonry grid */}
      <div className="masonry-grid">
        {filtered.map((image, index) => (
          <motion.div
            key={`${image.id}`}
            className="gallery-item group relative overflow-hidden rounded-lg cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * (index % 6) }}
            layout
            onClick={() => openLightbox(index)}
          >
            <div className="relative overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={image.aspect === "tall" ? 1100 : image.aspect === "wide" ? 500 : 800}
                loading="lazy"
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#6BAB80]">
                  {image.category}
                </span>
                <h3 className="font-serif text-lg mt-1">{image.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filtered.map((img) => img.src)}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1))
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev === filtered.length - 1 ? 0 : prev + 1))
        }
      />
    </section>
  );
}
