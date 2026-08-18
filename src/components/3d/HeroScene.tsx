"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars, Torus } from "@react-three/drei";
import * as THREE from "three";

function DistortedSphere({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mousePos.current.y * 0.4, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mousePos.current.x * 0.4 + t * 0.15, 0.05);
  });
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial color="#C4966A" attach="material" distort={0.45} speed={2.5} roughness={0.15} metalness={0.6} wireframe={false} />
      </Sphere>
    </Float>
  );
}

function WireframeSphere({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.05;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mousePos.current.x * 0.2 + t * 0.08, 0.02);
  });
  return (
    <Sphere ref={meshRef} args={[2.2, 24, 24]}>
      <meshBasicMaterial color="#8B5E3C" wireframe transparent opacity={0.12} />
    </Sphere>
  );
}

function OrbitRing({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2.5 + mousePos.current.y * 0.2;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });
  return (
    <Torus ref={ref} args={[2.8, 0.015, 16, 120]}>
      <meshBasicMaterial color="#C4966A" transparent opacity={0.55} />
    </Torus>
  );
}

function OrbitRing2() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 3;
    ref.current.rotation.z = state.clock.getElapsedTime() * -0.2;
  });
  return (
    <Torus ref={ref} args={[3.4, 0.01, 16, 120]}>
      <meshBasicMaterial color="#E8C9A0" transparent opacity={0.3} />
    </Torus>
  );
}

function FloatingParticles() {
  const count = 60;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.03; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#C4966A" size={0.04} transparent opacity={0.5} />
    </points>
  );
}

function Scene({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#C4966A" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#E8C9A0" />
      <pointLight position={[0, 5, -5]} intensity={0.8} color="#8B5E3C" />
      <Stars radius={80} depth={50} count={400} factor={3} saturation={0} fade speed={0.5} />
      <FloatingParticles />
      <WireframeSphere mousePos={mousePos} />
      <DistortedSphere mousePos={mousePos} />
      <OrbitRing mousePos={mousePos} />
      <OrbitRing2 />
    </>
  );
}

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
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <Scene mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
