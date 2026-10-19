"use client";

import React, { useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CubeCSS } from "./CubeCSS";

const emptySubscribe = () => () => {};

function checkWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function RotatingCube() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.5;
      groupRef.current.rotation.y += delta * 0.7;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.25;
    }
  });

  return (
    <>
      {/* Ambient Lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Orbit Ring 1 (tilted lime) */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.5, Math.PI / 8, 0]}>
        <ringGeometry args={[2.2, 2.22, 64]} />
        <meshBasicMaterial color="#C8FF3D" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Orbit Ring 2 (tilted opposing blue) */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, -Math.PI / 6, 0]}>
        <ringGeometry args={[2.6, 2.62, 64]} />
        <meshBasicMaterial color="#7C8BFF" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Rotating Cube Group */}
      <group ref={groupRef}>
        {/* Semi-translucent Face Mesh */}
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial
            color="#1A1433"
            transparent
            opacity={0.65}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Wireframe Edge Highlights */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.5, 1.5, 1.5)]} />
          <lineBasicMaterial color="#C8FF3D" linewidth={2} />
        </lineSegments>
      </group>
    </>
  );
}

export function Cube3D() {
  const hasWebGL = useSyncExternalStore(emptySubscribe, checkWebGL, () => false);

  // Fallback to CSS cube if WebGL is unavailable
  if (!hasWebGL) {
    return <CubeCSS />;
  }

  return (
    <div className="w-64 h-64 relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <RotatingCube />
      </Canvas>
    </div>
  );
}
