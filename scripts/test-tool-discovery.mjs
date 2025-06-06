#!/usr/bin/env node
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";

async function testToolDiscovery() {
  console.log("Testing MCP Tool Discovery...\n");

  const serverUrl =
    process.argv[2] || "https://agent-engineering-bootcamp-mcp.vercel.app/mcp";

  console.log(`Testing server: ${serverUrl}\n`);

  try {
    const transport = new StdioClientTransport({
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-everything", serverUrl],
    });

    const client = new Client(
      {
        name: "test-tool-discovery",
        version: "1.0.0",
      },
      {
        capabilities: {},
      }
    );

    await client.connect(transport);
    console.log("✅ Connected to MCP server\n");

    console.log("📋 Listing available tools:");
    const toolsResponse = await client.listTools();

    if (toolsResponse.tools.length === 0) {
      console.log("❌ No tools found!");
    } else {
      console.log(`✅ Found ${toolsResponse.tools.length} tools:\n`);

      toolsResponse.tools.forEach((tool, index) => {
        console.log(`${index + 1}. ${tool.name}`);
        console.log(`   Description: ${tool.description}`);
        console.log(
          `   Input Schema: ${JSON.stringify(tool.inputSchema, null, 2)}`
        );
        console.log("");
      });
    }

    await client.close();
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.cause) {
      console.error("Cause:", error.cause);
    }
  }
}

testToolDiscovery();
