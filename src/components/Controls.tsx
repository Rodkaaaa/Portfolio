"use client";

export default function Controls() {
  return (
    <div className="fixed bottom-6 right-6 bg-black/80 border border-green-400 text-green-400 p-4 text-xs md:text-sm rounded shadow-lg z-50 font-mono">
      <p className="text-yellow-300 mb-2">CONTROLS</p>

      <div className="flex flex-col gap-1">
        <p>↑ ↓ : MOVE</p>
        <p>ENTER : SELECT</p>
        <p>ESC : BACK</p>
      </div>
    </div>
  );
}