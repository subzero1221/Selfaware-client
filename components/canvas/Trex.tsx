"use client";

import { useGLTF, Resize } from "@react-three/drei";
import Throwable from "./Throwable";

export default function Trex() {
  const { scene } = useGLTF("/models/trex.glb");

  return (
    <Throwable initialPosition={[2, 1, 0]} padding={0.3}>
      <Resize scale={1.2}>
        <primitive object={scene} />
      </Resize>
    </Throwable>
  );
}

useGLTF.preload("/models/trex.glb");
