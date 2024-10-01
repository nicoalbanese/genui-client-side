import { ToolInvocation } from "ai";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Component = React.ComponentType<any>;

export default function GenUI({
  toolInvocations,
  components,
  loadingComponent,
  sendMessage,
}: {
  toolInvocations?: ToolInvocation[];
  components: Record<string, Component>;
  loadingComponent?: Component;
  sendMessage: (message: string) => void;
}) {
  const Loading =
    loadingComponent ??
    (({ toolName }: { toolName?: string }) => (
      <div>Calling tool: {toolName}</div>
    ));
  return (
    <div>
      {toolInvocations?.map((t) => {
        const Component = components[t.toolName];
        if (t.state === "call") return <Loading key={t.toolCallId} {...t} />;
        if (t.state === "result") {
          return (
            <Component
              key={t.toolCallId}
              {...t.result}
              sendMessage={sendMessage}
            />
          );
        }
      })}
    </div>
  );
}
