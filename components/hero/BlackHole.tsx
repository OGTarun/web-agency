"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { usePointerScene } from "./usePointerScene";
import { useQuality } from "./quality";
import { useOrientation } from "../motion/OrientationProvider";

const INNER = 0.3;
const OUTER = 1.25;

const GYRO_SHIFT = 0.048;

const DISK_VERTEX = `
varying vec2 vPos;
void main() {
  vPos = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const DISK_FRAGMENT = `
uniform float uTime;
uniform float uInner;
uniform float uOuter;
uniform float uIntensity;
varying vec2 vPos;

void main() {
  float r = length(vPos);
  if (r > uOuter) discard;
  float t = clamp((r - uInner) / (uOuter - uInner), 0.0, 1.0);
  float ang = atan(vPos.y, vPos.x);

  float spin = uTime * (0.5 - 0.32 * t);

  float beam = 0.4 + 0.6 * max(0.0, cos(ang - spin * 0.7));
  beam = pow(beam, 1.35);

  float streaks = 0.5 + 0.5 * sin(ang * 9.0 - spin * 1.1 + r * 7.0);
  float fine = 0.5 + 0.5 * sin(ang * 23.0 - spin * 2.0 + r * 15.0);
  float glint = 0.5 + 0.5 * sin(ang * 47.0 - spin * 3.0 + r * 26.0);
  float turbulence = 0.55 + 0.45 * (streaks * 0.55 + fine * 0.3 + glint * 0.15);

  float bands = 0.8 + 0.2 * sin(r * 21.0 - uTime * 0.3);

  float radial = exp(-t * 2.6);
  float photon = exp(-pow((t - 0.012) * 16.0, 2.0));
  float outerFade = 1.0 - smoothstep(0.82, 1.0, t);

  float glow = (0.55 * radial + 1.15 * photon) * turbulence * bands * beam * outerFade;

  vec3 core = vec3(0.98, 0.985, 1.0);
  vec3 mid = vec3(0.62, 0.68, 1.0);
  vec3 edge = vec3(0.5, 0.44, 1.0);
  vec3 color = mix(core, mid, smoothstep(0.0, 0.4, t));
  color = mix(color, edge, smoothstep(0.4, 1.0, t));
  color = mix(color, vec3(0.85, 0.9, 1.0), 0.4 * beam);

  float alpha = clamp(glow, 0.0, 1.0);
  gl_FragColor = vec4(color * glow * 3.6 * uIntensity, alpha);
}
`;

const RING_FRAGMENT = `
uniform float uInner;
uniform float uOuter;
uniform float uIntensity;
varying vec2 vPos;

void main() {
  float r = length(vPos);
  float mid = (uInner + uOuter) * 0.5;
  float thin = exp(-pow((r - mid) * 26.0, 2.0));
  vec3 col = mix(vec3(0.92, 0.95, 1.0), vec3(0.62, 0.72, 1.0), smoothstep(uInner, uOuter, r));
  float a = clamp(thin * 1.2, 0.0, 1.0);
  gl_FragColor = vec4(col * a * 2.2 * uIntensity, a);
}
`;

const HALO_FRAGMENT = `
uniform float uInner;
uniform float uOuter;
uniform float uIntensity;
varying vec2 vPos;

void main() {
  float r = length(vPos);
  if (r > uOuter || r < uInner) discard;
  float t = (r - uInner) / (uOuter - uInner);
  float glow = pow(1.0 - t, 2.8);
  vec3 color = mix(vec3(0.72, 0.78, 1.0), vec3(0.5, 0.46, 1.0), t);
  float alpha = glow * 0.4 * uIntensity;
  gl_FragColor = vec4(color * glow * 1.8 * uIntensity, alpha);
}
`;

const ORBIT_VERTEX = `
attribute float aRadius;
attribute float aPhase;
attribute float aSpeed;
attribute float aSize;
uniform float uTime;
uniform float uOuter;
varying float vFade;

