"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";

interface VisualizerProps {
  algorithm: string;
}
const Visualizer = forwardRef<{ sortBars: () => void }, VisualizerProps>(
  ({ algorithm }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const barsRef = useRef<THREE.Mesh[]>([]); // Reference to the 3D bars
    const heights = useRef<number[]>([]); // Store bar heights for sorting

    // Expose sortBars function to the parent component through the ref
    useImperativeHandle(ref, () => ({
      sortBars: async () => {
        console.log("Sorting bars triggered for algorithm:", algorithm); // Debug log
        const lowerCaseAlgorithm = algorithm.toLowerCase(); // Normalize the case
        if (lowerCaseAlgorithm === "bubblesort") {
          await bubbleSort();
        } else {
          console.log(`Unknown algorithm: ${lowerCaseAlgorithm}`);
        }
      },
    }));

    const bubbleSort = async () => {
      console.log("Starting Bubble Sort..."); // Debug log
      const n = heights.current.length;
      let swapped;

      // Bubble sort animation logic
      for (let i = 0; i < n; i++) {
        swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
          if (heights.current[j] > heights.current[j + 1]) {
            // Swap heights in array
            [heights.current[j], heights.current[j + 1]] = [
              heights.current[j + 1],
              heights.current[j],
            ];

            // Swap the 3D bars in scene
            const bar1 = barsRef.current[j];
            const bar2 = barsRef.current[j + 1];

            // Animate bar swap
            await animateSwap(bar1, bar2);

            swapped = true;
          }
        }

        // If no elements were swapped, the array is sorted
        if (!swapped) break;
      }
      console.log("Bubble Sort completed."); // Debug log
    };

    const animateSwap = (bar1: THREE.Mesh, bar2: THREE.Mesh) => {
      console.log(
        `Swapping bars at positions: ${bar1.position.y}, ${bar2.position.y}`
      ); // Debug log
      return new Promise<void>((resolve) => {
        const initialPos1 = bar1.position.y;
        const initialPos2 = bar2.position.y;

        const tweenDuration = 200; // Animation duration in milliseconds
        let elapsedTime = 0;

        const animate = () => {
          elapsedTime += 16; // Approximate time per frame (60fps)

          const t = Math.min(elapsedTime / tweenDuration, 1);
          bar1.position.y = initialPos1 * (1 - t) + initialPos2 * t;
          bar2.position.y = initialPos2 * (1 - t) + initialPos1 * t;

          if (t < 1) {
            requestAnimationFrame(animate);
          } else {
            resolve();
          }
        };

        animate();
      });
    };

    useEffect(() => {
      if (!containerRef.current) return;

      // Set up scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 20;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);

      // Generate bars
      const barCount = 10;
      const barWidth = 1;
      const spacing = 1.2;
      heights.current = Array.from(
        { length: barCount },
        () => Math.random() * 10 + 1
      );

      for (let i = 0; i < barCount; i++) {
        const geometry = new THREE.BoxGeometry(
          barWidth,
          heights.current[i],
          barWidth
        );
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        });
        const bar = new THREE.Mesh(geometry, material);
        bar.position.x = i * spacing - (barCount / 2) * spacing;
        bar.position.y = heights.current[i] / 2;
        scene.add(bar);
        barsRef.current.push(bar);
      }

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();

      // Clean up on unmount
      return () => {
        renderer.dispose();
      };
    }, []);

    return (
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
    );
  }
);

Visualizer.displayName = "Visualizer"; // Optional: To improve debugging and React DevTools

export default Visualizer;
