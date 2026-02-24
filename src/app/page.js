"use client";

import Clock from "./components/Clock";
import GearAnimation from "./components/GearAnimation";
import TrendChart from "./components/TrendChart";
import Gauge from "./components/Gauge";

export default function Home() {

  // ================= SENSOR VALUES =================
  const voltage = 220;
  const current = 0.27;
  const vibration = 9;       // Try changing values
  const temperature = 65;
  const humidity = 82;

  // ================= STATUS LOGIC =================
  let systemStatus = "NORMAL";

  if (
    vibration >= 8 ||
    temperature >= 60 ||
    humidity >= 85
  ) {
    systemStatus = "CRITICAL";
  } else if (
    vibration >= 6 ||
    temperature >= 45 ||
    humidity >= 75
  ) {
    systemStatus = "WARNING";
  }

  // ================= HEALTH LOGIC =================
  let health = 100;
  if (systemStatus === "WARNING") health = 70;
  if (systemStatus === "CRITICAL") health = 40;

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            MOTOR FAULT PREDICTION USING AUTO ENCODER
          </h1>
          <p className="text-gray-400 text-sm">
            Real-Time Deep Learning Condition Monitoring
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div
            className={`px-4 py-1 rounded-lg text-sm font-semibold ${
              systemStatus === "CRITICAL"
                ? "bg-red-900 text-red-500 animate-pulse"
                : systemStatus === "WARNING"
                ? "bg-orange-900 text-orange-400"
                : "bg-green-900 text-green-400"
            }`}
          >
            SYSTEM {systemStatus}
          </div>
          <Clock />
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center mt-6">

        {/* ========== LEFT GAUGES ========== */}
        <div className="lg:col-span-3 md:col-span-1 col-span-1 flex flex-col items-center gap-10 bg-[#111827] p-4 rounded-xl border border-gray-800 shadow-lg">

          <Gauge
  label="Voltage"
  value={voltage}
  min={0}
  max={230}
  unit="V"
  scaleValues={[0, 50, 100, 150, 200, 230]}  // ✅ Manual scale
  alwaysGreen={true}
  orangeZone={999}
  redZone={999}
/>

<Gauge
  label="Current"
  value={current}
  min={0}
  max={0.35}
  unit="A"
  divisions={3}  
  orangeZone={0.3}
  redZone={0.33}
/>
        </div>

        {/* ========== CENTER MACHINE PANEL ========== */}
        <div
          className={`lg:col-span-6 md:col-span-2 col-span-1 rounded-xl border shadow-lg flex flex-col h-[520px] transition-all duration-500 ${
            systemStatus === "CRITICAL"
              ? "bg-[#111827] border-red-500 shadow-red-500/50 shadow-2xl"
              : systemStatus === "WARNING"
              ? "bg-[#111827] border-orange-400"
              : "bg-[#111827] border-gray-800"
          }`}
        >

          {/* ---- HEALTH HEADER ---- */}
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">

            <div>
              <p className="text-xs text-gray-400 tracking-wide">
                MOTOR HEALTH STATUS
              </p>
              <p
                className={`text-xl font-bold ${
                  systemStatus === "CRITICAL"
                    ? "text-red-500 animate-pulse"
                    : systemStatus === "WARNING"
                    ? "text-orange-400"
                    : "text-green-400"
                }`}
              >
                {health}%
              </p>
            </div>

            <div
              className={`px-4 py-1 rounded-lg text-sm font-semibold ${
                systemStatus === "CRITICAL"
                  ? "bg-red-900 text-red-400 animate-pulse"
                  : systemStatus === "WARNING"
                  ? "bg-orange-900 text-orange-400"
                  : "bg-green-900 text-green-400"
              }`}
            >
              {systemStatus}
            </div>
          </div>

          {/* ---- HEALTH BAR ---- */}
          <div className="px-4 pt-2">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-2 transition-all duration-700 ${
                  systemStatus === "CRITICAL"
                    ? "bg-red-500"
                    : systemStatus === "WARNING"
                    ? "bg-orange-400"
                    : "bg-green-500"
                }`}
                style={{ width: `${health}%` }}
              ></div>
            </div>
          </div>

          {/* ---- MACHINE AREA ---- */}
          <div className="flex-1 flex items-center justify-center">
            <GearAnimation />
          </div>

        </div>

        {/* ========== RIGHT GAUGES ========== */}
        <div className="lg:col-span-3 md:col-span-1 col-span-1 flex flex-col items-center gap-10 bg-[#111827] p-4 rounded-xl border border-gray-800 shadow-lg">

          <Gauge
  label="Vibration"
  value={vibration}
  min={0}
  max={10}
  unit="mm/s"
  scaleValues={[0, 2, 4, 6, 8, 10]}   // ✅ Manual scale
  orangeZone={6}
  redZone={8}
/>

<Gauge
  label="Temperature"
  value={temperature}
  min={0}
  max={100}
  unit="°C"
  scaleValues={[0, 25, 50, 75, 100]}  // ✅ Manual scale
  orangeZone={45}
  redZone={60}
  extraValue={`${humidity}%`}
  extraLabel="Humidity"
/>

        </div>

      </div>

      {/* ================= CHART SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

        <TrendChart
          title="Voltage Trend"
          color1="#00ffff"
          yLabel="Voltage (V)"
        />

        <TrendChart
          title="Current Trend"
          color1="#ffcc00"
          yLabel="Current (A)"
        />

        <TrendChart
          title="Vibration Trend"
          color1="#6366f1"
          yLabel="Vibration (mm/s)"
        />

        <TrendChart
          title="Temperature & Humidity Trend"
          color1="#ef4444"
          color2="#22d3ee"
          dual={true}
          yLabel="Temp / Hum"
        />

      </div>

    </div>
  );
}