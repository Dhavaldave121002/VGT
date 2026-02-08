// ThreeScene.jsx
import React, { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  useTexture,
  ContactShadows,
  MeshDistortMaterial,
  MeshWobbleMaterial
} from '@react-three/drei';

// Minimalist Glass Panel Component
const GlassPanel = ({ texture, position, rotation, scale, isActive, emissiveIntensity = 1 }) => {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle breathing animation
    mesh.current.position.y += Math.sin(t * 0.8) * 0.0015;
  });

  return (
    <group position={position} rotation={rotation}>
      {/* The main panel */}
      <mesh ref={mesh} receiveShadow castShadow scale={scale}>
        <boxGeometry args={[1, 1, 0.05]} />
        <meshStandardMaterial
          map={texture}
          emissive="#ffffff"
          emissiveMap={texture}
          emissiveIntensity={isActive ? emissiveIntensity : 0.1}
          metalness={0.1}
          roughness={0.05}
          transparent={true}
          opacity={0.95}
        />
        {/* Glass Frame / Border */}
        <mesh scale={[1.02, 1.02, 1.05]} position={[0, 0, -0.01]}>
          <boxGeometry args={[1, 1, 0.02]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.05}
            transparent={true}
            opacity={0.3}
          />
        </mesh>
      </mesh>

      {/* Content Bloom / Glow */}
      {isActive && (
        <mesh position={[0, 0, -0.1]} scale={scale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} blur={10} />
        </mesh>
      )}
    </group>
  );
};

const AbstractShapes = () => {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-6, 3, -4]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <MeshDistortMaterial color="#3b82f6" speed={1.5} distort={0.5} roughness={0} metalness={1} />
        </mesh>
      </Float>
      <Float speed={4} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[5, -3, -5]}>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#8b5cf6" metalness={1} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
};

const ShowcaseComposition = ({ activeDevice, laptopImage, phoneImage }) => {
  const laptopTex = useTexture(laptopImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000');
  const phoneTex = useTexture(phoneImage || 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=500');

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.1} />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <Environment preset="night" />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Main Tablet-sized content */}
        <GlassPanel
          texture={laptopTex}
          position={[-1, 0.2, 0]}
          rotation={[0, 0.2, 0]}
          scale={[4.2, 2.8, 1]}
          isActive={activeDevice === 'laptop' || activeDevice === 'all'}
          emissiveIntensity={0.6}
        />

        {/* Mobile-sized content floating in front */}
        <GlassPanel
          texture={phoneTex}
          position={[2, -0.5, 2]}
          rotation={[0, -0.2, 0.1]}
          scale={[1.2, 2.4, 1]}
          isActive={activeDevice === 'mobile' || activeDevice === 'all'}
          emissiveIntensity={0.8}
        />
      </Float>

      <AbstractShapes />
      <ContactShadows position={[0, -3, 0]} opacity={0.3} scale={20} blur={2.5} far={4.5} />
    </>
  );
};

export default function ThreeScene({ activeDevice = 'all', laptopImage, phoneImage }) {
  return (
    <div className="canvas-container" style={{ width: '100%', height: '100%', minHeight: '550px' }}>
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 35 }}
      >
        <Suspense fallback={null}>
          <ShowcaseComposition
            activeDevice={activeDevice}
            laptopImage={laptopImage}
            phoneImage={phoneImage}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
