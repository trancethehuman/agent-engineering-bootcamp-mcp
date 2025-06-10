import { z } from "zod";
import { readFileSync } from "fs";
import { join } from "path";

export const getBootcampProjectSetupGuide = {
  name: "get-agent-bootcamp-setup-guide",
  description:
    "Get step-by-step setup instructions for the Agent Engineering Bootcamp",
  schema: {
    language: z
      .enum(["python", "typescript"])
      .optional()
      .describe("Programming language preference for setup instructions"),
  },
  handler: async ({ language }: { language?: "python" | "typescript" }) => {
    const promptContent = readFileSync(
      join(process.cwd(), "prompts", "agent-bootcamp-setup-guide.md"),
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
          type: "text" as const,
          text: `# Agent Engineering Bootcamp Setup Guide

${customizedContent}

---

*Use this guide to set up your development environment for agent engineering. Follow each step carefully and check in with the AI assistant at each checkpoint!*`,
        },
      ],
    };
  },
};
