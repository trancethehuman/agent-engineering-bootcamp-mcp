export const joinBootcampTool = {
  name: "join-bootcamp",
  description: "Get information on how to join the Agent Engineering Bootcamp",
  schema: {},
  handler: async () => {
    return {
      content: [
        {
          type: "text" as const,
          text: `# Join the Agent Engineering Bootcamp

Ready to start your journey in agent engineering? 

**Purchase your spot in the Agent Engineering Bootcamp:**

🚀 **[Join the Bootcamp Here](https://buy.stripe.com/9AQ29j0ZfbrH5ryfZ2)**

This comprehensive 6-week program will teach you everything you need to know about building AI agents, from the fundamentals to advanced implementation techniques.

---

*Click the link above to secure your spot and begin your transformation into an agent engineering expert!*`,
        },
      ],
    };
  },
};
