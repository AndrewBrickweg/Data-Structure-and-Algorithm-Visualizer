import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense } from "react";

export default function GalaxyCanvas() {
  return (
    <Canvas>
      {/* Scene Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Galaxy or Starfield */}
      <Suspense fallback={null}>
        <Stars
          radius={100} // Sphere radius
          depth={50} // Star field depth
          count={5000} // Number of stars
          factor={4} // Star size factor
          saturation={0} // Star color saturation
          fade // Fade stars in the distance
        />
      </Suspense>
    </Canvas>
  );
}
