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
        tools: {},
        resources: {},
      },
    }
  );

  await client.connect(transport);

  console.log("🔗 Connected to MCP server");
  console.log("📋 Server capabilities:", client.getServerCapabilities());

  console.log("\n🔧 Listing available tools...");
  const tools = await client.listTools();
  console.log("Available tools:", JSON.stringify(tools, null, 2));

  if (tools.tools && tools.tools.length > 0) {
    console.log("\n🚀 Testing agent-bootcamp setup tool...");

    const bootcampTool = await client.callTool(
      "get-agent-bootcamp-setup-guide",
      {}
    );
    console.log("Bootcamp setup (no language):");
    console.log(bootcampTool.content[0].text);

    console.log("\n🐍 Testing with Python language...");
    const pythonTool = await client.callTool("get-agent-bootcamp-setup-guide", {
      language: "python",
    });
    console.log("Python-specific setup:");
    console.log(pythonTool.content[0].text);

    console.log("\n📘 Testing with TypeScript language...");
    const tsTool = await client.callTool("get-agent-bootcamp-setup-guide", {
      language: "typescript",
    });
    console.log("TypeScript-specific setup:");
    console.log(tsTool.content[0].text);
  }

  client.close();
}

main().catch(console.error);
