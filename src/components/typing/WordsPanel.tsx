type WordsPanelProps = {
  words: string[];
  currentWord: number;
};

export function WordsPanel({ words, currentWord }: WordsPanelProps) {
  return (
    <div className="mb-8 h-[340px] overflow-y-auto border border-green-400/40 bg-black/60 p-4 sm:p-6">
      <div className="flex flex-wrap gap-x-3 gap-y-4 text-xl leading-relaxed sm:text-2xl md:text-3xl">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={`max-w-full break-words rounded px-1 ${
              index < currentWord
                ? "bg-green-400 text-black"
                : index === currentWord
                  ? "bg-yellow-300 text-black underline decoration-black"
                  : "text-gray-500"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}