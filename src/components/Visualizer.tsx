"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
// import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";

interface VisualizerProps {
  algorithm: string;
}

//define specific references
const Visualizer = forwardRef<{ sortBars: () => void }, VisualizerProps>(
  ({ algorithm }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const barsRef = useRef<THREE.Mesh[]>([]); // References to the 3D bars
    const heights = useRef<number[]>([]); // Store bar heights for sorting

    // Expose sortBars function to the parent component through the ref

    //calls the specific sorting algorithm
    useImperativeHandle(ref, () => ({
      sortBars: async () => {
        console.log("Sorting bars triggered for algorithm:", algorithm); // Debug log
        const lowerCaseAlgorithm = algorithm.toLowerCase();
        if (lowerCaseAlgorithm === "bubblesort") {
          await bubbleSort();
        } else {
          console.log(`Unknown algorithm: ${lowerCaseAlgorithm}`);
        }
      },
    }));

    // Bubble Sort Algorithm for visualiser
    const bubbleSort = async () => {
      console.log("Starting Bubble Sort...");

      const n = heights.current.length;
      console.log(heights);
      let swapped;

      for (let i = 0; i < n - 1; i++) {
        swapped = false; //flag for stop
        for (let j = 0; j < n - 1 - i; j++) {
          if (heights.current[j] > heights.current[j + 1]) {
            // Swap heights in array
            [heights.current[j], heights.current[j + 1]] = [
              heights.current[j + 1],
              heights.current[j],
            ];

            // Swap bars in array
            const bar1 = barsRef.current[j];
            const bar2 = barsRef.current[j + 1];
            [barsRef.current[j], barsRef.current[j + 1]] = [
              barsRef.current[j + 1],
              barsRef.current[j],
            ];

            // Animate the swap
            await animateSwap(bar1, bar2);
            swapped = true;
          }
        }

        // If no elements were swapped, the array is sorted
        if (!swapped) break;
      }

      console.log("Bubble Sort completed.");
    };

    // Animate Bar Swap
    const animateSwap = (bar1: THREE.Mesh, bar2: THREE.Mesh) => {
      return new Promise<void>((resolve) => {
        const initialX1 = bar1.position.x;
        const initialX2 = bar2.position.x;

        const duration = 300; // Animation duration in milliseconds
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const t = Math.min(elapsed / duration, 1); // Normalized time (0 to 1)

          // Interpolate positions
          bar1.position.x = initialX1 * (1 - t) + initialX2 * t;
          bar2.position.x = initialX2 * (1 - t) + initialX1 * t;

          if (t < 1) {
            requestAnimationFrame(animate);
          } else {
            resolve();
          }
        };

        requestAnimationFrame(animate);
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
      const spacing = 1.5;
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

      // Add lighting
      const light = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(light);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 20, 10);
      scene.add(directionalLight);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // Clean up on unmount
      return () => {
        renderer.dispose();
      };
    }, []);

    return (
      // <Canvas>
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
      // </Canvas>
    );
  }
);

Visualizer.displayName = "Visualizer";

export default Visualizer;
