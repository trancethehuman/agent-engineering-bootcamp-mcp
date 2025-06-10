import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

async function testScheduleTool() {
  const client = new Client(
    {
      name: "schedule-test-client",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  const transport = new StreamableHTTPClientTransport(
    new URL("http://localhost:3000/mcp")
  );

  try {
    await client.connect(transport);
    console.log("✅ Connected to MCP server");

    const result = await client.callTool("bootcamp_schedule", {});
    console.log("✅ Bootcamp schedule tool result (first 300 chars):");
    console.log(result.content[0].text.substring(0, 300) + "...");

    if (result.content[0].text.includes("June 12, 2025")) {
      console.log("✅ Schedule content includes expected date!");
    } else {
      console.log("❌ Schedule content does not include expected date");
    }

    await client.close();
    console.log("🎉 Bootcamp schedule tool test passed!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
}

testScheduleTool();
