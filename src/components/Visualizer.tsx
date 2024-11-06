// src/components/Visualizer.tsx
import { FC } from "react";

interface VisualizerProps {
  algorithm: string;
}

const Visualizer: FC<VisualizerProps> = ({ algorithm }) => {
  // Placeholder 3D scene setup with Three.js

  return (
    <div className="visualizer">
      <p>3D Visualization of {algorithm} Algorithm</p>
      {/* Add Three.js scene rendering here */}
    </div>
  );
};

export default Visualizer;
