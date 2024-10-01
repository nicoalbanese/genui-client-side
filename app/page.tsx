"use client";

import GenUI from "@/components/gen-ui";
import { JokeComponent } from "@/components/joke-teller";
import { Weather } from "@/components/weather";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error, append } =
    useChat();
  if (error) return <div>{error.message}</div>;

  const sendMessage = async (message: string) =>
    append({ role: "user", content: message });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>
              <GenUI
                toolInvocations={m.toolInvocations}
                components={{ weather: Weather, jokeTeller: JokeComponent }}
                sendMessage={sendMessage}
              />
              <p>{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
