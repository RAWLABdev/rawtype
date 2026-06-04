"use client";

import { useEffect, useMemo, useState } from "react";
import { levels } from "@/src/data/levels";
import { getBestScore, saveBestScore } from "@/src/lib/storage";

export default function TypingTrainer() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [input, setInput] = useState("");
  const [currentWord, setCurrentWord] = useState(0);
  const [errors, setErrors] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);

  const level = levels[levelIndex];

  const words = useMemo(() => {
    return level.text.trim().split(/\s+/);
  }, [level.text]);

  const completed = currentWord >= words.length;

  const accuracy = Math.max(
    0,
    Math.round((currentWord / (currentWord + errors || 1)) * 100)
  );

  const wpm = seconds > 0 ? Math.round((currentWord / seconds) * 60) : 0;

  const bestScore = Number(getBestScore(level.name) || 0);

  useEffect(() => {
    if (!started || completed) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [started, completed]);

  const reset = () => {
    setInput("");
    setCurrentWord(0);
    setErrors(0);
    setSeconds(0);
    setStarted(false);
  };

  const finishLevel = (nextCorrectWords: number) => {
    const finalWpm =
      seconds > 0 ? Math.round((nextCorrectWords / seconds) * 60) : 0;

    const currentBest = Number(getBestScore(level.name) || 0);

    if (finalWpm > currentBest) {
      saveBestScore(level.name, finalWpm);
    }
  };

  const handleLevelChange = (index: number) => {
    setLevelIndex(index);
    reset();
  };

  const handleChange = (value: string) => {
    if (completed) return;
    if (!started) setStarted(true);

    setInput(value);

    if (!value.endsWith(" ")) return;

    const typedWord = value.trim();
    const expectedWord = words[currentWord];

    if (typedWord === expectedWord) {
      const nextWordIndex = currentWord + 1;

      setCurrentWord(nextWordIndex);

      if (nextWordIndex >= words.length) {
        finishLevel(nextWordIndex);
      }
    } else {
      setErrors((prev) => prev + 1);
    }

    setInput("");
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap gap-3">
        {levels.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleLevelChange(index)}
            className={`rounded-none border px-3 py-2 text-xs font-bold uppercase tracking-widest transition sm:px-4 sm:text-sm ${
              levelIndex === index
                ? "border-green-400 bg-green-400 text-black"
                : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mb-6 border border-green-400/40 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-green-600">
          Current level
        </p>

        <h2 className="mt-2 text-2xl font-black text-green-400 sm:text-4xl">
          {level.name}
        </h2>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4 sm:text-base">
        <div className="border border-green-400/40 p-3">⏱ {seconds}s</div>
        <div className="border border-green-400/40 p-3">❌ {errors}</div>
        <div className="border border-green-400/40 p-3">⚡ {wpm} WPM</div>
        <div className="border border-green-400/40 p-3">🏆 {bestScore}</div>
      </div>

      <div className="mb-8 w-full overflow-hidden border border-green-400/40 bg-black/60 p-4 sm:p-6">
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

      {!completed ? (
        <input
          autoFocus
          value={input}
          onChange={(event) => handleChange(event.target.value)}
          className="w-full border border-green-400 bg-black p-4 text-lg text-green-400 outline-none placeholder:text-green-800 sm:text-xl"
          placeholder="Start typing..."
        />
      ) : (
        <div className="space-y-4 border border-green-400 p-5">
          <h2 className="text-3xl font-black text-green-400 sm:text-5xl">
            LEVEL COMPLETE
          </h2>

          <p>Accuracy: {accuracy}%</p>
          <p>WPM: {wpm}</p>
          <p>Best Score: {bestScore} WPM</p>

          <button
            onClick={reset}
            className="border border-green-400 bg-green-400 px-6 py-3 font-bold text-black hover:bg-black hover:text-green-400"
          >
            TRY AGAIN
          </button>
        </div>
      )}
    </section>
  );
}