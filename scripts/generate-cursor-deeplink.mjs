#!/usr/bin/env node

// Configuration for hosted server - just the transport config
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
  // Base64 encode the config (not the whole server object)
  const configStr = JSON.stringify(config);
  const base64Config = Buffer.from(configStr).toString("base64");

  // URL encode the base64 string
  const encodedConfig = encodeURIComponent(base64Config);

  return `https://cursor.com/install-mcp?name=${serverName}&config=${encodedConfig}`;
}

// Generate HTML button
function generateButton(config, serverName = "agent-bootcamp") {
  const url = generateDeepLink(config, serverName);
  return `<a href="${url}"><img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Add ${serverName} MCP server to Cursor" height="32" /></a>`;
}

console.log("=== Cursor MCP Installation Links ===\n");

console.log("For HOSTED server (recommended):");
console.log(generateDeepLink(hostedConfig));
console.log("\nHTML Button:");
console.log(generateButton(hostedConfig));
console.log("\n");

console.log("For LOCAL development:");
console.log(generateDeepLink(localConfig));
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
