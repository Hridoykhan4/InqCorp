import React, { useEffect } from "react";
import image from "../assets/image/Banner Image/Rectangle 7.png"
import AOS from 'aos';
import 'aos/dist/aos.css';


export const WhoWeAre = () => {

    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <section className="relative mx-auto w-full max-w-7xl  px-6 py-14">
            {/* top rule & section label */}
            <div className="mb-8 flex items-center gap-3">
                <span className="text-xs font-semibold tracking-widest text-[#0062f5]">
                    01 | WHO WE ARE
                </span>
                <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* header row */}
            <div className="flex items-center justify-center">
                {/* left: icon + heading + paragraph */}
                <div className="md:w-1/2">
                    {/* icon with glow */}
                    <div className="mb-6 inline-flex items-center gap-3">
                        <div className="relative">
                            {/* glow */}
                            <span className="absolute inset-0 rounded-full bg-[#0062f5]/40 blur-xl" />
                            <div className="relative grid h-11 w-11 place-items-center rounded-full bg-indigo-600 text-white shadow-lg">
                                {/* simple users icon */}
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
                        We are a <span className="text-[#0062f5]">group of experts</span> looking to
                        help companies leverage technology to do more than they had ever
                        thought possible.
                    </h2>

                    <p className="mt-5 max-w-xl text-gray-600">
                        We do this through a number of services to provide comprehensive
                        solutions for your business. Scroll down to read about what we can
                        do for you.
                    </p>
                </div>

            </div>

            {/* lower row: tilted framed block with purple glow shadow */}
            <div className="mt-25 grid gap-10 md:grid-cols-2">
                {/* LEFT: the “photo” area as a fixed-size div inside a tilted frame */}
                <div className="relative">
                    {/* soft purple glow shadow under the card */}
                    <div className="pointer-events-none absolute -bottom-8 left-4 h-24 w-[520px] rounded-[32px] bg-[#0062f5]/50 blur-3xl opacity-80 md:h-28 md:w-[600px]" />

                    {/* tilted frame */}
                    <div className="-rotate-6" data-aos='fade-right'  data-aos-offset="100" data-aos-duration='1200' data-aos-easing="ease-in-sine" >
                        <div className="rounded-[28px] bg-indigo-600 p-3 shadow-[0_20px_60px_rgba(109,40,217,0.45)]">
                            {/* Inner area replacing the photo */}
                            <img src={image} alt="" />
                        </div>
                    </div>
                </div>

                <div className="md:pt-7">
                    <ul className="space-y-3 text-gray-700">
                        {[
                            "We always focus on technical excellence",
                            "Wherever you're going, we bring ideas and excitement",
                            "We're consultants, guides, and partners for brands",
                        ].map((t, i) => (
                            <li key={i} className="flex items-start gap-3">
                                {/* outlined check circle */}
                                <span className="mt-1 grid h-5 w-5 place-items-center rounded-full border-2 border-fuchsia-400 text-[#0062f5]">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-3.5 w-3.5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                <span>{t}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CEO line */}
                    <div className="mt-6 hidden">
                        <p className="font-semibold text-[#0062f5]">[CEO Name]</p>
                        <p className="text-gray-600">CEO, Nordic Tech</p>
                    </div>
                </div>

                {/* RIGHT: keep a bit of breathing room (optional additional copy goes here) */}
                <div className="hidden md:block" />
            </div>
        </section>
    );
};
