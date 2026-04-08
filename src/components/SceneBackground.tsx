'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const ref = useRef<THREE.Points>(null);
  
  // Reduced particle count for better performance (from 1000 to 300)
  const [positions] = useMemo(() => {
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [positions];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // More subtle movement
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x -= delta * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={true}>
      <PointMaterial
        transparent
        color="#f9bb8a"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #0a0f16, #000000)' }}>
      {/* Limit dpr to reduce lag on high-res displays */}
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
