import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";

function LightbulbModel() {
  const { scene } = useGLTF("/models/lightbulb.glb");
  return (
    <Center>
      <primitive object={scene} scale={0.5} />
    </Center>
  );
}

export default function Logo3D() {
  return (
    <div className="w-12 h-12 cursor-pointer">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <LightbulbModel />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
      </Canvas>
    </div>
  );
}
