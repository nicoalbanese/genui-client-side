export const Weather = ({
  location,
  temperature,
}: {
  location: string;
  temperature: number;
}) => {
  return (
    <div className="bg-neutral-200 p-4 rounded-lg">
      <div>
        The weather in {location} is {temperature}°C
      </div>
    </div>
  );
};
