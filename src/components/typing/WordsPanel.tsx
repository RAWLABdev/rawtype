import { useEffect, useRef } from "react";

type WordsPanelProps = {
  words: string[];
  currentWord: number;
};

export function WordsPanel({ words, currentWord }: WordsPanelProps) {
  const activeWordRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    activeWordRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [currentWord]);

  return (
    <div className="mb-4 h-[180px] overflow-y-auto border border-green-400/40 bg-black/60 p-3 sm:h-[240px] sm:p-5 lg:h-[280px]">
      <div className="flex flex-wrap gap-x-2 gap-y-3 text-lg leading-relaxed sm:text-xl md:text-2xl">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            ref={index === currentWord ? activeWordRef : null}
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