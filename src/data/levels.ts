export type Level = {
  id: number;
  name: string;
  category: string;
  difficulty: "easy" | "medium" | "hard" | "longform";
  text: string;
};

export const levels: Level[] = [
  {
    id: 1,
    name: "BOOT MODE",
    category: "DEV",
    difficulty: "easy",
    text: "const let return function array object string boolean promise async await",
  },

  {
    id: 2,
    name: "REACT NATIVE",
    category: "DEV",
    difficulty: "medium",
    text: "useeffect usememo usecallback navigation redux context provider state props component",
  },

  {
    id: 3,
    name: "CLIMBER FLOW",
    category: "MOVEMENT",
    difficulty: "medium",
    text: "crimp sloper pinch mantle dyno heelhook toehook beta sequence project send flash",
  },

  {
    id: 4,
    name: "ENGLISH B1",
    category: "LANGUAGE",
    difficulty: "hard",
    text: "consistent practice creates confidence and confidence creates opportunity in both work and life",
  },

  {
    id: 5,
    name: "DEEP FOCUS",
    category: "FOCUS",
    difficulty: "hard",
    text: "focus is the ability to choose what deserves attention and ignore everything that does not contribute to your goals",
  },

  {
    id: 6,
    name: "RAWLAB ESSAY",
    category: "IDEAS",
    difficulty: "longform",
    text: "movement code and design share the same principles repetition feedback and deliberate practice every session is an opportunity to improve and refine the way we think and create",
  },

  {
    id: 7,
    name: "SYSTEM DESIGN",
    category: "ARCHITECTURE",
    difficulty: "longform",
    text: "great software systems are not defined by complexity they are defined by clarity maintainability scalability and the ability to evolve over time without creating unnecessary friction",
  },

  {
    id: 8,
    name: "LONGFORM MODE",
    category: "RAWLAB",
    difficulty: "longform",
    text: "the purpose of practice is not perfection the purpose of practice is adaptation every repetition creates a small change and every small change compounds over months and years into meaningful progress whether in climbing software design communication or life itself",
  },
];