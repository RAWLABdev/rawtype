"use client";

import { useEffect, useMemo, useState } from "react";
import { levels } from "@/src/data/levels";
import { getBestScore, saveBestScore } from "@/src/lib/storage";
import { addRouteXP, getProgress } from "@/src/lib/progress";

export default function TypingTrainer() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [input, setInput] = useState("");
  const [currentWord, setCurrentWord] = useState(0);
  const [errors, setErrors] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const [bestScore, setBestScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [completedRoutes, setCompletedRoutes] = useState(0);

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

  useEffect(() => {
    if (!started || completed) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [started, completed]);

  const syncLocalProgress = (levelName: string) => {
    const progress = getProgress();

    setBestScore(getBestScore(levelName));
    setXp(progress.xp);
    setCompletedRoutes(progress.completedRoutes);
  };

  const reset = () => {
    setInput("");
    setCurrentWord(0);
    setErrors(0);
    setSeconds(0);
    setStarted(false);
    setShowCompleteModal(false);
  };

  const finishLevel = (nextCorrectWords: number) => {
    const finalWpm =
      seconds > 0 ? Math.round((nextCorrectWords / seconds) * 60) : 0;

    const currentBest = getBestScore(level.name);

    if (finalWpm > currentBest) {
      saveBestScore(level.name, finalWpm);
      setBestScore(finalWpm);
    }

    const progress = addRouteXP(50);

    setXp(progress.xp);
    setCompletedRoutes(progress.completedRoutes);
    setShowCompleteModal(true);
  };

  const handleLevelChange = (index: number) => {
    const nextLevel = levels[index];

    setLevelIndex(index);
    syncLocalProgress(nextLevel.name);
    reset();
  };

  const handleChange = (value: string) => {
    if (completed) return;

    if (!started) {
      setStarted(true);
      syncLocalProgress(level.name);
    }

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

      <div className="mb-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 lg:grid-cols-6 sm:text-base">
        <div className="border border-green-400/40 p-3">⏱ {seconds}s</div>
        <div className="border border-green-400/40 p-3">❌ {errors}</div>
        <div className="border border-green-400/40 p-3">⚡ {wpm} WPM</div>
        <div className="border border-green-400/40 p-3">🏆 {bestScore}</div>
        <div className="border border-green-400/40 p-3">XP {xp}</div>
        <div className="border border-green-400/40 p-3">
          ROUTES {completedRoutes}
        </div>
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

      <input
        autoFocus
        value={input}
        onChange={(event) => handleChange(event.target.value)}
        disabled={showCompleteModal}
        className="w-full border border-green-400 bg-black p-4 text-lg text-green-400 outline-none placeholder:text-green-800 disabled:opacity-40 sm:text-xl"
        placeholder="Start typing..."
      />

      {showCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg border border-green-400 bg-black p-6 shadow-[0_0_40px_rgba(74,222,128,0.35)]">
            <p className="mb-2 text-xs uppercase tracking-[0.4em] text-green-600">
              RAWTYPE_
            </p>

            <h2 className="mb-6 text-3xl font-black text-green-400 sm:text-5xl">
              LEVEL COMPLETE
            </h2>

            <div className="mb-6 grid grid-cols-2 gap-3 text-sm sm:text-base">
              <div className="border border-green-400/40 p-3">
                Accuracy {accuracy}%
              </div>

              <div className="border border-green-400/40 p-3">WPM {wpm}</div>

              <div className="border border-green-400/40 p-3">
                Best {bestScore}
              </div>

              <div className="border border-green-400/40 p-3">XP {xp}</div>

              <div className="col-span-2 border border-green-400/40 p-3">
                Routes {completedRoutes}
              </div>
            </div>

            <p className="mb-6 text-sm text-green-700">
              Route completed. Keep building rhythm, focus and precision.
            </p>

            <button
              onClick={reset}
              className="w-full border border-green-400 bg-green-400 px-6 py-3 font-bold text-black hover:bg-black hover:text-green-400"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      )}
    </section>
  );
}