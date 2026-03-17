"use client";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center text-green-400 px-6 pt-2"
    >
      <div className="border-4 border-green-400 p-10 max-w-5xl w-full bg-neutral-900 grid md:grid-cols-2 gap-10 items-center">

        {/* personaje */}
        <div className="flex justify-center">

          <img
            src="/Images/personaje.png"
            alt="Player character"
            className="w-[220px] md:w-[760px] pixel-art"
          />

        </div>

        {/* ficha personaje */}
        <div className="space-y-4 text-left">
          <h2 className="text-3xl text-yellow-300">PLAYER PROFILE</h2>

          <p>
            <span className="text-white">Name:</span> Frederick Cid
          </p>
          <p>
            <span className="text-white">Class:</span> Software Developer
          </p>
          <p>
            <span className="text-white">Level:</span> 30
          </p>

          <div className="pt-4 space-y-2">
            <p className="text-white">HP</p>
            <div className="bg-neutral-700 h-3 w-full">
              <div className="bg-red-500 h-3 w-[85%]" />
            </div>

            <p className="text-white">MP</p>
            <div className="bg-neutral-700 h-3 w-full">
              <div className="bg-blue-500 h-3 w-[60%]" />
            </div>

            <p className="text-white">EXP</p>
            <div className="bg-neutral-700 h-3 w-full">
              <div className="bg-yellow-400 h-3 w-[75%]" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 text-sm">
            <div>STR: 18</div>
            <div>INT: 16</div>
            <div>AGI: 14</div>
          </div>

          <p className="text-green-300 text-sm pt-4">
            Developer specialized in building enterprise systems, integrations
            and scalable applications using modern .NET technologies.
          </p>
        </div>
      </div>
    </section>
  );
}