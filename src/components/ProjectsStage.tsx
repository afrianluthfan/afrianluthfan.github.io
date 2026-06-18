"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectEntry } from "@/lib/cv";
import { BrutalLink, Chip } from "./ui";
import TruchetField from "./TruchetField";

gsap.registerPlugin(ScrollTrigger);

// useLayoutEffect on the client (flip the layout before paint, no fallback flash),
// useEffect on the server (no-op during the static prerender).
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const pad2 = (n: number) => String(n).padStart(2, "0");

const ACCENT = "#ff4d00";
const INK = "#181611";

const CARD_THEMES = [
  "bg-paper",
  "bg-ink text-paper",
  "bg-accent",
  "bg-paper",
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

// One project card. Shared by the fallback stack and the (screen-reader-only)
// source list the 3D layer clones from — single markup source of truth.
function ProjectCard({
  project,
  index,
  total,
}: {
  project: ProjectEntry;
  index: number;
  total: number;
}) {
  const { title, subtitle } = splitName(project.name);
  const url = realUrl(project);
  const tag = projectTag(project);
  const theme = CARD_THEMES[index % CARD_THEMES.length];
  const isInk = theme.includes("bg-ink");
  const highlights = project.highlights.filter((h) => !h.startsWith("http"));

  return (
    <article
      data-card
      className={`relative flex flex-col justify-between gap-8 overflow-hidden border-[3px] border-ink p-7 shadow-hard md:p-9 ${theme}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-1 -top-4 select-none font-display text-7xl leading-none md:text-8xl ${
          isInk ? "text-paper/10" : "text-ink/[0.07]"
        }`}
      >
        {pad2(index + 1)}
      </span>
      <div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h3
            className={`max-w-[22ch] font-display uppercase leading-none tracking-tight ${
              title.length > 14 ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
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
        <ul className="mt-7 space-y-3">
          {highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed md:text-base">
              <span
                aria-hidden
                className={`mt-2 block size-2 shrink-0 ${isInk ? "bg-accent" : "bg-ink"}`}
              />
              {h}
            </li>
          ))}
        </ul>
      </div>
      {url ? (
        <div>
          <BrutalLink
            href={url}
            variant={isInk ? "paper" : "ink"}
            size="sm"
            className={isInk ? "shadow-[7px_7px_0_0_var(--color-accent)]" : ""}
          >
            {url.includes("github.com") ? "View repo" : "Open site"}
            <ArrowUpRight weight="bold" className="size-4" />
          </BrutalLink>
        </div>
      ) : (
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest">
          Internal use only / {project.name.includes("RAVA") ? "1,000+" : "100+"} users
        </p>
      )}
    </article>
  );
}

export default function ProjectsStage({ projects }: { projects: ProjectEntry[] }) {
  const total = projects.length;
  const [is3D, setIs3D] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  // Only the wide-screen, motion-friendly path gets the 3D deck. Everything else
  // (mobile, reduced-motion, no-JS) keeps the accessible stacked cards.
  useIso(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const apply = () => setIs3D(mq.matches && total >= 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [total]);

  useEffect(() => {
    if (!is3D) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const list = listRef.current;
    if (!section || !stage || !list) return;

    const sources = Array.from(list.querySelectorAll<HTMLElement>("[data-card]"));
    if (!sources.length) return;

    let cancelled = false;
    let cleanup = () => {};

    // three is pulled in only when the 3D path is actually taken, so it never
    // lands in the initial / mobile bundle.
    (async () => {
      const [
        { PerspectiveCamera, Scene, Group, Quaternion, Vector3, Euler },
        { CSS3DObject, CSS3DRenderer },
      ] = await Promise.all([
          import("three"),
          import("three/examples/jsm/renderers/CSS3DRenderer.js"),
        ]);
      if (cancelled) return;

      const scene = new Scene();
      const deck = new Group();
      scene.add(deck);
      const camera = new PerspectiveCamera(40, 1, 1, 9000);
      camera.position.z = 1400;

      const renderer = new CSS3DRenderer();
      const dom = renderer.domElement;
      dom.setAttribute("aria-hidden", "true");
      dom.style.position = "absolute";
      dom.style.inset = "0";
      dom.style.zIndex = "10";
      stage.appendChild(dom);

      // Clone the accessible cards into the scene — the originals stay owned by
      // React (safe to unmount); these decorative twins live under the renderer.
      // Native <a href> on a clone still navigates; we drop it from the tab order
      // so keyboard users go through the real (sr-only) cards instead.
      const cards = sources.map((src) => {
        const el = src.cloneNode(true) as HTMLElement;
        el.style.margin = "0";
        el.style.willChange = "transform";
        el.style.transition = "none";
        el.style.backfaceVisibility = "hidden";
        el.style.boxShadow = "none";
        el.querySelectorAll("a").forEach((a) => (a.tabIndex = -1));
        const obj = new CSS3DObject(el);
        deck.add(obj);
        return { obj, el };
      });

      const HALF = Math.PI / 2;
      const STEPS = Math.max(1, total - 1); // face-to-face turns
      const last = total - 1;
      let radius = 180;

      // The cards are faces of a rigid cube. Each project is a distinct face;
      // moving to the next is a 90° turn about a RANDOMLY chosen world axis
      // (X or Y), so consecutive transitions tumble on different axes — but the
      // cube stays convex, so faces never intersect or bleed through each other.
      const turns = [
        { axis: new Vector3(1, 0, 0), ang: HALF },
        { axis: new Vector3(1, 0, 0), ang: -HALF },
        { axis: new Vector3(0, 1, 0), ang: HALF },
        { axis: new Vector3(0, 1, 0), ang: -HALF },
      ];
      const faceKey = (v: { x: number; y: number; z: number }) =>
        `${Math.round(v.x)},${Math.round(v.y)},${Math.round(v.z)}`;
      const scratch = new Vector3();
      const targets = [new Quaternion()];
      const usedFaces = new Set([faceKey({ x: 0, y: 0, z: 1 })]);
      for (let i = 1; i < total; i++) {
        const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        let next = null;
        for (const k of order) {
          const t = turns[k];
          const cand = new Quaternion()
            .setFromAxisAngle(t.axis, t.ang)
            .multiply(targets[i - 1]);
          // which body face this orientation brings forward
          const key = faceKey(
            scratch.set(0, 0, 1).applyQuaternion(cand.clone().invert()),
          );
          if (!usedFaces.has(key)) {
            usedFaces.add(key);
            next = cand;
            break;
          }
        }
        // every neighbouring face already used (only if total > 6) — reuse one
        if (!next) {
          const t = turns[order[0]];
          next = new Quaternion()
            .setFromAxisAngle(t.axis, t.ang)
            .multiply(targets[i - 1]);
        }
        targets.push(next);
      }

      // Place each card on the cube face its target rotation brings forward,
      // facing outward, so at that target it squarely faces the camera.
      const dirs = targets.map((q, i) => {
        const inv = q.clone().invert();
        cards[i].obj.quaternion.copy(inv);
        return new Vector3(0, 0, 1).applyQuaternion(inv);
      });

      const layout = () => {
        const w = stage.clientWidth || 1;
        const h = stage.clientHeight || 1;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        // square faces so the cube is regular and tumbles cleanly on any axis;
        // kept well under the stage for breathing room
        const S = clamp(Math.min(w * 0.34, h * 0.6), 300, 460);
        radius = S / 2;
        cards.forEach(({ el }, i) => {
          el.style.width = `${S}px`;
          el.style.height = `${S}px`;
          cards[i].obj.position.copy(dirs[i]).multiplyScalar(radius);
        });
      };
      layout();

      // Scroll tumbles the block face-by-face (pin + scrub == HorizontalPan),
      // snapping to a clean face when you stop.
      let pTarget = 0;
      let p = 0;
      const st =
        total >= 2
          ? ScrollTrigger.create({
              trigger: section,
              start: "top top",
              end: () => `+=${Math.round(STEPS * window.innerHeight * 1.05)}`,
              pin: stage,
              pinSpacing: true,
              scrub: true,
              snap: {
                snapTo: 1 / STEPS,
                duration: { min: 0.15, max: 0.4 },
                ease: "power1.inOut",
              },
              invalidateOnRefresh: true,
              onUpdate: (self) => (pTarget = self.progress),
              // hide the fixed navbar while pinned in here; restore on the way out
              onToggle: (self) =>
                document.documentElement.classList.toggle(
                  "nav-hidden",
                  self.isActive,
                ),
            })
          : null;

      // Pointer wobble + idle sway — same personality as the ink field.
      let nxT = 0;
      let nyT = 0;
      let nx = 0;
      let ny = 0;
      let lastMove = -1e9;
      let idleMix = 1;
      const onMove = (e: PointerEvent) => {
        nxT = (e.clientX / window.innerWidth) * 2 - 1;
        nyT = (e.clientY / window.innerHeight) * 2 - 1;
        lastMove = performance.now();
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      // reusable scratch objects (no per-frame allocation)
      const qScroll = new Quaternion();
      const qWobble = new Quaternion();
      const eWobble = new Euler();
      const qWorld = new Quaternion();
      const vFwd = new Vector3();

      let lastFront = -1;
      let raf = 0;
      let running = false;

      const frame = () => {
        const now = performance.now();
        p += (pTarget - p) * 0.12;

        idleMix += ((now - lastMove > 2600 ? 1 : 0) - idleMix) * 0.03;
        nx += (nxT - nx) * 0.08;
        ny += (nyT - ny) * 0.08;

        // scroll position -> slerp between the two bracketing face targets
        const seg = clamp(p, 0, 1) * Math.max(1, last);
        const i0 = clamp(Math.floor(seg), 0, Math.max(0, last - 1));
        qScroll.slerpQuaternions(targets[i0], targets[Math.min(i0 + 1, last)], seg - i0);

        // screen-space wobble layered on top (keeps the resting face lively)
        const yaw = nx * 0.12 * (1 - idleMix) + Math.sin(now * 0.0005) * 0.06 * idleMix;
        const pitch =
          -0.06 - ny * 0.08 * (1 - idleMix) + Math.sin(now * 0.0004) * 0.04 * idleMix;
        eWobble.set(pitch, yaw, 0, "XYZ");
        qWobble.setFromEuler(eWobble);
        qScroll.premultiply(qWobble);
        deck.quaternion.copy(qScroll);

        // the face actually pointing at the camera right now (max +Z normal)
        let front = 0;
        let bestDot = -2;
        for (let i = 0; i < cards.length; i++) {
          qWorld.multiplyQuaternions(deck.quaternion, cards[i].obj.quaternion);
          const dot = vFwd.set(0, 0, 1).applyQuaternion(qWorld).z;
          if (dot > bestDot) {
            bestDot = dot;
            front = i;
          }
        }

        // only the front face is lit + clickable (back faces are culled by
        // backface-visibility, so the others just need their accent cleared)
        for (let i = 0; i < cards.length; i++) {
          const { el } = cards[i];
          const isFront = i === front;
          el.style.pointerEvents = isFront ? "auto" : "none";
          el.style.boxShadow = isFront
            ? `0 0 0 3px ${ACCENT}, 0 0 46px rgba(255,77,0,0.20)`
            : "none";
        }

        if (barRef.current)
          barRef.current.style.transform = `scaleX(${clamp(p, 0, 1).toFixed(4)})`;
        if (front !== lastFront) {
          lastFront = front;
          if (titleRef.current)
            titleRef.current.textContent = splitName(projects[front].name).title;
          if (indexRef.current)
            indexRef.current.textContent = `${pad2(front + 1)} / ${pad2(total)}`;
        }

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      };

      const setRunning = (next: boolean) => {
        if (next === running) return;
        running = next;
        if (running) raf = requestAnimationFrame(frame);
        else cancelAnimationFrame(raf);
      };

      const ro = new ResizeObserver(() => {
        layout();
        ScrollTrigger.refresh();
      });
      ro.observe(stage);

      let inView = true;
      const io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          setRunning(inView && !document.hidden);
        },
        { rootMargin: "200px" },
      );
      io.observe(section);

      const onVis = () => setRunning(inView && !document.hidden);
      document.addEventListener("visibilitychange", onVis);

      setRunning(true);
      // layout settles (fonts, pin spacer) a beat after mount
      const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 80);

      cleanup = () => {
        setRunning(false);
        document.documentElement.classList.remove("nav-hidden");
        window.clearTimeout(refreshId);
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", onVis);
        ro.disconnect();
        io.disconnect();
        st?.kill();
        // removing each object fires CSS3DObject's "removed" handler, which
        // detaches its DOM element from the renderer.
        cards.forEach(({ obj }) => deck.remove(obj));
        dom.remove();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [is3D, projects, total]);

  if (is3D) {
    return (
      <section
        ref={sectionRef}
        id="projects"
        className="relative border-y-[3px] border-ink"
      >
        <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden">
          <TruchetField variant="paper" className="opacity-30" />
          {/* CSS3DRenderer's DOM (the floating cards) is appended here at z-10 */}
          <div className="pointer-events-none absolute inset-0 z-20 mx-auto flex max-w-[1400px] flex-col justify-between px-5 py-10 md:px-10 md:py-14">
            <div className="flex items-start justify-between gap-6">
              <div className="max-w-md">
                <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">
                  Selected projects
                </h2>
                <p className="mt-5 text-base font-medium leading-relaxed md:text-lg">
                  Internal banking tools, AI systems, and small utilities people
                  actually use.
                </p>
              </div>
              <p
                aria-hidden
                className="hidden font-mono text-[11px] font-bold uppercase tracking-widest text-ink/50 md:block"
              >
                Scroll to explore ↓
              </p>
            </div>
            <div aria-hidden>
              <p
                ref={titleRef}
                className="font-display text-3xl uppercase leading-none tracking-tight md:text-4xl"
              >
                {splitName(projects[0]?.name ?? "").title}
              </p>
              <div className="mt-4 flex items-center gap-4">
                <span
                  ref={indexRef}
                  className="font-mono text-sm font-bold uppercase tracking-widest"
                >
                  01 / {pad2(total)}
                </span>
                <span className="relative block h-[3px] w-40 max-w-[40vw] bg-ink/15 md:w-72">
                  <span
                    ref={barRef}
                    className="absolute inset-0 origin-left bg-accent"
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Single accessible source of truth + clone template for the 3D layer. */}
        <ol ref={listRef} className="sr-only">
          {projects.map((project, i) => (
            <li key={project.name}>
              <ProjectCard project={project} index={i} total={total} />
            </li>
          ))}
        </ol>
      </section>
    );
  }

  // Fallback: accessible stacked cards (mobile / reduced-motion / no-JS).
  return (
    <section
      ref={sectionRef}
      id="projects"
      className="border-y-[3px] border-ink py-24 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">
          Selected projects
        </h2>
        <p className="mt-6 max-w-md text-lg font-medium leading-relaxed">
          Internal banking tools, AI systems, and small utilities people actually
          use.
        </p>
        <ol className="mt-14 grid gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.name}>
              <ProjectCard project={project} index={i} total={total} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
