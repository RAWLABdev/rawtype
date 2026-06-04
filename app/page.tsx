import TypingTrainer from "@/src/components/TypingTrainer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-400 p-10 font-mono">
      <h1 className="text-6xl font-bold mb-3">
        RAWTYPE_
      </h1>

      <p className="text-green-600 mb-12">
        Retro Typing Trainer for Developers
      </p>

      <TypingTrainer />
    </main>
  );
}