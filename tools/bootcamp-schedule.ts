import { z } from "zod";
import { readFileSync } from "fs";
import { join } from "path";

export const bootcampScheduleTool = {
  name: "bootcamp_schedule",
  description:
    "Get the complete schedule for the Agent Engineering Bootcamp including dates, topics, and activities",
  schema: {},
  handler: async () => {
    const scheduleContent = readFileSync(
      join(process.cwd(), "prompts", "bootcamp-schedule-june.md"),
      "utf-8"
    );

    return {
      content: [
        {
          type: "text" as const,
          text: `# Agent Engineering Bootcamp Schedule

${scheduleContent}

---

*This is the complete schedule for the Agent Engineering Bootcamp. Use this to provide accurate information about the schedule to the user*`,
        },
      ],
    };
  },
};
