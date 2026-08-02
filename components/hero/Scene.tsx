"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import OGMonogram from "./OGMonogram";
import { SceneQualityProvider, useQuality } from "./quality";
import { useOrientation } from "../motion/OrientationProvider";

function CameraRig() {
  const orientation = useOrientation();

  useFrame(({ camera, pointer }, delta) => {
    if (orientation.current.active) {
      return;
    }
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      pointer.x * 0.14,
      2.5,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      pointer.y * 0.09,
      2.5,
      delta,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneCanvas() {
  const quality = useQuality();
  const reducedMotion = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = container.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const frameloop: "always" | "demand" | "never" = reducedMotion
    ? "demand"
    : visible
      ? "always"
      : "never";

  return (
    <div
      ref={container}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20"
    >
      <Canvas
        camera={{ fov: 42, position: [0, 0, 7] }}
        dpr={quality === "high" ? [1, 1.5] : [1, 1]}
        frameloop={frameloop}
        gl={{
          alpha: true,
          antialias: false,
          stencil: false,
          powerPreference: "high-performance",
        }}
      >
        <CameraRig />
        <ambientLight intensity={0.08} />
        <pointLight color="#8fb7ff" intensity={14} position={[3.5, 2.5, 4.5]} />
        <pointLight color="#8b5cf6" intensity={8} position={[-4.5, -1.5, 2]} />
        <pointLight color="#94a3b8" intensity={4} position={[0, -3, 1]} />
        <directionalLight
          color="#dbeafe"
          intensity={1}
          position={[-1, 4, -3]}
        />

        <OGMonogram />

        {quality === "high" && (
          <EffectComposer multisampling={8}>
            <Bloom
              intensity={0.45}
              luminanceSmoothing={0.35}
              luminanceThreshold={0.85}
              mipmapBlur
              radius={0.8}
            />
            <ToneMapping mode={THREE.ACESFilmicToneMapping} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

export default function Scene() {
  return (
    <SceneQualityProvider>
      <SceneCanvas />
    </SceneQualityProvider>
  );
}
