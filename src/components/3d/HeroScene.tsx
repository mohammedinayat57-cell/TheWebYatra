"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

// ─── Shared bronze material ───────────────────────────────────────────────────
function useBronze() {
  return useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#B8870A"),
    metalness: 0.92,
    roughness: 0.18,
    envMapIntensity: 1.2,
  }), []);
}

// ─── Globe — unchanged rotation / animation ───────────────────────────────────
function DistortedSphere({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mousePos.current.y * 0.3, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mousePos.current.x * 0.3 + t * 0.18, 0.05);
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.55, 64, 64]} />
      <MeshDistortMaterial
        color="#1A0F00"
        distort={0.42}
        speed={2.2}
        roughness={0.35}
        metalness={0.3}
      />
    </mesh>
  );
}

// ─── Wireframe sphere (the golden mesh cage around the globe) ─────────────────
function WireframeSphere({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.04;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mousePos.current.x * 0.15 + t * 0.09, 0.02);
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.0, 20, 20]} />
      <meshBasicMaterial color="#C4966A" wireframe transparent opacity={0.18} />
    </mesh>
  );
}

// ─── Floating particles ───────────────────────────────────────────────────────
function FloatingParticles() {
  const count = 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 9;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 9;
    }
    return pos;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.025; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#D4A860" size={0.035} transparent opacity={0.55} />
    </points>
  );
}

// ─── Orbit ellipses (the two tilted rings visible in the reference) ────────────
function OrbitEllipses() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (r1.current) r1.current.rotation.z = t * 0.25;
    if (r2.current) r2.current.rotation.z = -t * 0.18;
  });
  return (
    <>
      <mesh ref={r1} rotation={[Math.PI / 2.8, 0.4, 0]}>
        <torusGeometry args={[2.7, 0.008, 8, 120]} />
        <meshBasicMaterial color="#C4966A" transparent opacity={0.22} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 2.2, -0.3, 0.6]}>
        <torusGeometry args={[3.1, 0.006, 8, 120]} />
        <meshBasicMaterial color="#C4966A" transparent opacity={0.14} />
      </mesh>
    </>
  );
}

// ─── Globe Stand — full circular meridian ring + stem + base ─────────────────
function GlobeStand() {
  const bronze = useBronze();

  // Build the full circular meridian ring using TubeGeometry around a circle
  const ringGeom = useMemo(() => {
    const radius = 2.05;
    const path = new THREE.CatmullRomCurve3(
      Array.from({ length: 65 }, (_, i) => {
        const angle = (i / 64) * Math.PI * 2;
        return new THREE.Vector3(Math.sin(angle) * radius, Math.cos(angle) * radius, 0);
      }),
      true
    );
    return new THREE.TubeGeometry(path, 128, 0.042, 10, true);
  }, []);

  return (
    <group>
      {/* ── Full circular meridian ring ── */}
      <mesh geometry={ringGeom} material={bronze} rotation={[0, 0, 0]} />

      {/* Knob at top of ring */}
      <mesh position={[0, 2.08, 0]} material={bronze}>
        <sphereGeometry args={[0.11, 20, 20]} />
      </mesh>

      {/* Knob at bottom of ring (where arm meets stem) */}
      <mesh position={[0, -2.08, 0]} material={bronze}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>

      {/* Short neck connecting ring bottom to stem */}
      <mesh position={[0, -2.38, 0]} material={bronze}>
        <cylinderGeometry args={[0.05, 0.05, 0.52, 14]} />
      </mesh>

      {/* Connector knob mid-stem */}
      <mesh position={[0, -2.66, 0]} material={bronze}>
        <cylinderGeometry args={[0.12, 0.12, 0.14, 20]} />
      </mesh>

      {/* Main vertical stem */}
      <mesh position={[0, -3.05, 0]} material={bronze}>
        <cylinderGeometry args={[0.055, 0.07, 0.62, 16]} />
      </mesh>

      {/* Upper base platform */}
      <mesh position={[0, -3.42, 0]} material={bronze}>
        <cylinderGeometry args={[0.38, 0.48, 0.14, 40]} />
      </mesh>

      {/* Main base disc */}
      <mesh position={[0, -3.57, 0]} material={bronze}>
        <cylinderGeometry args={[0.82, 0.88, 0.11, 60]} />
      </mesh>

      {/* Base rim ring */}
      <mesh position={[0, -3.64, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.84, 0.045, 14, 60]} />
        <primitive object={bronze} attach="material" />
      </mesh>
    </group>
  );
}

// ─── Full scene ───────────────────────────────────────────────────────────────
function Scene({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      {/* Lighting for premium brass look */}
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={1.8} color="#F5E0A0" />
      <pointLight position={[-4, 2, -3]} intensity={0.7} color="#C4966A" />
      <pointLight position={[0, -3, 3]} intensity={0.4} color="#E8C9A0" />
      <directionalLight position={[3, 5, 3]} intensity={0.9} color="#FFF0CC" castShadow />

      <Stars radius={80} depth={50} count={350} factor={3} saturation={0} fade speed={0.4} />
      <FloatingParticles />
      <OrbitEllipses />
      <WireframeSphere mousePos={mousePos} />
      <DistortedSphere mousePos={mousePos} />
      {/* Stand is fixed in world space — globe rotates inside it */}
      <GlobeStand />
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function HeroScene() {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.4, 7.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
      >
        <Scene mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
