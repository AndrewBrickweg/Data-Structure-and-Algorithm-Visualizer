// src/app/algorithms/[algorithm]/page.tsx
"use client"; // This makes the component a client-side component

import { useParams } from "next/navigation"; // Correct import for Next.js App Directory
import Visualizer from "@/components/Visualizer";
import AlgorithmControls from "@components/AlgorithmsControls";

const AlgorithmPage = () => {
  const { algorithm } = useParams(); // Get the dynamic parameter from the URL

  const algorithmName =
    typeof algorithm === "string" ? algorithm : "defaultAlgorithm"; // Default to "defaultAlgorithm" if undefined

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">{algorithmName} Visualizer</h1>
      <Visualizer algorithm={algorithmName} />
      <AlgorithmControls algorithm={algorithmName} />
    </div>
  );
};

export default AlgorithmPage;
