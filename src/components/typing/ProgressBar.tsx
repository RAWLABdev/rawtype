type ProgressBarProps = {
  progressPercent: number;
};

export function ProgressBar({ progressPercent }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex justify-between text-xs uppercase tracking-widest text-green-600">
        <span>Progress</span>
        <span>{progressPercent}%</span>
      </div>

      <div className="h-2 border border-green-400">
        <div
          className="h-full bg-green-400 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}