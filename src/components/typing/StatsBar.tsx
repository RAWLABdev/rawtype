import { formatTime } from "@/src/utils/formatTime";

type StatsBarProps = {
  seconds: number;
  wpm: number;
  accuracy: number;
  errors: number;
  bestScore: number;
};

export function StatsBar({
  seconds,
  wpm,
  accuracy,
  errors,
  bestScore,
}: StatsBarProps) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      <div className="border border-green-400/40 p-3">
        ⏱ {formatTime(seconds)}
      </div>

      <div className="border border-green-400/40 p-3">⚡ {wpm}</div>

      <div className="border border-green-400/40 p-3">🎯 {accuracy}%</div>

      <div className="border border-green-400/40 p-3">❌ {errors}</div>

      <div className="border border-green-400/40 p-3">🏆 {bestScore}</div>
    </div>
  );
}