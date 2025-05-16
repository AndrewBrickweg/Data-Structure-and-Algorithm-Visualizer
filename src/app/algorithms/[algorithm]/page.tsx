"use client";

import { useParams } from "next/navigation";
import Visualizer from "@/components/Visualizer";
import AlgorithmControls from "@components/AlgorithmsControls";
import { useRef, useState, useEffect } from "react";

const AlgorithmPage = () => {
  const params = useParams();
  const algorithm = params?.algorithm;

  const [isSorting, setIsSorting] = useState(false);
  const isSortingRef = useRef(isSorting);
  const visualizerRef = useRef<{ sortBars: () => void; reset: () => void }>(
    null
  );

  useEffect(() => {
    isSortingRef.current = isSorting;
  }, [isSorting]);

  const algorithmName = algorithm?.toString() || "Unknown Algorithm";
  console.log("Algorithm Name:", algorithmName); // Debug log

  const handleSortStart = async () => {
    if (isSortingRef.current) return; // Prevent multiple clicks
    console.log("Sort start button clicked!"); // Debug log
    setIsSorting(true);
    isSortingRef.current = true;

    try {
      await visualizerRef.current?.sortBars();
    } catch (error) {
      console.error("Error during sorting:", error);
    } finally {
      setIsSorting(false);
    }
  };

  const handleReset = () => {
    console.log("Reset button clicked!"); // Debug log
    visualizerRef.current?.reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">{algorithmName} Visualizer</h1>
      <Visualizer ref={visualizerRef} algorithm={algorithmName} />
      <AlgorithmControls
        startSort={handleSortStart}
        reset={handleReset}
        isSorting={isSorting}
      />
    </div>
  );
};

export default AlgorithmPage;
