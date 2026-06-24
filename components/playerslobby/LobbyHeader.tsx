export default function LobbyHeader() {
  return (
    <header className="relative w-full overflow-hidden flex flex-col items-center bg-wood-surface/80 backdrop-blur-md border border-wood-border/60 p-8 rounded-[2rem] mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-center">
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-16 h-16 bg-green-500/20 border-2 border-green-400/50 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
        <svg
          className="w-8 h-8 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-wood-text-secondary tracking-wide mb-2">
        შენ თამაშში ხარ!
      </h1>

      <div className="flex items-center gap-3 mt-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wood-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-wood-accent"></span>
        </span>
        <p className="text-sm font-semibold text-wood-text-secondary animate-pulse tracking-wide uppercase">
          ველოდებით მოთამაშეებს...
        </p>
      </div>
    </header>
  );
}
