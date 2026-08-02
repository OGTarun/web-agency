"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";
import BlackHole from "../hero/BlackHole";
import { SceneQualityProvider, useQuality } from "../hero/quality";
import { useOrientation } from "../motion/OrientationProvider";

function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1_664_525 + 1_013_904_223) >>> 0;
    return state / 4_294_967_296;
  };
}

function createSoftTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.5)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createGalaxyTexture(seed: number) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const random = createRandom(seed);
  const center = size / 2;

  const core = context.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    size * 0.5,
  );
  core.addColorStop(0, "rgba(235,242,255,0.8)");
  core.addColorStop(0.18, "rgba(210,225,255,0.24)");
  core.addColorStop(0.45, "rgba(185,205,255,0.07)");
  core.addColorStop(1, "rgba(180,205,255,0)");
  context.fillStyle = core;
  context.fillRect(0, 0, size, size);

  context.globalCompositeOperation = "lighter";
  const arms = 2;
  const turns = 2.4;
  for (let arm = 0; arm < arms; arm += 1) {
    const phase = (arm / arms) * Math.PI * 2;
    for (let i = 0; i < 700; i += 1) {
      const t = i / 700;
      const r = size * (0.05 + t * 0.46);
      const angle = phase + t * turns * Math.PI * 2 + random() * 0.07;
      const scatter = 0.5 + t * 1.6;
      const x = center + Math.cos(angle) * r + (random() - 0.5) * scatter;
      const y = center + Math.sin(angle) * r + (random() - 0.5) * scatter;
      const alpha = Math.exp(-2.4 * t) * (0.16 + random() * 0.22);
      context.fillStyle = `rgba(205,222,255,${alpha})`;
      const dot = 0.8 + random() * 1.5;
      context.beginPath();
      context.arc(x, y, dot, 0, Math.PI * 2);
      context.fill();
    }
  }

  for (let arm = 0; arm < arms; arm += 1) {
    const phase = (arm / arms) * Math.PI * 2;
    for (let i = 0; i < 260; i += 1) {
      const t = i / 260;
      const r = size * (0.08 + t * 0.42);
      const angle = phase + t * turns * Math.PI * 2 * 1.15 + random() * 0.3;
      const scatter = 2.5 + t * 3.5;
      const x = center + Math.cos(angle) * r + (random() - 0.5) * scatter;
      const y = center + Math.sin(angle) * r + (random() - 0.5) * scatter;
      const alpha = Math.exp(-2.0 * t) * (0.035 + random() * 0.05);
      context.fillStyle = `rgba(212,226,255,${alpha})`;
      const dot = 3 + random() * 4;
      context.beginPath();
      context.arc(x, y, dot, 0, Math.PI * 2);
      context.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface StarLayer {
  count: number;
  zMin: number;
  zMax: number;
  sizeMin: number;
  sizeMax: number;
  brightness: number;
  twinkle: number;
  speed: number;
}

function createStarData(config: StarLayer) {
  const { count, zMin, zMax, sizeMin, sizeMax } = config;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const random = createRandom(2_026_0913);

  const spreadX = -zMin * 1.1;
  const spreadY = -zMin * 0.6;

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (random() - 0.5) * spreadX;
    positions[offset + 1] = (random() - 0.5) * spreadY;
    positions[offset + 2] = zMin + random() * (zMax - zMin);
    seeds[index] = random();
    sizes[index] = sizeMin + random() * (sizeMax - sizeMin);
  }

  return { positions, seeds, sizes };
}

function createDustData(count: number) {
  const positions = new Float32Array(count * 3);
  const random = createRandom(2_026_0915);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (random() - 0.5) * 48;
    positions[offset + 1] = (random() - 0.5) * 26;
    positions[offset + 2] = -6 - random() * 7;
  }

  return positions;
}

const STAR_VERTEX = `
attribute float aSeed;
attribute float aSize;
uniform float uTime;
uniform float uSpeed;
uniform float uTwinkle;
varying float vAlpha;
varying float vTint;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vTint = aSeed;
  float tw = 1.0 - uTwinkle * (0.5 + 0.5 * sin(uTime * uSpeed * (0.5 + aSeed * 1.5) + aSeed * 42.0));
  vAlpha = tw;
  gl_PointSize = aSize * (85.0 / max(-mv.z, 0.001));
  gl_Position = projectionMatrix * mv;
}
`;

