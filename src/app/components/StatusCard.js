export default function StatusCard({ title, value, color }) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
      <h2 className="text-gray-400">{title}</h2>
      <p className={`text-2xl font-bold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  );
}