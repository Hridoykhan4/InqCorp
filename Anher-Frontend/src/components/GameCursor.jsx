import { useEffect, useRef } from "react";
import gsap from "gsap";

const TRAIL_COUNT = 6;

// Interactive element selector
const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, [tabindex]';

export const GameCursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const trailRefs = useRef([]);
  const isHovering = useRef(false);

  useEffect(() => {
    // Hide native cursor
    document.documentElement.style.cursor = "none";

    const ring = ringRef.current;
    const dot = dotRef.current;
    const trails = trailRefs.current;

    // GSAP quick setters for performance
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      setDotX(mouseX);
      setDotY(mouseY);

      // Ring follows with spring lag
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.18,
        ease: "power3.out",
        overwrite: "auto",
      });

      // Trail: each with increasing delay
      trails.forEach((tr, i) => {
        if (!tr) return;
        gsap.to(tr, {
          x: mouseX,
          y: mouseY,
          duration: 0.1 + i * 0.055,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    // Hover state: ring grows + tints
    const onEnter = (e) => {
      if (!e.target.closest(INTERACTIVE)) return;
      isHovering.current = true;
      gsap.to(ring, {
        scale: 1.85,
        borderColor: "rgba(239,68,68,0.9)",
        backgroundColor: "rgba(239,68,68,0.08)",
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.15,
        ease: "power2.in",
        overwrite: "auto",
      });
    };

    const onLeave = (e) => {
      if (!isHovering.current) return;
      isHovering.current = false;
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(239,68,68,0.65)",
        backgroundColor: "transparent",
        duration: 0.25,
        ease: "back.out(2)",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.18,
        ease: "back.out(2)",
        overwrite: "auto",
      });
    };

    // Click burst
    const onClick = () => {
      gsap.timeline()
        .to(ring, { scale: 0.7, duration: 0.08, ease: "power4.in" })
        .to(ring, { scale: isHovering.current ? 1.85 : 1, duration: 0.35, ease: "elastic.out(1.5,0.5)" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    window.addEventListener("click", onClick);

    // Init position off-screen
    gsap.set([ring, dot, ...trails.filter(Boolean)], { x: -200, y: -200 });

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="gc-trail"
          style={{
            opacity: 1 - (i / TRAIL_COUNT) * 0.9,
            width: `${6 - i * 0.7}px`,
            height: `${6 - i * 0.7}px`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Outer ring */}
      <div ref={ringRef} className="gc-ring" aria-hidden="true">
        {/* Crosshair lines */}
        <span className="gc-cross gc-cross--h" />
        <span className="gc-cross gc-cross--v" />
      </div>

      {/* Inner dot */}
      <div ref={dotRef} className="gc-dot" aria-hidden="true" />

      <style>{`
        .gc-ring,
        .gc-dot,
        .gc-trail {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 999998;
          /* translate applied by GSAP */
          transform: translate(-50%, -50%);
        }

        .gc-ring {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid rgba(239,68,68,.65);
          background: transparent;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 8px rgba(239,68,68,.25), inset 0 0 8px rgba(239,68,68,.08);
        }

        /* Crosshair arms — gap in center so dot is visible */
        .gc-cross {
          position: absolute;
          background: rgba(239,68,68,.7);
        }
        .gc-cross--h {
          width: 10px;
          height: 1px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: -8px 0 0 rgba(239,68,68,.7), 8px 0 0 rgba(239,68,68,.7);
          background: transparent;
          border-left: 4px solid rgba(239,68,68,.7);
          border-right: 4px solid rgba(239,68,68,.7);
        }
        .gc-cross--v {
          width: 1px;
          height: 10px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: transparent;
          border-top: 4px solid rgba(239,68,68,.7);
          border-bottom: 4px solid rgba(239,68,68,.7);
        }

        .gc-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 6px rgba(239,68,68,.9);
          will-change: transform;
        }

        .gc-trail {
          border-radius: 50%;
          background: #ef4444;
          will-change: transform;
          mix-blend-mode: screen;
        }

        /* Hide on touch/mobile */
        @media (hover: none) {
          .gc-ring, .gc-dot, .gc-trail { display: none; }
        }
      `}</style>
    </>
  );
};

export default GameCursor;
