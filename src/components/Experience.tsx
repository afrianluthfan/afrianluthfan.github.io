import type { RoleEntry } from "@/lib/cv";
import { formatRange } from "@/lib/cv";
import Reveal from "./Reveal";
import { Chip } from "./ui";

export default function Experience({ roles }: { roles: RoleEntry[] }) {
  return (
    <section id="experience" className="min-h-[100dvh] py-28 md:py-36">
      <div className="mx-auto grid w-full max-w-[1400px] gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-6xl">
              Experience
            </h2>
            <p className="mt-6 font-mono text-sm font-bold uppercase tracking-widest">
              2022 - Present
            </p>
            <div aria-hidden className="mt-10 hidden h-24 w-24 border-[3px] border-ink bg-accent shadow-hard lg:block" />
          </div>
        </div>
        <div className="flex flex-col gap-12 lg:col-span-8">
          {roles.map((role) => (
            <Reveal key={`${role.company}-${role.position}`}>
              <article className="border-[3px] border-ink bg-paper p-7 shadow-hard md:p-10">
                <header className="mb-7 flex flex-wrap items-start justify-between gap-4 border-b-[3px] border-ink pb-6">
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight md:text-3xl">
                      {role.position}
                    </h3>
                    <p className="mt-3 inline-block bg-accent px-2 py-1 font-mono text-sm font-bold uppercase tracking-wider">
                      {role.company}
                    </p>
                  </div>
                  <Chip>{formatRange(role.start_date, role.end_date)}</Chip>
                </header>
                <ul className="space-y-4">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-4 leading-relaxed">
                      <span
                        aria-hidden
                        className="mt-2 block size-2.5 shrink-0 bg-accent"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
