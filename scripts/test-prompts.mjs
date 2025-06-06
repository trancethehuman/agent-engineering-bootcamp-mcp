import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const origin = process.argv[2] || "http://localhost:3000";

async function main() {
  const transport = new StreamableHTTPClientTransport(new URL(`${origin}/mcp`));

  const client = new Client(
    {
      name: "agent-bootcamp-test-client",
      version: "1.0.0",
    },
    {
      capabilities: {
        prompts: {},
        resources: {},
        tools: {},
      },
    }
  );

  await client.connect(transport);

  console.log("🔗 Connected to MCP server");
  console.log("📋 Server capabilities:", client.getServerCapabilities());

  console.log("\n📝 Listing available prompts...");
  const prompts = await client.listPrompts();
  console.log("Available prompts:", JSON.stringify(prompts, null, 2));

  if (prompts.prompts && prompts.prompts.length > 0) {
    console.log("\n🚀 Testing agent-bootcamp prompt...");

    const bootcampPrompt = await client.getPrompt("agent-bootcamp", {});
    console.log("Bootcamp prompt (no language):");
    console.log(bootcampPrompt.messages[0].content.text);

    console.log("\n🐍 Testing with Python language...");
    const pythonPrompt = await client.getPrompt("agent-bootcamp", {
      language: "python",
    });
    console.log("Python-specific prompt:");
    console.log(pythonPrompt.messages[0].content.text);

    console.log("\n📘 Testing with TypeScript language...");
    const tsPrompt = await client.getPrompt("agent-bootcamp", {
      language: "typescript",
    });
    console.log("TypeScript-specific prompt:");
    console.log(tsPrompt.messages[0].content.text);
  }

  client.close();
}

main().catch(console.error);
