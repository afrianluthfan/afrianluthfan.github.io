import type { CertificationEntry } from "@/lib/cv";
import Reveal from "./Reveal";

/*
 * Ticket map interlocks an 11-ticket grid on 6 columns with zero voids:
 * row 1: 2+2+2 | row 2: 3+3 | row 3: 2+2+2 | row 4: 4+2 | row 5: 6
 * Colors follow the Projects cycle (paper/ink/paper/accent/paper) so the
 * rhythm repeats every row pair, with the full-width closer in ink:
 * row 1: ·■· | row 2: ▲· | row 3: ·■· | row 4: ▲· | row 5: ■
 */
const TICKETS = [
  { span: "md:col-span-2", theme: "bg-paper" },
  { span: "md:col-span-2", theme: "bg-ink text-paper" },
  { span: "md:col-span-2", theme: "bg-paper" },
  { span: "md:col-span-3", theme: "bg-accent" },
  { span: "md:col-span-3", theme: "bg-paper" },
  { span: "md:col-span-2", theme: "bg-paper" },
  { span: "md:col-span-2", theme: "bg-ink text-paper" },
  { span: "md:col-span-2", theme: "bg-paper" },
  { span: "md:col-span-4", theme: "bg-accent" },
  { span: "md:col-span-2", theme: "bg-paper" },
  { span: "col-span-2 md:col-span-6", theme: "bg-ink text-paper" },
];

const FALLBACK_TICKET = { span: "md:col-span-2", theme: "bg-paper" };

export default function Certifications({
  certs,
}: {
  certs: CertificationEntry[];
}) {
  const issuers = new Set(certs.map((cert) => cert.location)).size;

  return (
    <section
      id="certifications"
      className="flex min-h-[100dvh] items-center py-28"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-7xl">
            Certifications
          </h2>
          <p className="font-mono text-sm font-bold uppercase tracking-widest">
            {certs.length} credentials / {issuers} issuers
          </p>
        </Reveal>
        <Reveal
          stagger
          className="mt-14 grid grid-flow-dense grid-cols-2 gap-4 md:grid-cols-6 md:gap-5"
        >
          {certs.map((cert, i) => {
            const ticket = TICKETS[i] ?? FALLBACK_TICKET;
            return (
            <article
              key={cert.name}
              className={`flex min-h-[150px] flex-col justify-between gap-5 border-[3px] border-ink p-5 shadow-hard-sm transition-transform duration-300 ease-snap hover:-translate-y-1 md:p-6 ${ticket.theme} ${ticket.span}`}
            >
              <div className="flex items-start justify-between gap-3 font-mono text-[11px] font-bold uppercase tracking-wider">
                <span>{cert.location}</span>
                <span>{String(cert.date)}</span>
              </div>
              <h3 className="text-base font-bold uppercase leading-snug tracking-tight md:text-lg">
                {cert.name}
              </h3>
            </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
