"use client";

const skills = [
  { name: ".NET / C#", level: 90 },
  { name: "Blazor / MudBlazor", level: 85 },
  { name: "REST APIs", level: 90 },
  { name: "SQL Server", level: 75 },
  { name: "JavaScript / TypeScript", level: 70 },
  { name: "React / Next.js", level: 65 },
  { name: "System Integrations", level: 88 },
  { name: "Architecture", level: 80 },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center text-green-400 px-6"
    >
      <div className="border-4 border-green-400 p-10 max-w-4xl w-full bg-neutral-900">

        <h2 className="text-3xl text-yellow-300 mb-10 text-center">
          SKILL TREE
        </h2>

        <div className="space-y-6">

          {skills.map((skill, index) => (
            <div key={index}>

              <div className="flex justify-between mb-1 text-sm">
                <span>{skill.name}</span>
                <span className="text-yellow-300">{skill.level}</span>
              </div>

              <div className="w-full bg-neutral-700 h-3">
                <div
                  className="bg-green-400 h-3"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}