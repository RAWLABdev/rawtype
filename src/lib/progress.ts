export type RawtypeProgress = {
  xp: number;
  completedRoutes: number;
  lastRouteDate: string | null;
};

const STORAGE_KEY = "rawtype-progress";

export const getProgress = (): RawtypeProgress => {
  if (typeof window === "undefined") {
    return {
      xp: 0,
      completedRoutes: 0,
      lastRouteDate: null,
    };
  }

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return {
      xp: 0,
      completedRoutes: 0,
      lastRouteDate: null,
    };
  }

  return JSON.parse(saved);
};

export const saveProgress = (progress: RawtypeProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const addRouteXP = (xpToAdd: number) => {
  const current = getProgress();

  const nextProgress = {
    xp: current.xp + xpToAdd,
    completedRoutes: current.completedRoutes + 1,
    lastRouteDate: new Date().toISOString(),
  };

  saveProgress(nextProgress);

  return nextProgress;
};