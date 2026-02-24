export default function Uptime({ seconds }) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <div className="text-sm text-gray-400">
      Uptime: {hrs}h {mins}m {secs}s
    </div>
  );
}