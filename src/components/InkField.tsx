"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_bg;
uniform vec3 u_ink;
uniform vec3 u_pop;
uniform vec2 u_clear;
uniform vec2 u_calm;
uniform float u_idle;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.07 + vec2(13.7, 7.3);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = gl_FragCoord.xy / u_res.y;
  float t = u_time * 0.09;

  // drifting, self-warping ink field
  vec2 warp = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t + 5.2));
  float field = fbm(p * 2.3 + warp * 1.15 + vec2(t * 0.5, -t * 0.35));

  // rolling density waves keep the plate alive with no input
  field += sin(p.x * 1.8 + p.y * 1.3 - u_time * 0.55) * 0.06;

  // focal point: the cursor, or the roaming press head when idle
  // (the idle swell is broader and softer than the cursor's)
  vec2 m = u_mouse / u_res.y;
  float md = length(p - m);
  field += exp(-md * mix(4.0, 2.7, u_idle)) * 0.5;
  field += sin(md * 36.0 - u_time * 2.2) * 0.07 * exp(-md * 4.5);

  // keep the typography zone calm
  vec2 cd = uv - u_clear;
  cd.x *= u_res.x / u_res.y;
  float calm = smoothstep(u_calm.x, u_calm.y, length(cd));

  // only the peaks of the field reach the plate
  float sig = smoothstep(0.52, 1.04, field) * calm;

  // rotated screen-space halftone grid
  float cs = max(u_res.y / 86.0, 9.0);
  float ca = 0.46;
  mat2 rot = mat2(cos(ca), -sin(ca), sin(ca), cos(ca));
  vec2 g = rot * gl_FragCoord.xy;
  vec2 cell = floor(g / cs);
  vec2 cuv = fract(g / cs) - 0.5;
  float jitter = hash(cell);

  float r = sig * (0.58 + jitter * 0.1);
  float aa = 1.5 / cs;
  float dotMask = smoothstep(r, r - aa, length(cuv));

  // sparse pops where a slower field crests
  float pop = step(0.82, noise(cell * 0.37 + t * 1.4)) * step(0.34, sig);
  vec3 dotCol = mix(u_ink, u_pop, pop);

  vec3 col = mix(u_bg, dotCol, dotMask);
  // faint static grain so the flats aren't dead
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.04;

  gl_FragColor = vec4(col, 1.0);
}
`;

const PALETTES = {
  paper: {
    bg: [0.941, 0.937, 0.914],
    ink: [0.094, 0.086, 0.067],
    pop: [1.0, 0.302, 0.0],
    clear: [0.34, 0.52],
    calm: [0.12, 0.8],
  },
  accent: {
    bg: [1.0, 0.302, 0.0],
    ink: [0.094, 0.086, 0.067],
    pop: [0.941, 0.937, 0.914],
    clear: [0.33, 0.6],
    calm: [0.24, 1.0],
  },
} as const;

export default function InkField({
  variant = "paper",
  className = "",
}: {
  variant?: keyof typeof PALETTES;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const palette = PALETTES[variant];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Every GL handle dies with the context on a loss, so they all live in
    // mutable slots and get rebuilt from scratch by buildGL() — once on mount,
    // and again on each `webglcontextrestored`. draw()/resize() gate on `ready`.
    let prog: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uMouse: WebGLUniformLocation | null = null;
    let uIdle: WebGLUniformLocation | null = null;
    let ready = false;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    // (Re)build program, geometry, and uniform bindings on the live context.
    // Returns false if the GPU bails mid-build (e.g. context lost again) so the
    // caller can skip scheduling a doomed render loop.
    const buildGL = () => {
      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG);
      const program = gl.createProgram();
      if (!program) return false;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.useProgram(program);

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const aPos = gl.getAttribLocation(program, "a_pos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const u = (name: string) => gl.getUniformLocation(program, name);
      uRes = u("u_res");
      uTime = u("u_time");
      uMouse = u("u_mouse");
      uIdle = u("u_idle");
      gl.uniform3fv(u("u_bg"), palette.bg);
      gl.uniform3fv(u("u_ink"), palette.ink);
      gl.uniform3fv(u("u_pop"), palette.pop);
      gl.uniform2fv(u("u_clear"), palette.clear);
      gl.uniform2fv(u("u_calm"), palette.calm);

      prog = program;
      ready = true;
      return true;
    };

    // Explicit teardown on real unmount — replaces the old loseContext() call,
    // which force-killed the context and left React's reused <canvas> stuck on a
    // dead context (Chrome's broken-image glyph) across StrictMode/Fast Refresh
    // remounts. Deleting the resources frees the GPU memory without poisoning a
    // reacquire on the same canvas.
    const disposeGL = () => {
      ready = false;
      if (prog) gl.deleteProgram(prog);
      if (buffer) gl.deleteBuffer(buffer);
      prog = null;
      buffer = null;
    };

    if (!buildGL()) return;

    const mouse = { x: 0, y: 0, px: 0, py: 0, seeded: false };
    const start = performance.now();
    let vw = 1;
    let vh = 1;
    let lastMove = -1e9; // fully idle on load, so the roam starts right away
    let idleMix = 1;
    let raf = 0;
    let running = false;
    let inView = true;

    const draw = (time: number) => {
      if (!ready) return;
      const now = performance.now();
      // crossfade between the cursor and the roaming idle path
      idleMix += ((now - lastMove > 2500 ? 1 : 0) - idleMix) * 0.025;
      // unwrapped clock for the roam so the shader-time wrap never jumps it
      const rt = (now - start) / 1000;
      const roamX =
        vw * (0.5 + 0.34 * Math.sin(rt * 0.32) + 0.1 * Math.sin(rt * 0.85 + 1.7));
      const roamY =
        vh * (0.52 + 0.3 * Math.cos(rt * 0.24) + 0.12 * Math.sin(rt * 0.61));
      const tx = mouse.px + (roamX - mouse.px) * idleMix;
      const ty = mouse.py + (roamY - mouse.py) * idleMix;
      mouse.x += (tx - mouse.x) * 0.07;
      mouse.y += (ty - mouse.y) * 0.07;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uIdle, idleMix);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      // wrap to keep shader float precision healthy on long sessions
      draw(((performance.now() - start) / 1000) % 600);
    };

    const setRunning = (next: boolean) => {
      if (next === running) return;
      running = next;
      if (running) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      vw = Math.max(1, Math.round(rect.width * dpr));
      vh = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = vw;
      canvas.height = vh;
      if (ready) {
        gl.viewport(0, 0, vw, vh);
        gl.uniform2f(uRes, vw, vh);
      }
      if (!mouse.seeded) {
        // resting focal point before any pointer input (and on touch)
        mouse.seeded = true;
        mouse.x = mouse.px = vw * 0.72;
        mouse.y = mouse.py = vh * 0.6;
      }
      if (reduceMotion) draw(7.3);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Real GPU context loss: driver reset, the tab backgrounded too long, or the
    // browser evicting the oldest of too many live contexts ("Too many active
    // WebGL contexts"). preventDefault() is the promise that a `restored` event
    // will follow — without it the context stays dead forever.
    const onLost = (e: Event) => {
      e.preventDefault();
      ready = false;
      prog = null;
      buffer = null;
      setRunning(false);
    };
    // Same context object returns alive but wiped clean. Rebuild every resource,
    // re-viewport, and resume the loop if we're still on-screen.
    const onRestored = () => {
      if (!buildGL()) return;
      resize();
      if (!reduceMotion) setRunning(inView && !document.hidden);
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    if (reduceMotion) {
      return () => {
        ro.disconnect();
        canvas.removeEventListener("webglcontextlost", onLost);
        canvas.removeEventListener("webglcontextrestored", onRestored);
        disposeGL();
      };
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.px = (e.clientX - rect.left) * dpr;
      mouse.py = (rect.height - (e.clientY - rect.top)) * dpr;
      lastMove = performance.now();
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      setRunning(inView && !document.hidden);
    });
    io.observe(canvas);

    const onVisibility = () => setRunning(inView && !document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      setRunning(false);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      disposeGL();
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