void main() {
  float r = aRadius;
  float ang = aPhase + uTime * aSpeed * (2.0 - r / uOuter);
  vec3 pos = vec3(cos(ang) * r, sin(ang) * r, 0.0);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (140.0 / max(-mv.z, 0.001));
  vFade = 1.0 - smoothstep(0.25, 1.0, r / uOuter);
  gl_Position = projectionMatrix * mv;
}
`;

const ORBIT_FRAGMENT = `
uniform float uIntensity;
varying float vFade;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.05, d);
  gl_FragColor = vec4(vec3(0.75, 0.82, 1.0), a * vFade * 0.75 * uIntensity);
}
`;

function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1_664_525 + 1_013_904_223) >>> 0;
    return state / 4_294_967_296;
  };
}

function createOrbitData(count: number) {
  const radii = new Float32Array(count);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const random = createRandom(2_026_0818);

  for (let index = 0; index < count; index += 1) {
    const t = random();
    radii[index] = INNER * 1.1 + (OUTER - INNER * 1.1) * Math.pow(t, 0.7);
    phases[index] = random() * Math.PI * 2;
    speeds[index] = 0.15 + random() * 0.55;
    sizes[index] = 0.8 + random() * 1.8;
  }

  return { phases, radii, sizes, speeds };
}

function createGlowTexture() {
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
  gradient.addColorStop(0.35, "rgba(255,255,255,0.45)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface BlackHoleProps {
  position?: [number, number, number];
  scale?: number;
  intensity?: number;
}

export default function BlackHole({
  position = [-3.4, 1.6, -9.5],
  scale = 0.55,
  intensity = 0.7,
}: BlackHoleProps) {
  const group = useRef<THREE.Group>(null!);
  const diskMaterial = useRef<THREE.ShaderMaterial>(null!);
  const orbitMaterial = useRef<THREE.ShaderMaterial>(null!);
  const pointer = usePointerScene();
  const orientation = useOrientation();
  const quality = useQuality();

  const orbitData = useMemo(
    () => createOrbitData(quality === "high" ? 200 : 90),
    [quality],
  );

  const glowTexture = useMemo(() => createGlowTexture(), []);

  const orbitGeometry = useMemo(() => {
    const count = orbitData.radii.length;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(count * 3), 3),
    );
    geo.setAttribute(
      "aRadius",
      new THREE.BufferAttribute(orbitData.radii, 1),
    );
    geo.setAttribute(
      "aPhase",
      new THREE.BufferAttribute(orbitData.phases, 1),
    );
    geo.setAttribute(
      "aSpeed",
      new THREE.BufferAttribute(orbitData.speeds, 1),
    );
    geo.setAttribute("aSize", new THREE.BufferAttribute(orbitData.sizes, 1));
    return geo;
  }, [orbitData]);

  useFrame((_, delta) => {
    if (diskMaterial.current) {
      diskMaterial.current.uniforms.uTime.value += delta;
    }
    if (orbitMaterial.current) {
      orbitMaterial.current.uniforms.uTime.value += delta;
    }
    group.current.rotation.z += delta * 0.005;

    const gyro = orientation.current;
    const gyroActive = gyro.active;
    const gyroX = gyroActive ? gyro.x * GYRO_SHIFT : 0;
    const gyroY = gyroActive ? gyro.y * GYRO_SHIFT * 0.8 : 0;

    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      position[0] + (gyroActive ? gyroX : pointer.current.x * 0.03),
      0.5,
      delta,
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      position[1] + (gyroActive ? gyroY : pointer.current.y * 0.025),
      0.5,
      delta,
    );
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[0.78, -0.4, 0.22]}
      scale={scale}
    >
      <sprite position={[0, 0, -0.4]}>
        <spriteMaterial
          map={glowTexture}
          color="#a8c0ff"
          depthWrite={false}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <mesh>
        <ringGeometry args={[INNER * 0.7, OUTER * 2.4, 128, 8]} />
        <shaderMaterial
          args={[
            {
              uniforms: {
                uInner: { value: INNER * 0.7 },
                uOuter: { value: OUTER * 2.4 },
                uIntensity: { value: intensity },
              },
              vertexShader: DISK_VERTEX,
              fragmentShader: HALO_FRAGMENT,
              transparent: true,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
              side: THREE.DoubleSide,
            },
          ]}
        />
      </mesh>

      <mesh>
        <ringGeometry args={[INNER, OUTER, 220, 8]} />
        <shaderMaterial
          ref={diskMaterial}
          args={[
            {
              uniforms: {
                uTime: { value: 0 },
                uInner: { value: INNER },
                uOuter: { value: OUTER },
                uIntensity: { value: intensity },
              },
              vertexShader: DISK_VERTEX,
              fragmentShader: DISK_FRAGMENT,
              transparent: true,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
              side: THREE.DoubleSide,
            },
          ]}
        />
      </mesh>

      <mesh>
        <ringGeometry args={[INNER * 0.95, INNER * 1.15, 220, 8]} />
        <shaderMaterial
          args={[
            {
              uniforms: {
                uInner: { value: INNER * 0.95 },
                uOuter: { value: INNER * 1.15 },
                uIntensity: { value: intensity },
              },
              vertexShader: DISK_VERTEX,
              fragmentShader: RING_FRAGMENT,
              transparent: true,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
              side: THREE.DoubleSide,
            },
          ]}
        />
      </mesh>

      <points geometry={orbitGeometry}>
        <shaderMaterial
          ref={orbitMaterial}
          args={[
            {
              uniforms: {
                uTime: { value: 0 },
                uOuter: { value: OUTER },
                uIntensity: { value: intensity },
              },
              vertexShader: ORBIT_VERTEX,
              fragmentShader: ORBIT_FRAGMENT,
              transparent: true,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            },
          ]}
        />
      </points>

      <sprite position={[0, 0, 0.3]}>
        <spriteMaterial
          map={glowTexture}
          color="#b8c6ff"
          depthWrite={false}
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[INNER, 96]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}
