import { BrutalLink } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-10 px-5 text-center">
      <h1 className="font-display text-[clamp(6rem,25vw,16rem)] leading-none tracking-tight text-outline">
        404
      </h1>
      <p className="max-w-md text-lg font-medium">
        This page does not exist. The resume lives on the home page.
      </p>
      <BrutalLink href="/">Back home</BrutalLink>
    </main>
  );
}
