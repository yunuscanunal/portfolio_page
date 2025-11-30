import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Sürekli dönme hareketi
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2.4} ref={meshRef}>
      <MeshDistortMaterial
        color="#00f3ff" // Cyber Primary Rengi
        attach="material"
        distort={0.4} // Bozulma efekti (sıvı metal hissi)
        speed={1.5} // Hareket hızı
        roughness={0.2}
        metalness={0.8}
        wireframe={true} // Fütüristik tel kafes görünümü (istersen false yap)
      />
    </Sphere>
  );
};

const TechScene = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
        {" "}
        {/* DPR limit + performance mode */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          color="#ff00ff"
        />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={1}
          color="#00f3ff"
        />
        <AnimatedSphere />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default TechScene;
