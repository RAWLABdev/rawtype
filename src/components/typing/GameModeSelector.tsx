export type GameMode = "free" | "60s" | "120s";

type GameModeSelectorProps = {
  gameMode: GameMode;
  onChange: (mode: GameMode) => void;
};

const modes: { label: string; value: GameMode }[] = [
  {
    label: "Free",
    value: "free",
  },
  {
    label: "60 sec",
    value: "60s",
  },
  {
    label: "120 sec",
    value: "120s",
  },
];

export function GameModeSelector({
  gameMode,
  onChange,
}: GameModeSelectorProps) {
  return (
    <div className="mb-6 grid grid-cols-3 gap-2">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onChange(mode.value)}
          className={`border px-3 py-2 text-xs font-bold uppercase tracking-widest transition sm:text-sm ${
            gameMode === mode.value
              ? "border-pink-400 bg-pink-400 text-black"
              : "border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}