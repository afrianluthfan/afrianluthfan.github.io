import Reveal from "./Reveal";
import ScrubText from "./ScrubText";

export default function Summary({
  summary,
  certCount,
}: {
  summary: string;
  certCount: number;
}) {
  const STATS = [
    {
      value: "1,000+",
      label: "employees use the RAG chatbot I helped build",
    },
    {
      value: "38",
      label: "projects delivered leading a 47-person student org",
    },
    {
      value: String(certCount),
      label: "professional certifications and counting",
    },
  ];

  return (
    <section id="summary" className="flex min-h-[100dvh] items-center py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <ScrubText
          text={summary}
          className="max-w-5xl text-2xl font-bold leading-snug tracking-tight md:text-5xl md:leading-tight"
        />
        <Reveal className="mt-20">
          <div className="grid divide-y-[3px] divide-ink border-[3px] border-ink bg-paper shadow-hard md:grid-cols-3 md:divide-x-[3px] md:divide-y-0">
            {STATS.map((stat) => (
              <div key={stat.value} className="p-7 md:p-9">
                <div className="font-mono text-5xl font-bold tracking-tight md:text-6xl">
                  {stat.value}
                </div>
                <div className="mt-3 font-mono text-xs font-bold uppercase tracking-wider leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
