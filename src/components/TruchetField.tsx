"use client";

import { useEffect, useRef } from "react";

// Maze cells across the viewport height. Kept in sync with GRID in DISPLAY_FRAG;
// the persistent state texture is GRID_CELLS tall (one texel per cell).
const GRID_CELLS = 8;

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// Update pass — runs at cell resolution, one texel per maze cell. It toggles a
// cell's target orientation the moment the cursor first enters it (rising edge),
// then eases the cell's current angle toward that target, so a drawn tile rotates
// smoothly into place and STAYS there until the cursor crosses it again.
// R = target orientation (0/1), G = current eased angle, B = "touched last frame".
const UPDATE_FRAG = `
precision highp float;

uniform sampler2D u_prev;
uniform vec2 u_stateRes;
uniform vec2 u_cursA;   // cursor last frame, in cell coords
uniform vec2 u_cursB;   // cursor this frame, in cell coords
uniform float u_brush;  // brush radius, in cells
uniform float u_draw;   // 1 while the pointer is engaged, else 0

const float EASE = 0.15; // how fast a flipped tile rotates toward its target angle

// distance from p to the segment a->b (so a fast flick still paints every cell
// it passed over, with no gaps between frames)
float distSeg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_stateRes;
  vec4 prev = texture2D(u_prev, uv);
  float target = prev.r;     // destination orientation (0 or 1 quarter-turn)
  float cur = prev.g;        // current eased angle, in quarter-turns
  float wasTouched = prev.b;

  vec2 cellCentre = floor(gl_FragCoord.xy) + 0.5;          // this cell, cell coords
  float touched =
    (u_draw > 0.5 && distSeg(cellCentre, u_cursA, u_cursB) < u_brush) ? 1.0 : 0.0;

  // toggle the target on the rising edge (first entry), never while lingering;
  // the angle then eases toward it so the tile rotates smoothly into place
  float edge = (touched > 0.5 && wasTouched < 0.5) ? 1.0 : 0.0;
  target = mod(target + edge, 2.0);
  cur += (target - cur) * EASE;
  // snap home once within a hair: 8-bit easing otherwise stalls ~1deg short of a
  // full quarter-turn, leaving settled arcs just off the cell edge midpoints
  if (abs(target - cur) < 0.02) cur = target;

  gl_FragColor = vec4(target, cur, touched, 1.0);
}
`;

