"use client";

const projects = [
  {
    name: "ENTERPRISE BACKEND PLATFORM",
    description:
      "Scalable enterprise backend built with .NET using layered architecture, handling business logic, services, and system integrations.",
    stack: ".NET / C# / REST API / SQL",
  },
  {
    name: "JUMPSELLER ECOMMERCE INTEGRATION",
    description:
      "Ecommerce integration platform that synchronizes products, orders, and inventory between enterprise systems and Jumpseller.",
    stack: ".NET / REST API / JSON",
  },
  {
    name: "ERP SALES & DOCUMENT MANAGEMENT",
    description:
      "Enterprise module for managing clients, sales, and documents with business validations, tax calculations, and transactional workflows.",
    stack: "Blazor / MudBlazor / .NET / SQL Server",
  },
  {
    name: "YOUTUBE DOWNLOADER ENGINE",
    description:
      "Media processing service that retrieves and downloads video content from URLs, delivering processed files through backend logic.",
    stack: ".NET / HTTP / Media Processing",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center text-green-400 px-6"
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
