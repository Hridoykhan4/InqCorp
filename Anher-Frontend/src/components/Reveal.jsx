import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initial (hidden) state per variant — also used as the inline style so there's
// no flash before GSAP runs.
const FROM = {
  up: { opacity: 0, y: 46 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.93 },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
};

const initialStyle = (variant) => {
  const f = FROM[variant] || FROM.up;
  const t = [];
  if (f.y) t.push(`translateY(${f.y}px)`);
  if (f.x) t.push(`translateX(${f.x}px)`);
  if (f.scale) t.push(`scale(${f.scale})`);
  return { opacity: 0, transform: t.join(" ") || undefined, willChange: "transform, opacity" };
};

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * GSAP ScrollTrigger reveal — buttery, dynamic entrance the first time the
 * element scrolls into view. Same API as before (variant, delay, as).
 */
export const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
  ...rest
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.95,
        delay: delay / 1000,
        ease: "power3.out",
        clearProps: "willChange",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, variant]);

  return (
    <Tag ref={ref} style={initialStyle(variant)} className={className} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
