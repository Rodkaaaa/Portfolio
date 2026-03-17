"use client";

const projects = [
  {
    name: "PREPACKING SYSTEM",
    description:
      "Sistema de gestión de pre-packing desarrollado con Blazor y MudBlazor.",
    stack: "Blazor / MudBlazor / .NET",
  },
  {
    name: "EXCEL MASS IMPORT",
    description:
      "Herramienta de carga masiva de artículos desde Excel con validaciones.",
    stack: "Blazor / ClosedXML / API",
  },
  {
    name: "API INTEGRATIONS",
    description: "Servicios backend para integración de plataformas externas.",
    stack: ".NET / REST API",
  },
  {
    name: "ERP MODULE",
    description: "Módulo empresarial para gestión de productos y clientes.",
    stack: "Blazor / SQL Server",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 px-6"
    >
      <h2 className="text-3xl mb-12 text-yellow-300">GAME CARTRIDGES</h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border-4 border-green-400 p-6 bg-neutral-900 hover:scale-105 transition"
          >
            <h3 className="text-xl text-white mb-4">{project.name}</h3>

            <p className="text-sm mb-4">{project.description}</p>

            <p className="text-yellow-300 text-xs">{project.stack}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
