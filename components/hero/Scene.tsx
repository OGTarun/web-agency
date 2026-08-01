"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import OGMonogram from "./OGMonogram";
import Particles from "./Particles";
import SpaceEnvironment from "./SpaceEnvironment";
import { SceneQualityProvider, useQuality } from "./quality";

function CameraRig() {
  useFrame(({ camera, pointer }, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.22, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.14, 2.5, delta);
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
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <CameraRig />
        <ambientLight intensity={0.24} />
        <pointLight color="#7c3aed" intensity={4} position={[2.5, 1.5, 4]} />
        <directionalLight intensity={0.45} position={[3, 4, 5]} />

        <SpaceEnvironment />
        <Particles />
        <OGMonogram position={[1.25, -0.25, 0]} />

        {quality === "high" && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.45}
              luminanceSmoothing={0.55}
              luminanceThreshold={1.15}
            />
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
