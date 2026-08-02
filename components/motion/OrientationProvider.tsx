"use client";

import { useReducedMotion } from "framer-motion";
import { createContext, useContext, useEffect, useRef } from "react";
import type { MutableRefObject, ReactNode } from "react";

export interface OrientationState {
  x: number;
  y: number;
  active: boolean;
}

export type OrientationRef = MutableRefObject<OrientationState>;

const OrientationContext = createContext<OrientationRef>({
  current: { x: 0, y: 0, active: false },
});

export function useOrientation(): OrientationRef {
  return useContext(OrientationContext);
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const clampDelta = (value: number) => clamp(value, 0, 0.05);

interface OrientationEventConstructor {
  requestPermission?: () => Promise<string>;
}

export default function OrientationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const state = useRef<OrientationState>({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const hasTouch = navigator.maxTouchPoints > 0;
    if (!hasTouch) {
      return;
    }

    const api = window.DeviceOrientationEvent as
      | OrientationEventConstructor
      | undefined;
    if (!api) {
      return;
    }

    let enabled = false;
    let raf = 0;
    let running = false;
    let refBeta: number | null = null;

    const raw = { x: 0, y: 0 };
    const smoothed = { x: 0, y: 0 };

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta;
      const gamma = event.gamma;
      if (
        beta === null ||
        gamma === null ||
        !Number.isFinite(beta) ||
        !Number.isFinite(gamma)
      ) {
        return;
      }

      if (refBeta === null) {
        refBeta = beta;
      } else {
        refBeta += (beta - refBeta) * 0.001;
      }

      raw.x = clamp(gamma / 35, -1, 1);
      raw.y = clamp((beta - refBeta) / 35, -1, 1);
    };

    const start = () => {
      if (running) {
        return;
      }
      running = true;
      let last = performance.now();

      const loop = (now: number) => {
        const dt = clampDelta((now - last) / 1000);
        last = now;
        const blend = 1 - Math.exp(-dt * 5);
        smoothed.x += (raw.x - smoothed.x) * blend;
        smoothed.y += (raw.y - smoothed.y) * blend;
        state.current.x = smoothed.x;
        state.current.y = smoothed.y;
        state.current.active = enabled;
        raf = requestAnimationFrame(loop);
      };

      raf = requestAnimationFrame(loop);
    };

    const enable = () => {
      enabled = true;
      refBeta = null;
      start();
    };

    const needsPermission = typeof api.requestPermission === "function";

    const handleActivate = () => {
      if (needsPermission && api.requestPermission) {
        api
          .requestPermission()
          .then((result) => {
            if (result === "granted") {
              window.addEventListener("deviceorientation", handleOrientation);
              enable();
            }
          })
          .catch(() => {
            state.current.active = false;
          });
      }
      window.removeEventListener("pointerdown", handleActivate);
      window.removeEventListener("touchstart", handleActivate);
    };

    if (needsPermission) {
      window.addEventListener("pointerdown", handleActivate, { once: true });
      window.addEventListener("touchstart", handleActivate, { once: true });
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
      enable();
    }

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("pointerdown", handleActivate);
      window.removeEventListener("touchstart", handleActivate);
    };
  }, [reducedMotion]);

  return (
    <OrientationContext.Provider value={state}>
      {children}
    </OrientationContext.Provider>
  );
}
