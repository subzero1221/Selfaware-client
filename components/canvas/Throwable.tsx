"use client";

import { useRef, useState, ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ThrowableProps {
  children: ReactNode;
  initialPosition?: [number, number, number];
  padding?: number;
  bounceDamping?: number;
  friction?: number;
}

export default function Throwable({
  children,
  initialPosition = [0, 0, 0],
  padding = 0.3,
  bounceDamping = -0.7,
  friction = 0.94,
}: ThrowableProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);

  const pos = useRef(new THREE.Vector3(...initialPosition));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const rotationVel = useRef(new THREE.Vector3(0, 0.008, 0));
  const prevMousePos = useRef(new THREE.Vector3());

  const dragOffset = useRef(new THREE.Vector3());

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const minX = -viewport.width / 2 + padding;
    const maxX = viewport.width / 2 - padding;
    const minY = -viewport.height / 2 + padding;
    const maxY = viewport.height / 2 - padding;

    const targetX = (state.pointer.x * viewport.width) / 2;
    const targetY = (state.pointer.y * viewport.height) / 2;
    const currentMousePos = new THREE.Vector3(targetX, targetY, pos.current.z);

    if (isDragging) {
      if (delta > 0) {
        velocity.current
          .subVectors(currentMousePos, prevMousePos.current)
          .divideScalar(delta);
      }
      prevMousePos.current.copy(currentMousePos);

      const objectTargetPos = currentMousePos.clone().add(dragOffset.current);

      objectTargetPos.x = THREE.MathUtils.clamp(objectTargetPos.x, minX, maxX);
      objectTargetPos.y = THREE.MathUtils.clamp(objectTargetPos.y, minY, maxY);

      pos.current.copy(objectTargetPos);
    } else {
      pos.current.addScaledVector(velocity.current, delta);

      if (pos.current.x < minX) {
        pos.current.x = minX;
        velocity.current.x *= bounceDamping;
        rotationVel.current.z += velocity.current.y * 0.02;
      } else if (pos.current.x > maxX) {
        pos.current.x = maxX;
        velocity.current.x *= bounceDamping;
        rotationVel.current.z -= velocity.current.y * 0.02;
      }

      if (pos.current.y < minY) {
        pos.current.y = minY;
        velocity.current.y *= bounceDamping;
      } else if (pos.current.y > maxY) {
        pos.current.y = maxY;
        velocity.current.y *= bounceDamping;
      }

      velocity.current.multiplyScalar(friction);

      groupRef.current.rotation.x += rotationVel.current.x;
      groupRef.current.rotation.y += rotationVel.current.y;
      groupRef.current.rotation.z += rotationVel.current.z;
      rotationVel.current.multiplyScalar(0.97);
    }

    groupRef.current.position.copy(pos.current);
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    if (e.nativeEvent) e.nativeEvent.preventDefault();
    e.target.setPointerCapture(e.pointerId);

    const targetX = (e.pointer.x * viewport.width) / 2;
    const targetY = (e.pointer.y * viewport.height) / 2;
    const clickMousePos = new THREE.Vector3(targetX, targetY, pos.current.z);

    dragOffset.current.subVectors(pos.current, clickMousePos);

    prevMousePos.current.copy(clickMousePos);
    velocity.current.set(0, 0, 0);
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    e.target.releasePointerCapture(e.pointerId);
    setIsDragging(false);
    document.body.style.cursor = "grab";

    rotationVel.current.set(
      (Math.random() - 0.5) * 0.15,
      (Math.random() - 0.5) * 0.15,
      (Math.random() - 0.5) * 0.1,
    );
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={() => (document.body.style.cursor = "grab")}
      onPointerOut={() => {
        if (!isDragging) document.body.style.cursor = "auto";
      }}
    >
      {children}
    </group>
  );
}
