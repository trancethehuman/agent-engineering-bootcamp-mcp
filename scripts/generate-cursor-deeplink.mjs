#!/usr/bin/env node

import { Buffer } from "buffer";

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help")) {
  console.log(`
Usage: node generate-cursor-deeplink.mjs [type] [server-url]

Types:
  local               - Generate deeplink for local development
  hosted <url>        - Generate deeplink for hosted server

Examples:
  node generate-cursor-deeplink.mjs local
  node generate-cursor-deeplink.mjs hosted https://your-mcp-server.vercel.app

Output:
  - Markdown button code (for README)
  - Direct link URL
  `);
  process.exit(0);
}

const type = args[0];

if (type === "local") {
  const config = {
    command: "node",
    args: [
      process.cwd() + "/scripts/test-streamable-http-client.mjs",
      "http://localhost:3000",
    ],
  };

  const encoded = Buffer.from(JSON.stringify(config)).toString("base64");
  const urlEncoded = encodeURIComponent(encoded);

  console.log("\nLocal Development Cursor Deeplink:");
  console.log("\nMarkdown button:");
  console.log(
    `[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=agent-bootcamp-local&config=${urlEncoded})`
  );
  console.log("\nDirect URL:");
  console.log(
    `https://cursor.com/install-mcp?name=agent-bootcamp-local&config=${urlEncoded}`
  );
} else if (type === "hosted" && args[1]) {
  const serverUrl = args[1];

  // For hosted servers, we need to use npx with a generic MCP HTTP client
  // This assumes you'll publish a package or use a generic MCP client
  const config = {
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-everything", serverUrl + "/mcp"],
  };

  const encoded = Buffer.from(JSON.stringify(config)).toString("base64");
  const urlEncoded = encodeURIComponent(encoded);

  console.log("\nHosted Server Cursor Deeplink:");
  console.log("\nMarkdown button:");
  console.log(
    `[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=agent-bootcamp&config=${urlEncoded})`
  );
  console.log("\nDirect URL:");
  console.log(
    `https://cursor.com/install-mcp?name=agent-bootcamp&config=${urlEncoded}`
  );

  console.log(
    "\n\nTo update README.md, replace HOSTED_SERVER_CONFIG_PLACEHOLDER with:"
  );
  console.log(urlEncoded);

  console.log(
    "\n\nNote: This assumes the server endpoint is at " + serverUrl + "/mcp"
  );
  console.log("Adjust the path if your MCP endpoint is different.");
} else {
  console.error("Invalid arguments. Run with --help for usage information.");
  process.exit(1);
}
