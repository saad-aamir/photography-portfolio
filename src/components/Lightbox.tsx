"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl z-10 transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Prev button */}
          <button
            className="absolute left-4 md:left-8 text-white/40 hover:text-white text-5xl z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous"
          >
            &#8249;
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 md:right-8 text-white/40 hover:text-white text-5xl z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next"
          >
            &#8250;
          </button>

          {/* Image */}
          <motion.div
            key={currentIndex}
            className="relative max-w-[90vw] max-h-[85vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`Photo ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[85vh] w-auto"
              priority
            />
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40 tracking-widest">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
