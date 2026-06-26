import { FaFeather, FaLock, FaSync, FaClock, FaSuitcaseRolling, FaBatteryFull, FaUserFriends, FaMapMarkedAlt } from "react-icons/fa";

import scooter from "../assets/image/scooter/Adobe Express - file.png"

export default function  AirWheelerBagFeatures() {
    return (
        <section className="py-16  bg-cyan-100">
            <div className="max-w-[1340px] mx-auto px-4">
                <h3 className="text-center text-gray-500 tracking-widest mb-1 uppercase">Explore the Awesome</h3>
                <h2 className="text-center text-4xl font-bold mb-8">
                    CORE <span className="text-cyan-500">FEATURES</span>
                    <div className="flex justify-center mt-2">
                        <span className="w-12 h-1 bg-cyan-500 rounded"></span>
                    </div>
                </h2>

                <div className="flex-1 flex justify-center md:hidden my-10">
                    <img
                        src={ scooter  || `https://www.airwheel.net/images/se3/Airwheel-SE3-smart-backpack-black.png`}
                        alt="Air Wheeler Bag"
                        className="h-80 object-contain hover:rotate-45 transition-all duration-300 cursor-pointer"
                    />
                </div>
                <div className="flex  md:flex-row flex-col justify-between items-center">
                    {/* Left features */}
                    <div className="flex flex-col gap-7 md:gap-16 flex-1">
                        <FeatureItem
                            icon={<FaFeather  className="text-cyan-500 text-lg " />}
                            title="Ultra-Lightweight"
                            desc="Designed for effortless portability with minimal weight."
                        />
                        <FeatureItem
                            icon={<FaLock size={32} className="text-cyan-500" />}
                            title="Secure Anti-Theft"
                            desc="Equipped with advanced anti-theft locks and zippers."
                        />
                        <FeatureItem
                            icon={<FaSync size={32} className="text-cyan-500" />}
                            title="360° Spinner Wheels"
                            desc="Glide smoothly in any direction with durable, silent wheels."
                        />
                        <FeatureItem
                            icon={<FaClock size={32} className="text-cyan-500" />}
                            title="Quick Access Pockets"
                            desc="Smart pockets for fast access to essentials on the go."
                        />
                    </div>

                    {/* Center image (placeholder, replace with your bag image) */}
                    <div className="flex-1 flex justify-center max-sm:hidden  ">
                        <img
                            src={ scooter || `https://www.airwheel.net/images/se3/Airwheel-SE3-smart-backpack-black.png`}
                            alt="Air Wheeler Bag"
                            className="h-80 object-contain hover:rotate-45 transition-all duration-300 cursor-pointer"
                        />
                    </div>

                    {/* Right features */}
                    <div className="flex flex-col gap-7 md:gap-16 flex-1">
                        <FeatureItem
                            icon={<FaSuitcaseRolling size={32} className="text-cyan-500" />}
                            title="Expandable Capacity"
                            desc="Flexible compartments to fit more without bulk."
                        />
                        <FeatureItem
                            icon={<FaBatteryFull size={32} className="text-cyan-500" />}
                            title="USB Charging Port"
                            desc="Charge your devices on the move with built-in USB port."
                        />
                        <FeatureItem
                            icon={<FaUserFriends size={32} className="text-cyan-500" />}
                            title="Ergonomic Handle"
                            desc="Comfortable, adjustable handle for all users."
                        />
                        <FeatureItem
                            icon={<FaMapMarkedAlt size={32} className="text-cyan-500" />}
                            title="Travel Ready"
                            desc="Compliant with major airline carry-on requirements."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureItem({ icon, title, desc }) {
    return (
        <div className="flex items-center gap-6">
            <div className="flex items-center justify-center w-14 h-14 border-2 border-cyan-500 rounded-full">
                {icon}
            </div>
            <div>
                <h4 className="font-semibold text-lg">{title}</h4>
                <p className="text-gray-500">{desc}</p>
            </div>
        </div>
    );
}