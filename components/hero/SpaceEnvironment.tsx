"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useQuality } from "./quality";

function createRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state * 1_664_525 + 1_013_904_223) >>> 0;
    return state / 4_294_967_296;
  };
}

function createGalaxyData(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const random = createRandom(2_026_0821);
  const color = new THREE.Color();

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const radius = 0.4 + random() * 3.6;
    const branch = (index % 3) * ((Math.PI * 2) / 3);
    const angle = branch + radius * 2.1 + (random() - 0.5) * 0.8;

    positions[offset] = 3.3 + Math.cos(angle) * radius * 1.25;
    positions[offset + 1] = 0.7 + Math.sin(angle) * radius * 0.42;
    positions[offset + 2] = -8.5 + (random() - 0.5) * 0.7;

    color.set(index % 4 === 0 ? "#e2e8f0" : "#94a3b8");
    colors[offset] = color.r;
    colors[offset + 1] = color.g;
    colors[offset + 2] = color.b;
  }

  return { colors, positions };
}

function createStarPositions(count: number) {
  const positions = new Float32Array(count * 3);
  const random = createRandom(2_026_0822);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (random() - 0.5) * 22;
    positions[offset + 1] = (random() - 0.5) * 12;
    positions[offset + 2] = -10 - random() * 7;
  }

  return positions;
}

export default function SpaceEnvironment() {
  const galaxies = useRef<THREE.Group>(null!);
  const stars = useRef<THREE.Points>(null!);
  const quality = useQuality();

  const galaxyData = useMemo(
    () => createGalaxyData(quality === "high" ? 260 : 130),
    [quality],
  );
  const starPositions = useMemo(
    () => createStarPositions(quality === "high" ? 340 : 160),
    [quality],
  );

  useFrame(({ pointer }, delta) => {
    galaxies.current.position.x = THREE.MathUtils.damp(
      galaxies.current.position.x,
      pointer.x * 0.15,
      1.1,
      delta,
    );
    galaxies.current.position.y = THREE.MathUtils.damp(
      galaxies.current.position.y,
      pointer.y * 0.1,
      1.1,
      delta,
    );
    galaxies.current.rotation.y += delta * 0.012;
    stars.current.position.x = THREE.MathUtils.damp(
      stars.current.position.x,
      pointer.x * 0.025,
      0.5,
      delta,
    );
    stars.current.position.y = THREE.MathUtils.damp(
      stars.current.position.y,
      pointer.y * 0.018,
      0.5,
      delta,
    );
  });

  return (
    <>
      <group ref={galaxies}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[galaxyData.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[galaxyData.colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            depthWrite={false}
            size={0.035}
            sizeAttenuation
            transparent
            vertexColors
          />
        </points>
      </group>

      <points ref={stars}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#e2e8f0"
          depthWrite={false}
          opacity={0.7}
          size={0.017}
          sizeAttenuation
          transparent
        />
      </points>
    </>
  );
}
