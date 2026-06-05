type RouteActionsProps = {
  onRandomRoute: () => void;
  onDailyRoute: () => void;
};

export function RouteActions({
  onRandomRoute,
  onDailyRoute,
}: RouteActionsProps) {
  return (
    <div className="mb-3 grid grid-cols-2 gap-2">
      <button
        onClick={onRandomRoute}
        className="border border-cyan-400 bg-cyan-400/10 px-2 py-2 text-[10px] font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black sm:text-xs"
      >
        🎲 Random
      </button>

      <button
        onClick={onDailyRoute}
        className="border border-yellow-400 bg-yellow-400/10 px-2 py-2 text-[10px] font-bold uppercase tracking-widest text-yellow-400 hover:bg-yellow-400 hover:text-black sm:text-xs"
      >
        ☀️ Daily
      </button>
    </div>
  );
}