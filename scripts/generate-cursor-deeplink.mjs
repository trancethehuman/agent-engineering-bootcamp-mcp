#!/usr/bin/env node

// Configuration for hosted server
const hostedConfig = {
  url: "https://agent-engineering-bootcamp-mcp.vercel.app/sse",
};

// Configuration for local development
const localConfig = {
  command: "node",
  args: [
    "node_modules/@modelcontextprotocol/server-stdio/dist/index.js",
    "./build/index.js",
  ],
  env: {},
};

// Generate URLs for both configurations
function generateDeepLink(config, serverName = "agent-bootcamp") {
  const configStr = JSON.stringify({ [serverName]: config });
  const encodedConfig = encodeURIComponent(configStr);
  return `https://cursor.com/install-mcp?config=${encodedConfig}`;
}

console.log("=== Cursor MCP Installation Links ===\n");

console.log("For HOSTED server (recommended):");
console.log(generateDeepLink(hostedConfig));
console.log("\n");

console.log("For LOCAL development:");
console.log(generateDeepLink(localConfig));
console.log("\n");

console.log("=== How to use ===");
console.log("1. Copy the appropriate link above");
console.log("2. Open it in your browser");
console.log("3. Cursor will prompt to add the MCP server");
console.log("4. Restart Cursor after installation");
console.log("\n");

console.log("=== Manual Configuration ===");
console.log("If the deeplink doesn't work, add this to ~/.cursor/mcp.json:");
console.log("\nFor hosted server:");
console.log(
  JSON.stringify({ mcpServers: { "agent-bootcamp": hostedConfig } }, null, 2)
);
console.log("\nFor local development:");
console.log(
  JSON.stringify({ mcpServers: { "agent-bootcamp": localConfig } }, null, 2)
);
