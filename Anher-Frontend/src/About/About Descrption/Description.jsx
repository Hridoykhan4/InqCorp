import React, { useEffect, useMemo, useRef, useState } from "react";
import team from "../../assets/image/Normal Image/team.jpg"
import webSolution from "../../assets/image/Normal Image/web solution.jpg"
import digitalMarketing from "../../assets/image/Normal Image/digitalMarketing.jpg"
import cloud from "../../assets/image/Normal Image/cloud.png"
/**

 * MilestonesTimeline
 * - Center vertical line (purple)
 * - Alternating items (image + copy)
 * - Scroll-following map pin that rides the line
 */
const items = [
    {
        title: "Our Beginning",
        copy:
            "Founded in 2020 with a passion for technology and innovation, we started as a small team of developers and strategists who believed in the power of digital transformation. Our goal was simple yet ambitious — to help businesses adapt to the fast-changing digital landscape with smart and scalable solutions.",
        img: team,
        side: "left",
    },
    {
        title: "Building Web Solutions",
        copy:
            "In our early years, we focused on designing and developing custom web applications that solved real business problems. From enterprise dashboards to e-commerce platforms, our solutions helped companies digitize their workflows, improve customer engagement, and scale with confidence.",
        img: webSolution,
        side: "right",
    },
    {
        title: "Expanding into Digital Marketing",
        copy:
            "As businesses grew their online presence, we expanded our expertise into digital marketing. By combining creative campaigns with data-driven strategies, we empowered brands to increase visibility, generate quality leads, and connect more meaningfully with their customers across platforms.",
        img: digitalMarketing,
        side: "left",
    },
    {
        title: "Embracing AI & Cloud",
        copy:
            "Today, we stand at the forefront of innovation by delivering AI-driven and cloud-based solutions. From intelligent automation and predictive analytics to secure cloud migration, we help organizations unlock efficiency, agility, and growth while staying ahead in the digital era",
        img: cloud,
        side: "right",
    },
];

// 1) Put this near the top
const PIN_SIZE = 45; // make it big (px)

// 2) Update Pin to be size-aware
const Pin = ({ size = PIN_SIZE, className = "" }) => (
    <div
        className={`relative z-20 grid place-items-center rounded-full ${className}`}
        style={{ width: size, height: size }}
    >
        <svg viewBox="0 0 24 24" style={{ width: size, height: size }}>
            <path d="M12 22s7-7.22 7-12.5A7 7 0 1 0 5 9.5C5 14.78 12 22 12 22Z" fill="#0062f5" />
            <circle cx="12" cy="9.5" r="2.5" fill="white" />
        </svg>
    </div>
);


export const Description = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);
    const [pinTop, setPinTop] = useState(0);

    // Pre-calc square marker top positions (aligned to each card’s middle)
    const markerPercents = useMemo(() => {
        const count = items.length;
        return items.map((_, i) => (i + 1) / (count + 1)); // e.g., 1/5, 2/5, ...
    }, []);

    // 3) In your useEffect that sets pinTop, replace the y calculation with size-aware clamping
    useEffect(() => {
        const el = containerRef.current;
        const line = lineRef.current;
        if (!el || !line) return;

        let rafId;

        const update = () => {
            const rect = el.getBoundingClientRect();
            const docTop = window.scrollY + rect.top;
            const viewTop = window.scrollY;
            const viewH = window.innerHeight;

            const lineRect = line.getBoundingClientRect();
            const lineHeight = lineRect.height;

            const start = docTop - viewH * 0.2;
            const end = docTop + rect.height - viewH * 0.8;

            const p = Math.min(1, Math.max(0, (viewTop - start) / (end - start || 1)));

            // center position along the line (not the top of the pin)
            const centerY = p * lineHeight;

            // keep the CENTER of the pin within the line
            const minCenter = PIN_SIZE / 2;
            const maxCenter = Math.max(minCenter, lineHeight - PIN_SIZE / 2);
            const clamped = Math.min(maxCenter, Math.max(minCenter, centerY));

            setPinTop(clamped); // this is the center position
        };

        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);


    return (
        <section className="w-full bg-white py-12">
            <div className="mx-auto max-w-[1340px] p-6">
                <h2 className="mb-8 text-center text-5xl font-semibold text-gray-900">
                    Our  <span className="text-[#0062f5]">Milestones</span>
                </h2>

                <div
                    ref={containerRef}
                    className="flex  md:flex-row flex-col  justify-around"
                >
                    {/* Left column (odd items) */}
                    <div className="space-y-16">
                        {items
                            .filter((i) => i.side === "left")
                            .map((i, idx) => (
                                <div key={`L-${idx}`} className="flex flex-col gap-3">
                                    <h3 className="text-lg md:text-3xl  font-semibold text-[#0062f5]">
                                        {i.title}
                                    </h3>
                                    <p className="max-w-xs text-[15px] leading-6 text-gray-600">
                                        {i.copy}
                                    </p>
                                    <img
                                        src={i.img}
                                        alt=""
                                        className="mt-2 w-[500px] rounded-xl object-cover "
                                    />
                                </div>
                            ))}
                    </div>

                    <div className="relative hidden justify-center md:flex">
                        <div ref={lineRef} className="relative w-[4px] bg-[#0062f5]" style={{ borderRadius: "2px" }}>

                            {/* Moving pin (centered horizontally & vertically) */}
                            <div
                                className="absolute inset-x-0 flex justify-center transform -translate-y-1/2"
                                style={{ top: pinTop }}
                            >
                                <Pin size={PIN_SIZE} />
                            </div>

                            {/* Square markers (centered on the rail) */}
                            {markerPercents.map((p, idx) => (
                                <div
                                    key={idx}
                                    className="absolute inset-x-0 flex justify-center transform -translate-y-1/2"
                                    style={{ top: `calc(${p * 100}%)` }}
                                >
                                    <div className="h-3 w-3 rounded-[2px] bg-[#0062f5] shadow" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column (even items) */}
                    <div className="space-y-16 my-10">
                        {items
                            .filter((i) => i.side === "right")
                            .map((i, idx) => (
                                <div key={`R-${idx}`} className="flex flex-col gap-3">
                                    <h3 className="text-lg md:text-3xl font-semibold text-[#0062f5]">
                                        {i.title}
                                    </h3>
                                    <p className="max-w-xs text-[15px] leading-6 text-gray-600">
                                        {i.copy}
                                    </p>
                                    <img
                                        src={i.img}
                                        alt=""
                                        className="mt-2 w-[500px] rounded-xl object-cover "
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
