import React from "react";

export default function GooeyWave({ color = "#ef5563" /* footer edge color */ }) {
  return (
    <div className="pointer-events-none absolute -top-24 left-0 w-full h-40 overflow-hidden">
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          {/* gooey filter */}
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
          <clipPath id="clip">
            <rect x="0" y="0" width="1440" height="200" />
          </clipPath>
        </defs>

        <g filter="url(#goo)" clipPath="url(#clip)" fill={color}>
          {/* the filled area (the footer color) */}
          <rect y="84" width="1440" height="200" />

          {/* the organic wave edge */}
          <path d="
            M0,110
            C120,140 280,140 400,110
            C520,80 680,80 800,110
            C920,140 1080,140 1200,110
            C1320,80 1440,80 1440,80
            L1440,200 L0,200 Z
          "/>

          {/* blobby droplets (animated up/down) */}
          <circle className="b1" cx="160"  cy="96" r="16" />
          <circle className="b2" cx="480"  cy="74" r="12" />
          <circle className="b3" cx="765"  cy="100" r="15" />
          <circle className="b4" cx="1060" cy="78" r="11" />
          <circle className="b5" cx="1280" cy="92" r="14" />
        </g>
      </svg>

      <style>{`
        .b1 { animation: rise 6s ease-in-out infinite; }
        .b2 { animation: rise 7s .6s ease-in-out infinite; }
        .b3 { animation: rise 8s .3s ease-in-out infinite; }
        .b4 { animation: rise 5.8s .9s ease-in-out infinite; }
        .b5 { animation: rise 7.5s .2s ease-in-out infinite; }

        @keyframes rise {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-35px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
