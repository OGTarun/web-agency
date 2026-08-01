"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createOGGeometry } from "./ogGeometry";
import { useQuality } from "./quality";
import { usePointerScene } from "./usePointerScene";

const BASE_SCALE = 0.8;

const TMP_EULER = new THREE.Euler();
const TMP_QUAT = new THREE.Quaternion();

interface OGMonogramProps {
  position?: [number, number, number];
}

export default function OGMonogram({ position = [0.95, -0.1, 0] }: OGMonogramProps) {
  const group = useRef<THREE.Group>(null!);
  const pointer = usePointerScene();
  const reducedMotion = useReducedMotion();
  const quality = useQuality();
  const highQuality = quality === "high";

  const geometry = useMemo(() => createOGGeometry(), []);

  const material = useMemo(
    () =>
      highQuality
        ? new THREE.MeshPhysicalMaterial({
            color: "#eaf0ff",
            metalness: 0.08,
            transmission: 1,
            thickness: 0.6,
            ior: 1.5,
            roughness: 0.04,
            clearcoat: 1,
            clearcoatRoughness: 0.04,
            attenuationColor: new THREE.Color("#c7d2fe"),
            attenuationDistance: 1.2,
            emissive: new THREE.Color("#6366f1"),
            emissiveIntensity: 0.1,
            envMapIntensity: 1.6,
          })
        : new THREE.MeshPhysicalMaterial({
            color: "#e2e8f0",
            metalness: 0.35,
            roughness: 0.1,
            clearcoat: 1,
            clearcoatRoughness: 0.12,
            emissive: new THREE.Color("#6366f1"),
            emissiveIntensity: 0.28,
            envMapIntensity: 1.3,
          }),
    [highQuality],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame(({ clock }, delta) => {
    const current = group.current;
    if (!current || reducedMotion) {
      return;
    }

    const time = clock.getElapsedTime();

    const idleYaw = Math.sin(time * 0.22) * 0.08;
    const idlePitch = Math.sin(time * 0.34) * 0.03;
    const floatY = Math.sin(time * 0.5) * 0.04;

    TMP_EULER.set(
      -pointer.current.y * 0.12 + idlePitch,
      pointer.current.x * 0.18 + idleYaw,
      pointer.current.x * 0.035,
    );
    TMP_QUAT.setFromEuler(TMP_EULER);
    current.quaternion.slerp(TMP_QUAT, 1 - Math.exp(-3.2 * delta));

    current.position.x = THREE.MathUtils.damp(
      current.position.x,
      position[0] + pointer.current.x * 0.08,
      2.4,
      delta,
    );
    current.position.y = THREE.MathUtils.damp(
      current.position.y,
      position[1] + floatY + pointer.current.y * 0.05,
      2.4,
      delta,
    );
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[0.02, -0.05, 0]}
      scale={BASE_SCALE}
    >
      <Environment resolution={highQuality ? 128 : 64}>
        <Lightformer
          color="#ffffff"
          form="rect"
          intensity={2.4}
          position={[0, 5, 3]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[7, 1.4, 1]}
        />
        <Lightformer
          color="#e0e7ff"
          form="rect"
          intensity={1.4}
          position={[-4, 0.5, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.6, 5, 1]}
        />
        <Lightformer
          color="#ffffff"
          form="rect"
          intensity={1.1}
          position={[4, -0.5, 2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[1.6, 5, 1]}
        />
        <Lightformer
          color="#ffffff"
          form="rect"
          intensity={0.7}
          position={[0, 0, 5]}
          scale={[5, 3, 1]}
        />
        <Lightformer
          color="#cbd5e1"
          form="rect"
          intensity={0.9}
          position={[0, -4, 3]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[5, 1.2, 1]}
        />
      </Environment>

      <mesh geometry={geometry} castShadow receiveShadow>
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
}
