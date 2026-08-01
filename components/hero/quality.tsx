"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Quality = "high" | "low";

const QualityContext = createContext<Quality>("high");

export function useQuality(): Quality {
  return useContext(QualityContext);
}

function detectQuality(): Quality {
  if (typeof navigator === "undefined") {
    return "high";
  }

  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const coarsePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  if (cores <= 4 || memory <= 4) {
    return "low";
  }

  if (coarsePointer && memory <= 6) {
    return "low";
  }

  return "high";
}

export function SceneQualityProvider({ children }: { children: ReactNode }) {
  const [quality] = useState<Quality>(() => detectQuality());

  return <QualityContext.Provider value={quality}>{children}</QualityContext.Provider>;
}