const STAR_FRAGMENT = `
uniform float uBrightness;
varying float vAlpha;
varying float vTint;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.06, d);
  vec3 col = mix(vec3(0.74, 0.8, 1.0), vec3(1.0), smoothstep(0.35, 0.62, vTint));
  gl_FragColor = vec4(col, a * vAlpha * uBrightness);
}
`;

const NOISE_DATA = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='linear' slope='0.6'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
)}`;

const HAZE: {
  color: string;
  position: [number, number, number];
  scale: number;
  base: number;
}[] = [
  { color: "#273257", position: [-6.8, -6.2, -12], scale: 26, base: 0.05 },
  { color: "#2a3158", position: [-9.6, 2.5, -10.5], scale: 17, base: 0.055 },
  { color: "#202c50", position: [8.7, 6.4, -16], scale: 20, base: 0.04 },
];

const GALAXIES: {
  seed: number;
  position: [number, number, number];
  scale: [number, number];
  rotation: [number, number, number];
  opacity: number;
  color: string;
}[] = [
  {
    seed: 11,
    position: [-7.5, -7, -12.5],
    scale: [13, 6.2],
    rotation: [0.45, 0.12, 0.85],
    opacity: 0.42,
    color: "#e8efff",
  },
  {
    seed: 23,
    position: [8.7, 6.4, -16.5],
    scale: [3.6, 1.8],
    rotation: [0.55, 0.25, 0.4],
    opacity: 0.3,
    color: "#eef3ff",
  },
  {
    seed: 37,
    position: [10.2, -3.6, -13],
    scale: [5, 2.4],
    rotation: [0.7, -0.35, 1.2],
    opacity: 0.26,
    color: "#e6eeff",
  },
];

function Stars({ config }: { config: StarLayer }) {
  const material = useRef<THREE.ShaderMaterial>(null!);
  const data = useMemo(() => createStarData(config), [config]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(data.seeds, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(data.sizes, 1));
    return geo;
  }, [data]);

  useFrame((_, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={material}
        args={[
          {
            uniforms: {
              uTime: { value: 0 },
              uSpeed: { value: config.speed },
              uTwinkle: { value: config.twinkle },
              uBrightness: { value: config.brightness },
            },
            vertexShader: STAR_VERTEX,
            fragmentShader: STAR_FRAGMENT,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          },
        ]}
      />
    </points>
  );
}

function Dust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null!);
  const softTexture = useMemo(() => createSoftTexture(), []);
  const positions = useMemo(() => createDustData(count), [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.002;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        map={softTexture}
        color="#8fa0c8"
        depthWrite={false}
        opacity={0.16}
        size={0.055}
        sizeAttenuation
        transparent
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Haze({ configs }: { configs: typeof HAZE }) {
  const softTexture = useMemo(() => createSoftTexture(), []);

  return (
    <group>
      {configs.map((config, index) => (
        <sprite
          key={index}
          position={config.position}
          scale={[config.scale, config.scale, 1]}
        >
          <spriteMaterial
            map={softTexture}
            color={config.color}
            depthWrite={false}
            transparent
            opacity={config.base}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

function Galaxies({ configs }: { configs: typeof GALAXIES }) {
  const textures = useMemo(
    () => configs.map((config) => createGalaxyTexture(config.seed)),
    [configs],
  );

  return (
    <group>
      {configs.map((config, index) => (
        <mesh
          key={index}
          position={config.position}
          rotation={config.rotation}
          scale={[config.scale[0], config.scale[1], 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={textures[index]}
            color={config.color}
            transparent
            opacity={config.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

interface ParallaxLayerProps {
  factor: number;
  gyro?: number;
  spin?: number;
  children: ReactNode;
}

function ParallaxLayer({
  factor,
  gyro = 0,
  spin = 0,
  children,
}: ParallaxLayerProps) {
  const group = useRef<THREE.Group>(null!);
  const reducedMotion = useReducedMotion();
  const orientation = useOrientation();

  useFrame(({ pointer }, delta) => {
    if (!group.current) {
      return;
    }
    const o = orientation.current;
    if (o.active) {
      group.current.position.x = THREE.MathUtils.damp(
        group.current.position.x,
        o.x * gyro,
        2.2,
        delta,
      );
      group.current.position.y = THREE.MathUtils.damp(
        group.current.position.y,
        o.y * gyro * 0.7,
        2.2,
        delta,
      );
    } else if (!reducedMotion) {
      group.current.position.x = THREE.MathUtils.damp(
        group.current.position.x,
        pointer.x * factor,
        0.5,
        delta,
      );
      group.current.position.y = THREE.MathUtils.damp(
        group.current.position.y,
        pointer.y * factor * 0.7,
        0.5,
        delta,
      );
    }
    if (spin > 0) {
      group.current.rotation.y += delta * spin;
    }
  });

  return <group ref={group}>{children}</group>;
}

function SceneCanvas() {
  const quality = useQuality();
  const reducedMotion = useReducedMotion();
  const highQuality = quality === "high";

  const hazeConfigs = useMemo(
    () => (highQuality ? HAZE : HAZE.slice(0, 2)),
    [highQuality],
  );
  const galaxyConfigs = useMemo(
    () => (highQuality ? GALAXIES : GALAXIES.slice(0, 2)),
    [highQuality],
  );

  const starLayers = useMemo<StarLayer[]>(() => {
    const layers: StarLayer[] = [
      {
        count: highQuality ? 550 : 220,
        zMin: -20,
        zMax: -15,
        sizeMin: 0.22,
        sizeMax: 0.5,
        brightness: 0.7,
        twinkle: 0.07,
        speed: 0.5,
      },
      {
        count: highQuality ? 300 : 130,
        zMin: -14,
        zMax: -9.5,
        sizeMin: 0.35,
        sizeMax: 0.8,
        brightness: 0.9,
        twinkle: 0.12,
        speed: 1.0,
      },
      {
        count: highQuality ? 130 : 55,
        zMin: -9,
        zMax: -5.5,
        sizeMin: 0.55,
        sizeMax: 1.3,
        brightness: 1.05,
        twinkle: 0.1,
        speed: 1.6,
      },
    ];
    return layers;
  }, [highQuality]);

  const frameloop: "always" | "demand" | "never" = reducedMotion
    ? "demand"
    : "always";

  return (
    <Canvas
      camera={{ fov: 50, position: [0, 0, 7] }}
      dpr={highQuality ? [1, 1.5] : [1, 1]}
      frameloop={frameloop}
      gl={{
        alpha: true,
        antialias: false,
        stencil: false,
        powerPreference: "high-performance",
      }}
    >
      <ParallaxLayer factor={0.02} gyro={0.024} spin={0.0005}>
        <Galaxies configs={galaxyConfigs} />
        <Haze configs={hazeConfigs} />
      </ParallaxLayer>

      <ParallaxLayer factor={0.045} gyro={0.024}>
        <Dust count={highQuality ? 160 : 70} />
      </ParallaxLayer>

      <ParallaxLayer factor={0.02} gyro={0.012}>
        <Stars config={starLayers[0]} />
      </ParallaxLayer>

      <ParallaxLayer factor={0.045} gyro={0.012}>
        <Stars config={starLayers[1]} />
      </ParallaxLayer>

      <ParallaxLayer factor={0.045} gyro={0.048}>
        <BlackHole
          position={[-9.6, 2.5, -9.5]}
          scale={highQuality ? 0.62 : 0.55}
          intensity={highQuality ? 0.85 : 0.65}
        />
      </ParallaxLayer>

      <ParallaxLayer factor={0.075} gyro={0.012}>
        <Stars config={starLayers[2]} />
      </ParallaxLayer>
    </Canvas>
  );
}

export default function UniverseBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#010204_0%,#04070f_45%,#070b16_100%)]" />
      <SceneQualityProvider>
        <SceneCanvas />
      </SceneQualityProvider>
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_DATA}")` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(1,2,5,0.5)_100%)]" />
    </div>
  );
}
