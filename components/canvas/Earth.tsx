import { useGLTF, Resize } from "@react-three/drei";
import Throwable from "./Throwable";

export default function Earth() {
  const { scene } = useGLTF("/models/earth.glb");

  return (
    <Throwable initialPosition={[-2, 0.5, 0]} padding={0.3}>
      <Resize scale={1.7}>
        <primitive object={scene} />
      </Resize>
    </Throwable>
  );
}

useGLTF.preload("/models/earth.glb");
