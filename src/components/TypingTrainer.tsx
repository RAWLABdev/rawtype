"use client";

import { useEffect, useMemo, useState } from "react";
import { levels } from "@/src/data/levels";
import { getBestScore, saveBestScore } from "@/src/lib/storage";
import { addRouteXP, getProgress } from "@/src/lib/progress";
import { passages } from "@/src/data/passages";
import { getDailyRoute } from "@/src/lib/dailyRoute";

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
  const [streak, setStreak] = useState(0);

  const [customText, setCustomText] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState<string | null>(null);

  const level = levels[levelIndex];

  const activeText = customText ?? level.text;
  const activeTitle = customTitle ?? level.name;
  const activeCategory = customCategory ?? level.category;

  const words = useMemo(() => {
    return activeText.trim().split(/\s+/);
  }, [activeText]);

  const completed = currentWord >= words.length;

  const accuracy = Math.max(
    0,
    Math.round((currentWord / (currentWord + errors || 1)) * 100),
  );

  const wpm = seconds > 0 ? Math.round((currentWord / seconds) * 60) : 0;

  const progressPercent = Math.round((currentWord / words.length) * 100);

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
    setStreak(progress.streak);
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

    const scoreKey = customTitle ?? level.name;
    const currentBest = getBestScore(scoreKey);

    if (finalWpm > currentBest) {
      saveBestScore(scoreKey, finalWpm);
      setBestScore(finalWpm);
    }

    const progress = addRouteXP(50);

    setXp(progress.xp);
    setCompletedRoutes(progress.completedRoutes);
    setStreak(progress.streak);
    setShowCompleteModal(true);
  };

  const handleLevelChange = (index: number) => {
    const nextLevel = levels[index];

    setCustomText(null);
    setCustomTitle(null);
    setCustomCategory(null);
    setLevelIndex(index);
    syncLocalProgress(nextLevel.name);
    reset();
  };

  const handleChange = (value: string) => {
    if (completed) return;

    if (!started) {
      setStarted(true);
      syncLocalProgress(customTitle ?? level.name);
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

  const generateRandomRoute = () => {
    const random = passages[Math.floor(Math.random() * passages.length)];

    setCustomText(random.text);
    setCustomTitle(random.title);
    setCustomCategory(random.category.toUpperCase());
    syncLocalProgress(random.title);
    reset();
  };

  const generateDailyRoute = () => {
  const daily = getDailyRoute();

  setCustomText(daily.text);
  setCustomTitle(`Daily Route / ${daily.title}`);
  setCustomCategory(daily.category.toUpperCase());
  syncLocalProgress(daily.title);
  reset();
};

  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button
          onClick={generateRandomRoute}
          className="w-full border border-cyan-400 bg-cyan-400/10 px-4 py-3 text-sm font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black"
        >
          🎲 Random Route
        </button>
        <button
  onClick={generateDailyRoute}
  className="mt-3 w-full border border-yellow-400 bg-yellow-400/10 px-4 py-3 text-sm font-bold uppercase tracking-widest text-yellow-400 hover:bg-yellow-400 hover:text-black"
>
  ☀️ Daily Route
</button>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {levels.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleLevelChange(index)}
            className={`rounded-none border px-3 py-2 text-xs font-bold uppercase tracking-widest transition sm:px-4 sm:text-sm ${
              levelIndex === index && !customText
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
          Current route
        </p>

        <p className="mt-2 text-sm uppercase tracking-widest text-green-600">
          {activeCategory}
        </p>

        <h2 className="mt-2 text-2xl font-black text-green-400 sm:text-4xl">
          {activeTitle}
        </h2>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4 sm:text-base">
        <div className="border border-green-400/40 p-3">⚡ {wpm}</div>
        <div className="border border-green-400/40 p-3">🎯 {accuracy}%</div>
        <div className="border border-green-400/40 p-3">🔥 {streak}</div>
        <div className="border border-green-400/40 p-3">🏆 {bestScore}</div>
      </div>

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

              <div className="border border-green-400/40 p-3">
                Streak {streak}
              </div>

              <div className="border border-green-400/40 p-3">
                Routes {completedRoutes}
              </div>
            </div>

            <div className="mb-6">
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