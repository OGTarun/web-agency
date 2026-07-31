"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";

function Orb() {
  return (
    <Float
      speed={2}
      rotationIntensity={1.2}
      floatIntensity={2}
    >
      <Sphere args={[1.3, 128, 128]}>
        <MeshDistortMaterial
          color="#8B5CF6"
          roughness={0}
          metalness={0.8}
          clearcoat={1}
          distort={0.35}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={5}
          color="#ffffff"
        />

        <pointLight
          position={[-5, -5, 2]}
          intensity={10}
          color="#3B82F6"
        />

        <pointLight
          position={[5, 5, 3]}
          intensity={10}
          color="#8B5CF6"
        />

        <Orb />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}