import type { RoleEntry } from "@/lib/cv";
import { formatRange } from "@/lib/cv";
import Reveal from "./Reveal";

export default function Leadership({ roles }: { roles: RoleEntry[] }) {
  return (
    <section id="leadership" className="flex min-h-[100dvh] items-center py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">
            Leadership
          </h2>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed">
            Organizations and committees, on top of the day job.
          </p>
        </Reveal>
        <Reveal stagger className="mt-16 border-b-[3px] border-ink">
          {roles.map((role) => (
            <div
              key={`${role.company}-${role.position}`}
              className="group grid gap-3 border-t-[3px] border-ink px-2 py-8 transition-colors duration-300 ease-snap hover:bg-ink hover:text-paper md:grid-cols-12 md:gap-8 md:px-4"
            >
              <span className="font-mono text-sm font-bold uppercase tracking-wider md:col-span-3">
                {formatRange(role.start_date, role.end_date)}
              </span>
              <div className="md:col-span-9">
                <h3 className="text-xl font-bold uppercase tracking-tight md:text-2xl">
                  {role.position}
                </h3>
                <p className="mt-2 inline-block bg-accent px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  {role.company}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed">
                  {role.highlights[0]}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
