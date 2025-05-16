//index page for exporting sorting algorithms
import { bubbleSort } from "./algorithms/sorting/bubbleSort";
import * as THREE from "three";

type sortFunction = (
  heights: number[],
  bars: THREE.Mesh[],
  animateSwap: (a: THREE.Mesh, b: THREE.Mesh) => Promise<void>
) => Promise<void>;

const sortingAlgorithms: Record<string, sortFunction> = {
  bubbleSort: bubbleSort,
};

export default sortingAlgorithms;
