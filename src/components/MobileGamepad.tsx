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

  const press = (fn?: () => void) => (e: React.TouchEvent) => {
    e.preventDefault();
    fn?.();
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-between px-4 z-50 md:hidden select-none">

      {/* D PAD */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">

        {/* UP */}
        <button
          onTouchStart={press(onUp)}
          className="absolute top-0 left-1/2 -translate-x-1/2 gamepad-btn w-10 h-10 sm:w-12 sm:h-12"
        >
          ▲
        </button>

        {/* LEFT */}
        <button
          onTouchStart={press(onLeft)}
          className="absolute left-0 top-1/2 -translate-y-1/2 gamepad-btn w-10 h-10 sm:w-12 sm:h-12"
        >
          ◀
        </button>

        {/* RIGHT */}
        <button
          onTouchStart={press(onRight)}
          className="absolute right-0 top-1/2 -translate-y-1/2 gamepad-btn w-10 h-10 sm:w-12 sm:h-12"
        >
          ▶
        </button>

        {/* DOWN */}
        <button
          onTouchStart={press(onDown)}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 gamepad-btn w-10 h-10 sm:w-12 sm:h-12"
        >
          ▼
        </button>

      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex flex-col items-center gap-4">

        <div className="flex gap-6">
          <button
            onTouchStart={press(onB)}
            className="gamepad-btn rounded-full w-12 h-12 sm:w-14 sm:h-14"
          >
            B
          </button>

          <button
            onTouchStart={press(onA)}
            className="gamepad-btn rounded-full w-12 h-12 sm:w-14 sm:h-14"
          >
            A
          </button>
        </div>

        {/* START */}
        <button
          onTouchStart={press(onStart)}
          className="bg-black border border-green-400 text-green-400 text-xs px-6 py-2 rounded shadow-md active:scale-95"
        >
          START
        </button>

      </div>
    </div>
  );
}