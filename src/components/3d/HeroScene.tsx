"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars, Torus } from "@react-three/drei";
import * as THREE from "three";

// ─── Globe components (unchanged) ────────────────────────────────────────────

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

// ─── Globe Stand (Three.js, stays fixed in world space) ──────────────────────

function GlobeStand() {
  const bronze = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#C4966A"),
    metalness: 0.85,
    roughness: 0.25,
  }), []);

  // Curved arm: a torus arc from the base up to the top of the globe
  const arcCurve = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.3, -2.5, 0),   // bottom — base level
      new THREE.Vector3(2.8, 0, 0),      // control point (curves outward)
      new THREE.Vector3(0, 2.2, 0),      // top — top of globe
    );
    return curve;
  }, []);

  const arcGeometry = useMemo(() => {
    const pts = arcCurve.getPoints(64);
    const path = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(path, 64, 0.045, 10, false);
  }, [arcCurve]);

  return (
    <group>
      {/* Curved side arm */}
      <mesh geometry={arcGeometry} material={bronze} />

      {/* Knob at top of arm */}
      <mesh position={[0, 2.22, 0]} material={bronze}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>

      {/* Knob at bottom join */}
      <mesh position={[0.28, -2.45, 0]} material={bronze}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>

      {/* Vertical stem */}
      <mesh position={[0, -3.35, 0]} material={bronze}>
        <cylinderGeometry args={[0.045, 0.06, 0.9, 16]} />
      </mesh>

      {/* Connector knob */}
      <mesh position={[0, -2.85, 0]} material={bronze}>
        <cylinderGeometry args={[0.1, 0.1, 0.15, 16]} />
      </mesh>

      {/* Upper base cylinder */}
      <mesh position={[0, -3.9, 0]} material={bronze}>
        <cylinderGeometry args={[0.35, 0.45, 0.12, 32]} />
      </mesh>

      {/* Lower base disc */}
      <mesh position={[0, -4.05, 0]} material={bronze}>
        <cylinderGeometry args={[0.75, 0.85, 0.1, 48]} />
      </mesh>

      {/* Base rim */}
      <mesh position={[0, -4.12, 0]} material={bronze}>
        <torusGeometry args={[0.78, 0.04, 12, 48]} />
      </mesh>
    </group>
  );
}

// ─── Full scene ───────────────────────────────────────────────────────────────

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
      {/* Stand — fixed in world space, globe rotates above it */}
      <GlobeStand />
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function HeroScene() {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
