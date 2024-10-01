import { useState } from "react";

export const JokeComponent: React.FC<{
  setup: string;
  punchline: string;
  sendMessage: (message: string) => void;
}> = ({ setup, punchline, sendMessage }) => {
  const [showPunchline, setShowPunchline] = useState(false);
  const [askedForJoke, setAskedForJoke] = useState(false);

  return (
    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-md">
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        {setup}
      </p>
      {showPunchline ? (
        <div>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {punchline}
          </p>
          <button
            onClick={() => {
              sendMessage("Tell me another joke!");
              setAskedForJoke(true);
            }}
            className="px-4 disabled:opacity-50 mt-4 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
            disabled={askedForJoke}
          >
            {askedForJoke ? "Asked for another joke" : "Tell me another joke..."}
          </button>
        </div>
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
