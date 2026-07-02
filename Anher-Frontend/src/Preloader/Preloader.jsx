import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";

const ATOM_COUNT = 10;

// Spread atoms evenly around a circle, two slightly off-axis for variety
const atomAngle = (i) => (i / ATOM_COUNT) * Math.PI * 2 + (i % 3 === 0 ? 0.22 : 0);

export const Preloader = () => {
  const logo = useSelector((state) => state.hvac.logo);
  const [gone, setGone] = useState(false);

  const rootRef   = useRef(null);
  const leftRef   = useRef(null);
  const rightRef  = useRef(null);
  const stageRef  = useRef(null);
  const logoRef   = useRef(null);
  const ringRef   = useRef(null);
  const shockRef  = useRef(null);
  const flashRef  = useRef(null);
  const brandRef  = useRef(null);
  const fillRef   = useRef(null);
  const progRef   = useRef(null);
  const atomRefs  = useRef([]);

  // Safety escape: 6 s max
  useEffect(() => {
    const t = setTimeout(() => { setGone(true); document.body.style.overflow = ""; }, 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      const atoms = atomRefs.current.filter(Boolean);
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const radius = Math.min(cx, cy) * 0.55;

      // ── Initial state ─────────────────────────────────────────────────────────
      atoms.forEach((atom, i) => {
        const angle = atomAngle(i);
        gsap.set(atom, {
          position: "fixed",
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          xPercent: -50, yPercent: -50,
          opacity: 0,
          scale: 0.4,
        });
      });

      gsap.set(stageRef.current,  { opacity: 0 });
      gsap.set(logoRef.current,   { scale: 0, opacity: 0 });
      gsap.set(ringRef.current,   { scale: 0.6, opacity: 0 });
      gsap.set(shockRef.current,  { scale: 0.5, opacity: 0 });
      gsap.set(flashRef.current,  { opacity: 0 });
      gsap.set(brandRef.current,  { y: 16, opacity: 0 });
      gsap.set(fillRef.current,   { scaleX: 0, transformOrigin: "left center" });
      gsap.set([leftRef.current, rightRef.current], { x: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          setGone(true);
          document.body.style.overflow = "";
        },
      });

      // ── Phase 1: Atoms appear and orbit-trail in (0–1.0 s) ──────────────────
      tl.to(atoms, {
        opacity: 1, scale: 1,
        duration: 0.35, stagger: 0.05, ease: "power2.out",
      }, 0.05);

      tl.to(atoms, {
        x: cx, y: cy,
        duration: 0.75,
        ease: "power3.in",
        stagger: { amount: 0.18, from: "random" },
      }, 0.2);

      // ── Phase 2: Impact flash + logo materialise (0.9–1.45 s) ───────────────
      tl.to(flashRef.current, { opacity: 1, duration: 0.06 }, 0.88);
      tl.to(flashRef.current, { opacity: 0, duration: 0.3  }, 0.94);

      tl.to(atoms, { opacity: 0, scale: 4, duration: 0.28, stagger: 0.025, ease: "power3.out" }, 0.88);

      tl.set(stageRef.current,  { opacity: 1 }, 0.88);
      tl.to(logoRef.current, {
        scale: 1.15, opacity: 1,
        duration: 0.38, ease: "back.out(2.5)",
      }, 0.9);
      tl.to(logoRef.current, {
        scale: 1, duration: 0.42, ease: "elastic.out(1.1, 0.5)",
      }, 1.28);

      tl.fromTo(shockRef.current,
        { scale: 0.5, opacity: 0.85 },
        { scale: 3.2, opacity: 0, duration: 0.65, ease: "power2.out" },
        0.91
      );
      tl.fromTo(ringRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" },
        1.05
      );

      // ── Phase 3: Brand + progress (1.2–2.3 s) ────────────────────────────────
      tl.to(brandRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 1.25);
      tl.to(fillRef.current,  { scaleX: 1, duration: 0.95, ease: "power2.inOut" }, 1.35);

      // ── Phase 4: Panels blast apart (2.3–3.0 s) ──────────────────────────────
      tl.to(brandRef.current,  { y: -12, opacity: 0, duration: 0.28, ease: "power2.in" }, 2.25);
      tl.to(progRef.current,   { opacity: 0, duration: 0.22 }, 2.3);
      tl.to(logoRef.current,   { scale: 0.9, opacity: 0, duration: 0.32, ease: "power2.in" }, 2.3);
      tl.to(ringRef.current,   { opacity: 0, duration: 0.2 }, 2.3);

      tl.to(leftRef.current,  { x: "-102%", duration: 0.7, ease: "power3.inOut" }, 2.3);
      tl.to(rightRef.current, { x:  "102%", duration: 0.7, ease: "power3.inOut" }, 2.3);

    }, rootRef);

    return () => { ctx.revert(); document.body.style.overflow = ""; };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} style={{ position: "fixed", inset: 0, zIndex: 99999, overflow: "hidden" }}>
      {/* Left panel */}
      <div ref={leftRef} className="pl-panel pl-panel--l" />
      {/* Right panel */}
      <div ref={rightRef} className="pl-panel pl-panel--r" />

      {/* Atoms */}
      {Array.from({ length: ATOM_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (atomRefs.current[i] = el)}
          className="pl-atom"
          style={{ top: 0, left: 0 }}
          aria-hidden="true"
        />
      ))}

      {/* Impact flash */}
      <div ref={flashRef} className="pl-flash" aria-hidden="true" />

      {/* Logo stage */}
      <div ref={stageRef} className="pl-stage">
        <div className="pl-logo-wrap">
          {/* Shockwave ring */}
          <div ref={shockRef} className="pl-shockwave" aria-hidden="true" />
          {/* Steady ring */}
          <div ref={ringRef} className="pl-ring-steady" aria-hidden="true" />
          {/* Logo */}
          <img
            ref={logoRef}
            src={logo || "/inqcorpLogo.jpeg"}
            alt="ITC"
            className="pl-logo-img"
            decoding="async"
            fetchPriority="high"
            onError={(e) => { e.currentTarget.src = "/inqcorpLogo.jpeg"; }}
          />
        </div>

        <div ref={brandRef} className="pl-brand" style={{ opacity: 0 }}>
          <p className="pl-name"><span className="pl-gold">ITC</span></p>
          <p className="pl-tag">Inqilab Trading Corporation · Bangladesh</p>
        </div>
      </div>

      {/* Progress */}
      <div ref={progRef} className="pl-prog-track">
        <div ref={fillRef} className="pl-prog-fill" />
      </div>

      <style>{`
        .pl-panel {
          position: absolute; top: 0; height: 100%; width: 50%;
          will-change: transform;
        }
        .pl-panel--l {
          left: 0;
          background: linear-gradient(108deg, rgba(196,155,43,.05) 0%, transparent 55%), #000516;
        }
        .pl-panel--r {
          right: 0;
          background: linear-gradient(252deg, rgba(27,58,138,.08) 0%, transparent 55%), #000516;
        }
        .pl-panel::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(27,58,138,.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,58,138,.09) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }

        .pl-atom {
          position: fixed;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #C49B2B;
          box-shadow: 0 0 14px #C49B2B, 0 0 28px rgba(196,155,43,.55), 0 0 6px #fff;
          will-change: transform, opacity;
          z-index: 10;
        }

        .pl-flash {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(196,155,43,.45) 0%, transparent 70%);
          pointer-events: none; z-index: 8;
        }

        .pl-stage {
          position: absolute; inset: 0; z-index: 9;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 22px; pointer-events: none;
        }

        .pl-logo-wrap {
          position: relative;
          width: 100px; height: 100px;
          display: flex; align-items: center; justify-content: center;
        }

        .pl-shockwave {
          position: absolute;
          inset: -8px; border-radius: 50%;
          border: 2px solid rgba(196,155,43,.9);
          will-change: transform, opacity;
        }

        .pl-ring-steady {
          position: absolute;
          inset: -6px; border-radius: 18px;
          border: 1.5px solid rgba(196,155,43,.55);
          box-shadow: 0 0 12px rgba(196,155,43,.3), inset 0 0 10px rgba(196,155,43,.1);
          will-change: opacity;
        }

        .pl-logo-img {
          width: 84px; height: 84px;
          object-fit: contain;
          background: #ffffff;
          border-radius: 14px;
          padding: 8px;
          will-change: transform, opacity;
          box-shadow: 0 0 32px rgba(196,155,43,.5), 0 20px 48px rgba(0,0,0,.6);
          position: relative; z-index: 2;
        }

        .pl-brand {
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          will-change: transform, opacity;
        }
        .pl-name {
          margin: 0;
          font: 900 clamp(30px,5.5vw,48px)/1 "Sora", system-ui, sans-serif;
          color: #fff;
          letter-spacing: .025em;
        }
        .pl-gold {
          color: #C49B2B;
          text-shadow: 0 0 20px rgba(196,155,43,.65);
        }
        .pl-tag {
          margin: 0;
          font: 700 clamp(9px,1.5vw,11px)/1 "Sora", system-ui, sans-serif;
          letter-spacing: .42em;
          text-transform: uppercase;
          color: rgba(255,255,255,.3);
        }

        .pl-prog-track {
          position: absolute; bottom: 44px; left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: min(220px, 40vw); height: 2px;
          background: rgba(255,255,255,.07);
          border-radius: 999px; overflow: hidden;
        }
        .pl-prog-fill {
          height: 100%;
          background: linear-gradient(90deg, #0d1f4a 0%, #1B3A8A 40%, #C49B2B 100%);
          border-radius: 999px;
          box-shadow: 0 0 10px rgba(196,155,43,.7);
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .pl-atom { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
