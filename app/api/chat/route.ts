import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, generateObject, streamText, tool } from "ai";
import { z } from "zod";

export async function POST(request: Request) {
  const { messages } = await request.json();
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: convertToCoreMessages(messages),
    tools: {
      weather: tool({
        description: "Get the weather in a location",
        parameters: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => {
          const locRes = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`,
          );
          const loc = await locRes.json();
          const { lat, lon } = loc[0];
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`,
          );
          const weather = await weatherRes.json();
          const temp = weather.current.temperature_2m as number;
          return { temperature: temp, location };
        },
      }),
      jokeTeller: tool({
        description: "Tell a joke",
        parameters: z.object({ previousJokes: z.array(z.string()).optional() }),
        execute: async ({ previousJokes }) => {
          const result = await generateObject({
            model: openai("gpt-4o-mini"),
            prompt:
              "Generate a joke. Make it different from any of the previous jokes: " +
              JSON.stringify(previousJokes),
            schema: z.object({
              setup: z.string(),
              punchline: z.string(),
            }),
          });
          return result.object;
        },
      }),
      fetchUser: tool({
        description: "Fetch some data",
        parameters: z.object({}),
        execute: async () => ({ result: "done" }),
      }),
    },
  });
  return result.toDataStreamResponse();
}
