"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null!);
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();

    group.current.rotation.y = t * 0.25;
    group.current.rotation.x = mouse.y * 0.2;

    group.current.position.x = mouse.x * 0.35;
    group.current.position.y = Math.sin(t * 1.2) * 0.2 + mouse.y * 0.2;

    ring1.current.rotation.z += 0.003;
    ring2.current.rotation.x += 0.004;
    ring2.current.rotation.y += 0.003;
  });

  return (
    <group ref={group}>
      {/* Outer Glass */}
      <Float speed={2} floatIntensity={1.5}>
        <mesh>
          <sphereGeometry args={[1.55, 128, 128]} />

          <MeshTransmissionMaterial
            thickness={0.8}
            roughness={0}
            transmission={1}
            ior={1.45}
            chromaticAberration={0.04}
            anisotropy={0.2}
            distortion={0.15}
            distortionScale={0.2}
            temporalDistortion={0.1}
            color="#b794ff"
            backside
          />
        </mesh>
      </Float>

      {/* Energy Core */}
      <mesh>
        <sphereGeometry args={[1.08, 128, 128]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={4}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Ring */}
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 32, 250]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>

      {/* Ring */}
      <mesh ref={ring2}>
        <torusGeometry args={[1.8, 0.02, 32, 250]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>

      <Sparkles
        count={180}
        size={2}
        speed={0.35}
        scale={8}
        color="#ffffff"
      />
    </group>
  );
}

export default function Scene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
        }}
        camera={{
          position: [0, 0, 7],
          fov: 45,
        }}
      >
        {/* Transparent background */}
        <primitive object={new THREE.Color(0x000000)} attach="background" />

        <ambientLight intensity={1.3} />

        <pointLight
          position={[0, 0, 4]}
          intensity={45}
          color="#8b5cf6"
        />

        <pointLight
          position={[-4, 2, 2]}
          intensity={20}
          color="#22d3ee"
        />

        <directionalLight
          position={[4, 4, 5]}
          intensity={2}
        />

        <Core />

        <Sparkles
          count={250}
          size={2}
          scale={18}
          speed={0.2}
        />

        <Environment preset="night" />

        <EffectComposer>
          <Bloom
            intensity={2}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}