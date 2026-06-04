export type PassageCategory =
  | "dev"
  | "climbing"
  | "english"
  | "rawlab"
  | "longform";

export type Passage = {
  id: string;
  title: string;
  category: PassageCategory;
  difficulty: "easy" | "medium" | "hard" | "longform";
  text: string;
};

export const passages: Passage[] = [
  {
    id: "dev-clean-code",
    title: "Clean Code",
    category: "dev",
    difficulty: "medium",
    text: "clean code is not about writing clever lines it is about creating systems that other developers can understand maintain improve and trust over time",
  },
  {
    id: "dev-react-native",
    title: "React Native Flow",
    category: "dev",
    difficulty: "medium",
    text: "react native connects product design mobile performance and user experience through components navigation state management testing releases and continuous improvement",
  },
  {
    id: "climbing-practice",
    title: "Climbing Practice",
    category: "climbing",
    difficulty: "medium",
    text: "climbing teaches patience precision breathing body awareness and the ability to stay calm while solving problems under pressure",
  },
  {
    id: "english-confidence",
    title: "English Confidence",
    category: "english",
    difficulty: "hard",
    text: "consistent practice creates confidence and confidence creates opportunities because communication improves when you repeat with intention and patience every single day",
  },
  {
    id: "rawlab-system",
    title: "RAWLAB System",
    category: "rawlab",
    difficulty: "longform",
    text: "movement code and design share the same rhythm repetition feedback and intention every session is a small experiment and every experiment creates a better version of the system",
  },
  {
    id: "longform-discipline",
    title: "Discipline Compounds",
    category: "longform",
    difficulty: "longform",
    text: "the purpose of practice is not perfection the purpose of practice is adaptation every repetition creates a small change and every small change compounds over months and years into meaningful progress whether in climbing software design communication or life itself",
  },
];