import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';

export default function AIOrb() {
  const sphereRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.2;
      sphereRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#3b82f6" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />

      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        {/* Inner Glowing Core */}
        <mesh scale={0.8}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial color="#3b82f6" emissive="#2563eb" emissiveIntensity={3} toneMapped={false} />
        </mesh>

        {/* Outer Glass Shell */}
        <mesh ref={sphereRef} scale={2}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#60a5fa"
            roughness={0}
            metalness={0.2}
            transmission={0.2}
            transparent
            opacity={0.3}
          />
          <Edges scale={1} threshold={15} color="#93c5fd" />
        </mesh>

        {/* Outer Data Shell */}
        <mesh scale={2.2} rotation={[0.5, 0.5, 0]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.1} wireframe />
        </mesh>
      </Float>

      {/* Rings representing data flow */}
      <group rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} transparent opacity={0.5} />
        </mesh>
      </group>
      <group rotation={[-Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[3.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} transparent opacity={0.3} />
        </mesh>
      </group>
    </>
  );
}
