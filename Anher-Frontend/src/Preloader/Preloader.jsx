import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";

/**
 * 'Ignite & Shield' opening sequence — four distinct phases:
 *  1. Logo fades in at center — the architectural anchor that never blinks out.
 *  2. Red SVG stroke traces the logo border (precision fire-shielding metaphor).
 *  3. Logo snaps to 1.1× with industrial elastic, radial ring pulses outward.
 *  4. Screen splits horizontally — two dark panels slide left/right revealing the hero.
 */
export const Preloader = () => {
  const logo    = useSelector((state) => state.hvac.logo);
  const [gone, setGone] = useState(false);

  const rootRef        = useRef(null);
  const leftRef        = useRef(null);
  const rightRef       = useRef(null);
  const logoStageRef   = useRef(null);
  const logoImgRef     = useRef(null);
  const strokeRef      = useRef(null);
  const ringRef        = useRef(null);
  const brandRef       = useRef(null);
  const progFillRef    = useRef(null);
  const progTrackRef   = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      // ── Lock initial states (prevents FOUC / layout shift) ─────────────────
      gsap.set(logoImgRef.current, { scale: 0, opacity: 0 });
      gsap.set(strokeRef.current,  { strokeDashoffset: 1 });
      gsap.set(ringRef.current,    { scale: 1, opacity: 0 });
      gsap.set(brandRef.current,   { y: 14, opacity: 0 });
      gsap.set(progFillRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline();

      // ── Phase 1: The Vault — logo materialises ───────────────────────────
      tl.to(logoImgRef.current, {
        scale: 1, opacity: 1,
        duration: 0.6,
        ease: "back.out(2.2)",
      }, 0.2);

      // Progress bar (runs throughout entire sequence)
      tl.to(progFillRef.current, {
        scaleX: 1,
        duration: 2.0,
        ease: "power2.inOut",
      }, 0.2);

      // ── Phase 2: Precision Stroke — SVG border draws clockwise ──────────
      tl.to(strokeRef.current, {
        strokeDashoffset: 0,
        duration: 0.88,
        ease: "power2.inOut",
      }, 0.75);

      // Brand wordmark fades in while stroke is drawing
      tl.to(brandRef.current, {
        y: 0, opacity: 1,
        duration: 0.55,
        ease: "power3.out",
      }, 0.95);

      // ── Phase 3: Elastic Expansion + radial ring ─────────────────────────
      // Scale up with industrial inertia
      tl.to(logoImgRef.current, {
        scale: 1.12,
        duration: 0.22,
        ease: "power3.in",
      }, 1.72);

      // Elastic snap back — like a steel door locking into position
      tl.to(logoImgRef.current, {
        scale: 1.0,
        duration: 0.5,
        ease: "elastic.out(1.15, 0.55)",
      }, 1.94);

      // Ring pulse out from logo border
      tl.fromTo(
        ringRef.current,
        { scale: 1, opacity: 0.72 },
        { scale: 2.4, opacity: 0, duration: 0.85, ease: "power2.out" },
        1.74
      );

      // ── Phase 4: Fluid Screen Split — panels slide left / right ──────────
      // Brand fades out first so it doesn't hover mid-air during split
      tl.to(brandRef.current, {
        y: -10, opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      }, 2.35);

      // Progress track fades out
      tl.to(progTrackRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      }, 2.4);

      // Both panels slide simultaneously
      tl.to(leftRef.current, {
        x: "-100%",
        duration: 0.9,
        ease: "power3.inOut",
      }, 2.58);
      tl.to(rightRef.current, {
        x: "100%",
        duration: 0.9,
        ease: "power3.inOut",
      }, 2.58);

      // Logo fades out mid-split so hero typography takes focus
      tl.to(logoImgRef.current, {
        scale: 0.88, opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      }, 2.68);

      // Unmount after split completes
      tl.call(() => {
        setGone(true);
        document.body.style.overflow = prevOverflow || "";
      }, [], 3.54);
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevOverflow || "";
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className="pl-root" role="status" aria-label="Loading SafetyPlus">

      {/* ── Split panels ── */}
      <div ref={leftRef}  className="pl-panel pl-panel--l" />
      <div ref={rightRef} className="pl-panel pl-panel--r" />

      {/* ── Centre stage (above panels — never obscured) ── */}
      <div ref={logoStageRef} className="pl-stage">

        {/* Logo wrap — SVG stroke + ring overlay */}
        <div className="pl-logo-wrap">
          {/* Radial ring pulse */}
          <div ref={ringRef} className="pl-ring" aria-hidden="true" />

          {/* Precision stroke SVG — traces the logo border */}
          <svg
            className="pl-stroke-svg"
            viewBox="0 0 96 96"
            aria-hidden="true"
          >
            <rect
              ref={strokeRef}
              pathLength="1"
              strokeDasharray="1"
              x="4" y="4"
              width="88" height="88"
              rx="14"
              fill="none"
              stroke="#D32F2F"
              strokeWidth="2"
            />
            {/* Glow copy */}
            <rect
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
              x="4" y="4"
              width="88" height="88"
              rx="14"
              fill="none"
              stroke="#D32F2F"
              strokeWidth="4"
              opacity="0.25"
              style={{ filter: "blur(3px)" }}
            />
          </svg>

          {/* Logo image — the architectural anchor */}
          <img
            ref={logoImgRef}
            src={logo || "/Icon.png"}
            alt="SafetyPlus"
            className="pl-logo-img"
            decoding="async"
            fetchPriority="high"
            onError={(e) => { e.currentTarget.src = "/Icon.png"; }}
          />
        </div>

        {/* Brand wordmark */}
        <div ref={brandRef} className="pl-brand" style={{ opacity: 0 }}>
          <p className="pl-name">
            Safety<span className="pl-red">Plus</span>
          </p>
          <p className="pl-tag">Industrial Fire Safety · Bangladesh</p>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div ref={progTrackRef} className="pl-prog-track">
        <div ref={progFillRef} className="pl-prog-fill" />
      </div>

      <style>{`
        /* ── Root ── */
        .pl-root {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
        }

        /* ── Split panels ── */
        .pl-panel {
          position: absolute;
          top: 0;
          height: 100%;
          width: 50%;
          background: #0A0C0F;
          will-change: transform;
        }
        .pl-panel--l {
          left: 0;
          background:
            linear-gradient(105deg, rgba(211,47,47,.04) 0%, transparent 60%),
            #0A0C0F;
        }
        .pl-panel--r {
          right: 0;
          background:
            linear-gradient(255deg, rgba(211,47,47,.04) 0%, transparent 60%),
            #0A0C0F;
        }
        /* Blueprint grid on each panel */
        .pl-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(211,47,47,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(211,47,47,.055) 1px, transparent 1px);
          background-size: 54px 54px;
          pointer-events: none;
        }

        /* ── Centre stage ── */
        .pl-stage {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 22px;
          pointer-events: none;
        }

        /* ── Logo wrap ── */
        .pl-logo-wrap {
          position: relative;
          width: 88px;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pl-logo-img {
          width: 80px;
          height: 80px;
          object-fit: contain;
          background: #ffffff;
          border-radius: 14px;
          padding: 10px;
          position: relative;
          z-index: 3;
          will-change: transform, opacity;
          box-shadow: 0 0 0 1px rgba(255,255,255,.06), 0 20px 48px -18px rgba(211,47,47,.55);
        }

        /* Stroke SVG — sits just outside logo */
        .pl-stroke-svg {
          position: absolute;
          inset: -4px;
          width: 96px;
          height: 96px;
          z-index: 4;
          will-change: stroke-dashoffset;
        }
        .pl-stroke-svg rect { filter: drop-shadow(0 0 5px rgba(211,47,47,.7)); }

        /* Ring — expands outward from logo border */
        .pl-ring {
          position: absolute;
          inset: -4px;
          border-radius: 16px;
          border: 1.5px solid #D32F2F;
          z-index: 2;
          will-change: transform, opacity;
        }

        /* ── Brand ── */
        .pl-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          will-change: transform, opacity;
        }
        .pl-name {
          margin: 0;
          font: 900 clamp(28px,5.5vw,46px)/1 "Sora", system-ui, sans-serif;
          color: #fff;
          letter-spacing: .025em;
        }
        .pl-red {
          color: #D32F2F;
          text-shadow: 0 0 18px rgba(211,47,47,.55);
        }
        .pl-tag {
          margin: 0;
          font: 700 clamp(9px,1.6vw,11px)/1 "Sora", system-ui, monospace;
          letter-spacing: .45em;
          text-transform: uppercase;
          color: rgba(255,255,255,.33);
        }

        /* ── Progress track ── */
        .pl-prog-track {
          position: absolute;
          bottom: 44px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: min(200px, 38vw);
          height: 2px;
          background: rgba(255,255,255,.08);
          border-radius: 999px;
          overflow: hidden;
        }
        .pl-prog-fill {
          height: 100%;
          background: linear-gradient(90deg, #7f1d1d, #D32F2F 65%, #f87171);
          border-radius: 999px;
          box-shadow: 0 0 10px rgba(211,47,47,.8);
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .pl-panel { transition: none; }
          .pl-ring   { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
