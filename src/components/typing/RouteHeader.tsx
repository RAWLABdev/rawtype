type RouteHeaderProps = {
  title: string;
  category: string;
};

export function RouteHeader({ title, category }: RouteHeaderProps) {
  return (
    <div className="mb-6 border border-green-400/40 p-4">
      <p className="text-xs uppercase tracking-[0.3em] text-green-600">
        Current route
      </p>

      <p className="mt-2 text-sm uppercase tracking-widest text-green-600">
        {category}
      </p>

      <h2 className="mt-2 text-2xl font-black text-green-400 sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}