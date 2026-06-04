export const saveBestScore = (
  level: string,
  score: number
) => {
  localStorage.setItem(
    `rawtype-${level}`,
    String(score)
  );
};

export const getBestScore = (
  level: string
) => {
  return localStorage.getItem(`rawtype-${level}`);
};