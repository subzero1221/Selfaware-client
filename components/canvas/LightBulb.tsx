"use client";
import { useGLTF, Resize } from "@react-three/drei";
import { useMemo } from "react";
import Throwable from "./Throwable";

export default function LightBulb() {
  const { scene } = useGLTF("/models/lightbulb.glb");

  return (
    <Throwable initialPosition={[-2, 2, 0]} padding={0.3}>
      <Resize scale={0.3}>
        <primitive object={scene} />
      </Resize>
    </Throwable>
  );
}

useGLTF.preload("/models/lightbulb.glb");
