"use client";

type DevStatsProps = {
  level: number;
  xp: number;
};

export default function DevStats({ level, xp }: DevStatsProps) {

  const totalBars = 10;
  const filledBars = Math.round((xp / 100) * totalBars);

  return (
    <div className="text-center mb-10">

      <div className="text-xl text-white mb-3">
        👾 Frederick Cid
      </div>

      <div className="text-yellow-300 mb-4">
        LVL {level} Developer
      </div>

      <div className="flex justify-center gap-1 mb-3">

        {Array.from({ length: totalBars }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-3 ${
              i < filledBars ? "bg-green-400" : "bg-neutral-700"
            }`}
          />
        ))}

      </div>

      <p className="text-xs text-green-300">
        Stack: .NET / Blazor / Next.js
      </p>

    </div>
  );
}