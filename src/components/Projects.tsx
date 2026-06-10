import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ProjectEntry } from "@/lib/cv";
import HorizontalPan from "./HorizontalPan";
import { BrutalLink, Chip } from "./ui";

const CARD_THEMES = [
  "bg-paper",
  "bg-ink text-paper",
  "bg-paper",
  "bg-accent",
  "bg-paper",
];

function realUrl(project: ProjectEntry): string | undefined {
  if (project.url?.startsWith("http")) return project.url;
  return project.highlights
    .find((h) => h.startsWith("http"))
    ?.match(/https?:\/\/\S+/)?.[0];
}

function projectTag(project: ProjectEntry): string {
  const url = realUrl(project);
  if (url?.includes("github.com")) return "Open source";
  if (url) return "Live";
  return "Internal";
}

function splitName(name: string): { title: string; subtitle?: string } {
  const match = name.match(/^(.*?)\s*\((.*)\)$/);
  if (match) return { title: match[1], subtitle: match[2] };
  return { title: name };
}

export default function Projects({ projects }: { projects: ProjectEntry[] }) {
  return (
    <HorizontalPan id="projects">
      <div className="flex w-full shrink-0 flex-col justify-center md:h-full md:w-[42vw] md:px-16">
        <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">
          Selected projects
        </h2>
        <p className="mt-7 max-w-sm text-lg font-medium leading-relaxed">
          Internal banking tools, AI systems, and small utilities people
          actually use.
        </p>
      </div>
      {projects.map((project, i) => {
        const { title, subtitle } = splitName(project.name);
        const url = realUrl(project);
        const tag = projectTag(project);
        const theme = CARD_THEMES[i % CARD_THEMES.length];
        const isInk = theme.includes("bg-ink");
        const highlights = project.highlights.filter(
          (h) => !h.startsWith("http"),
        );
        return (
          <article
            key={project.name}
            className={`flex w-full shrink-0 flex-col justify-between gap-10 border-[3px] border-ink p-7 shadow-hard md:mr-14 md:min-h-[62vh] md:w-[44vw] md:p-10 ${theme}`}
          >
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h3
                  className={`max-w-[24ch] font-display uppercase leading-none tracking-tight ${
                    title.length > 14
                      ? "text-2xl md:text-3xl"
                      : "text-4xl md:text-5xl"
                  }`}
                >
                  {title}
                </h3>
                <Chip variant={isInk ? "ink" : "paper"}>{tag}</Chip>
              </div>
              {subtitle && (
                <p className="mt-4 font-mono text-xs font-bold uppercase tracking-wider">
                  {subtitle}
                </p>
              )}
              <ul className="mt-8 space-y-4">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-4 leading-relaxed">
                    <span
                      aria-hidden
                      className={`mt-2 block size-2.5 shrink-0 ${
                        isInk ? "bg-accent" : "bg-ink"
                      }`}
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            {url ? (
              <div>
                <BrutalLink
                  href={url}
                  variant={isInk ? "paper" : "ink"}
                  className={isInk ? "shadow-[7px_7px_0_0_var(--color-accent)]" : ""}
                >
                  {url.includes("github.com") ? "View repo" : "Open site"}
                  <ArrowUpRight weight="bold" className="size-4" />
                </BrutalLink>
              </div>
            ) : (
              <p className="font-mono text-xs font-bold uppercase tracking-widest">
                Internal use only / {project.name.includes("RAVA") ? "1,000+" : "100+"} users
              </p>
            )}
          </article>
        );
      })}
      <div aria-hidden className="hidden md:block md:w-16 md:shrink-0" />
    </HorizontalPan>
  );
}
