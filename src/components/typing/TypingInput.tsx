type TypingInputProps = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
};

export function TypingInput({ value, disabled, onChange }: TypingInputProps) {
  return (
    <input
      autoFocus
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      className="w-full border border-green-400 bg-black p-4 text-lg text-green-400 outline-none placeholder:text-green-800 disabled:opacity-40 sm:text-xl"
      placeholder="Start typing..."
    />
  );
}