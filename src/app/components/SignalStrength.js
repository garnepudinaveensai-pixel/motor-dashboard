export default function SignalStrength({ value }) {
  return (
    <div className="flex items-end gap-1">
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`w-2 h-${bar * 3} ${
            value >= bar * 25 ? "bg-green-400" : "bg-gray-500"
          }`}
        />
      ))}
    </div>
  );
}