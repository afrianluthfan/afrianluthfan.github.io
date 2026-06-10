import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { EducationEntry } from "@/lib/cv";
import { formatRange } from "@/lib/cv";
import Reveal from "./Reveal";
import { BrutalLink } from "./ui";

export default function Education({ entry }: { entry: EducationEntry }) {
  const gpaHighlight = entry.highlights?.find((h) => h.startsWith("GPA:"));
  const gpa = gpaHighlight?.replace("GPA:", "").trim() ?? "";
  const [gpaValue, gpaScale] = gpa.split("/");
  const diplomaUrl = entry.highlights
    ?.find((h) => h.includes("http"))
    ?.match(/https?:\/\/\S+/)?.[0];

  return (
    <section id="education" className="flex min-h-[100dvh] items-center py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <Reveal className="mx-auto max-w-3xl">
          <article className="-rotate-1 border-[3px] border-ink bg-paper p-2 shadow-hard-lg">
            <div className="border-[3px] border-dashed border-ink px-6 py-14 text-center md:px-14 md:py-20">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                {entry.institution} / {formatRange(entry.start_date, entry.end_date)}
              </p>
              <h2 className="mt-7 font-display text-3xl uppercase leading-tight tracking-tight md:text-5xl">
                {entry.area}
              </h2>
              <p className="mt-3 text-lg font-bold uppercase tracking-wide">
                {entry.degree}
              </p>
              <div className="mt-12 inline-flex items-end gap-2 border-[3px] border-ink bg-accent px-8 py-5 shadow-hard">
                <span className="font-mono text-6xl font-bold leading-none tracking-tight md:text-7xl">
                  {gpaValue}
                </span>
                <span className="font-mono text-lg font-bold md:text-xl">
                  /{gpaScale} GPA
                </span>
              </div>
              {diplomaUrl && (
                <div className="mt-12">
                  <BrutalLink href={diplomaUrl} variant="paper">
                    View diploma
                    <ArrowUpRight weight="bold" className="size-4" />
                  </BrutalLink>
                </div>
              )}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
