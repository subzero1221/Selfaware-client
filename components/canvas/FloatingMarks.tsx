import { Text, Float } from "@react-three/drei";

export default function FloatingMarks() {
  const marks = [
    { char: "?", pos: [-3.5, 2, -2], color: "#f59e0b", size: 1.2 },
    { char: "?", pos: [2.5, 2.2, -3], color: "#fbbf24", size: 0.9 },
    { char: "✔", pos: [-3.8, -2, -2], color: "#34d399", size: 0.8 },
    { char: "✕", pos: [0, 2.8, -4], color: "#f43f5e", size: 0.7 },
    { char: "✔", pos: [2.8, 0, -2], color: "#34d399", size: 0.8 },
    { char: "✕", pos: [2, 0.8, -4], color: "#f43f5e", size: 0.7 },
  ];

  return (
    <group>
      {marks.map((m, i) => (
        <Float
          key={i}
          speed={1.8}
          rotationIntensity={1.5}
          floatIntensity={2}
          position={m.pos as [number, number, number]}
        >
          <Text
            fontSize={m.size}
            color={m.color}
            fillOpacity={0.4}
          >
            {m.char}
          </Text>
        </Float>
      ))}
    </group>
  );
}
