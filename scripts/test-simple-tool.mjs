#!/usr/bin/env node

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const origin = process.argv[2] || "http://localhost:3000";

async function main() {
  const transport = new StreamableHTTPClientTransport(new URL(`${origin}/mcp`));

  const client = new Client(
    {
      name: "simple-tool-test",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  try {
    await client.connect(transport);
    console.log("✅ Connected to MCP server");

    // Test echo tool
    console.log("\n🔧 Testing echo tool...");
    const echoResult = await client.callTool("echo", {
      message: "Hello, MCP!",
    });
    console.log("Echo result:", echoResult);

    // Test bootcamp setup tool
    console.log("\n🚀 Testing bootcamp setup tool...");
    const bootcampResult = await client.callTool(
      "get-agent-bootcamp-setup-guide",
      {
        language: "typescript",
      }
    );
    console.log(
      "Bootcamp result length:",
      bootcampResult.content[0].text.length
    );
    console.log(
      "First 200 chars:",
      bootcampResult.content[0].text.substring(0, 200) + "..."
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.details) {
      console.error("Details:", error.details);
    }
  } finally {
    client.close();
  }
}

main().catch(console.error);
