import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faArrowRight,
  faBolt,
  faTruck,
  faAward,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

// ── Typewriter ─────────────────────────────────────────────────────────────────
const TW_WORDS = ["Strength", "Excellence", "Bangladesh", "Every Project"];

const useCycleTypewriter = (startDelay = 2800) => {
  const [enabled, setEnabled] = useState(false);
  const [wordIdx, setWordIdx]  = useState(0);
  const [dispLen, setDispLen]  = useState(TW_WORDS[0].length);
  const [phase,   setPhase]    = useState("idle");

  useEffect(() => {
    const t = setTimeout(() => { setEnabled(true); setPhase("hold"); }, startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!enabled || phase === "idle") return;
    let t;
    if (phase === "hold") {
      t = setTimeout(() => setPhase("erase"), 2800);
    } else if (phase === "erase") {
      if (dispLen > 0) {
        t = setTimeout(() => setDispLen((n) => n - 1), 46);
      } else {
        setWordIdx((i) => (i + 1) % TW_WORDS.length);
        setDispLen(0);
        setPhase("type");
      }
    } else if (phase === "type") {
      if (dispLen < TW_WORDS[wordIdx].length) {
        t = setTimeout(() => setDispLen((n) => n + 1), 68);
      } else {
        setPhase("hold");
      }
    }
    return () => clearTimeout(t);
  }, [enabled, phase, dispLen, wordIdx]);

  return {
    displayText: TW_WORDS[wordIdx].slice(0, dispLen),
    showCursor:  phase !== "idle",
  };
};

