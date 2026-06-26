import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Unified "Heroic Drop" scroll-entry hook.
 *
 * Animates three layers in sequence when the section enters the viewport:
 *   [data-heroic-eyebrow]  →  eyebrow / kicker label
 *   [data-heroic-title]    →  section headline
 *   [data-heroic-item]     →  grid cards / rows (staggered)
 *
 * Performance contract:
 *   - Only `transform` (translateY) and `opacity` are animated — zero layout reflow,
 *     zero blur, zero scale-on-scroll → 60fps on low-end devices.
 *   - `will-change: transform, opacity` set on each target before the tween fires.
 *   - `invalidateOnRefresh: true` recalculates trigger bounds after resize / late
 *     image loads so start positions are never stale.
 *   - `ctx.revert()` in cleanup kills all tweens and clears inline styles —
 *     prevents memory leaks on component unmount.
 */
export const useHeroicEntry = (opts = {}) => {
  const {
    titleDelay   = 0,
    itemStagger  = 0.1,
    start        = "top 80%",
    itemStart    = "top 76%",
    yDistance    = 20,        // px — intentionally small for mechanical "snap" feel
  } = opts;

  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Reduce travel distance on mobile — snappier, less GPU work
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const y = isMobile ? Math.min(yDistance, 16) : yDistance;

    const ctx = gsap.context(() => {
      const eyebrow = sectionRef.current.querySelector("[data-heroic-eyebrow]");
      const title   = sectionRef.current.querySelector("[data-heroic-title]");
      const items   = [...sectionRef.current.querySelectorAll("[data-heroic-item]")];

      const base = {
        ease: "power2.out",
        invalidateOnRefresh: true,
      };

      if (eyebrow) {
        gsap.set(eyebrow, { willChange: "transform, opacity" });
        gsap.fromTo(
          eyebrow,
          { y: y * 0.7, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.6,
            delay: titleDelay,
            ...base,
            scrollTrigger: {
              trigger: sectionRef.current,
              start,
              once: true,
              invalidateOnRefresh: true,
            },
            onComplete() { eyebrow.style.willChange = "auto"; },
          }
        );
      }

      if (title) {
        gsap.set(title, { willChange: "transform, opacity" });
        gsap.fromTo(
          title,
          { y, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.72,
            delay: titleDelay + (eyebrow ? 0.1 : 0),
            ...base,
            scrollTrigger: {
              trigger: sectionRef.current,
              start,
              once: true,
              invalidateOnRefresh: true,
            },
            onComplete() { title.style.willChange = "auto"; },
          }
        );
      }

      if (items.length > 0) {
        items.forEach((el) => gsap.set(el, { willChange: "transform, opacity" }));
        gsap.fromTo(
          items,
          { y: y * 0.85, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.65,
            stagger: itemStagger,
            ...base,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: itemStart,
              once: true,
              invalidateOnRefresh: true,
            },
            onComplete() {
              items.forEach((el) => { el.style.willChange = "auto"; });
            },
          }
        );
      }
    }, sectionRef);

    // ctx.revert() kills all tweens, ScrollTrigger instances, and resets inline
    // styles — prevents memory leaks on every unmount
    return () => ctx.revert();
  }, [titleDelay, itemStagger, start, itemStart, yDistance]);

  return sectionRef;
};
