"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  WINDOW,
  createChamberShape,
  createGGlyphGeometry,
  createMonolithGeometry,
  createOGlyphGeometry,
  createPlinthGeometry,
} from "./ogGeometry";
import { usePointerScene } from "./usePointerScene";

const BASE_SCALE = 0.8;

const TMP_EULER = new THREE.Euler();
const TMP_QUAT = new THREE.Quaternion();
const PROJECTION = new THREE.Vector3();

function createBrushTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  context.fillStyle = "#808080";
  context.fillRect(0, 0, size, size);

  let seed = 2_026_0824;
  const random = () => {
    seed = (seed * 1_664_525 + 1_013_904_223) >>> 0;
    return seed / 4_294_967_296;
  };

  for (let index = 0; index < 700; index += 1) {
    const y = random() * size;
    const x = random() * size;
    const length = 18 + random() * 64;
    const alpha = 0.02 + random() * 0.03;
    const light = random() > 0.5;

    context.strokeStyle = light
      ? `rgba(255, 255, 255, ${alpha})`
      : `rgba(0, 0, 0, ${alpha})`;
    context.lineWidth = 0.6 + random() * 0.9;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + length, y + (random() - 0.5) * 1.4);
    context.stroke();
  }

  const image = context.getImageData(0, 0, size, size);
  for (let index = 0; index < image.data.length; index += 4) {
    const noise = (random() - 0.5) * 6;
    image.data[index] += noise;
    image.data[index + 1] += noise;
    image.data[index + 2] += noise;
  }
  context.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 1);
  texture.anisotropy = 4;
  texture.colorSpace = THREE.NoColorSpace;

  return texture;
}

interface OGMonogramProps {
  position?: [number, number, number];
}

