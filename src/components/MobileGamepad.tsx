"use client";

type Props = {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onA?: () => void;
  onB?: () => void;
  onStart?: () => void;
};

export default function MobileGamepad({
  onUp,
  onDown,
  onLeft,
  onRight,
  onA,
  onB,
  onStart
}: Props) {
  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-between px-6 z-50 md:hidden select-none">

      {/* D PAD */}
      <div className="relative w-32 h-32">

        <button
          onTouchStart={onUp}
          className="absolute top-0 left-1/2 -translate-x-1/2 gamepad-btn"
        >
          ▲
        </button>

        <button
          onTouchStart={onLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 gamepad-btn"
        >
          ◀
        </button>

        <button
          onTouchStart={onRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 gamepad-btn"
        >
          ▶
        </button>

        <button
          onTouchStart={onDown}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 gamepad-btn"
        >
          ▼
        </button>

      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex flex-col items-center gap-4">

        <div className="flex gap-6">
          <button
            onTouchStart={onB}
            className="gamepad-btn rounded-full w-14 h-14"
          >
            B
          </button>

          <button
            onTouchStart={onA}
            className="gamepad-btn rounded-full w-16 h-16"
          >
            A
          </button>
        </div>

        {/* START BUTTON */}
        <button
          onTouchStart={onStart}
          className="bg-black border border-green-400 text-green-400 text-xs px-6 py-2 rounded shadow-md active:scale-95"
        >
          START
        </button>

      </div>
    </div>
  );
}