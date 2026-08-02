"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  FontLoader,
  Font,
} from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { useQuality } from "./quality";
import { usePointerScene } from "./usePointerScene";
import { useOrientation } from "../motion/OrientationProvider";

const BASE_SCALE = 1.08;
const COMPACT_SCALE = 0.45;

const DEG = Math.PI / 180;
const GYRO_YAW = 8 * DEG;
const GYRO_PITCH = 6 * DEG;
const GYRO_ROLL = 2 * DEG;
const GYRO_SHIFT = 0.12;

const TMP_EULER = new THREE.Euler();
const TMP_QUAT = new THREE.Quaternion();

function createMicroTexture() {
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

  const image = context.getImageData(0, 0, size, size);
  let seed = 2_026_0807;

  const random = () => {
    seed = (seed * 1_664_525 + 1_013_904_223) >>> 0;
    return seed / 4_294_967_296;
  };

  for (let index = 0; index < image.data.length; index += 4) {
    const noise = (random() - 0.5) * 10;
    image.data[index] += noise;
    image.data[index + 1] += noise;
    image.data[index + 2] += noise;
  }
  context.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.anisotropy = 4;
  texture.colorSpace = THREE.NoColorSpace;

  return texture;
}

interface OGMonogramProps {
  position?: [number, number, number];
}

