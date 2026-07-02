import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faChevronLeft,
  faChevronRight,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "../components/Reveal";
import { SeoManager } from "../SEO/SeoManager";

const PLACEHOLDER = [
  "https://placehold.co/800x600/1B3A8A/C49B2B?text=Upload+Photos",
  "https://placehold.co/800x600/0F2257/C49B2B?text=Gallery",
  "https://placehold.co/800x600/1B3A8A/ffffff?text=ITC",
];

export const Gallery = () => {
  const { gallery = [] } = useOutletContext() || {};
  const images = gallery.length ? gallery : [];

  const [lightbox, setLightbox] = useState(null); // index of open image

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);

  const prev = useCallback(() => {
    setLightbox((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setLightbox((i) => (i + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <SeoManager
        title="Gallery — Kawsar Anher | Inqilab Trading Corporation"
        description="Photos of our construction aggregate products — fine sand, stone chips, boulder and more from Chattogram, Bangladesh."
        path="/gallery"
      />

      {/* ── Hero banner ── */}
      <section
        className="relative flex min-h-[38vh] items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #050d1f 0%, #0d1f4a 60%, #0a1633 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M 64 0 L 0 0 0 64' fill='none' stroke='%23ffffff' stroke-width='0.4' stroke-opacity='0.04'/%3E%3C/svg%3E")`, backgroundSize: "64px 64px" }} />
        <div className="relative z-10 text-center px-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] mb-3" style={{ color: "#C49B2B" }}>
            Inqilab Trading Corporation
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Our Gallery
          </h1>
          <p className="mt-3 text-white/55 text-sm sm:text-base max-w-lg mx-auto">
            A look at our products, operations, and team at work across Chattogram, Bangladesh.
          </p>
        </div>
        <div className="absolute inset-y-0 left-0 w-[3px]" style={{ background: "linear-gradient(to bottom, transparent, #C49B2B 40%, #C49B2B 60%, transparent)", opacity: 0.6 }} />
      </section>

      {/* ── Masonry grid ── */}
      <section className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <FontAwesomeIcon icon={faImages} className="text-6xl mb-4 opacity-30" />
            <p className="text-lg font-semibold">No photos yet</p>
            <p className="text-sm mt-1">Admin can upload images from the Dashboard → Gallery section.</p>
          </div>
        ) : (
          <Reveal variant="up">
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {images.map((item, i) => (
                <div
                  key={item._id || i}
                  className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-zoom-in"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title || `Gallery photo ${i + 1}`}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    {item.title && (
                      <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && images[lightbox] && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors z-10"
          >
            <FontAwesomeIcon icon={faXmark} className="text-lg" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          {/* Image */}
          <img
            src={images[lightbox].imageUrl}
            alt={images[lightbox].title || "Gallery"}
            className="max-h-[88vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}

          {/* Counter + title */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            {images[lightbox].title && (
              <p className="text-white text-sm font-semibold mb-1">{images[lightbox].title}</p>
            )}
            <p className="text-white/50 text-xs">{lightbox + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
};
