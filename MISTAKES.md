# Mistakes Log

### 2026-10-22: Loader 3% Freeze and Visual Crash
- **What happened:** The initial loading screen would freeze intermittently at 1%–3% progress, and on clients experiencing GPU context loss, the central 3D visual would fail.
- **Root cause:**
  1. `markShown` in `useSessionOnce.ts` was an unmemoized function instance recreated on each render. Because `Loader.tsx`'s timer effect depended on `markShown`, updating `progress` every 25ms caused the component to re-render, changing effect dependencies, clearing the interval, and resetting `startTime` to 0 in an endless re-render loop.
  2. The rapid re-render cycle churned WebGL contexts without context release (`WEBGL_lose_context`), exhausting the browser's WebGL context pool (`WARNING: Too many active WebGL contexts. Oldest context will be lost.`).
  3. `Cube3D.tsx` lacked an ErrorBoundary or `webglcontextlost` handler to seamlessly fall back to `CubeCSS` when WebGL failed.
- **Blast radius:** The site loading screen (`components/loader/`).
- **Preventive rule:** Always wrap callback functions returned from custom hooks with `useCallback` when consumed as effect dependencies. Always release temporary WebGL test contexts with `WEBGL_lose_context.loseContext()`, memoize Three.js geometries, and provide class-based error boundaries around Canvas renderers.
