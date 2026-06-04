type RouteActionsProps = {
  onRandomRoute: () => void;
  onDailyRoute: () => void;
};

export function RouteActions({
  onRandomRoute,
  onDailyRoute,
}: RouteActionsProps) {
  return (
    <>
      <div className="mb-3">
        <button
          onClick={onRandomRoute}
          className="w-full border border-cyan-400 bg-cyan-400/10 px-4 py-3 text-sm font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black"
        >
          🎲 Random Route
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={onDailyRoute}
          className="w-full border border-yellow-400 bg-yellow-400/10 px-4 py-3 text-sm font-bold uppercase tracking-widest text-yellow-400 hover:bg-yellow-400 hover:text-black"
        >
          ☀️ Daily Route
        </button>
      </div>
    </>
  );
}