// src/components/AlgorithmsControls.tsx
interface AlgorithmControlsProps {
  startSort: () => void;
}

const AlgorithmControls: React.FC<AlgorithmControlsProps> = ({ startSort }) => {
  return (
    <div className="controls">
      <button onClick={startSort}>Start Sorting</button>
    </div>
  );
};

export default AlgorithmControls;
