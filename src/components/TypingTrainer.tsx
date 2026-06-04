"use client";

import { useEffect, useMemo, useState } from "react";
import { levels } from "@/src/data/levels";

export default function TypingTrainer() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [input, setInput] = useState("");
  const [currentWord, setCurrentWord] = useState(0);
  const [errors, setErrors] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);

  const level = levels[levelIndex];

  const words = useMemo(() => {
    return level.text.split(" ");
  }, [level]);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [started]);

  const handleChange = (value: string) => {
    if (!started) setStarted(true);

    setInput(value);

    if (value.endsWith(" ")) {
      const typedWord = value.trim();

      if (typedWord === words[currentWord]) {
        setCurrentWord((prev) => prev + 1);
      } else {
        setErrors((prev) => prev + 1);
      }

      setInput("");
    }
  };

  const completed = currentWord >= words.length;

  const accuracy = Math.max(
    0,
    Math.round(
      ((currentWord / (currentWord + errors || 1)) * 100)
    )
  );

  const wpm =
    seconds > 0
      ? Math.round((currentWord / seconds) * 60)
      : 0;

  const reset = () => {
    setInput("");
    setCurrentWord(0);
    setErrors(0);
    setSeconds(0);
    setStarted(false);
  };

  return (
    <div className="max-w-5xl mx-auto">

      <div className="flex gap-3 mb-8 flex-wrap">
        {levels.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              setLevelIndex(index);
              reset();
            }}
            className={`px-4 py-2 border ${
              levelIndex === index
                ? "bg-green-400 text-black"
                : "border-green-400"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mb-6 text-xl">
        LEVEL: {level.name}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div>⏱ {seconds}s</div>
        <div>❌ {errors}</div>
        <div>⚡ {wpm} WPM</div>
      </div>

      <div className="text-2xl leading-loose mb-10">
        {words.map((word, index) => (
          <span
            key={index}
            className={`mr-3 ${
              index < currentWord
                ? "text-green-400"
                : index === currentWord
                ? "text-yellow-400 underline"
                : "text-gray-500"
            }`}
          >
            {word}
          </span>
        ))}
      </div>

      {!completed ? (
        <input
          autoFocus
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full bg-black border border-green-400 p-4 text-xl outline-none"
          placeholder="Start typing..."
        />
      ) : (
        <div className="space-y-4">
          <h2 className="text-4xl text-green-400">
            LEVEL COMPLETE
          </h2>

          <p>Accuracy: {accuracy}%</p>
          <p>WPM: {wpm}</p>

          <button
            onClick={reset}
            className="px-6 py-3 bg-green-400 text-black font-bold"
          >
            TRY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}