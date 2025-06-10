import { z } from "zod";

export const echoTool = {
  name: "echo",
  description: "Echo a message for testing purposes",
  schema: {
    message: z.string().describe("The message to echo back"),
  },
  handler: async ({ message }: { message: string }) => ({
    content: [{ type: "text" as const, text: `Tool echo: ${message}` }],
  }),
};
