import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import { readFileSync } from "fs";
import { join } from "path";
import { getRedisUrl, isRedisAvailable } from "../../lib/redis";

const handler = createMcpHandler(
  async (server) => {
    // @ts-ignore
    server.tool(
      "echo",
      "description",
      {
        message: z.string(),
      },
      async ({ message }) => ({
        content: [{ type: "text", text: `Tool echo: ${message}` }],
      })
    );

    // @ts-ignore
    server.prompt(
      "agent-bootcamp",
      "Get setup instructions for the Agent Engineering Bootcamp",
      {
        language: z.enum(["python", "typescript"]).optional(),
      },
      async ({ language }) => {
        const promptContent = readFileSync(
          join(process.cwd(), "prompts", "agent-bootcamp.md"),
          "utf-8"
        );

        let customizedContent = promptContent;

        if (language) {
          const langSection =
            language === "python"
              ? "### For Python Developers"
              : "### For TypeScript Developers";

          const sections = promptContent.split("### For ");
          const header = sections[0];
          const targetSection = sections.find((section) =>
            section.startsWith(language === "python" ? "Python" : "TypeScript")
          );

          if (targetSection) {
            customizedContent =
              header + "### For " + targetSection.split("### For")[0];
          }
        }

        return {
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: `Here are the setup instructions for the Agent Engineering Bootcamp. Make sure to walk the user through this step-by-step:\n\n${customizedContent}`,
              },
            },
          ],
        };
      }
    );
  },
  {
    capabilities: {
      tools: {
        echo: {
          description: "Echo a message",
        },
      },
      prompts: {
        "agent-bootcamp": {
          description:
            "Get setup instructions for the Agent Engineering Bootcamp",
        },
      },
    },
  },
  {
    basePath: "",
    verboseLogs: true,
    maxDuration: 60,
    ...(isRedisAvailable() && { redisUrl: getRedisUrl() }),
  }
);

export { handler as GET, handler as POST, handler as DELETE };
