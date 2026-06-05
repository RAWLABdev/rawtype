type RouteHeaderProps = {
  title: string;
  category: string;
};

export function RouteHeader({ title, category }: RouteHeaderProps) {
  return (
    <div className="mb-4 border border-green-400/40 p-3 sm:p-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-green-600">
        Current route
      </p>

      <p className="mt-1 text-xs uppercase tracking-widest text-green-600">
        {category}
      </p>

      <h2 className="mt-1 text-xl font-black text-green-400 sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}