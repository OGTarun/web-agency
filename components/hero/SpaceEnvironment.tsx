"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useQuality } from "./quality";

function createRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state * 1_664_525 + 1_013_904_223) >>> 0;
    return state / 4_294_967_296;
  };
}

interface NebulaColor {
  blue: number;
  green: number;
  opacity: number;
  red: number;
}

function createNebulaTexture(color: NebulaColor, seed: number) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 512;

  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const random = createRandom(seed);

  for (let index = 0; index < 18; index += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const radius = 45 + random() * 150;
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);

    gradient.addColorStop(0, `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.opacity})`);
    gradient.addColorStop(
      0.28,
      `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.opacity * 0.45})`,
    );
    gradient.addColorStop(1, `rgba(${color.red}, ${color.green}, ${color.blue}, 0)`);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
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

    color.set(index % 4 === 0 ? "#f8fafc" : "#7dd3fc");
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
  const nebula = useRef<THREE.Group>(null!);
  const galaxies = useRef<THREE.Group>(null!);
  const stars = useRef<THREE.Points>(null!);
  const quality = useQuality();

  const nebulaCount = quality === "high" ? 3 : 1;

  const textures = useMemo(
    () => [
      createNebulaTexture({ blue: 169, green: 93, opacity: 0.12, red: 36 }, 2_026_0811),
      createNebulaTexture({ blue: 181, green: 77, opacity: 0.09, red: 95 }, 2_026_0812),
      createNebulaTexture({ blue: 181, green: 139, opacity: 0.08, red: 50 }, 2_026_0813),
    ],
    [],
  );
  const galaxyData = useMemo(
    () => createGalaxyData(quality === "high" ? 260 : 130),
    [quality],
  );
  const starPositions = useMemo(
    () => createStarPositions(quality === "high" ? 340 : 160),
    [quality],
  );

  useEffect(() => () => textures.forEach((texture) => texture.dispose()), [textures]);

  useFrame(({ pointer }, delta) => {
    nebula.current.position.x = THREE.MathUtils.damp(nebula.current.position.x, pointer.x * 0.08, 0.8, delta);
    nebula.current.position.y = THREE.MathUtils.damp(nebula.current.position.y, pointer.y * 0.05, 0.8, delta);
    nebula.current.rotation.z += delta * 0.008;
    galaxies.current.position.x = THREE.MathUtils.damp(galaxies.current.position.x, pointer.x * 0.15, 1.1, delta);
    galaxies.current.position.y = THREE.MathUtils.damp(galaxies.current.position.y, pointer.y * 0.1, 1.1, delta);
    galaxies.current.rotation.y += delta * 0.012;
    stars.current.position.x = THREE.MathUtils.damp(stars.current.position.x, pointer.x * 0.025, 0.5, delta);
    stars.current.position.y = THREE.MathUtils.damp(stars.current.position.y, pointer.y * 0.018, 0.5, delta);
  });

  const sprites = [
    { position: [1.8, 1.2, -1] as const, scale: [15, 9, 1] as const, opacity: 0.86, texture: textures[0] },
    { position: [-4, -2.2, -1.5] as const, scale: [12, 7, 1] as const, opacity: 0.58, texture: textures[1] },
    { position: [5, -1.8, -2] as const, scale: [11, 6, 1] as const, opacity: 0.52, texture: textures[2] },
  ].slice(0, nebulaCount);

  return (
    <>
      <group ref={nebula} position={[0, 0, -6.5]}>
        {sprites.map((sprite, index) => (
          <sprite key={index} position={sprite.position} scale={sprite.scale}>
            <spriteMaterial
              depthWrite={false}
              map={sprite.texture}
              opacity={sprite.opacity}
              transparent
            />
          </sprite>
        ))}
      </group>

      <group ref={galaxies}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[galaxyData.positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[galaxyData.colors, 3]} />
          </bufferGeometry>
          <pointsMaterial depthWrite={false} size={0.035} sizeAttenuation transparent vertexColors />
        </points>
      </group>

      <points ref={stars}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#dbeafe" depthWrite={false} opacity={0.72} size={0.017} sizeAttenuation transparent />
      </points>
    </>
  );
}
