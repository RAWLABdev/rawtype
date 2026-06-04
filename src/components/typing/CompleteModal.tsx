import { ProgressBar } from "@/src/components/typing/ProgressBar";

type RouteType = "level" | "random" | "daily";

type CompleteModalProps = {
  routeType: RouteType;
  accuracy: number;
  wpm: number;
  bestScore: number;
  xp: number;
  streak: number;
  completedRoutes: number;
  progressPercent: number;
  onReset: () => void;
};

export function CompleteModal({
  routeType,
  accuracy,
  wpm,
  bestScore,
  xp,
  streak,
  completedRoutes,
  progressPercent,
  onReset,
}: CompleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg border border-green-400 bg-black p-6 shadow-[0_0_40px_rgba(74,222,128,0.35)]">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-green-600">
          RAWTYPE_
        </p>

        <h2 className="mb-6 text-3xl font-black text-green-400 sm:text-5xl">
          {routeType === "daily" ? "DAILY ROUTE COMPLETE" : "LEVEL COMPLETE"}
        </h2>

        <div className="mb-6 grid grid-cols-2 gap-3 text-sm sm:text-base">
          <div className="border border-green-400/40 p-3">
            Accuracy {accuracy}%
          </div>

          <div className="border border-green-400/40 p-3">WPM {wpm}</div>

          <div className="border border-green-400/40 p-3">Best {bestScore}</div>

          <div className="border border-green-400/40 p-3">XP {xp}</div>

          <div className="border border-green-400/40 p-3">
            Streak {streak}
          </div>

          <div className="border border-green-400/40 p-3">
            Routes {completedRoutes}
          </div>
        </div>

        <ProgressBar progressPercent={progressPercent} />

        <p className="mb-6 text-sm text-green-700">
          {routeType === "daily"
            ? "Daily route completed. You showed up today."
            : "Route completed. Keep building rhythm, focus and precision."}
        </p>

        <button
          onClick={onReset}
          className="w-full border border-green-400 bg-green-400 px-6 py-3 font-bold text-black hover:bg-black hover:text-green-400"
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  );
}