export default function OGMonogram({ position = [1.9, 0.18, 0.45] }: OGMonogramProps) {
  const group = useRef<THREE.Group>(null!);
  const intro = useRef(0);
  const pointer = usePointerScene();
  const orientation = useOrientation();
  const reducedMotion = useReducedMotion();
  const quality = useQuality();
  const highQuality = quality === "high";
  const { viewport } = useThree();

  const compact = viewport.width < 7;
  const basePosition = useMemo<[number, number, number]>(
    () => (compact ? [0, -0.25, 0] : position),
    [compact, position],
  );
  const scaleFactor = compact ? COMPACT_SCALE : 1;

  const [font, setFont] = useState<Font | null>(null);

  useEffect(() => {
    let active = true;
    const loader = new FontLoader();
    loader.load(
      "/fonts/geist_bold.typeface.json",
      (loadedFont) => {
        if (active) {
          setFont(loadedFont);
        }
      },
      undefined,
      () => {
        if (active) {
          setFont(null);
        }
      },
    );
    return () => {
      active = false;
    };
  }, []);

  const geometry = useMemo(() => {
    if (!font) {
      return null;
    }

    const geo = new TextGeometry("OG", {
      font,
      size: 2,
      depth: 0.34,
      curveSegments: highQuality ? 96 : 48,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.12,
      bevelSegments: highQuality ? 12 : 6,
    });
    geo.center();
    return geo;
  }, [font, highQuality]);

  const materials = useMemo(() => {
    const roughnessMap = createMicroTexture();

    const glass = highQuality
      ? new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#f4f7ff"),
          metalness: 0.04,
          roughness: 0.05,
          roughnessMap,
          clearcoat: 1,
          clearcoatRoughness: 0.02,
          iridescence: 0.45,
          iridescenceIOR: 1.35,
          iridescenceThicknessRange: [140, 430],
          emissive: new THREE.Color("#3f5cff"),
          emissiveIntensity: 0.05,
          envMapIntensity: 2.2,
        })
      : new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#ccd4f2"),
          metalness: 0.08,
          roughness: 0.07,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          iridescence: 0.2,
          emissive: new THREE.Color("#5b6cff"),
          emissiveIntensity: 0.08,
          envMapIntensity: 1.8,
        });

    const titanium = highQuality
      ? new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#d6deeb"),
          metalness: 1,
          roughness: 0.15,
          roughnessMap,
          clearcoat: 0.7,
          clearcoatRoughness: 0.2,
          envMapIntensity: 2.2,
        })
      : new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#b4bdcd"),
          metalness: 0.92,
          roughness: 0.3,
          clearcoat: 0.4,
          envMapIntensity: 1.7,
        });

    return { glass, titanium, roughnessMap };
  }, [highQuality]);

  useEffect(
    () => () => {
      if (geometry) {
        geometry.dispose();
      }
      materials.glass.dispose();
      materials.titanium.dispose();
      materials.roughnessMap.dispose();
    },
    [geometry, materials],
  );

  useFrame(({ clock }, delta) => {
    const current = group.current;
    if (!current || reducedMotion) {
      return;
    }

    const time = clock.getElapsedTime();

    intro.current = Math.min(1, intro.current + delta / 2.4);
    const eased = 1 - Math.pow(1 - intro.current, 3);

    const idleYaw = time * 0.012 + Math.sin(time * 0.16) * 0.03;
    const idlePitch = Math.sin(time * 0.2) * 0.02;
    const roll = Math.sin(time * 0.12) * 0.01;
    const floatY = Math.sin(time * 0.42) * 0.04;

    const gyro = orientation.current;
    const gyroActive = gyro.active;
    const gyroYaw = gyroActive ? gyro.x * GYRO_YAW : 0;
    const gyroPitch = gyroActive ? gyro.y * GYRO_PITCH : 0;
    const gyroRoll = gyroActive ? gyro.x * GYRO_ROLL : 0;

    const targetYaw =
      (gyroActive ? 0 : pointer.current.x * 0.06) + idleYaw + gyroYaw;
    const targetPitch =
      (gyroActive ? 0 : -pointer.current.y * 0.05) + idlePitch + gyroPitch;
    const targetRoll =
      (gyroActive ? 0 : -pointer.current.x * 0.02) + roll + gyroRoll;
    const introYaw = (Math.PI / 18) * (1 - eased);

    TMP_EULER.set(targetPitch, targetYaw + introYaw, targetRoll);
    TMP_QUAT.setFromEuler(TMP_EULER);
    current.quaternion.slerp(TMP_QUAT, 1 - Math.exp(-2.6 * delta));

    const gyroX = gyroActive ? gyro.x * GYRO_SHIFT : 0;
    const gyroY = gyroActive ? gyro.y * GYRO_SHIFT * 0.85 : 0;

    current.position.x = THREE.MathUtils.damp(
      current.position.x,
      basePosition[0] +
        (gyroActive ? gyroX : pointer.current.x * 0.03),
      2.4,
      delta,
    );
    current.position.y = THREE.MathUtils.damp(
      current.position.y,
      basePosition[1] + floatY + (gyroActive ? gyroY : pointer.current.y * 0.025),
      2.4,
      delta,
    );
    current.position.z = THREE.MathUtils.damp(
      current.position.z,
      basePosition[2] + Math.abs(pointer.current.x) * 0.02,
      2.2,
      delta,
    );

    current.scale.setScalar(BASE_SCALE * scaleFactor * (0.95 + 0.05 * eased));
  });

  if (!font || !geometry) {
    return null;
  }

  return (
    <group
      ref={group}
      position={basePosition}
      rotation={[0.02, -0.05, 0]}
      scale={BASE_SCALE * scaleFactor}
    >
      <Environment resolution={highQuality ? 256 : 64}>
        <Lightformer
          color="#ffffff"
          form="rect"
          intensity={2.6}
          position={[0, 7, 3]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[12, 4, 1]}
        />
        <Lightformer
          color="#9ad6ff"
          form="rect"
          intensity={2.1}
          position={[-6, 1, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[2, 8, 1]}
        />
        <Lightformer
          color="#b18cff"
          form="rect"
          intensity={1.9}
          position={[6, 0.5, 1.5]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[2, 8, 1]}
        />
        <Lightformer
          color="#f4f7ff"
          form="rect"
          intensity={1.7}
          position={[0, 0, 7]}
          scale={[8, 5, 1]}
        />
        <Lightformer
          color="#eef2ff"
          form="rect"
          intensity={1.3}
          position={[0, 2.2, 5.5]}
          rotation={[0.35, 0, 0]}
          scale={[9, 5, 1]}
        />
        <Lightformer
          color="#ffffff"
          form="rect"
          intensity={1.4}
          position={[0, 0, -4]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          color="#7c5cff"
          form="rect"
          intensity={1}
          position={[0, -7, 2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[10, 2, 1]}
        />
        <Lightformer
          color="#e8ecff"
          form="rect"
          intensity={1.6}
          position={[-3, 0, -3]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1, 6, 1]}
        />
      </Environment>

      <mesh geometry={geometry} castShadow receiveShadow>
        <primitive object={materials.glass} attach="material-0" />
        <primitive object={materials.titanium} attach="material-1" />
      </mesh>
    </group>
  );
}
