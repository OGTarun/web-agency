"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 64;

function createParticlePositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  let seed = 2_026_0803;

  const random = () => {
    seed = (seed * 1_664_525 + 1_013_904_223) >>> 0;
    return seed / 4_294_967_296;
  };

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const offset = index * 3;
    const radius = 2.4 + random() * 5.8;
    const angle = random() * Math.PI * 2;

    positions[offset] = Math.cos(angle) * radius;
    positions[offset + 1] = (random() - 0.5) * 5.5;
    positions[offset + 2] = Math.sin(angle) * radius - 2;
  }

  return positions;
}

export default function Particles() {
  const points = useRef<THREE.Points>(null!);
  const positions = useMemo(() => createParticlePositions(), []);

  useFrame(({ pointer }, delta) => {
    points.current.rotation.x = THREE.MathUtils.damp(
      points.current.rotation.x,
      pointer.y * 0.025,
      2,
      delta,
    );
    points.current.rotation.y = THREE.MathUtils.damp(
      points.current.rotation.y,
      pointer.x * 0.035,
      2,
      delta,
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ddd6fe"
        depthWrite={false}
        opacity={0.4}
        size={0.02}
        sizeAttenuation
        transparent
      />
    </points>
  );
}
