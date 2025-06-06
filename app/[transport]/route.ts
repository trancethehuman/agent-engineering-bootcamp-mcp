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
      "Echo a message for testing purposes",
      {
        message: z.string().describe("The message to echo back"),
      },
      async ({ message }) => ({
        content: [{ type: "text", text: `Tool echo: ${message}` }],
      })
    );

    // @ts-ignore
    server.tool(
      "get-agent-bootcamp-setup",
      "Get step-by-step setup instructions for the Agent Engineering Bootcamp",
      {
        language: z
          .enum(["python", "typescript"])
          .optional()
          .describe("Programming language preference for setup instructions"),
      },
      async ({ language }) => {
        const promptContent = readFileSync(
          join(process.cwd(), "prompts", "agent-bootcamp.md"),
          "utf-8"
        );

        let customizedContent = promptContent;

        if (language) {
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
          content: [
            {
              type: "text",
              text: `# Agent Engineering Bootcamp Setup Guide

${customizedContent}

---

*Use this guide to set up your development environment for agent engineering. Follow each step carefully and check in with the AI assistant at each checkpoint!*`,
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
          description: "Echo a message for testing purposes",
        },
        "get-agent-bootcamp-setup": {
          description:
            "Get step-by-step setup instructions for setting up a new code project in order to begin the Agent Engineering Bootcamp",
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
