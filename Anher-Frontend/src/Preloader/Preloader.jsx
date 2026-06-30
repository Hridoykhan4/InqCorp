import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";

export const Preloader = () => {
  const logo = useSelector((state) => state.hvac.logo);
  const [gone, setGone] = useState(false);

  const rootRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const logoStageRef = useRef(null);
  const logoImgRef = useRef(null);
  const strokeRef = useRef(null);
  const ringRef = useRef(null);
  const brandRef = useRef(null);
  const progFillRef = useRef(null);
  const progTrackRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.set(logoImgRef.current, { scale: 0, opacity: 0 });
      gsap.set(strokeRef.current, { strokeDashoffset: 1 });
      gsap.set(ringRef.current, { scale: 1, opacity: 0 });
      gsap.set(brandRef.current, { y: 14, opacity: 0 });
      gsap.set(progFillRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline();

      tl.to(logoImgRef.current, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2.2)" }, 0.2);
      tl.to(progFillRef.current, { scaleX: 1, duration: 2.0, ease: "power2.inOut" }, 0.2);
      tl.to(strokeRef.current, { strokeDashoffset: 0, duration: 0.88, ease: "power2.inOut" }, 0.75);
      tl.to(brandRef.current, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, 0.95);
      tl.to(logoImgRef.current, { scale: 1.12, duration: 0.22, ease: "power3.in" }, 1.72);
      tl.to(logoImgRef.current, { scale: 1.0, duration: 0.5, ease: "elastic.out(1.15, 0.55)" }, 1.94);
      tl.fromTo(ringRef.current, { scale: 1, opacity: 0.72 }, { scale: 2.4, opacity: 0, duration: 0.85, ease: "power2.out" }, 1.74);
      tl.to(brandRef.current, { y: -10, opacity: 0, duration: 0.3, ease: "power2.in" }, 2.35);
      tl.to(progTrackRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" }, 2.4);
      tl.to(leftRef.current, { x: "-100%", duration: 0.9, ease: "power3.inOut" }, 2.58);
      tl.to(rightRef.current, { x: "100%", duration: 0.9, ease: "power3.inOut" }, 2.58);
      tl.to(logoImgRef.current, { scale: 0.88, opacity: 0, duration: 0.4, ease: "power2.in" }, 2.68);
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
    <div ref={rootRef} className="pl-root" role="status" aria-label="Loading ITC">

      <div ref={leftRef} className="pl-panel pl-panel--l" />
      <div ref={rightRef} className="pl-panel pl-panel--r" />

      <div ref={logoStageRef} className="pl-stage">
        <div className="pl-logo-wrap">
          <div ref={ringRef} className="pl-ring" aria-hidden="true" />
          <svg className="pl-stroke-svg" viewBox="0 0 96 96" aria-hidden="true">
            <rect ref={strokeRef} pathLength="1" strokeDasharray="1" x="4" y="4" width="88" height="88" rx="14" fill="none" stroke="#C49B2B" strokeWidth="2" />
            <rect pathLength="1" strokeDasharray="1" strokeDashoffset="1" x="4" y="4" width="88" height="88" rx="14" fill="none" stroke="#C49B2B" strokeWidth="4" opacity="0.25" style={{ filter: "blur(3px)" }} />
          </svg>
          <img
            ref={logoImgRef}
            src={logo || "/inqcorpLogo.jpeg"}
            alt="ITC"
            className="pl-logo-img"
            decoding="async"
            fetchPriority="high"
            onError={(e) => { e.currentTarget.src = "/inqcorpLogo.jpeg"; }}
          />
        </div>

        <div ref={brandRef} className="pl-brand" style={{ opacity: 0 }}>
          <p className="pl-name">
             <span className="pl-gold">ITC</span>
          </p>
          <p className="pl-tag">Build with Strength · Bangladesh</p>
        </div>
      </div>

      <div ref={progTrackRef} className="pl-prog-track">
        <div ref={progFillRef} className="pl-prog-fill" />
      </div>

      <style>{`
        .pl-root {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
        }
        .pl-panel {
          position: absolute;
          top: 0;
          height: 100%;
          width: 50%;
          will-change: transform;
        }
        .pl-panel--l {
          left: 0;
          background: linear-gradient(105deg, rgba(196,155,43,.06) 0%, transparent 60%), #080f21;
        }
        .pl-panel--r {
          right: 0;
          background: linear-gradient(255deg, rgba(27,58,138,.08) 0%, transparent 60%), #080f21;
        }
        .pl-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(27,58,138,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,58,138,.07) 1px, transparent 1px);
          background-size: 54px 54px;
          pointer-events: none;
        }
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
        .pl-logo-wrap {
          position: relative;
          width: 96px;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pl-logo-img {
          width: 84px;
          height: 84px;
          object-fit: contain;
          background: #ffffff;
          border-radius: 16px;
          padding: 8px;
          position: relative;
          z-index: 3;
          will-change: transform, opacity;
          box-shadow: 0 0 0 1px rgba(255,255,255,.06), 0 20px 48px -18px rgba(196,155,43,.6);
        }
        .pl-stroke-svg {
          position: absolute;
          inset: -4px;
          width: 104px;
          height: 104px;
          z-index: 4;
          will-change: stroke-dashoffset;
        }
        .pl-stroke-svg rect { filter: drop-shadow(0 0 5px rgba(196,155,43,.8)); }
        .pl-ring {
          position: absolute;
          inset: -4px;
          border-radius: 18px;
          border: 1.5px solid #C49B2B;
          z-index: 2;
          will-change: transform, opacity;
        }
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
        .pl-gold {
          color: #C49B2B;
          text-shadow: 0 0 18px rgba(196,155,43,.6);
        }
        .pl-tag {
          margin: 0;
          font: 700 clamp(9px,1.6vw,11px)/1 "Sora", system-ui, monospace;
          letter-spacing: .45em;
          text-transform: uppercase;
          color: rgba(255,255,255,.33);
        }
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
          background: linear-gradient(90deg, #0F2257, #1B3A8A 40%, #C49B2B);
          border-radius: 999px;
          box-shadow: 0 0 10px rgba(196,155,43,.6);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .pl-panel { transition: none; }
          .pl-ring { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