const DISPLAY_FRAG = `
precision highp float;

uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec3 u_bg;
uniform vec3 u_ink;
uniform vec3 u_pop;
uniform vec2 u_clear;
uniform vec2 u_calm;
uniform float u_active;
uniform sampler2D u_state;
uniform vec2 u_stateRes;

const float GRID = 8.0;          // must match GRID_CELLS on the JS side
const float HALF_PI = 1.5707963;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

// Distance to the two quarter-circle arcs of one Truchet tile. cuv is cell-local
// in [0,1]; the arcs are centred on opposite corners so the tile connects
// (left<->bottom) and (top<->right) at the edge midpoints. A 90deg rotation of
// cuv yields the flipped tile, which connects the other way — the two maze states.
float arcs(vec2 cuv) {
  float d1 = abs(length(cuv) - 0.5);
  float d2 = abs(length(cuv - vec2(1.0)) - 0.5);
  return min(d1, d2);
}

// rotate cell-local coords about the tile centre; a 90deg turn maps one Truchet
// orientation cleanly onto the other, with no crossfade ghosting.
vec2 rotate(vec2 cuv, float a) {
  vec2 c = cuv - 0.5;
  float s = sin(a), co = cos(a);
  return mat2(co, -s, s, co) * c + 0.5;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = gl_FragCoord.xy / u_res.y;  // aspect-correct, height-normalised

  // cursor glow — fades to zero (u_active) when the pointer goes idle
  vec2 m = u_mouse / u_res.y;
  float focus = exp(-length(p - m) * 5.2) * u_active;

  // keep the typography zone calm: thin lines, no accent
  vec2 cd = uv - u_clear;
  cd.x *= u_res.x / u_res.y;
  float calm = smoothstep(u_calm.x, u_calm.y, length(cd));

  // grid
  vec2 q = p * GRID;
  vec2 cell = floor(q);
  vec2 cuv = fract(q);

  // resting orientation from the cell hash, plus the eased flip angle the cursor
  // has painted into the state texture (G channel). Both orientations meet at the
  // same edge midpoints, so the maze stays connected — drawn cells just reroute.
  float ori = step(0.5, hash(cell));
  float turn = texture2D(u_state, (cell + 0.5) / u_stateRes).g;
  float d = arcs(rotate(cuv, (ori + turn) * HALF_PI));

  // line weight: bold base, swollen under the cursor, thinned in the calm zone
  float w = (0.078 + focus * 0.05) * mix(0.45, 1.0, calm);
  float aa = 1.5 * GRID / u_res.y;
  float line = smoothstep(w + aa, w - aa, d);

  // accent: drawn routes glow orange and stay; the cursor lights its tip on top
  float accent = clamp(turn * 0.85 + focus * 0.5, 0.0, 1.0) * calm;
  vec3 lineCol = mix(u_ink, u_pop, accent);

  vec3 col = mix(u_bg, lineCol, line);
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

export default function TruchetField({
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
    // and again on each `webglcontextrestored`. The render loop gates on `ready`.
    // The painted maze state is held in two ping-pong textures (read one, write
    // the other); it resets on context loss / resize, which is fine.
    let displayProg: WebGLProgram | null = null;
    let updateProg: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    const stateTex: (WebGLTexture | null)[] = [null, null];
    const stateFbo: (WebGLFramebuffer | null)[] = [null, null];
    let cur = 0; // index of the texture holding the current state
    let gridW = 0;
    let gridH = 0;
    let ready = false;

    // display uniforms that change after build
    let dispURes: WebGLUniformLocation | null = null;
    let dispUMouse: WebGLUniformLocation | null = null;
    let dispUActive: WebGLUniformLocation | null = null;
    let dispUStateRes: WebGLUniformLocation | null = null;
    // update uniforms that change per frame / on resize
    let updUCursA: WebGLUniformLocation | null = null;
    let updUCursB: WebGLUniformLocation | null = null;
    let updUDraw: WebGLUniformLocation | null = null;
    let updUStateRes: WebGLUniformLocation | null = null;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    // Link a program from the shared vertex shader + a fragment source, with
    // a_pos forced to attribute slot 0 so a single buffer setup feeds both.
    const link = (fragSrc: string) => {
      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.bindAttribLocation(program, 0, "a_pos");
      gl.linkProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
      return program;
    };

    // (Re)allocate the two state textures + their framebuffers at cell
    // resolution, cleared to zero (every cell at its resting orientation).
    const allocState = (w: number, h: number) => {
      const zero = new Uint8Array(w * h * 4);
      for (let i = 0; i < 2; i++) {
        if (stateTex[i]) gl.deleteTexture(stateTex[i]);
        if (stateFbo[i]) gl.deleteFramebuffer(stateFbo[i]);
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(
          gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, zero,
        );
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0,
        );
        stateTex[i] = tex;
        stateFbo[i] = fbo;
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      cur = 0;
    };

    const buildGL = () => {
      displayProg = link(DISPLAY_FRAG);
      updateProg = link(UPDATE_FRAG);
      if (!displayProg || !updateProg) return false;

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      const u = (prog: WebGLProgram, name: string) =>
        gl.getUniformLocation(prog, name);

      gl.useProgram(displayProg);
      dispURes = u(displayProg, "u_res");
      dispUMouse = u(displayProg, "u_mouse");
      dispUActive = u(displayProg, "u_active");
      dispUStateRes = u(displayProg, "u_stateRes");
      gl.uniform3fv(u(displayProg, "u_bg"), palette.bg);
      gl.uniform3fv(u(displayProg, "u_ink"), palette.ink);
      gl.uniform3fv(u(displayProg, "u_pop"), palette.pop);
      gl.uniform2fv(u(displayProg, "u_clear"), palette.clear);
      gl.uniform2fv(u(displayProg, "u_calm"), palette.calm);
      gl.uniform1i(u(displayProg, "u_state"), 0);

      gl.useProgram(updateProg);
      updUCursA = u(updateProg, "u_cursA");
      updUCursB = u(updateProg, "u_cursB");
      updUDraw = u(updateProg, "u_draw");
      updUStateRes = u(updateProg, "u_stateRes");
      gl.uniform1i(u(updateProg, "u_prev"), 0);
      gl.uniform1f(u(updateProg, "u_brush"), 0.6);

      ready = true;
      return true;
    };

    const disposeGL = () => {
      ready = false;
      if (displayProg) gl.deleteProgram(displayProg);
      if (updateProg) gl.deleteProgram(updateProg);
      if (buffer) gl.deleteBuffer(buffer);
      for (let i = 0; i < 2; i++) {
        if (stateTex[i]) gl.deleteTexture(stateTex[i]);
        if (stateFbo[i]) gl.deleteFramebuffer(stateFbo[i]);
        stateTex[i] = null;
        stateFbo[i] = null;
      }
      displayProg = null;
      updateProg = null;
      buffer = null;
    };

    if (!buildGL()) return;

    const mouse = { x: 0, y: 0, px: 0, py: 0, seeded: false };
    let vw = 1;
    let vh = 1;
    let lastMove = -1e9; // no pointer input yet -> starts fully idle (static)
    let active = 0;
    let hasInput = false;
    let prevSet = false;
    let prevGx = 0;
    let prevGy = 0;
    let raf = 0;
    let running = false;
    let inView = true;

    const render = () => {
      if (!ready || !stateTex[0]) return;
      const now = performance.now();
      // activity drives only the cursor glow; the painted maze is untouched by it
      active += ((now - lastMove < 1000 ? 1 : 0) - active) * 0.07;
      // eased focal point for a smooth glow
      mouse.x += (mouse.px - mouse.x) * 0.18;
      mouse.y += (mouse.py - mouse.y) * 0.18;

      // raw cursor in cell coords drives the persistent drawing (precise, snappy)
      const gx = (mouse.px / vh) * GRID_CELLS;
      const gy = (mouse.py / vh) * GRID_CELLS;
      let drawFlag = 0;
      if (hasInput) {
        if (!prevSet) {
          // first input: seed prev=curr so we don't paint a line in from nowhere
          prevGx = gx;
          prevGy = gy;
          prevSet = true;
        }
        drawFlag = 1;
      }

      // --- update pass: paint cursor cell-entries into the off texture ---
      gl.useProgram(updateProg);
      gl.bindFramebuffer(gl.FRAMEBUFFER, stateFbo[1 - cur]);
      gl.viewport(0, 0, gridW, gridH);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, stateTex[cur]);
      gl.uniform2f(updUCursA, prevGx, prevGy);
      gl.uniform2f(updUCursB, gx, gy);
      gl.uniform1f(updUDraw, drawFlag);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      cur = 1 - cur;
      prevGx = gx;
      prevGy = gy;

      // --- display pass: draw the maze from the freshly-updated state ---
      gl.useProgram(displayProg);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, vw, vh);
      gl.bindTexture(gl.TEXTURE_2D, stateTex[cur]); // still on TEXTURE0
      gl.uniform2f(dispUMouse, mouse.x, mouse.y);
      gl.uniform1f(dispUActive, active);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      render();
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
        const gw = Math.max(1, Math.ceil((GRID_CELLS * vw) / vh));
        gl.useProgram(displayProg);
        gl.uniform2f(dispURes, vw, vh);
        if (gw !== gridW || GRID_CELLS !== gridH) {
          gridW = gw;
          gridH = GRID_CELLS;
          allocState(gridW, gridH);
          gl.useProgram(displayProg);
          gl.uniform2f(dispUStateRes, gridW, gridH);
          gl.useProgram(updateProg);
          gl.uniform2f(updUStateRes, gridW, gridH);
        }
      }
      if (!mouse.seeded) {
        // resting focal point before any pointer input (and on touch)
        mouse.seeded = true;
        mouse.x = mouse.px = vw * 0.72;
        mouse.y = mouse.py = vh * 0.6;
      }
      if (reduceMotion) render();
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
      displayProg = null;
      updateProg = null;
      buffer = null;
      stateTex[0] = stateTex[1] = null;
      stateFbo[0] = stateFbo[1] = null;
      gridW = gridH = 0;
      setRunning(false);
    };
    // Same context object returns alive but wiped clean. Rebuild every resource
    // (the painted state resets), re-viewport, and resume if we're on-screen.
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
      hasInput = true;
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
