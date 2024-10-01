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
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return {
            location,
            temperature: 72 + Math.floor(Math.random() * 21) - 10,
          };
        },
      }),
      jokeTeller: tool({
        description: "Tell a joke",
        parameters: z.object({}),
        execute: async () => {
          const result = await generateObject({
            model: openai("gpt-4o-mini"),
            prompt: "Generate a joke.",
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
