"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import React from "react";
import sortingAlgorithms from "@/app/lib";
interface VisualizerProps {
  algorithm: string;
}

//define Visualizer
//***************************************************************** */
const Visualizer = forwardRef<{ sortBars: () => void }, VisualizerProps>(
  ({ algorithm }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    //refs for bars
    const barsRef = useRef<THREE.Mesh[]>([]);
    const heights = useRef<number[]>([]);

    //refs to resize screen
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    // Expose sortBars function to the parent component through the ref
    // Calls the specific sorting algorithm
    const isSortingRef = useRef(false);

    useImperativeHandle(ref, () => ({
      sortBars: async () => {
        console.log("Sorting bars triggered for algorithm:", algorithm); // Debug log
        if (isSortingRef.current) return; // Prevent multiple clicks
        isSortingRef.current = true;
        console.log("isSortingRef set to true"); // Debug log
        const sortFunction = sortingAlgorithms[algorithm];

        try {
          if (sortFunction) {
            await sortFunction(heights.current, barsRef.current, animateSwap);
          } else {
            console.warn(`Algorithm ${algorithm} not found.`);
          }
        } finally {
          isSortingRef.current = false; // Always release the lock
        }
        // if (sortFunction) {
        //   await sortFunction(heights.current, barsRef.current, animateSwap);
        // } else {
        //   console.warn(`Algorithm ${algorithm} not found.`);
        // }
      },
      // Reset function to clear and regenerate bars
      reset: () => {
        console.log("reset clicked");

        //delete current bars
        barsRef.current.forEach((bar) => scene.remove(bar));
        barsRef.current = []; // Clear the reference array
        heights.current = []; // Reset heights array

        //generate new bars
        const newBars = generateBars();
        newBars.forEach((bar) => {
          scene.add(bar);
          barsRef.current.push(bar);
        });
        console.log("Bars reset successfully.");
      },
    }));
    //*****************************************************************

    //*****************************************************************
    // Animate Bar Swap
    const animateSwap = (bar1: THREE.Mesh, bar2: THREE.Mesh) => {
      return new Promise<void>((resolve) => {
        const initialX1 = bar1.position.x;
        const initialX2 = bar2.position.x;

        const duration = 200; // Animation duration in milliseconds
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
    //*****************************************************************

    //*****************************************************************
    const scene = useRef(new THREE.Scene()).current; // Ensure a single scene instance outside of useffect

    const generateBars = React.useCallback(() => {
      //clear old bars first
      barsRef.current.forEach((bar) => scene.remove(bar));
      barsRef.current = []; // Clear the reference array

      // Generate bars
      const barCount = 10;
      const barWidth = 1;
      const spacing = 1.5;

      heights.current = Array.from(
        { length: barCount },
        () => Math.random() * 10 + 1
      );

      const bars = [];

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
        bars.push(bar);
      }

      return bars;
    }, [scene]);
    //***************************************************************** */

    useEffect(() => {
      if (!containerRef.current) return;

      // Set up scene, camera, and renderer
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

      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;

      // Add lighting
      const light = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(light);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 20, 10);
      scene.add(directionalLight);

      //generate and render bars
      const renderBars = () => {
        barsRef.current.forEach((bar) => scene.remove(bar));
        barsRef.current = [];

        //generate new bars
        const newBars = generateBars();
        newBars.forEach((bar) => {
          scene.add(bar);
          barsRef.current.push(bar);
        });
      };

      renderBars();

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
    }, [generateBars, scene]);

    useEffect(() => {
      const handleResize = () => {
        if (rendererRef.current && cameraRef.current) {
          const width = window.innerWidth;
          const height = window.innerHeight;

          rendererRef.current.setSize(width, height);
          cameraRef.current.aspect = width / height;
          cameraRef.current.updateProjectionMatrix();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    //*****************************************************************

    //*****************************************************************

    return (
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
    );
  }
);

Visualizer.displayName = "Visualizer";

export default Visualizer;
