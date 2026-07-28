"use client";

import { useGLTF, Resize } from "@react-three/drei";
import Throwable from "./Throwable";

export default function DNA() {
  const { scene } = useGLTF("/models/DNA.glb");

  return (
    <Throwable initialPosition={[1, 1, 0]} padding={0.3}>
      <Resize scale={0.5}>
        <primitive object={scene} />
      </Resize>
    </Throwable>
  );
}

useGLTF.preload("/models/DNA.glb");
