// src/components/AlgorithmsControls.tsx
import Link from "next/link";

interface AlgorithmControlsProps {
  startSort: () => void;
  reset: () => void;
}

const AlgorithmControls: React.FC<AlgorithmControlsProps> = ({
  startSort,
  reset,
}) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={startSort}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start Sort
      </button>
      <button
        onClick={reset}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Reset
      </button>
      <Link href="/" className="px-4 py-2 bg-green-500 text-white rounded">
        Home
      </Link>
    </div>
  );
};

export default AlgorithmControls;
