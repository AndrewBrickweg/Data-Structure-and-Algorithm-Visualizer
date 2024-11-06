// src/app/page.tsx
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">3D Algorithm Visualizer</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Explore interactive 3D visualizations of various algorithms. Choose an
        algorithm to learn how it works, step-by-step.
      </p>

      <div className="flex flex-col items-center gap-4">
        {/* Example links to algorithm visualizations */}
        <Link href="/algorithms/sorting">
          <a className="text-blue-500 hover:underline text-xl">
            Sorting Algorithms
          </a>
        </Link>

        <Link href="/algorithms/pathfinding">
          <a className="text-blue-500 hover:underline text-xl">
            Pathfinding Algorithms
          </a>
        </Link>

        <Link href="/algorithms/graph">
          <a className="text-blue-500 hover:underline text-xl">
            Graph Algorithms
          </a>
        </Link>
      </div>
    </main>
  );
};

export default Home;
