export const Weather = ({
  location,
  temperature,
  sendMessage,
}: {
  location: string;
  temperature: number;
  sendMessage: (message: string) => void;
}) => {
  return (
    <div className="bg-neutral-200 p-4 rounded-lg">
      <div>
        The weather in {location} is {temperature}°F
      </div>
      <button
        onClick={() => sendMessage(`Get the weather for ${location} tomorrow`)}
        className="bg-white border border-neutral-100 text-black px-2 py-1 rounded mt-2"
      >
        weather tomorrow?
      </button>
    </div>
  );
};
