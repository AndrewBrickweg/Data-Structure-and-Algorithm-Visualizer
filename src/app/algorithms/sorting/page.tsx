"use client";

import Link from "next/link";

const sortingPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Sorting Algorithms</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Choose a sorting algorithm
      </p>

      <div className="flex flex-col items-center gap-4">
        <Link
          href="/algorithms/bubbleSort"
          className="text-blue-500 hover:underline text-xl"
        >
          Bubble Sort
        </Link>
        <Link
          href="/algorithms/sorting/selectionSort"
          className="text-blue-500 hover:underline text-xl"
        >
          Selection Sort
        </Link>
      </div>
    </main>
  );
};

export default sortingPage;
