"use client";

import { useEffect, useRef, useState } from "react";

export default function Gauge({
  label,
  value,
  min = 0,
  max = 100,
  unit,
  orangeZone,
  redZone,
  alwaysGreen = false,
  extraValue,
  extraLabel,
  divisions = 4,
  scaleValues = null // ✅ NEW PROP ADDED
}) {

  const cx = 100;
  const cy = 100;
  const radius = 90;

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const percent = clamp((value - min) / (max - min), 0, 1);

  const targetAngle = 180 + percent * 180;

  const [angle, setAngle] = useState(180);
  const velocity = useRef(0);

  useEffect(() => {
    let frame;

    const animate = () => {
      const stiffness = 0.07;
      const damping = 0.88;

      const force = (targetAngle - angle) * stiffness;
      velocity.current += force;
      velocity.current *= damping;

      const next = angle + velocity.current;
      setAngle(next);

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [targetAngle, angle]);

  let activeColor = "#22c55e";
  if (!alwaysGreen) {
    if (value >= redZone) activeColor = "#ef4444";
    else if (value >= orangeZone) activeColor = "#f59e0b";
  }

  const polar = (deg, r) => {
    const rad = (deg - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const start = polar(180, radius);
  const end = polar(360, radius);

  const arcPath = `
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}
  `;

  const arcLength = Math.PI * radius;

  return (
    <div className="flex flex-col items-center">

      <div className="relative w-80 h-80 rotate-90">

        <svg viewBox="0 0 200 200" className="w-full h-full">

          {/* Base Arc */}
          <path
            d={arcPath}
            fill="none"
            stroke="#1f2937"
            strokeWidth="20"
          />

          {/* Active Arc */}
          <path
            d={arcPath}
            fill="none"
            stroke={activeColor}
            strokeWidth="6"
            strokeDasharray={arcLength}
            strokeDashoffset={arcLength - percent * arcLength}
          />

          {/* Ticks */}
{[...Array(divisions * 5 + 1)].map((_, i) => {
  const deg = 180 + (i / (divisions * 5)) * 180;
  const isMajor = i % 5 === 0;

  const p1 = polar(deg, isMajor ? 70 : 80);
  const p2 = polar(deg, 90);

  return (
    <line
      key={i}
      x1={p1.x}
      y1={p1.y}
      x2={p2.x}
      y2={p2.y}
      stroke="#9ca3af"
      strokeWidth={isMajor ? 3 : 1}
    />
  );
})}

          {/* Numbers */}
{[...Array(divisions + 1)].map((_, i) => {
  const p = i / divisions;
  const val = min + p * (max - min);
  const deg = 180 + p * 180;
  const pos = polar(deg, 55);

  return (
    <text
      key={i}
      x={pos.x}
      y={pos.y}
      textAnchor="middle"
      fill="#9ca3af"
      fontSize="12"
      transform={`rotate(-90 ${pos.x} ${pos.y})`}
    >
      {val.toFixed(2)}
    </text>
  );
})}
        </svg>
        

        {/* Needle */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform: `rotate(${angle - 180}deg)`
          }}
        >
          <div className="w-[3px] h-[90px] bg-white rounded-full origin-bottom translate-y-[45px]"></div>
        </div>

        {/* Center Cap */}
        <div className="absolute left-1/2 top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-gray-400 rounded-full border-4 border-gray-900 shadow-xl" />

        {/* Digital Value Box */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: "translate(-10%, -25px) rotate(-90deg)"
          }}
        >
          <div className="bg-black/60 px-6 py-2 rounded-lg border border-gray-700">
            <span className="text-xl font-bold" style={{ color: activeColor }}>
              {value.toFixed(2)}
            </span>
            <span className="text-sm text-gray-400 ml-1">{unit}</span>
          </div>
        </div>

      </div>

      <div
        style={{ marginTop: "-70px" }}
        className="text-sm text-gray-400 tracking-wide"
      >
        {label}
      </div>

    </div>
  );
}