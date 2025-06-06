#!/usr/bin/env node

const serverUrl = "https://agent-engineering-bootcamp-mcp.vercel.app";

console.log("Cursor MCP Configuration Options:\n");

console.log("Option 1: Direct SSE Connection (Cursor 0.48.0+):");
console.log(
  JSON.stringify(
    {
      mcpServers: {
        "agent-bootcamp": {
          url: `${serverUrl}/sse`,
        },
      },
    },
    null,
    2
  )
);

console.log("\n---\n");

console.log("Option 2: Using server-everything proxy:");
console.log(
  JSON.stringify(
    {
      mcpServers: {
        "agent-bootcamp": {
          command: "npx",
          args: [
            "-y",
            "@modelcontextprotocol/server-everything",
            `${serverUrl}/mcp`,
          ],
          env: {},
        },
      },
    },
    null,
    2
  )
);

console.log("\n---\n");

console.log("Option 3: Using mcp-client-cli:");
console.log(
  JSON.stringify(
    {
      mcpServers: {
        "agent-bootcamp": {
          command: "npx",
          args: ["-y", "mcp-client-cli", `${serverUrl}/sse`],
        },
      },
    },
    null,
    2
  )
);

console.log(
  "\nNote: Try these configurations in order. Option 1 is the simplest if you have Cursor 0.48.0 or later."
);