// ── Star field — generated once (no re-renders) ────────────────────────────────
const useStarField = () =>
  useMemo(() => {
    const pts = [];
    for (let i = 0; i < 80; i++) {
      const x  = (Math.random() * 100).toFixed(2);
      const y  = (Math.random() * 100).toFixed(2);
      const r  = Math.random() > 0.88 ? 1.5 : Math.random() > 0.55 ? 1 : 0.5;
      const op = (0.15 + Math.random() * 0.6).toFixed(2);
      pts.push(`<circle cx="${x}%" cy="${y}%" r="${r}" fill="white" opacity="${op}"/>`);
    }
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>${pts.join("")}</svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

// ── Static data ────────────────────────────────────────────────────────────────
const TICKER_FALLBACK = [
  "Fine Sand · ৳65/CFT",
  "Stone Chips 5–10mm · ৳85/CFT",
  "Boulder · ৳120/CFT",
  "Coarse Sand · ৳55/CFT",
  "Medium Sand · ৳60/CFT",
  "Stone Chips 10–20mm · ৳95/CFT",
];

const TRUST = ["500+ Projects", "Chattogram Based", "On-Time Delivery"];

const STAT_CHIPS = [
  { icon: faTruck, label: "Fast Delivery", val: "Across BD",    color: "#60a5fa" },
  { icon: faAward, label: "100% Graded",   val: "Every Batch",  color: "#34d399" },
];

const getFirstImage = (b) => {
  if (!b) return null;
  return Array.isArray(b.imageUrl) ? b.imageUrl[0] || null : b.imageUrl || null;
};

// ──────────────────────────────────────────────────────────────────────────────
export const HeroSection = () => {
  const navigate = useNavigate();
  const { banners = [], priceList = [] } = useOutletContext() || {};

  const [bannerIdx, setBannerIdx] = useState(0);
  const { displayText, showCursor } = useCycleTypewriter(2800);
  const starField = useStarField();

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
  const orbitRingRef  = useRef(null);
  const statsRowRef   = useRef(null);

  // Banner auto-rotate
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
      gsap.set(rightPanelRef.current, { x: 60, opacity: 0 });
      gsap.set(statsRowRef.current,   { y: 20, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(badgeRef.current,      { y: 0, opacity: 1, duration: 0.65 }, 0.15);
      tl.to(line1Ref.current,      { y: "0%", duration: 0.9 },           0.35);
      tl.to(line2Ref.current,      { y: "0%", duration: 0.9 },           0.5);
      tl.to(subtitleRef.current,   { y: 0, opacity: 1, duration: 0.7 },  0.75);
      tl.to(ctaRef.current,        { y: 0, opacity: 1, duration: 0.65 }, 0.9);
      tl.to(trustRef.current,      { y: 0, opacity: 1, duration: 0.6 },  1.05);
      tl.to(rightPanelRef.current, { x: 0, opacity: 1, duration: 1.1, ease: "power2.out" }, 0.4);
      tl.to(statsRowRef.current,   { y: 0, opacity: 1, duration: 0.7 }, 1.2);

      if (orbitRingRef.current) {
        gsap.to(orbitRingRef.current, {
          scale: 1.05, opacity: 0.5,
          duration: 3, ease: "sine.inOut",
          yoyo: true, repeat: -1,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const currentBanner = banners[bannerIdx];
  const bannerImg     = getFirstImage(currentBanner);

  const tickerItems = priceList.length
    ? priceList.map((p) => `${p.name} · ৳${p.price}/${p.unit || "CFT"}`)
    : TICKER_FALLBACK;

  const priceRows = priceList.length ? priceList : [
    { _id: "1", name: "Fine Sand",   size: "0.063–1mm",  price: 65,  imageUrl: "" },
    { _id: "2", name: "Medium Sand", size: "1mm–2mm",    price: 60,  imageUrl: "" },
    { _id: "3", name: "Coarse Sand", size: "2mm–4.75mm", price: 55,  imageUrl: "" },
    { _id: "4", name: "Stone Chips", size: "5mm–10mm",   price: 85,  imageUrl: "" },
    { _id: "5", name: "Stone Chips", size: "10mm–20mm",  price: 95,  imageUrl: "" },
    { _id: "6", name: "Boulder",     size: "20mm+",      price: 120, imageUrl: "" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: "linear-gradient(160deg, #000d24 0%, #000818 55%, #000d20 100%)" }}
    >
      {/* ── AMBIENT LIGHT ORBS (CSS only, no JS) ────────────────────────── */}

      {/* Orb 1 — primary blue/navy, top-right */}
      <div aria-hidden className="pointer-events-none absolute hero-orb-1"
        style={{
          top: "-20%", right: "-10%",
          width: "65%", height: "80%",
          background: "radial-gradient(ellipse, rgba(27,58,138,0.75) 0%, rgba(15,34,80,0.32) 52%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
      {/* Orb 2 — gold accent, bottom-left */}
      <div aria-hidden className="pointer-events-none absolute hero-orb-2"
        style={{
          bottom: "-15%", left: "-8%",
          width: "48%", height: "58%",
          background: "radial-gradient(ellipse, rgba(196,155,43,0.38) 0%, rgba(196,155,43,0.1) 52%, transparent 75%)",
          filter: "blur(55px)",
        }}
      />
      {/* Orb 3 — deep purple, center-left for depth */}
      <div aria-hidden className="pointer-events-none absolute hero-orb-3"
        style={{
          top: "10%", left: "2%",
          width: "50%", height: "65%",
          background: "radial-gradient(ellipse, rgba(90,30,200,0.28) 0%, transparent 68%)",
          filter: "blur(55px)",
        }}
      />
      {/* Orb 4 — teal highlight, mid-right */}
      <div aria-hidden className="pointer-events-none absolute hero-orb-4"
        style={{
          top: "35%", right: "18%",
          width: "32%", height: "38%",
          background: "radial-gradient(ellipse, rgba(0,180,240,0.12) 0%, transparent 68%)",
          filter: "blur(48px)",
        }}
      />

      {/* Star field */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: starField, backgroundSize: "cover" }}
      />

      {/* Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72'%3E%3Cpath d='M 72 0 L 0 0 0 72' fill='none' stroke='%231B3A8A' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Noise grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", opacity: 0.4,
        }}
      />

      {/* Gold left accent */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[3px]"
        style={{ background: "linear-gradient(to bottom, transparent, #C49B2B 35%, #C49B2B 65%, transparent)", opacity: 0.5 }}
      />

      {/* Horizon glow */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: 130, background: "linear-gradient(to top, rgba(27,58,138,0.16) 0%, transparent 100%)" }}
      />

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <div className="container mx-auto flex flex-1 items-center px-4 py-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT */}
          <div className="order-2 lg:order-1 max-w-2xl">

            {/* Badge */}
            <div ref={badgeRef} style={{ opacity: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#C49B2B]/30 bg-[#C49B2B]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C49B2B] backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C49B2B] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C49B2B]" />
              </span>
              <FontAwesomeIcon icon={faBolt} className="text-[10px]" />
              Inqilab Trading Corporation
            </div>

            {/* Line 1 */}
            <div ref={line1WrapRef} className="mt-5 overflow-hidden">
              <h1 ref={line1Ref}
                className="block font-black leading-[1.0] tracking-[-0.025em] text-white"
                style={{ fontSize: "clamp(46px, 7.5vw, 92px)", willChange: "transform" }}
              >
                Build with
              </h1>
            </div>

            {/* Line 2 — typewriter */}
            <div ref={line2WrapRef} className="overflow-hidden">
              <h1 ref={line2Ref}
                className="block font-black leading-[1.0] tracking-[-0.025em]"
                style={{
                  fontSize: "clamp(46px, 7.5vw, 92px)",
                  willChange: "transform",
                  background: "linear-gradient(90deg, #C49B2B 0%, #f0d060 45%, #C49B2B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {displayText}
                {showCursor && (
                  <span className="tw-cursor"
                    style={{ WebkitTextFillColor: "rgba(196,155,43,0.8)", color: "rgba(196,155,43,0.8)" }}
                  >|</span>
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <p ref={subtitleRef} style={{ opacity: 0 }}
              className="mt-6 max-w-lg text-[15px] leading-7 text-white/60 sm:text-base sm:leading-8"
            >
              Premium sand and stone aggregates sourced and supplied across Chattogram, Bangladesh.
              Fine sands to boulder — every grade, every project, delivered on time.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} style={{ opacity: 0 }} className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => navigate("/all-products")}
                className="hero-cta-primary group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-7 py-4 text-sm font-bold text-white sm:text-base"
                style={{ background: "linear-gradient(135deg, #1B3A8A 0%, #2a50b8 100%)" }}
              >
                <span className="relative z-10">View Products</span>
                <FontAwesomeIcon icon={faArrowRight} className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
              <button type="button" onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 px-7 py-[14px] text-sm font-bold text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-[#C49B2B] hover:text-[#C49B2B] sm:text-base"
              >
                <FontAwesomeIcon icon={faPhone} className="text-xs" />
                Get Quote
              </button>
            </div>

            {/* Trust */}
            <div ref={trustRef} style={{ opacity: 0 }} className="mt-9 flex flex-wrap items-center gap-5">
              {TRUST.map((b) => (
                <span key={b} className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/55">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#C49B2B]" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-1 flex flex-col items-center lg:order-2 lg:items-end">
            <div ref={rightPanelRef} style={{ opacity: 0 }} className="relative">

              {/* Glow ring */}
              <div ref={orbitRingRef} aria-hidden
                className="pointer-events-none absolute rounded-3xl"
                style={{
                  inset: "-14px",
                  border: "1px solid rgba(196,155,43,0.18)",
                  boxShadow: "0 0 48px rgba(27,58,138,0.4), 0 0 90px rgba(27,58,138,0.18)",
                  opacity: 0.4,
                }}
              />

              {/* Corner sparks */}
              {["-top-1.5 -left-1.5", "-top-1.5 -right-1.5", "-bottom-1.5 -right-1.5"].map((pos) => (
                <div key={pos} aria-hidden
                  className={`absolute ${pos} h-2.5 w-2.5 rounded-full`}
                  style={{ background: "#C49B2B", boxShadow: "0 0 8px #C49B2B, 0 0 20px rgba(196,155,43,0.5)" }}
                />
              ))}

              {/* Panel */}
              <div className="relative overflow-hidden rounded-3xl"
                style={{
                  width: "min(380px, 90vw)",
                  height: "min(460px, 68vw)",
                  background: "linear-gradient(150deg, rgba(8,18,48,0.97) 0%, rgba(4,10,30,0.98) 100%)",
                  border: "1.5px solid rgba(196,155,43,0.28)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(196,155,43,0.09)",
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* Scan line */}
                <div aria-hidden className="hero-scan-line pointer-events-none absolute inset-x-0 h-[1px] z-20" />

                {bannerImg ? (
                  <>
                    <img key={bannerIdx} src={bannerImg}
                      alt={currentBanner?.title || "Product banner"}
                      className="h-full w-full object-cover"
                      style={{ animation: "bannerFadeIn 0.8s ease forwards" }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,5,22,0.96) 0%, rgba(0,5,22,0.55) 42%, rgba(0,5,22,0.18) 75%, transparent 100%)" }} />
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(0,5,22,0.5) 100%)" }} />
                    {currentBanner?.title && (
                      <div className="absolute bottom-0 inset-x-0 p-6">
                        <p className="text-xl font-black text-white"
                          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.95), 0 0 32px rgba(0,0,0,0.7)" }}
                        >
                          {currentBanner.title}
                        </p>
                      </div>
                    )}
                    {banners.length > 1 && (
                      <div className="absolute bottom-4 right-5 flex gap-1.5 z-10">
                        {banners.map((_, i) => (
                          <button key={i} onClick={() => setBannerIdx(i)}
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{ width: i === bannerIdx ? 20 : 6, background: i === bannerIdx ? "#C49B2B" : "rgba(255,255,255,0.28)" }}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* Price List */
                  <div className="flex h-full flex-col p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-black text-white tracking-wide">Today's Price List</p>
                      <button type="button" onClick={() => navigate("/all-products")}
                        className="rounded-lg border px-3 py-1 text-[11px] font-bold"
                        style={{ borderColor: "rgba(196,155,43,0.45)", color: "#C49B2B" }}
                      >
                        View All
                      </button>
                    </div>
                    <div className="grid pb-2 text-[9px] font-bold uppercase tracking-widest text-white/28 border-b"
                      style={{ gridTemplateColumns: "1fr 68px 70px", borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <span>Product</span><span>Size</span><span className="text-right">৳/CFT</span>
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                      {priceRows.map((item) => (
                        <div key={item._id} className="grid items-center py-2.5 border-b"
                          style={{ gridTemplateColumns: "1fr 68px 70px", borderColor: "rgba(255,255,255,0.05)" }}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt={item.name} className="h-8 w-8 shrink-0 rounded-full object-cover" loading="lazy" />
                            ) : (
                              <div className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold"
                                style={{ background: "rgba(196,155,43,0.14)", color: "#C49B2B" }}
                              >
                                {item.name.charAt(0)}
                              </div>
                            )}
                            <span className="truncate text-[11px] font-semibold text-white">{item.name}</span>
                          </div>
                          <span className="text-[10px] text-white/42">{item.size}</span>
                          <span className="text-right text-[12px] font-black" style={{ color: "#C49B2B" }}>
                            ৳{item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stat chips — below panel */}
              <div ref={statsRowRef} style={{ opacity: 0 }}
                className="mt-3 flex items-center justify-center gap-2 flex-wrap"
              >
                {STAT_CHIPS.map((chip) => (
                  <div key={chip.label} className="flex items-center gap-2 rounded-xl px-3 py-2"
                    style={{
                      background: "rgba(5,12,30,0.88)",
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${chip.color}25`,
                    }}
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs"
                      style={{ background: `${chip.color}18`, color: chip.color }}
                    >
                      <FontAwesomeIcon icon={chip.icon} />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold text-white leading-none">{chip.label}</p>
                      <p className="text-[10px] font-semibold leading-none mt-0.5" style={{ color: chip.color }}>{chip.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden className="absolute bottom-[128px] left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 hero-scroll-ind hidden lg:flex">
        <span className="text-[9px] font-bold uppercase tracking-[0.38em] text-white/22">Scroll</span>
        <div className="h-9 w-px bg-gradient-to-b from-white/25 to-transparent" />
        <div className="h-1.5 w-1.5 rounded-full bg-white/22 animate-bounce" />
      </div>

      {/* ── TICKER ──────────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden border-t"
        style={{ borderColor: "rgba(196,155,43,0.14)", background: "rgba(0,4,18,0.72)", backdropFilter: "blur(8px)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
          style={{ background: "linear-gradient(to right, #000d24, transparent)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
          style={{ background: "linear-gradient(to left, #000d24, transparent)" }}
        />

        {/* Row 1 — forward */}
        <div className="ticker-track flex items-center whitespace-nowrap py-2.5">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-5 text-[12px] font-bold uppercase tracking-[0.2em] text-white/42">
              <span className="inline-block h-1 w-1 rounded-full flex-shrink-0" style={{ background: "#C49B2B" }} />
              {item}
            </span>
          ))}
        </div>

        {/* Row 2 — reverse, slower */}
        <div className="ticker-track-rev flex items-center whitespace-nowrap border-t py-2.5"
          style={{ borderColor: "rgba(196,155,43,0.07)" }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].reverse().map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-5 text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "rgba(196,155,43,0.26)" }}
            >
              <span className="inline-block h-1 w-1 rounded-full flex-shrink-0 opacity-50" style={{ background: "#C49B2B" }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── STYLES ──────────────────────────────────────────────────────── */}
      <style>{`
        /* Orb float animations — transform only, GPU composited */
        .hero-orb-1 { animation: orbF1 14s ease-in-out infinite; }
        .hero-orb-2 { animation: orbF2 18s ease-in-out infinite; }
        .hero-orb-3 { animation: orbF3 12s ease-in-out infinite; }
        .hero-orb-4 { animation: orbF4  9s ease-in-out infinite; }
        @keyframes orbF1 { 0%,100%{transform:translate(0,0)  scale(1);}    50%{transform:translate(-2%,4%) scale(1.07);} }
        @keyframes orbF2 { 0%,100%{transform:translate(0,0)  scale(1);}    50%{transform:translate(3%,-3%) scale(1.1);} }
        @keyframes orbF3 { 0%,100%{transform:translate(0,0)  scale(1);}    50%{transform:translate(-1%,5%) scale(0.94);} }
        @keyframes orbF4 { 0%,100%{transform:translate(0,0)  scale(1);}    50%{transform:translate(4%,2%) scale(1.08);} }

        /* Ticker */
        .ticker-track     { animation: tickerFwd 28s linear infinite; will-change: transform; }
        .ticker-track-rev { animation: tickerRev 38s linear infinite; will-change: transform; }
        @keyframes tickerFwd { 0%{transform:translateX(0);}        100%{transform:translateX(-33.333%);} }
        @keyframes tickerRev { 0%{transform:translateX(-33.333%);} 100%{transform:translateX(0);} }
        .ticker-track:hover,.ticker-track-rev:hover { animation-play-state:paused; }

        /* Panel scan line */
        .hero-scan-line {
          background: linear-gradient(to right,transparent 0%,rgba(196,155,43,0.3) 50%,transparent 100%);
          top: 0;
          animation: scanDown 4.5s ease-in-out infinite;
        }
        @keyframes scanDown { 0%,100%{top:0;opacity:0;} 8%{opacity:1;} 92%{opacity:0.5;} 98%{opacity:0;top:100%;} }

        /* Typewriter cursor */
        .tw-cursor { animation: twBlink .9s step-start infinite; display:inline-block; margin-left:2px; font-weight:300; }
        @keyframes twBlink { 0%,100%{opacity:1;} 50%{opacity:0;} }

        /* CTA */
        .hero-cta-primary { box-shadow:0 4px 24px rgba(27,58,138,0.5); transition:filter .25s,transform .2s,box-shadow .25s; }
        .hero-cta-primary:hover { filter:brightness(1.12); transform:translateY(-1px); box-shadow:0 8px 32px rgba(27,58,138,.7); }

        /* Banner */
        @keyframes bannerFadeIn { from{opacity:0;transform:scale(1.04);} to{opacity:1;transform:scale(1);} }

        /* Reduce motion */
        @media (prefers-reduced-motion:reduce) {
          .hero-orb-1,.hero-orb-2,.hero-orb-3,.hero-orb-4,
          .ticker-track,.ticker-track-rev,.tw-cursor,.hero-scan-line { animation:none; }
          .hero-cta-primary { transition:none; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
