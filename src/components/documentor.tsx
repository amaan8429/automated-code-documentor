"use client";

import { useFormState, useFormStatus } from "react-dom";
import { documentCode } from "@/actions/actionfile";

const initialState = {
  documentedCode: "",
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 flex items-center justify-center"
    >
      {pending ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Generating Documentation...
        </>
      ) : (
        "Generate Documentation"
      )}
    </button>
  );
}

export default function CodeDocumenter() {
  const [state, formAction] = useFormState(documentCode, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Programming Language
        </label>
        <select
          id="language"
          name="language"
          className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C#">C#</option>
          <option value="Ruby">Ruby</option>
          <option value="Go">Go</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="sourceCode"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Source Code
        </label>
        <textarea
          id="sourceCode"
          name="sourceCode"
          rows={15}
          className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your source code here..."
        ></textarea>
      </div>
      <SubmitButton />
      {state.error && <div className="text-red-600 mt-2">{state.error}</div>}
      {state.documentedCode && (
        <div>
          <h2 className="text-lg font-semibold mt-6 mb-2 text-gray-800">
            Documented Code:
          </h2>
          <pre className="bg-gray-50 p-4 rounded-md border border-gray-200 overflow-x-auto">
            <code className="text-sm text-gray-800">
              {state.documentedCode}
            </code>
          </pre>
        </div>
      )}
    </form>
  );
}
