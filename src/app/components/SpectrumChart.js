import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const sampleData = Array.from({ length: 50 }, (_, i) => ({
  freq: i * 10,
  value: Math.random() * 5,
}));

export default function SpectrumChart() {
  return (
    <LineChart width={600} height={250} data={sampleData}>
      <XAxis dataKey="freq" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#00ffff" />
    </LineChart>
  );
}