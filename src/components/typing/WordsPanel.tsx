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
    <div className="mb-8 h-[220px] overflow-y-auto border border-green-400/40 bg-black/60 p-4 sm:h-[280px] sm:p-6 lg:h-[340px]">
      <div className="flex flex-wrap gap-x-3 gap-y-4 text-xl leading-relaxed sm:text-2xl md:text-3xl">
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