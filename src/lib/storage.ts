export const saveBestScore = (level: string, score: number) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(`rawtype-${level}`, String(score));
};

export const getBestScore = (level: string) => {
  if (typeof window === "undefined") return 0;

  return Number(localStorage.getItem(`rawtype-${level}`) || 0);
};