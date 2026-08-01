"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import AsteroidField from "./AsteroidField";
import OGMonogram from "./OGMonogram";
import Particles from "./Particles";
import SpaceEnvironment from "./SpaceEnvironment";

function CameraRig() {
  useFrame(({ camera, pointer }, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.22, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.14, 2.5, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <Canvas
        camera={{ fov: 42, position: [0, 0, 7] }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <CameraRig />
        <ambientLight intensity={0.24} />
        <pointLight color="#7c3aed" intensity={7} position={[2.5, 1.5, 4]} />
        <pointLight color="#67e8f9" intensity={2.5} position={[-3, -1, 2]} />
        <directionalLight intensity={0.45} position={[3, 4, 5]} />

        <SpaceEnvironment />
        <Particles />
        <AsteroidField />
        <OGMonogram position={[1.25, -0.25, 0]} />

        <EffectComposer multisampling={0}>
          <Bloom intensity={0.45} luminanceSmoothing={0.55} luminanceThreshold={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
