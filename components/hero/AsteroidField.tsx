"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const ASTEROID_COUNT = 18;

function createAsteroids() {
  let seed = 2_026_0823;
  const random = () => {
    seed = (seed * 1_664_525 + 1_013_904_223) >>> 0;
    return seed / 4_294_967_296;
  };

  return Array.from({ length: ASTEROID_COUNT }, () => ({
    position: new THREE.Vector3((random() - 0.5) * 12, (random() - 0.5) * 7, -1 + random() * 7),
    rotation: new THREE.Euler(random() * Math.PI, random() * Math.PI, random() * Math.PI),
    scale: 0.08 + random() * 0.25,
  }));
}

export default function AsteroidField() {
  const field = useRef<THREE.Group>(null!);
  const asteroids = useRef<THREE.InstancedMesh>(null!);
  const data = useMemo(() => createAsteroids(), []);

  useLayoutEffect(() => {
    const object = new THREE.Object3D();

    data.forEach((asteroid, index) => {
      object.position.copy(asteroid.position);
      object.rotation.copy(asteroid.rotation);
      object.scale.setScalar(asteroid.scale);
      object.updateMatrix();
      asteroids.current.setMatrixAt(index, object.matrix);
    });
    asteroids.current.instanceMatrix.needsUpdate = true;
  }, [data]);

  useFrame(({ pointer }, delta) => {
    field.current.position.x = THREE.MathUtils.damp(field.current.position.x, pointer.x * 0.32, 1.8, delta);
    field.current.position.y = THREE.MathUtils.damp(field.current.position.y, pointer.y * 0.2, 1.8, delta);
  });

  return (
    <group ref={field}>
      <instancedMesh ref={asteroids} args={[undefined, undefined, ASTEROID_COUNT]}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#172033" metalness={0.18} roughness={0.9} />
      </instancedMesh>
    </group>
  );
}