export default function OGMonogram({ position = [0.95, -0.1, 0] }: OGMonogramProps) {
  const group = useRef<THREE.Group>(null!);
  const coreMaterial = useRef<THREE.MeshStandardMaterial>(null!);
  const haloMaterial = useRef<THREE.MeshStandardMaterial>(null!);
  const pointer = usePointerScene();
  const reducedMotion = useReducedMotion();

  const brushTexture = useMemo(() => createBrushTexture(), []);

  const geometries = useMemo(
    () => ({
      monolith: createMonolithGeometry(),
      plinth: createPlinthGeometry(),
      oGlyph: createOGlyphGeometry(),
      gGlyph: createGGlyphGeometry(),
      core: new THREE.ShapeGeometry(createChamberShape(2.5, 1.3, 0.22)),
      halo: new THREE.ShapeGeometry(createChamberShape(3.0, 1.6, 0.26)),
    }),
    [],
  );

  const materials = useMemo(
    () => ({
      titanium: new THREE.MeshPhysicalMaterial({
        color: "#4b5059",
        metalness: 0.95,
        roughness: 0.4,
        roughnessMap: brushTexture,
        clearcoat: 0.8,
        clearcoatRoughness: 0.25,
        anisotropy: 0.32,
        anisotropyRotation: 0.18,
        envMapIntensity: 1.35,
      }),
      edge: new THREE.MeshPhysicalMaterial({
        color: "#e3e8ef",
        metalness: 1,
        roughness: 0.09,
        clearcoat: 0.5,
        clearcoatRoughness: 0.3,
        envMapIntensity: 1.5,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#eef2ff",
        transmission: 1,
        thickness: 0.5,
        ior: 1.5,
        roughness: 0.05,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        attenuationColor: new THREE.Color("#8b5cf6"),
        attenuationDistance: 1.2,
        emissive: new THREE.Color("#7c3aed"),
        emissiveIntensity: 0.12,
        envMapIntensity: 1.6,
      }),
      plinth: new THREE.MeshPhysicalMaterial({
        color: "#0a0e15",
        metalness: 0.85,
        roughness: 0.55,
        clearcoat: 0.5,
        clearcoatRoughness: 0.5,
        envMapIntensity: 0.8,
      }),
    }),
    [brushTexture],
  );

  useEffect(
    () => () => {
      Object.values(geometries).forEach((geometry) => geometry.dispose());
      Object.values(materials).forEach((material) => material.dispose());
      brushTexture.dispose();
    },
    [geometries, materials, brushTexture],
  );

  useFrame(({ camera, clock }, delta) => {
    const current = group.current;
    if (!current || reducedMotion) {
      return;
    }

    const time = clock.getElapsedTime();
    const target = pointer.current;

    const idleYaw = Math.sin(time * 0.22) * 0.09;
    const idlePitch = Math.sin(time * 0.34) * 0.03;
    const floatY = Math.sin(time * 0.5) * 0.035;

    TMP_EULER.set(
      -target.y * 0.14 + idlePitch,
      target.x * 0.22 + idleYaw,
      target.x * 0.045,
    );
    TMP_QUAT.setFromEuler(TMP_EULER);
    current.quaternion.slerp(TMP_QUAT, 1 - Math.exp(-3.2 * delta));

    current.position.x = THREE.MathUtils.damp(
      current.position.x,
      position[0] + target.x * 0.09,
      2.4,
      delta,
    );
    current.position.y = THREE.MathUtils.damp(
      current.position.y,
      position[1] + floatY + target.y * 0.06,
      2.4,
      delta,
    );

    PROJECTION.copy(current.position).project(camera);
    const distance = Math.hypot(PROJECTION.x - target.x, PROJECTION.y - target.y);
    const proximity = THREE.MathUtils.clamp(1 - distance / 0.5, 0, 1);

    if (coreMaterial.current) {
      coreMaterial.current.emissiveIntensity = 3.0 + proximity * 1.5;
    }
    if (haloMaterial.current) {
      haloMaterial.current.emissiveIntensity = 1.8 + proximity * 1.2;
    }

    current.scale.setScalar(BASE_SCALE * (1 + proximity * 0.03));
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[0.02, -0.05, 0]}
      scale={BASE_SCALE}
    >
      <Environment resolution={128}>
        <Lightformer
          color="#ffffff"
          form="rect"
          intensity={2.2}
          position={[0, 5, 3]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[7, 1.4, 1]}
        />
        <Lightformer
          color="#67e8f9"
          form="rect"
          intensity={1.3}
          position={[-5, 0.5, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.6, 5, 1]}
        />
        <Lightformer
          color="#a78bfa"
          form="rect"
          intensity={1.5}
          position={[5, -0.5, 2]}
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

      <mesh geometry={geometries.plinth} position={[0, 0, -0.28]}>
        <primitive object={materials.plinth} attach="material-0" />
        <primitive object={materials.edge} attach="material-1" />
      </mesh>

      <mesh geometry={geometries.halo} position={[0, 0, -0.22]}>
        <meshStandardMaterial
          ref={haloMaterial}
          color="#000000"
          depthWrite={false}
          emissive="#7c3aed"
          emissiveIntensity={1.8}
          toneMapped={false}
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh geometry={geometries.core} position={[0, 0, -0.2]}>
        <meshStandardMaterial
          ref={coreMaterial}
          color="#000000"
          depthWrite={false}
          emissive="#8b5cf6"
          emissiveIntensity={3.0}
          toneMapped={false}
          transparent
          opacity={0.95}
        />
      </mesh>

      <mesh geometry={geometries.monolith} castShadow receiveShadow>
        <primitive object={materials.titanium} attach="material-0" />
        <primitive object={materials.edge} attach="material-1" />
      </mesh>

      <mesh geometry={geometries.oGlyph} position={[WINDOW.oCenter, 0, 0]}>
        <primitive object={materials.glass} attach="material" />
      </mesh>

      <mesh geometry={geometries.gGlyph} position={[WINDOW.gCenter, 0, 0]}>
        <primitive object={materials.glass} attach="material" />
      </mesh>

      {[WINDOW.oCenter, WINDOW.gCenter].map((centerX) => (
        <mesh key={centerX} position={[centerX, 0, 0.193]}>
          <torusGeometry args={[0.72, 0.015, 16, 80]} />
          <primitive object={materials.edge} attach="material" />
        </mesh>
      ))}

      <pointLight
        color="#8b5cf6"
        distance={6}
        intensity={6}
        position={[0, 0, -0.6]}
      />
    </group>
  );
}
