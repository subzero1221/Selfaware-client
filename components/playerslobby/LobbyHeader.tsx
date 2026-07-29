export default function LobbyHeader() {
  return (
    <header className="relative w-full flex flex-col items-center bg-[#EF476F] border-4 border-amber-950 p-8 rounded-3xl mb-12 shadow-[4px_8px_0_0_rgba(67,20,7,1)] text-center -rotate-1 hover:rotate-0 transition-transform">
      <div className="w-16 h-16 bg-white border-4 border-amber-950 rounded-2xl flex items-center justify-center mb-6 shadow-[0_4px_0_0_rgba(67,20,7,1)] -rotate-3 hover:scale-110 hover:rotate-12 transition-transform">
        <svg
          className="w-8 h-8 text-amber-950"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-white tracking-wide mb-4 drop-shadow-[0_4px_0_rgba(67,20,7,1)] uppercase">
        შენ თამაშში ხარ!
      </h1>

      <div className="flex items-center gap-3 mt-2 bg-white px-5 py-2.5 rounded-2xl border-4 border-amber-950 shadow-[4px_4px_0_0_rgba(67,20,7,1)] rotate-2">
        <span className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06D6A0] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#06D6A0] border-2 border-amber-950"></span>
        </span>
        <p className="text-sm md:text-base font-black text-amber-950 tracking-wide uppercase">
          ველოდებით მოთამაშეებს...
        </p>
      </div>
    </header>
  );
}
