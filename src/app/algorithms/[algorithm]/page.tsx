// src/app/algorithms/[algorithm]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Visualizer from "@/components/Visualizer";
import AlgorithmControls from "@components/AlgorithmsControls";
import { useRef } from "react";

const AlgorithmPage = () => {
  const { algorithm } = useParams();
  const visualizerRef = useRef<{ sortBars: () => void }>(null);

  const algorithmName =
    typeof algorithm === "string" && algorithm !== "sorting"
      ? algorithm
      : "bubbleSort";
  console.log("Algorithm Name:", algorithmName); // Debug log

  const handleSortStart = () => {
    console.log("Button clicked, starting sort!"); // Debug log
    visualizerRef.current?.sortBars();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">{algorithmName} Visualizer</h1>
      <Visualizer ref={visualizerRef} algorithm={algorithmName} />
      <AlgorithmControls startSort={handleSortStart} />
    </div>
  );
};

export default AlgorithmPage;
