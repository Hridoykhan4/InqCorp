import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faArrowRight,
  faBolt,
  faMountain,
  faTruck,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

// ── Static ticker fallback ────────────────────────────────────────────────────
const TICKER_FALLBACK = [
  "Fine Sand · ৳65/CFT",
  "Stone Chips 5–10mm · ৳85/CFT",
  "Boulder · ৳120/CFT",
  "Coarse Sand · ৳55/CFT",
  "Medium Sand · ৳60/CFT",
  "Stone Chips 10–20mm · ৳95/CFT",
];

const TRUST = ["500+ Projects", "Chattogram Based", "On-Time Delivery"];

const FLOAT_CARDS = [
  { icon: faMountain, label: "Fine Sand", sub: "৳65 / CFT", color: "#C49B2B" },
  { icon: faTruck, label: "Fast Delivery", sub: "Across BD", color: "#1B3A8A" },
  { icon: faAward, label: "Quality Assured", sub: "100% Graded", color: "#C49B2B" },
];

const getFirstImage = (banner) => {
  if (!banner) return null;
  if (Array.isArray(banner.imageUrl)) return banner.imageUrl[0] || null;
  return banner.imageUrl || null;
};

export const HeroSection = () => {
  const navigate = useNavigate();
  const { banners = [], priceList = [] } = useOutletContext() || {};
  const logo = useSelector((s) => s.hvac.logo);

  const [bannerIdx, setBannerIdx] = useState(0);

  const sectionRef    = useRef(null);
  const badgeRef      = useRef(null);
  const line1WrapRef  = useRef(null);
  const line1Ref      = useRef(null);
  const line2WrapRef  = useRef(null);
  const line2Ref      = useRef(null);
  const subtitleRef   = useRef(null);
  const ctaRef        = useRef(null);
  const trustRef      = useRef(null);
  const rightPanelRef = useRef(null);
  const floatRef      = useRef(null);

  // Auto-rotate server banners
  useEffect(() => {
    if (banners.length < 2) return;
    const id = setInterval(() => setBannerIdx((i) => (i + 1) % banners.length), 4500);
    return () => clearInterval(id);
  }, [banners.length]);

  // GSAP entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set([line1Ref.current, line2Ref.current], { y: "115%" });
      gsap.set(
        [badgeRef.current, subtitleRef.current, ctaRef.current, trustRef.current],
        { y: 28, opacity: 0 }
      );
      gsap.set(rightPanelRef.current, { x: 80, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(badgeRef.current,      { y: 0, opacity: 1, duration: 0.65 }, 0.1);
      tl.to(line1Ref.current,      { y: "0%", duration: 0.9 },           0.3);
      tl.to(line2Ref.current,      { y: "0%", duration: 0.9 },           0.45);
      tl.to(subtitleRef.current,   { y: 0, opacity: 1, duration: 0.7 },  0.7);
      tl.to(ctaRef.current,        { y: 0, opacity: 1, duration: 0.65 }, 0.85);
      tl.to(trustRef.current,      { y: 0, opacity: 1, duration: 0.6 },  1.0);
      tl.to(rightPanelRef.current, { x: 0, opacity: 1, duration: 1.1, ease: "power2.out" }, 0.3);

      if (floatRef.current) {
        gsap.fromTo(
          floatRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out", delay: 1.2 }
        );
        gsap.to(floatRef.current.children, {
          y: -8, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const currentBanner = banners[bannerIdx];
  const bannerImg = getFirstImage(currentBanner);

  const tickerItems = priceList.length
    ? priceList.map((p) => `${p.name} · ৳${p.price}/${p.unit || "CFT"}`)
    : TICKER_FALLBACK;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050d1f 0%, #0d1f4a 60%, #0a1633 100%)" }}
    >
      {/* Noise grain */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", opacity: 0.5 }} />
      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M 64 0 L 0 0 0 64' fill='none' stroke='%23ffffff' stroke-width='0.4' stroke-opacity='0.04'/%3E%3C/svg%3E")`, backgroundSize: "64px 64px" }} />
      {/* Gold left bar */}
      <div className="absolute inset-y-0 left-0 w-[3px]" style={{ background: "linear-gradient(to bottom, transparent, #C49B2B 40%, #C49B2B 60%, transparent)", opacity: 0.6 }} />
      {/* Radial glows */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(196,155,43,0.07) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 80% 45%, rgba(27,58,138,0.3) 0%, transparent 65%)" }} />

      {/* Main content */}
      <div className="container mx-auto flex flex-1 items-center px-4 py-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT: Copy */}
          <div className="order-2 lg:order-1 max-w-2xl">
            <div ref={badgeRef} style={{ opacity: 0 }} className="inline-flex items-center gap-2 rounded-full border border-[#C49B2B]/30 bg-[#C49B2B]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C49B2B]">
              <FontAwesomeIcon icon={faBolt} className="text-[10px]" />
              Inqilab Trading Corporation
            </div>

            <div ref={line1WrapRef} className="mt-5 overflow-hidden">
              <h1 ref={line1Ref} className="block text-[clamp(44px,7vw,88px)] font-black leading-[1.0] tracking-[-0.02em] text-white" style={{ willChange: "transform" }}>
                Build with
              </h1>
            </div>
            <div ref={line2WrapRef} className="overflow-hidden">
              <h1 ref={line2Ref} className="block text-[clamp(44px,7vw,88px)] font-black leading-[1.0] tracking-[-0.02em]" style={{ willChange: "transform", background: "linear-gradient(90deg, #C49B2B 0%, #e8c55a 50%, #C49B2B 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Strength
              </h1>
            </div>

            <p ref={subtitleRef} style={{ opacity: 0 }} className="mt-6 max-w-lg text-[15px] leading-7 text-white/65 sm:text-base sm:leading-8">
              Premium sand and stone aggregates sourced and supplied across Chattogram, Bangladesh. Fine sands to boulder — every grade, every project, delivered on time.
            </p>

            <div ref={ctaRef} style={{ opacity: 0 }} className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => navigate("/all-products")} className="hero-cta-primary group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-7 py-4 text-sm font-bold text-white sm:text-base" style={{ background: "linear-gradient(135deg, #1B3A8A 0%, #2a50b8 100%)" }}>
                <span className="relative z-10">View Products</span>
                <FontAwesomeIcon icon={faArrowRight} className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
              <button type="button" onClick={() => navigate("/contact")} className="inline-flex items-center gap-2.5 rounded-xl border-2 border-white/20 px-7 py-[14px] text-sm font-bold text-white/80 transition-all duration-300 hover:border-[#C49B2B] hover:text-[#C49B2B] sm:text-base">
                Get Quote
              </button>
            </div>

            <div ref={trustRef} style={{ opacity: 0 }} className="mt-9 flex flex-wrap items-center gap-5">
              {TRUST.map((b) => (
                <span key={b} className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/60">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#C49B2B]" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: Dynamic Banner / Logo Panel */}
          <div className="order-1 flex flex-col items-center lg:order-2 lg:items-end">
            <div ref={rightPanelRef} style={{ opacity: 0 }} className="relative">

              {/* Main frame */}
              <div
                className="relative overflow-hidden rounded-3xl shadow-2xl"
                style={{ width: "min(380px, 90vw)", height: "min(460px, 70vw)", background: "linear-gradient(135deg, #0d1f4a, #1B3A8A)", border: "2px solid rgba(196,155,43,0.4)", boxShadow: "0 0 0 6px rgba(196,155,43,0.08), 0 30px 80px rgba(0,0,0,0.5)" }}
              >
                {bannerImg ? (
                  <>
                    <img key={bannerIdx} src={bannerImg} alt={currentBanner?.title || "Product banner"} className="h-full w-full object-cover" style={{ animation: "bannerFadeIn 0.8s ease forwards" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,13,31,0.85) 0%, transparent 50%)" }} />
                    {currentBanner?.title && (
                      <div className="absolute bottom-0 inset-x-0 p-6">
                        <p className="text-xl font-black text-white">{currentBanner.title}</p>
                      </div>
                    )}
                    {banners.length > 1 && (
                      <div className="absolute bottom-4 right-4 flex gap-1.5">
                        {banners.map((_, i) => (
                          <button key={i} onClick={() => setBannerIdx(i)} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === bannerIdx ? 20 : 6, background: i === bannerIdx ? "#C49B2B" : "rgba(255,255,255,0.35)" }} />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* No banners: Dynamic Price List Table */
                  <div className="flex h-full flex-col p-5">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-black text-white">Today's Price List</p>
                      <button
                        type="button"
                        onClick={() => navigate("/all-products")}
                        className="rounded-lg border px-3 py-1 text-[11px] font-bold transition-colors"
                        style={{ borderColor: "rgba(196,155,43,0.5)", color: "#C49B2B" }}
                      >
                        View All
                      </button>
                    </div>

                    {/* Column headers */}
                    <div
                      className="grid pb-2 text-[9px] font-bold uppercase tracking-widest text-white/35 border-b"
                      style={{ gridTemplateColumns: "1fr 70px 72px", borderColor: "rgba(255,255,255,0.1)" }}
                    >
                      <span>Product</span>
                      <span>Size</span>
                      <span className="text-right">Price (৳/CFT)</span>
                    </div>

                    {/* Rows */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                      {(priceList.length
                        ? priceList
                        : [
                            { _id: "1", name: "Fine Sand",    size: "0.063–1mm",   price: 65,  imageUrl: "" },
                            { _id: "2", name: "Medium Sand",  size: "1mm–2mm",     price: 60,  imageUrl: "" },
                            { _id: "3", name: "Coarse Sand",  size: "2mm–4.75mm",  price: 55,  imageUrl: "" },
                            { _id: "4", name: "Stone Chips",  size: "5mm–10mm",    price: 85,  imageUrl: "" },
                            { _id: "5", name: "Stone Chips",  size: "10mm–20mm",   price: 95,  imageUrl: "" },
                            { _id: "6", name: "Boulder",      size: "20mm+",       price: 120, imageUrl: "" },
                          ]
                      ).map((item) => (
                        <div
                          key={item._id}
                          className="grid items-center py-2.5 border-b"
                          style={{ gridTemplateColumns: "1fr 70px 72px", borderColor: "rgba(255,255,255,0.06)" }}
                        >
                          {/* Product col */}
                          <div className="flex items-center gap-2 min-w-0">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-8 w-8 shrink-0 rounded-full object-cover"
                              />
                            ) : (
                              <div
                                className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold"
                                style={{ background: "rgba(196,155,43,0.18)", color: "#C49B2B" }}
                              >
                                {item.name.charAt(0)}
                              </div>
                            )}
                            <span className="truncate text-[11px] font-semibold text-white">{item.name}</span>
                          </div>
                          {/* Size col */}
                          <span className="text-[10px] text-white/55">{item.size}</span>
                          {/* Price col */}
                          <span
                            className="text-right text-[12px] font-black"
                            style={{ color: "#C49B2B" }}
                          >
                            ৳ {item.price}.00
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Floating product chips */}
              <div ref={floatRef} className="pointer-events-none absolute -left-12 top-4 flex flex-col gap-3 lg:-left-16">
                {FLOAT_CARDS.map((card) => (
                  <div key={card.label} className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 shadow-xl" style={{ background: "rgba(5,13,31,0.85)", backdropFilter: "blur(12px)", border: `1px solid ${card.color}40`, opacity: 0 }}>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs" style={{ background: `${card.color}20`, color: card.color }}>
                      <FontAwesomeIcon icon={card.icon} />
                    </span>
                    <div>
                      <p className="text-[12px] font-bold text-white">{card.label}</p>
                      <p className="text-[10px] font-semibold" style={{ color: card.color }}>{card.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Corner dots */}
              <div className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full" style={{ background: "#C49B2B" }} />
              <div className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full" style={{ background: "#C49B2B" }} />
              <div className="absolute -bottom-1.5 -right-1.5 h-2 w-2 rounded-full" style={{ background: "#C49B2B", opacity: 0.5 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Ticker strip */}
      <div className="relative w-full overflow-hidden border-t py-3" style={{ borderColor: "rgba(196,155,43,0.2)", background: "rgba(196,155,43,0.06)" }}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24" style={{ background: "linear-gradient(to right, #050d1f, transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24" style={{ background: "linear-gradient(to left, #050d1f, transparent)" }} />
        <div className="ticker-track flex items-center whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/50">
              {item}
              <span className="inline-block h-1 w-1 rounded-full" style={{ background: "#C49B2B", opacity: 0.7 }} />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .ticker-track { animation: tickerScroll 28s linear infinite; will-change: transform; }
        @keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.3333%); } }
        .ticker-track:hover { animation-play-state: paused; }
        .hero-cta-primary { box-shadow: 0 4px 24px rgba(27,58,138,0.5); transition: filter 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease; }
        .hero-cta-primary:hover { filter: brightness(1.12); transform: translateY(-1px); box-shadow: 0 8px 32px rgba(27,58,138,0.7); }
        @keyframes bannerFadeIn { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) { .ticker-track, .hero-cta-primary { animation: none; transition: none; } }
      `}</style>
    </section>
  );
};

export default HeroSection;
