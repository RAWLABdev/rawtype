export type RawtypeProgress = {
  xp: number;
  completedRoutes: number;
  streak: number;
  lastRouteDate: string | null;
};

const STORAGE_KEY = "rawtype-progress";

const getTodayKey = () => new Date().toISOString().slice(0, 10);

const getYesterdayKey = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
};

export const getProgress = (): RawtypeProgress => {
  if (typeof window === "undefined") {
    return {
      xp: 0,
      completedRoutes: 0,
      streak: 0,
      lastRouteDate: null,
    };
  }

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return {
      xp: 0,
      completedRoutes: 0,
      streak: 0,
      lastRouteDate: null,
    };
  }

  return JSON.parse(saved);
};

export const saveProgress = (progress: RawtypeProgress) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const addRouteXP = (xpToAdd: number) => {
  const current = getProgress();

  const today = getTodayKey();
  const yesterday = getYesterdayKey();

  const alreadyCompletedToday = current.lastRouteDate === today;

  const nextStreak = alreadyCompletedToday
    ? current.streak
    : current.lastRouteDate === yesterday
      ? current.streak + 1
      : 1;

  const nextProgress = {
    xp: current.xp + xpToAdd,
    completedRoutes: current.completedRoutes + 1,
    streak: nextStreak,
    lastRouteDate: today,
  };

  saveProgress(nextProgress);

  return nextProgress;
};