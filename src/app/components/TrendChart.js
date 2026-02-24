"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function TrendChart({
  title,
  color1,
  color2,
  dual = false,
  yLabel = "Value",
}) {

  const data = Array.from({ length: 30 }, (_, i) => ({
    time: i,
    value1: Math.floor(Math.random() * 100),
    value2: Math.floor(Math.random() * 100),
  }));

  return (
    <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800 shadow-lg">

      <h2 className="text-sm text-gray-400 mb-3 tracking-wide">
        {title}
      </h2>

      <ResponsiveContainer width="100%" height={260}>
       <LineChart
  data={data}
  margin={{ top: 10, right: 20, left: 20, bottom: 20 }}  // increase bottom
>

          {/* X Axis = Time */}
          <XAxis
  dataKey="time"
  stroke="#6b7280"
  tick={{ fill: "#9ca3af", fontSize: 12 }}
  label={{
    value: "Time",
    position: "insideBottomRight",
    dy: 20,      // 🔥 Increase this to move label further from axis
    fill: "#6b7280",
  }}
/>

          {/* Y Axis = Sensor Value */}
          <YAxis
  stroke="#6b7280"
  tick={{ fill: "#9ca3af", fontSize: 12 }}
  label={{
    value: yLabel,
    angle: -90,
    position: "inside",
    dx: -10,  // 🔥 controls gap from axis line
    fill: "#6b7280",
  }}
/>

          <Tooltip
            contentStyle={{
              backgroundColor: "#0b1120",
              border: "1px solid #1f2937",
              borderRadius: "8px",
            }}
          />

          {dual && <Legend />}

          <Line
            type="monotone"
            dataKey="value1"
            stroke={color1}
            strokeWidth={2}
            dot={false}
          />

          {dual && (
            <Line
              type="monotone"
              dataKey="value2"
              stroke={color2}
              strokeWidth={2}
              dot={false}
            />
          )}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}