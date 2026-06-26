import React from "react";
import scooter from "../assets/image/scooter/Adobe Express - file (34).png"
// Replace with your actual images if available
const frameImg = "https://airwheelcanada.ca/cdn/shop/files/Airwheel_SE3S_Ride_On_Suitcase_Pink.png?v=1736889364"; // Example frame image (transparent background recommended)
const powerMeterImg = "https://airwheelmexico.com/cdn/shop/files/21.690-Photoroom_8e5394b4-3ab0-4517-86b2-bfb97fc97c43.png?v=1720414156&width=750"; // Example power meter image

export default function CoreFeatures() {
    return (
        <section className="md:w-full  bg-[#fafafa]   py-10 flex flex-col items-center overflow-x-hidden ">
            {/* Heading */}
            <div className="max-w-[1340px] mx-auto w-full flex flex-col items-center mb-10 px-2">
                <p className="tracking-widest text-gray-400 mb-1 text-xs uppercase">Explore the awesome</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    UNLOCK YOUR <span className="text-cyan-500">JOURNEY</span>
                </h2>
                <div className="w-16 h-1 bg-cyan-500 mt-2 mb-2" />
            </div>

            {/* Feature 1: Bounce */}
            <div className="max-w-[1340px] bg-cyan-500 rounded-xl w-full flex flex-col md:flex-row items-center justify-center my-5 px-2">
                {/* Image Left */}
                <div className="w-full md:w-1/2  rounded-xl  flex justify-center mb-8 md:mb-0">
                    <img
                        src={frameImg}
                        alt="Giant TCR Advanced Pro Disc"
                        className="h-auto max-w-full w-full object-contain transition-all hover:rotate-6 cursor-pointer  duration-700 animate-bounce"
                        style={{ animation: 'bounce 4s infinite' }}
                    />
                </div>
                {/* Text Right */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start p-3 ">
                    <h3 className="text-2xl font-semibold text-gray-200 mb-2 text-center md:text-left">
                        Smart Travel. Effortless Style. <span className="text-white font-bold">Ultimate Convenience. </span>



                    </h3>
                    <p className="text-gray-200 mb-2 text-center md:text-left">
                        Turn every trip into an adventure with Air Wheel smart luggage. Ride through terminals, commute hands-free, and carry your essentials in one sleek, motorized suitcase. Engineered for modern travelers who demand speed, comfort, and innovation—all in one.


                    </p>
                    <br />
                    <span className="hidden md:block">
                        <p className="text-gray-200 text-sm font-semibold mb-1 text-center md:text-left">Redefining the Way You Travel</p>
                        <br />
                        <p className="text-gray-200 text-sm text-center md:text-left">
                            Imagine you’re rushing through a crowded airport, your gate is at the other end of the terminal, and your hands are full with your phone and coffee. Instead of dragging a heavy suitcase behind you, you hop onto your <b className="text-white">Liberty Air spaWheel</b> smart luggage. With the touch of a button, the powerful motor kicks in, gliding you smoothly across the terminal floor. The wide, stable wheels handle every turn with ease, and the smart speed control lets you adjust your pace as you weave through people. You’re riding comfortably, with your essentials safely packed inside the durable, stylish case. Even after a long day of travel, the battery still has power to take you from the terminal to the taxi stand outside. And when you need to stop, the responsive brakes ensure you can slow down safely. Liberty Air Wheel offers you more than just luggage—it’s your travel companion, built for speed, safety, and effortless convenience..
                        </p>
                    </span>

                </div>
            </div>

            {/* Feature 2: Move in X axis (left-right) */}


            {/* Feature 3 (original) */}
            <div className="max-w-[1340px] w-full my-5  flex flex-col md:flex-row-reverse items-center justify-center mb-8 px-2">
                {/* Image Right (on desktop, left on mobile) */}
                <div className="w-full md:w-1/2 flex justify-center mb-8  rounded-xl md:mb-0">
                    <img
                        src={powerMeterImg}
                        alt="SRM Rotor 3D Power Meter "
                        style={{
                            animation: 'spin 40s linear infinite '
                        }}
                        className="h-auto max-w-full w-full rounded-full bg-cyan-500 shadow-2xl object-contain cursor-pointer"
                    />
                </div>
                {/* Text Left (on desktop, right on mobile) */}
                <div className="w-full  md:w-1/2 flex flex-col items-center md:items-start px-3">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center md:text-left">
                        Smart <span className="text-cyan-500 font-bold">Handle</span> System
                    </h3>
                    <p className="text-gray-500 mb-2 text-center md:text-left">
                        The Airwheel features a smart handle system that lets you accelerate, brake, and reverse effortlessly. <span className="hidden md:block">Imagine rolling your suitcase at the airport: push the handle forward to move, pull it back to stop, and press both handles to reverse. With a top speed of 13 km/h, removable batteries, and an app to track settings, Airwheel simplifies your travels. It’s award-winning and perfect for busy travelers seeking convenience and style!</span>
                    </p>

                    <div className="flex gap-3 mt-4">

                        <button className="bg-cyan-500 hover:border-2 hover:border-cyan-500 cursor-pointer text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-cyan-500 transition">
                            READ MORE
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-[1340px] p-10 bg-cyan-500 rounded-xl w-full flex flex-col md:flex-row items-center justify-center my-5  px-2">
                {/* Image Left */}

                {/* Text Right */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start p-3">
                    <h3 className="text-2xl font-semibold text-gray-200 mb-2 text-center md:text-left">
                        Zip Through the City with  E-Scooter <span className="font-bold">Liberty Air Wheel</span>
                    </h3>
                    <p className="text-gray-200 mb-2 text-center md:text-left">
                        Effortless, eco-friendly, and built for the fast-moving urban lifestyle. The Liberty Air Wheel E-Scooter delivers smooth acceleration, smart controls, and a durable frame designed for daily commutes. Whether you're heading to work, exploring the city, or just enjoying the ride, this scooter combines speed, safety, and style in one sleek package.


                    </p>
                    <br />

                    <span className="hidden md:block">
                        <p className="text-gray-200 text-sm font-bold mb-1 text-center md:text-left">Your Commute, Reimagined</p>
                        <p className="text-gray-200 text-sm text-center md:text-left">
                            Cut through traffic and cruise the streets with the Liberty Air Wheel E-Scooter. Lightweight yet powerful, this smart scooter offers a smooth, silent ride with responsive brakes and long-lasting battery life. Perfect for city explorers and daily commuters who want to travel smarter, faster, and greener—without breaking a sweat.
                        </p>
                    </span>


                </div>
                <div className="w-full md:w-1/2  rounded-xl  flex justify-center mb-8 md:mb-0">
                    <img
                        src={scooter || `https://purepng.com/public/uploads/thumbnail//lime-e-scooter-niy.png`}
                        alt="SRM Rotor 3D Power Meter"
                        className="   max-w-full w-2/3 object-contain -rotate-2 cursor-pointer animate-xmove"
                        style={{}}
                    />
                </div>
            </div>
            {/* Animation keyframes */}
            <style>
                {`
                @keyframes xmove {
                    0% { transform: translateX(0); }
     
                    50% { transform: translateX(-200px) ;}
                
                    100% { transform: translateX(0);}
                }
                .animate-xmove {
                    animation: xmove 5s ease-in-out infinite alternate;
                }
                `}
            </style>
        </section>
    );
}