import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// --- Scene Components ---

function WebScene({ count = 100 }) {
  const mesh = useRef(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      const dummy = new THREE.Object3D();
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.4} />
      </instancedMesh>
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[4, 0, -5]} rotation={[0, 0.5, 0]}>
          <torusGeometry args={[3, 0.05, 16, 100]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-4, -2, -5]} rotation={[0.5, 0, 0]}>
          <torusGeometry args={[2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.2} />
        </mesh>
      </Float>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

function FloatingShape({ position, color, geometry, scale = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = t / 4
    ref.current.rotation.y = t / 4
    ref.current.position.y = position[1] + Math.sin(t / 1.5) / 10
  })

  return (
    <mesh ref={ref} position={position} scale={[scale, scale, scale]}>
      {geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
      {geometry === 'torus' && <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />}
      {geometry === 'dodecahedron' && <dodecahedronGeometry args={[0.8, 0]} />}
      {geometry === 'sphere' && <sphereGeometry args={[0.8, 32, 32]} />}

      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

function AppScene() {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <FloatingShape position={[-3, 1, 0]} color="#ef4444" geometry="box" />
        <FloatingShape position={[3, -1, -2]} color="#b91c1c" geometry="dodecahedron" />
        <FloatingShape position={[0, 2, -5]} color="#fca5a5" geometry="torus" />
      </Float>
      <Sparkles count={100} scale={12} size={4} speed={0.4} opacity={0.5} color="#ef4444" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </group>
  )
}

function UIUXScene() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-3, 0, -2]} rotation={[0, 0.5, 0]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ec4899" roughness={0} metalness={0.5} wireframe />
        </mesh>
        <FloatingShape position={[3, 1, 0]} color="#d946ef" geometry="sphere" scale={1.2} />
      </Float>
      <Sparkles count={150} scale={15} size={3} speed={0.3} opacity={0.6} color="#d946ef" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </group>
  )
}

function DefaultScene() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <FloatingShape position={[0, 0, 0]} color="#eab308" geometry="torus" scale={1.5} />
        <FloatingShape position={[4, 2, -5]} color="#ca8a04" geometry="dodecahedron" />
        <FloatingShape position={[-4, -2, -5]} color="#fde047" geometry="box" />
      </Float>
      <Sparkles count={80} scale={10} size={5} speed={0.5} opacity={0.4} color="#eab308" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </group>
  )
}

// --- NEW SPECIFIC SCENES FOR ABOUT & PORTFOLIO (NO STAR BG) ---

function AboutScene() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Central Hero Object: Abstract Structure representing "Structure/Team/network" */}
        <mesh position={[3, 0, 0]} scale={2}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#3b82f6"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.1}
            distort={0.4}
            speed={2}
          />
        </mesh>
        <mesh position={[-3, 1, -2]} rotation={[0, 0.5, 0]}>
          <torusKnotGeometry args={[0.8, 0.2, 100, 16]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </Float>
      {/* Minimal Sparkles, NO STARS */}
      <Sparkles count={30} scale={10} size={2} speed={0.2} opacity={0.3} color="#ffffff" />
    </group>
  )
}

function PortfolioScene() {
  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
        {/* Floating "Windows" or Panels representing projects */}
        <mesh position={[3.5, 0.5, 0]} rotation={[0, -0.3, 0.1]}>
          <boxGeometry args={[2.5, 3.5, 0.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} opacity={0.9} transparent />
        </mesh>
        <mesh position={[-3.5, -0.5, -1]} rotation={[0, 0.3, -0.1]}>
          <boxGeometry args={[2.5, 3.5, 0.2]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.5} wireframe />
        </mesh>

        {/* Central connecting element */}
        <mesh position={[0, 0, -2]} scale={1.2}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#6366f1" wireframe />
        </mesh>
      </Float>
      {/* Subdued ambient light for "clean" look */}
      <ambientLight intensity={0.2} />
    </group>
  )
}


// --- Main Banner Component ---

export default function Banner3D({ variant = 'default', title, subtitle }) {

  const getScene = () => {
    switch (variant) {
      case 'web': return <WebScene />;
      case 'app': return <AppScene />;
      case 'uiux': return <UIUXScene />;
      case 'about': return <AboutScene />;
      case 'portfolio': return <PortfolioScene />;
      default: return <DefaultScene />;
    }
  };

  return (
    <div className="relative w-full h-[75vh] bg-[#030712] overflow-hidden">
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}> {/* Optimized camera */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, -10, -10]} angle={0.3} intensity={2} />
          <Suspense fallback={null}>
            {getScene()}
          </Suspense>
          {/* Only render stats for default scenes, not specialty ones if user wants "not bg" look */}
          {/* Note: In specific scenes above, I omitted Stars. This keeps the background clean for About/Portfolio */}
        </Canvas>
      </div>

      {/* Content Layer (Overlay) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">

        <div className="max-w-4xl space-y-6 pt-20"> {/* Added padding top here inside content to clear header if needed */}
          {/* Enhanced Glowing effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-full blur-[100px] -z-10 mix-blend-screen"></div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-blue-100/80 font-normal max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Gradient Fade at bottom to blend with next section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#030712] to-transparent z-20"></div>
    </div>
  );
}
