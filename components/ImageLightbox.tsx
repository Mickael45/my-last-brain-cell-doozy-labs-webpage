"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  alt: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const SWIPE_THRESHOLD = 50; // minimum px to count as a swipe

export default function ImageLightbox({
  images,
  currentIndex,
  alt,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const [loaded, setLoaded] = useState<Set<number>>(new Set([currentIndex]));
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [swiping, setSwiping] = useState(false);

  // --- Navigation helpers (wrap around) ---
  const goTo = useCallback(
    (index: number) => {
      const next =
        ((index % images.length) + images.length) % images.length;
      onNavigate(next);
    },
    [images.length, onNavigate],
  );

  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  // --- Keyboard ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, goPrev, goNext]);

  // --- Lock body scroll ---
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // --- Preload adjacent images ---
  useEffect(() => {
    const toPreload = [
      (currentIndex - 1 + images.length) % images.length,
      (currentIndex + 1) % images.length,
    ];
    toPreload.forEach((i) => {
      if (!loaded.has(i)) {
        const img = new window.Image();
        img.src = images[i];
        img.onload = () => setLoaded((prev) => new Set(prev).add(i));
      }
    });
  }, [currentIndex, images, loaded]);

  // --- Touch / swipe handling (GPU-only transforms) ---
  const onTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setSwiping(true);
  };

  const onTouchMove = (e: ReactTouchEvent) => {
    if (!swiping) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    touchDeltaX.current = delta;
    // Apply GPU-only translate for buttery drag feedback
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = `translate3d(${delta}px, 0, 0)`;
    }
  };

  const onTouchEnd = () => {
    if (!swiping) return;
    setSwiping(false);
    const delta = touchDeltaX.current;

    // Snap back or navigate
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transition = "transform 0.2s cubic-bezier(.4,0,.2,1)";
      imageContainerRef.current.style.transform = "translate3d(0, 0, 0)";
      // Clean up the inline transition after it completes
      const el = imageContainerRef.current;
      const cleanup = () => {
        el.style.transition = "";
        el.removeEventListener("transitionend", cleanup);
      };
      el.addEventListener("transitionend", cleanup);
    }

    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) goPrev();
      else goNext();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
      style={{ willChange: "opacity" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} image gallery`}
    >
      {/* Close button — 48px touch target */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-3 right-3 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 active:bg-white/25 text-white transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-sm font-mono text-gray-400 select-none pointer-events-none">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Previous button — 48px touch target, hidden on single image */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 sm:left-4 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 active:bg-white/25 text-white transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Image area — swipeable on touch */}
      <div
        ref={imageContainerRef}
        className="relative flex items-center justify-center w-full h-full px-14 sm:px-20 py-16"
        style={{ willChange: swiping ? "transform" : "auto" }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[currentIndex]}
          alt={`${alt} screenshot ${currentIndex + 1}`}
          className="max-w-full max-h-full w-auto h-auto rounded-lg object-contain select-none"
          draggable={false}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Next button — 48px touch target */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-2 sm:right-4 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 active:bg-white/25 text-white transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Next image"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}
    </div>
  );
}
