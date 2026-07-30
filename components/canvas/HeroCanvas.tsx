"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import DNA from "./DNA";
import Trex from "./Trex";
import Earth from "./Earth";
import FloatingMarks from "./FloatingMarks";
import LightBulb from "./LightBulb";

export default function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ pointerEvents: "auto" }}
        className="pointer-events-auto absolute inset-0 z-0 h-full w-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          <Physics gravity={[0, 0, 0]}>
            <FloatingMarks />

            <LightBulb />
            <DNA />
            <Trex />
            <Earth />
            <Environment preset="city" />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
