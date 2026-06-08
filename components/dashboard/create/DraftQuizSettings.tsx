interface QuizSettingsCardProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  timeInMinutes: number;
  setTimeInMinutes: (value: number) => void;
}

export default function QuizSettingsCard({
  title,
  setTitle,
  description,
  setDescription,
  timeInMinutes,
  setTimeInMinutes,
}: QuizSettingsCardProps) {
  return (
    <div className="relative bg-wood-surface border-[6px] border-wood-border rounded-sm shadow-[0_3px_6px_rgba(0,0,0,0.8)] p-6 md:p-8 overflow-hidden transition-colors duration-300 space-y-6">
      <div className="absolute inset-0 border border-wood-border-focus/40 shadow-[inset_0_0_6px_rgba(0,0,0,0.5)] pointer-events-none"></div>

      <h2 className="text-base font-serif font-bold text-wood-text-primary uppercase tracking-wider border-b border-wood-border-focus/20 pb-2 drop-shadow-sm">
        ქვიზის პარამეტრები // Quiz Settings
      </h2>

      <div className="flex flex-col gap-2 relative">
        <label className="text-sm font-serif font-semibold text-wood-text-secondary tracking-wide drop-shadow-sm">
          ქვიზის სათაური // Quiz Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="მაგ: Advanced JavaScript Quiz"
          className="w-full bg-wood-base border-2 border-wood-border px-4 py-2.5 rounded shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] font-mono text-sm text-wood-text-primary focus:outline-none focus:border-wood-accent focus:ring-1 focus:ring-wood-accent transition-all"
        />
      </div>

      <div className="flex flex-col gap-2 relative">
        <label className="text-sm font-serif font-semibold text-wood-text-secondary tracking-wide drop-shadow-sm">
          აღწერა // Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="მოკლედ აღწერე რას ეხება ეს ქვიზი..."
          className="w-full h-28 bg-wood-base border-2 border-wood-border px-4 py-2.5 rounded shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] font-mono text-sm text-wood-text-primary focus:outline-none focus:border-wood-accent focus:ring-1 focus:ring-wood-accent transition-all resize-none"
        />
      </div>

      <div className="flex flex-col gap-2 relative max-w-xs">
        <label className="text-sm font-serif font-semibold text-wood-text-secondary tracking-wide drop-shadow-sm">
          დროის ლიმიტი (წუთები) // Time Limit (Minutes)
        </label>
        <div className="relative flex items-center">
          <input
            type="number"
            min={1}
            max={300}
            value={timeInMinutes || ""}
            onChange={(e) => setTimeInMinutes(Number(e.target.value))}
            placeholder="30"
            className="w-full bg-wood-base border-2 border-wood-border pl-4 pr-16 py-2.5 rounded shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] font-mono text-sm text-wood-text-primary focus:outline-none focus:border-wood-accent focus:ring-1 focus:ring-wood-accent transition-all"
          />
          <span className="absolute right-4 font-serif text-xs font-semibold text-wood-text-muted uppercase tracking-wider pointer-events-none">
            წუთი
          </span>
        </div>
      </div>
    </div>
  );
}
