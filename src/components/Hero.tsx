import Image from "next/image";
import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import type { Cv } from "@/lib/cv";
import { BrutalLink, Chip } from "./ui";

export default function Hero({ cv }: { cv: Cv }) {
  return (
    <section className="relative flex min-h-[100dvh] items-center pb-20 pt-28 md:pt-24">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div
            className="anim-rise mb-7 flex flex-wrap gap-3"
            style={{ "--rise-delay": "0ms" } as React.CSSProperties}
          >
            <Chip>
              <MapPin weight="bold" className="size-4" />
              {cv.location}
            </Chip>
            <Chip variant="accent">Software Engineer</Chip>
          </div>
          <h1
            className="anim-rise font-display text-[clamp(3.6rem,11.5vw,10rem)] uppercase leading-[0.88] tracking-tight"
            style={{ "--rise-delay": "100ms" } as React.CSSProperties}
          >
            Afrian
            <br />
            <span className="text-outline">Luthfan</span>
          </h1>
          <p
            className="anim-rise mt-8 max-w-xl text-lg font-medium leading-relaxed md:text-xl"
            style={{ "--rise-delay": "220ms" } as React.CSSProperties}
          >
            Software engineer at Bank Raya Indonesia building backend services,
            internal APIs, and AI tools used by 1,000+ employees.
          </p>
          <div
            className="anim-rise mt-10 flex flex-wrap gap-6"
            style={{ "--rise-delay": "340ms" } as React.CSSProperties}
          >
            <BrutalLink href={`mailto:${cv.email}`}>
              Email me
              <ArrowUpRight
                weight="bold"
                className="size-4 transition-transform duration-300 ease-snap group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </BrutalLink>
            <BrutalLink href="#projects" variant="paper">
              See projects
            </BrutalLink>
          </div>
        </div>
        <div
          className="anim-rise lg:col-span-4"
          style={{ "--rise-delay": "300ms" } as React.CSSProperties}
        >
          <figure className="mx-auto w-full max-w-xs rotate-2 border-[3px] border-ink bg-white shadow-hard-accent lg:max-w-sm">
            <Image
              src="/muka.jpg"
              alt="Portrait of Afrian Luthfan"
              width={800}
              height={800}
              priority
              className="w-full grayscale contrast-110"
            />
            <figcaption className="flex items-center justify-between gap-3 border-t-[3px] border-ink bg-paper px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wider">
              <span>{cv.name}</span>
              <span>Bogor, ID</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
