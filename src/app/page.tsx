import { Suspense } from "react";
import CodeDocumenter from "@/components/documentor";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Automated Code Documenter
        </h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <CodeDocumenter />
        </Suspense>
      </main>
    </div>
  );
}
