import { Envelope } from "@phosphor-icons/react/dist/ssr";
import { BrutalLink } from "./ui";

const LINKS = [
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certs", href: "#certifications" },
];

export default function Nav({ email }: { email: string }) {
  return (
    <header
      id="site-nav"
      className="fixed inset-x-3 top-3 z-50 md:inset-x-6 md:top-5"
    >
      <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between border-[3px] border-ink bg-paper px-4 shadow-hard-sm md:h-16 md:px-6">
        <a
          href="#main"
          className="font-display text-sm uppercase tracking-tight md:text-base"
        >
          Afrian Luthfan
        </a>
        <div className="flex items-center gap-5 md:gap-8">
          <ul className="hidden items-center gap-6 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-xs font-bold uppercase tracking-widest underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline hover:decoration-[3px]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <BrutalLink href={`mailto:${email}`} size="sm" className="shadow-none hover:shadow-hard-sm">
            <Envelope weight="bold" className="size-4" />
            Email me
          </BrutalLink>
        </div>
      </nav>
    </header>
  );
}
