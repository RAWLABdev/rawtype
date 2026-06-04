import type { Level } from "@/src/data/levels";

type LevelSelectorProps = {
  levels: Level[];
  activeLevelIndex: number;
  isCustomRoute: boolean;
  onLevelChange: (index: number) => void;
};

export function LevelSelector({
  levels,
  activeLevelIndex,
  isCustomRoute,
  onLevelChange,
}: LevelSelectorProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {levels.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onLevelChange(index)}
          className={`rounded-none border px-3 py-2 text-xs font-bold uppercase tracking-widest transition sm:px-4 sm:text-sm ${
            activeLevelIndex === index && !isCustomRoute
              ? "border-green-400 bg-green-400 text-black"
              : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}