import { passages } from "@/src/data/passages";

export const getDailyRoute = () => {
  const today = new Date().toISOString().slice(0, 10);

  const seed = today
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const index = seed % passages.length;

  return passages[index];
};