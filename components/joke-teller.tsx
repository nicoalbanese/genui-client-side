import { useState } from "react";

export const JokeComponent: React.FC<{ setup: string; punchline: string }> = ({ setup, punchline }) => {
  const [showPunchline, setShowPunchline] = useState(false);

  return (
    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-md">
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{setup}</p>
      {showPunchline ? (
        <p className="text-base text-gray-600 dark:text-gray-400">{punchline}</p>
      ) : (
        <button
          onClick={() => setShowPunchline(true)}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
        >
          Show Punchline
        </button>
      )}
    </div>
  );
};