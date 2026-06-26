import React, { useMemo } from "react";
import welcomGif from "../assets/image/gif/welcome.gif"
// Replace this with your Air Wheeler image import or url
const airWheelerImg =
  "https://www.airwheel.net/images/se3/Airwheel-SE3.gif"; // Example image url






export default function FeatureWithIntro() {

  const features = useMemo(() => (
    [
      {
        icon: (
          <span className="flex items-center justify-center rounded-full w-20 h-20 mx-auto mb-4">
            {/* High Performance Icon */}
            {/* <svg width="32" height="32" viewBox="0 0 24 24" fill="#F87171">
          <circle cx="12" cy="12" r="10" stroke="#F87171" strokeWidth="2" fill="none"/>
          <path d="M12 7v5l3 3" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg> */}


            <div>

              <img src="https://motorisedsuitcase.com/cdn/shop/files/230721-AWS-SE3MiniT-GIF.gif?v=1698195720&width=800" alt="" />
              {/* <div className="bg-gray-500 h-3 rounded-sm  w-full">

          </div>
          <p className="-mt-5 text-white font-bold">-   -    -   - - -</p> */}
            </div>
          </span>
        ),
        title: "High Performance",
        desc:
          "Experience unmatched speed and efficiency with Air Wheeler’s cutting-edge frame technology and low-resistance engineering. Glide effortlessly and conquer any ride with top-tier performance.",
      },
      {
        icon: (
          <span className="flex items-center justify-center rounded-full w-20 h-20 mx-auto mb-4">
            {/* Optimum Compactness Icon */}
            {/* <svg width="32" height="32" viewBox="0 0 24 24" fill="#06B6D4">
          <circle cx="12" cy="12" r="10" stroke="#06B6D4" strokeWidth="2" fill="none"/>
          <path d="M7 15l5-6 5 6" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <circle cx="12" cy="16" r="1" fill="#06B6D4"/>
        </svg> */}
            <div>
              <img src="https://airwheelfactory.com/cdn/shop/files/airwheel-se3t-electric-luggage-gif_1_b8900484-6c76-4ca5-a623-1f42c5bdf038.webp?v=1685500706&width=1500" alt="" />
              {/* <div className="bg-gray-500 h-3 rounded-sm  w-full">

          </div>
          <p className="-mt-5 text-white font-bold">-   -    -   - - -</p> */}
            </div>

          </span>
        ),
        title: "Optimum Compactness",
        desc:
          "Air Wheeler redefines portability with its ultra-compact, full-sized foldable design. Store it effortlessly at home, in your car, or at the office, and enjoy true convenience wherever you go.",
      },
      {
        icon: (
          <span className="flex items-center justify-center   w-20 h-20 mx-auto mb-4">
            {/* Fast Folded Icon */}
            {/* <svg width="32" height="32" viewBox="0 0 24 24" fill="#FBBF24">
          <circle cx="12" cy="12" r="10" stroke="#FBBF24" strokeWidth="2" fill="none"/>
          <path d="M16 12H8m4-4v8" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg> */}
            <div className="">
              <img src={`https://www.airwheel.net/images/se3/Airwheel-SE3.gif`} alt="" />

              {/* <div className="bg-gray-600 h-4 rounded-sm  w-full">

          </div>
          <p className="-mt-5 text-white font-bold">-   -    -   - - -</p> */}
            </div>




          </span>
        ),
        title: "Easy Extension",
        desc:
          "Fold and unfold your Air Wheeler in seconds! Its quick-fold mechanism means you’re always ready to ride, store, or transport your bike with minimal effort and maximum speed.",
      },
    ]
  ), [])
  return (
    <div className="w-full flex flex-col items-center justify-center md:py-5 py-2   ">
      {/* Features Section */}
      <div className="w-full max-w-[1340px] mx-auto flex flex-col md:flex-row justify-between items-center mt-5  md:mt-12 mb-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex-1 px-4 text-center mb-8 md:mb-0"
          >
            {f.icon}
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      <hr className="my-10 w-11/12 border-gray-200" />

      {/* Welcome Section */}
      <div className="w-full max-w-[1340px] mx-auto flex justify-between flex-col md:flex-row items-center">
        {/* Image */}
        <div className="md:w-1/2 w-full flex justify-center items-center mb-8 md:mb-0">
          <img
            src={welcomGif}
            alt="Air Wheeler"
            className="w-full h-auto object-contain rounded shadow-lg"
            style={{ background: "#fff" }}
          />


        </div>
        {/* Text */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-start px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 flex flex-wrap items-center">
            Why Liberty
            <span className="ml-2 text-cyan-600">Air </span> <span className="ml-2 text-orange-500">Wheel?</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mb-4" />
          <p className="text-gray-500 mb-2">
            Experience hassle-free travel with Air Wheel. Whether you’re zipping through airports on a rideable suitcase or cruising the streets on a smart scooter, our products give you freedom, speed, and fun wherever you go.

          </p>
          <p className="text-gray-500 mb-5">
            Whether you’re commuting, traveling, or just enjoying the ride, Air Wheeler is your reliable companion for effortless mobility and style.
          </p>
          <button className="bg-cyan-600 text-white px-6 py-2 rounded-full inline-flex items-center font-semibold hover:bg-cyan-700 transition">
            <svg className="mr-2" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}