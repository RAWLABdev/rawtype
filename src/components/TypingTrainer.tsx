"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { levels } from "@/src/data/levels";
import { passages } from "@/src/data/passages";
import { getBestScore, saveBestScore } from "@/src/lib/storage";
import { addRouteXP, getProgress } from "@/src/lib/progress";
import { getDailyRoute } from "@/src/lib/dailyRoute";
import { StatsBar } from "@/src/components/typing/StatsBar";
import { RouteActions } from "@/src/components/typing/RouteActions";
import { LevelSelector } from "@/src/components/typing/LevelSelector";
import { RouteHeader } from "@/src/components/typing/RouteHeader";
import { ProgressBar } from "@/src/components/typing/ProgressBar";
import { WordsPanel } from "@/src/components/typing/WordsPanel";
import { TypingInput } from "@/src/components/typing/TypingInput";
import { CompleteModal } from "@/src/components/typing/CompleteModal";
import {
  GameModeSelector,
  type GameMode,
} from "@/src/components/typing/GameModeSelector";

type RouteType = "level" | "random" | "daily";

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
  const [routeType, setRouteType] = useState<RouteType>("level");
  const [gameMode, setGameMode] = useState<GameMode>("free");

  const currentWordRef = useRef(0);
  const finishedRef = useRef(false);

  const level = levels[levelIndex];

  const activeText = customText ?? level.text;
  const activeTitle = customTitle ?? level.name;
  const activeCategory = customCategory ?? level.category;

  const words = useMemo(() => activeText.trim().split(/\s+/), [activeText]);

  const completed = currentWord >= words.length;

  const accuracy = Math.max(
    0,
    Math.round((currentWord / (currentWord + errors || 1)) * 100),
  );

  const wpm = seconds > 0 ? Math.round((currentWord / seconds) * 60) : 0;

  const progressPercent = Math.round((currentWord / words.length) * 100);

  const timeLimit = gameMode === "60s" ? 60 : gameMode === "120s" ? 120 : null;

  const timeLeft = timeLimit ? Math.max(timeLimit - seconds, 0) : null;

  const isTimeAttack = Boolean(timeLimit);

  const syncLocalProgress = (routeName: string) => {
    const progress = getProgress();

    setBestScore(getBestScore(routeName));
    setXp(progress.xp);
    setCompletedRoutes(progress.completedRoutes);
    setStreak(progress.streak);
  };

  const reset = useCallback(() => {
    setInput("");
    setCurrentWord(0);
    currentWordRef.current = 0;
    setErrors(0);
    setSeconds(0);
    setStarted(false);
    setShowCompleteModal(false);
    finishedRef.current = false;
  }, []);

  const finishSession = useCallback(
    (nextCorrectWords = currentWordRef.current) => {
      if (finishedRef.current) return;

      finishedRef.current = true;

      const finalWpm =
        seconds > 0 ? Math.round((nextCorrectWords / seconds) * 60) : 0;

      const scoreKey = customTitle ?? level.name;
      const currentBest = getBestScore(scoreKey);

      if (finalWpm > currentBest) {
        saveBestScore(scoreKey, finalWpm);
        setBestScore(finalWpm);
      }

      const progress = addRouteXP(isTimeAttack ? 75 : 50);

      setXp(progress.xp);
      setCompletedRoutes(progress.completedRoutes);
      setStreak(progress.streak);
      setStarted(false);
      setShowCompleteModal(true);
    },
    [seconds, customTitle, level.name, isTimeAttack],
  );

  useEffect(() => {
    if (!started || showCompleteModal) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;

        if (timeLimit && next >= timeLimit && !finishedRef.current) {
          window.setTimeout(() => {
            finishSession(currentWordRef.current);
          }, 0);
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [started, showCompleteModal, timeLimit, finishSession]);

  const handleLevelChange = (index: number) => {
    const nextLevel = levels[index];

    setRouteType("level");
    setCustomText(null);
    setCustomTitle(null);
    setCustomCategory(null);
    setLevelIndex(index);
    syncLocalProgress(nextLevel.name);
    reset();
  };

  const handleGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
    reset();
  };

  const handleChange = (value: string) => {
    if (showCompleteModal) return;
    if (completed && !isTimeAttack) return;

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

      if (nextWordIndex >= words.length) {
        if (isTimeAttack) {
          setCurrentWord(0);
          currentWordRef.current = 0;
        } else {
          setCurrentWord(nextWordIndex);
          currentWordRef.current = nextWordIndex;
          finishSession(nextWordIndex);
        }
      } else {
        setCurrentWord(nextWordIndex);
        currentWordRef.current = nextWordIndex;
      }
    } else {
      setErrors((prev) => prev + 1);
    }

    setInput("");
  };

  const generateRandomRoute = () => {
    const random = passages[Math.floor(Math.random() * passages.length)];

    setRouteType("random");
    setCustomText(random.text);
    setCustomTitle(random.title);
    setCustomCategory(random.category.toUpperCase());
    syncLocalProgress(random.title);
    reset();
  };

  const generateDailyRoute = () => {
    const daily = getDailyRoute();

    setRouteType("daily");
    setCustomText(daily.text);
    setCustomTitle(`Daily Route / ${daily.title}`);
    setCustomCategory(daily.category.toUpperCase());
    syncLocalProgress(daily.title);
    reset();
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-3 sm:px-6 lg:px-8">
      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-[2fr_3fr]">
  <RouteActions
    onRandomRoute={generateRandomRoute}
    onDailyRoute={generateDailyRoute}
  />

  <GameModeSelector gameMode={gameMode} onChange={handleGameModeChange} />
</div>

      <LevelSelector
        levels={levels}
        activeLevelIndex={levelIndex}
        isCustomRoute={Boolean(customText)}
        onLevelChange={handleLevelChange}
      />

      <RouteHeader
        title={
          isTimeAttack && timeLeft !== null
            ? `${activeTitle} / ${timeLeft}s left`
            : activeTitle
        }
        category={
          isTimeAttack ? `${activeCategory} / TIME ATTACK` : activeCategory
        }
      />

      <StatsBar
        seconds={seconds}
        wpm={wpm}
        accuracy={accuracy}
        errors={errors}
        bestScore={bestScore}
      />

      <ProgressBar progressPercent={progressPercent} />

      <WordsPanel words={words} currentWord={currentWord} />

      <TypingInput
        value={input}
        disabled={showCompleteModal}
        onChange={handleChange}
      />

      {showCompleteModal ? (
        <CompleteModal
          routeType={routeType}
          accuracy={accuracy}
          wpm={wpm}
          bestScore={bestScore}
          xp={xp}
          streak={streak}
          completedRoutes={completedRoutes}
          progressPercent={progressPercent}
          onReset={reset}
        />
      ) : null}
    </section>
  );
}
