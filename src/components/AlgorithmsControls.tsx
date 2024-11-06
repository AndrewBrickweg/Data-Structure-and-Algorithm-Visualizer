// src/components/AlgorithmControls.tsx
import { FC } from "react";

interface AlgorithmControlsProps {
  algorithm: string;
}

const AlgorithmControls: FC<AlgorithmControlsProps> = ({ algorithm }) => {
  const handleStart = () => {
    console.log(`Starting ${algorithm} algorithm visualization...`);
  };

  return (
    <div className="controls mt-4">
      <button
        onClick={handleStart}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Start {algorithm} Algorithm
      </button>
    </div>
  );
};

export default AlgorithmControls;
