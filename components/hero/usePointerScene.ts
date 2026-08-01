import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";

export interface PointerState {
  x: number;
  y: number;
}

export function usePointerScene(): MutableRefObject<PointerState> {
  const pointer = useRef<PointerState>({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return pointer;
}
