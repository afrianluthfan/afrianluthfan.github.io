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
  float t = u_time * 0.055;

  // slowly drifting, self-warping ink field
  vec2 warp = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t + 5.2));
  float field = fbm(p * 2.3 + warp * 1.15 + vec2(t * 0.5, -t * 0.35));

  // cursor: local swell plus a faint radiating press ripple
  vec2 m = u_mouse / u_res.y;
  float md = length(p - m);
  field += exp(-md * 4.0) * 0.5;
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

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u("u_res");
    const uTime = u("u_time");
    const uMouse = u("u_mouse");
    gl.uniform3fv(u("u_bg"), palette.bg);
    gl.uniform3fv(u("u_ink"), palette.ink);
    gl.uniform3fv(u("u_pop"), palette.pop);
    gl.uniform2fv(u("u_clear"), palette.clear);
    gl.uniform2fv(u("u_calm"), palette.calm);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, seeded: false };
    const start = performance.now();
    let raf = 0;
    let running = false;
    let inView = true;

    const draw = (time: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
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
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      if (!mouse.seeded) {
        // resting focal point before any pointer input (and on touch)
        mouse.seeded = true;
        mouse.x = mouse.tx = w * 0.72;
        mouse.y = mouse.ty = h * 0.6;
      }
      if (reduceMotion) draw(7.3);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onLost = (e: Event) => {
      e.preventDefault();
      setRunning(false);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    if (reduceMotion) {
      return () => {
        ro.disconnect();
        canvas.removeEventListener("webglcontextlost", onLost);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) * dpr;
      mouse.ty = (rect.height - (e.clientY - rect.top)) * dpr;
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
      gl.getExtension("WEBGL_lose_context")?.loseContext();
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
