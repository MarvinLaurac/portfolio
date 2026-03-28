export default function TopBanner() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60]"
      style={{ backgroundColor: "#F0EDE8", width: "100vw" }}
    >
      <div className="flex items-center justify-center gap-2 py-2 px-4">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#1a1a1a]/35" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-[11px] sm:text-[12px] text-[#1a1a1a]/40 text-center leading-tight">
          Une mise à jour importante est en cours — tester et analyser chaque agent sans API.
        </p>
      </div>
      <div className="h-px bg-[#e1ccbb]" style={{ width: "100vw" }} />
    </div>
  );
}
