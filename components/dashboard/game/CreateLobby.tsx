"use client";

interface CreateLobbyViewProps {
  onCreate: (e: React.FormEvent) => void;
  isPending: boolean;
}

export default function CreateLobbyView({
  onCreate,
  isPending,
}: CreateLobbyViewProps) {
  return (
    <form onSubmit={onCreate} className="space-y-5 pt-2">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-serif text-wood-text-secondary tracking-wide drop-shadow-sm leading-relaxed text-center">
          შექმენით ახალი ოთახი და გაუზიარეთ PIN კოდი მოთამაშეებს. ტესტის არჩევას
          შეძლებთ ოთახის შექმნის შემდეგ.
        </p>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`
          w-full mt-4 py-4 cursor-pointer px-4 font-bold font-serif tracking-wider text-wood-text-primary text-lg uppercase
          bg-wood-surface border-2 border-wood-border-focus rounded shadow-lg
          hover:bg-wood-surface-hover hover:shadow-xl hover:border-wood-accent hover:text-wood-accent
          active:translate-y-1
          transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isPending ? "ოთახი იქმნება..." : "ახალი ოთახის შექმნა ⚡"}
      </button>
    </form>
  );
}
