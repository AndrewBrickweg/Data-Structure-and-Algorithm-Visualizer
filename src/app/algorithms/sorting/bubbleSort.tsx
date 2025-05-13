import * as THREE from "three";

export async function bubbleSort(
  heights: number[],
  bars: THREE.Mesh[],
  animateSwap: (bar1: THREE.Mesh, bar2: THREE.Mesh) => Promise<void>
) {
  console.log("Starting Bubble Sort...");

  const n = heights.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - 1; j++) {
      if (heights[j] > heights[j + 1]) {
        // Swap heights in array
        [heights[j], heights[j + 1]] = [heights[j + 1], heights[j]];

        //swap bars in array
        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];

        await animateSwap(bars[j], bars[j + 1]);
        swapped = true;
      }
    }

    if (!swapped) break; // If no elements were swapped, the array is sorted
  }
}
