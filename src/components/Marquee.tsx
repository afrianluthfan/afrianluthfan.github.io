const SKILLS = [
  "TypeScript",
  "JavaScript",
  "Python",
  "React",
  "Next.js",
  "REST APIs",
  "Machine Learning",
  "RAG Pipelines",
  "Gemini",
  "Vertex AI",
];

function SkillRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden}
      className="flex w-max shrink-0 items-center gap-8 pr-8"
    >
      {SKILLS.map((skill) => (
        <li
          key={skill}
          className="flex items-center gap-8 font-mono text-sm font-bold uppercase tracking-[0.2em] md:text-base"
        >
          {skill}
          <span aria-hidden className="text-accent">
            *
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className="relative z-10 -mx-2 -my-6 -rotate-1 scale-x-[1.02] overflow-hidden border-y-[3px] border-ink bg-ink py-4 text-paper">
      <div className="flex w-max animate-marquee">
        <SkillRun />
        <SkillRun hidden />
      </div>
    </div>
  );
}
