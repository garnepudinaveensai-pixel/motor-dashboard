"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return null; // Prevent SSR mismatch

  return (
    <div className="text-sm text-gray-400">
      {time.toLocaleTimeString()}
    </div>
  );
}