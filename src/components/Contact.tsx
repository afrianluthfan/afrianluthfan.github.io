import * as ssr from "@phosphor-icons/react/dist/ssr";
import type { Cv } from "@/lib/cv";
import Reveal from "./Reveal";
import { BrutalLink } from "./ui";

export default function Contact({ cv }: { cv: Cv }) {
  const linkedin = cv.social_networks.find((s) => s.network === "LinkedIn");
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="flex min-h-dvh flex-col bg-accent">
      <div className="mx-auto flex w-full max-w-350 flex-1 flex-col justify-center px-5 py-32 md:px-10">
        <Reveal>
          <h2 className="max-w-6xl font-display text-[clamp(2.8rem,8.5vw,7.5rem)] uppercase leading-[0.9] tracking-tight">
            Got a role or a project in mind?
          </h2>
          <p className="mt-9 max-w-xl text-lg font-medium leading-relaxed md:text-xl">
            Hit me up through these means and let's work together!
          </p>
          <div className="mt-14">
            <BrutalLink href={`mailto:${cv.email}`} size="lg">
              Email me
              <ssr.ArrowUpRight
                weight="bold"
                className="size-5 transition-transform duration-300 ease-snap group-hover:translate-x-1 group-hover:-translate-y-1 md:size-7"
              />
            </BrutalLink>
          </div>
          <ul className="mt-14 flex flex-wrap gap-5">
            {linkedin && (
              <li>
                <a
                  href={`https://www.linkedin.com/in/${linkedin.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-[3px] border-ink px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  <ssr.LinkedinLogo weight="bold" className="size-4" />
                  LinkedIn
                </a>
              </li>
            )}
            <li>
              <a
                href="https://github.com/afrianluthfan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-[3px] border-ink px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                <ssr.GithubLogo weight="bold" className="size-4" />
                GitHub
              </a>
            </li>
            {/* <li>
              <a
                href={`tel:${cv.phone}`}
                className="inline-flex items-center gap-2 border-[3px] border-ink px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                <Phone weight="bold" className="size-4" />
                {cv.phone}
              </a>
            </li> */}
          </ul>
        </Reveal>
      </div>
      <footer className="border-t-[3px] border-ink">
        <div className="mx-auto flex w-full max-w-350 flex-wrap items-center justify-between gap-3 px-5 py-5 font-mono text-xs font-bold uppercase tracking-wider md:px-10">
          <span>{cv.name}</span>
          <span>{cv.location}</span>
          <span>(c) {year}</span>
        </div>
      </footer>
    </section>
  );
}
