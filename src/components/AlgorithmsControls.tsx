// src/components/AlgorithmsControls.tsx
interface AlgorithmControlsProps {
  startSort: () => void;
  reset: () => void;
}

const AlgorithmControls: React.FC<AlgorithmControlsProps> = ({
  startSort,
  reset,
}) => {
  return (
    <div className="controls">
      <div className="flex space-x-4">
        <button onClick={startSort}>Start Sorting</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default AlgorithmControls;
