# Agent Engineering Bootcamp MCP 🤖

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftrancethehuman%2Fagent-engineering-bootcamp-mcp&env=REDIS_URL)

<a href="https://cursor.com/install-mcp?name=agent-bootcamp&config=eyJ1cmwiOiJodHRwczovL2FnZW50LWVuZ2luZWVyaW5nLWJvb3RjYW1wLW1jcC52ZXJjZWwuYXBwL3NzZSJ9"><img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Add agent-bootcamp MCP server to Cursor" height="32" /></a>

A Model Context Protocol server providing setup guidance for students learning agent development. This project serves both as an educational resource and a template for building your own MCP servers with Next.js.

## 🎯 What is this?

This MCP server helps students get started with the **Agent Engineering Bootcamp** by providing:

- **Step-by-step setup instructions** for both Python and TypeScript development paths
- **Interactive guidance** directly in your IDE through MCP tools
- **Template code** for building your own MCP servers with Next.js

**Perfect for**: Students beginning their agent development journey who need structured guidance and a working MCP server example.

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start) - One-click installation
- [🛠️ For Developers](#️-for-developers-local-development-setup) - Local development setup
- [⚙️ Setup](#setup) - Manual configuration
- [🧪 Testing](#-testing) - Tool discovery and testing
- [📱 Integration](#-integration-with-ai-tools) - Claude Desktop & Cursor
- [🔧 Troubleshooting](#-troubleshooting) - Common issues and solutions

## 🚀 Quick Start

Get instant access to the Agent Engineering Bootcamp intelligent onboarding:

### One-Click Installation

<a href="https://cursor.com/install-mcp?name=agent-bootcamp&config=eyJ1cmwiOiJodHRwczovL2FnZW50LWVuZ2luZWVyaW5nLWJvb3RjYW1wLW1jcC52ZXJjZWwuYXBwL3NzZSJ9"><img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Add agent-bootcamp MCP server to Cursor" height="32" /></a>

_Click the button above to automatically add this MCP server to Cursor._

## 🛠️ For Developers: Local Development Setup

If you want to clone this repository and develop/test the MCP server locally:

### Setting Up Local MCP Server

1. **Clone and setup:**

   ```sh
   git clone https://github.com/trancethehuman/agent-engineering-bootcamp-mcp.git
   cd agent-engineering-bootcamp-mcp
   pnpm run setup
   ```

   The setup script will automatically install dependencies and configure your development environment.

2. **Generate your local Cursor deeplink:**

   ```sh
   pnpm generate:cursor-link
   ```

3. **Or manually add to Cursor configuration:**
   ```json
   {
     "mcpServers": {
       "agent-bootcamp-local": {
         "command": "node",
         "args": [
           "/ABSOLUTE/PATH/TO/YOUR/PROJECT/scripts/test-streamable-http-client.mjs",
           "http://localhost:3000"
         ]
       }
     }
   }
   ```

Replace `/ABSOLUTE/PATH/TO/YOUR/PROJECT` with your actual project path.

## ⚙️ Setup

### Quick Setup (Recommended)

Run the automated setup script to install dependencies and configure Redis:

```sh
pnpm run setup
```

This script will:

- Install project dependencies (using pnpm or npm)
- Check for Docker installation
- Start a Redis container for SSE transport
- Create/update `.env.local` with Redis configuration
- Start the development server

### Manual Setup

If you prefer manual setup, install the required dependencies:

```sh
npm install @modelcontextprotocol/sdk @upstash/redis
# or
pnpm install @modelcontextprotocol/sdk @upstash/redis
```

For SSE transport support, you have two options:

#### Option 1: Upstash KV (Cloud Redis) - Recommended

1. Connect to your Vercel project: `vercel link`
2. Pull environment variables: `vercel env pull .env.development.local`
3. The setup script will automatically detect and use Upstash Redis

#### Option 2: Local Docker Redis - Development

```sh
# Using Docker (recommended)
docker run -d --name redis-mcp -p 6379:6379 redis:latest

# Create .env.local file
echo "REDIS_URL=redis://localhost:6379" > .env.local
```

## Sample Clients

This project includes two sample clients:

### SSE Client (requires Redis)

`scripts/test-client.mjs` - Uses Server-Sent Events transport

- Automatically uses Upstash Redis (cloud) or local Docker Redis
- Requires either Upstash KV setup or local Redis container

### HTTP Client (no Redis required)

`scripts/test-streamable-http-client.mjs` - Uses streamable HTTP transport (no Redis required)

### Testing against the deployed server:

```sh
node scripts/test-client.mjs https://agent-engineering-bootcamp-mcp.vercel.app
node scripts/test-streamable-http-client.mjs https://agent-engineering-bootcamp-mcp.vercel.app
```

### Testing against your local development server:

**Note:** For local development, use the HTTP client since SSE requires Redis:

First, start your Next.js development server:

```sh
npm run dev
# or
pnpm dev
```

Then in another terminal, run the HTTP test client:

```sh
node scripts/test-streamable-http-client.mjs http://localhost:3000
```

The HTTP client connects to `/mcp` endpoint, while the SSE client connects to `/sse` endpoint.

## Redis Configuration

The MCP server automatically detects and uses the appropriate Redis configuration:

### Priority Order:

1. **Upstash Redis** (Production) - If `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set
2. **Local Redis** (Development) - If `REDIS_URL` is set (typically `redis://localhost:6379`)
3. **No Redis** - HTTP transport only, SSE transport disabled

### Environment Variables:

- `UPSTASH_REDIS_REST_URL` - Upstash Redis REST API URL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis REST API token
- `REDIS_URL` - Local Redis connection URL (fallback)

### Setting up Upstash KV (Recommended for Production)

1. **Link your Vercel project:**

   ```sh
   vercel link
   ```

2. **Pull environment variables from Vercel:**

   ```sh
   vercel env pull .env.development.local
   ```

3. **Run setup (will automatically detect Upstash):**
   ```sh
   pnpm run setup
   ```

The system will automatically detect Upstash Redis configuration and use it instead of local Docker Redis.

## Testing with Claude Desktop

You can test this MCP server with Claude Desktop to use the agent bootcamp setup tool.

### Prerequisites

- [Claude Desktop](https://claude.ai/download) installed and updated to the latest version
- This project running locally

### Configuration

1. **Start your development server:**

   ```sh
   pnpm run setup  # This starts the dev server automatically
   ```

2. **Configure Claude Desktop:**

   Open your Claude Desktop configuration file:

   **macOS:**

   ```sh
   code ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

   **Windows:**

   ```sh
   code %APPDATA%\Claude\claude_desktop_config.json
   ```

3. **Add the server configuration:**

   ```json
   {
     "mcpServers": {
       "agent-bootcamp": {
         "command": "npx",
         "args": [
           "-y",
           "mcp-remote",
           "http://localhost:3000/mcp"
         ]
       }
     }
   }
   ```

4. **Restart Claude Desktop** completely to pick up the new configuration.

### Testing the Tool

Once configured, you should see a tools icon (🔨) in Claude Desktop. You can now test the agent bootcamp setup tool:

1. Look for the "Search and tools" icon in Claude Desktop
2. You should see the `get-agent-bootcamp-setup-guide` tool available
3. Try asking: _"Help me setup my project for the agent engineering bootcamp"_ or _"Use the bootcamp setup tool"_
4. Claude will use the tool to provide step-by-step setup instructions!

### Troubleshooting

**Server not showing up:**

- Check your `claude_desktop_config.json` syntax is valid JSON
- Ensure the path is absolute, not relative
- Make sure your development server is running on `http://localhost:3000`
- Check Claude's logs: `tail -f ~/Library/Logs/Claude/mcp*.log` (macOS)

**Tool calls failing:**

- Verify the server is accessible at `http://localhost:3000/mcp`
- Check the Claude logs for specific error messages
- Try running `pnpm test:http` to verify the server is working

## Development Workflow

### Starting Development

```sh
pnpm run setup  # Sets up Redis and environment
pnpm dev        # Starts Next.js development server
```

### Testing All Features

```sh
# Test SSE transport (requires Redis)
pnpm test:sse

# Test HTTP transport (no Redis required)
pnpm test:http

# Test stdio transport (same as Claude Desktop uses)
pnpm test:stdio

# Test agent bootcamp tool
pnpm test:bootcamp
```

Or use the full commands:

```sh
node scripts/test-client.mjs http://localhost:3000
node scripts/test-streamable-http-client.mjs http://localhost:3000
npx -y mcp-remote http://localhost:3000/mcp
node scripts/test-bootcamp-tool.mjs http://localhost:3000
```

### Managing Redis Container

```sh
# Stop Redis container
docker stop redis-mcp

# Start Redis container
docker start redis-mcp

# Remove Redis container (when done with project)
docker rm redis-mcp
```

**Uses [`@vercel/mcp-adapter`](https://www.npmjs.com/package/@vercel/mcp-adapter)**

## Usage

This Agent Engineering Bootcamp MCP server uses the [Vercel MCP Adapter](https://www.npmjs.com/package/@vercel/mcp-adapter) to provide setup guidance and tools for students learning agent development.

Update `app/[transport]/route.ts` with your tools, prompts, and resources following the [MCP TypeScript SDK documentation](https://github.com/modelcontextprotocol/typescript-sdk/tree/main?tab=readme-ov-file#server).

## Features

This Agent Engineering Bootcamp MCP server includes:

### 🔧 Tools

- **Agent Bootcamp Setup** (`get-agent-bootcamp-setup-guide`) - Provides step-by-step setup instructions for agent engineering
  - Supports both Python (uv + FastAPI) and TypeScript (Next.js) paths
  - Content stored in `/prompts/agent-bootcamp-project-setup-guide.md`
  - Customizable based on language preference
- **Echo Tool** (`echo`) - Simple tool that echoes back a message (for testing)

### 🚀 Transports

- **HTTP Transport** - Stateless HTTP requests (no Redis required)
- **SSE Transport** - Server-Sent Events with Redis for state management

## Notes for running on Vercel

- **Redis**: The SSE transport automatically uses Upstash KV when available, or falls back to `REDIS_URL`
  - Recommended: Use Upstash KV integration in Vercel dashboard
  - Alternative: Set `REDIS_URL` environment variable manually
- Make sure you have [Fluid compute](https://vercel.com/docs/functions/fluid-compute) enabled for efficient execution
- After enabling Fluid compute, open `app/[transport]/route.ts` and adjust `maxDuration` to 800 if you using a Vercel Pro or Enterprise account
- [Deploy the Next.js MCP template](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js)

## 📱 Integration with AI Tools

### Claude Desktop

**For deployed server:**
```json
{
  "mcpServers": {
    "agent-bootcamp": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://agent-engineering-bootcamp-mcp.vercel.app/mcp"
      ]
    }
  }
}
```

**For local development:**
```json
{
  "mcpServers": {
    "agent-bootcamp": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote", 
        "http://localhost:3000/mcp"
      ]
    }
  }
}
```

### Cursor

**For deployed server:**
For Cursor 0.48.0 or later, use direct SSE connection:

```json
{
  "mcpServers": {
    "agent-bootcamp": {
      "url": "https://agent-engineering-bootcamp-mcp.vercel.app/sse"
    }
  }
}
```

For older versions, use the proxy approach:

```json
{
  "mcpServers": {
    "agent-bootcamp": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://agent-engineering-bootcamp-mcp.vercel.app/mcp"
      ]
    }
  }
}
```

**For local development:**
For Cursor 0.48.0 or later, use direct SSE connection:

```json
{
  "mcpServers": {
    "agent-bootcamp": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

For older versions, use the proxy approach:

```json
{
  "mcpServers": {
    "agent-bootcamp": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "http://localhost:3000/mcp"
      ]
    }
  }
}
```

### Available Tools

The server exposes the following tools:

- `echo` - Echo a message for testing purposes
- `get-agent-bootcamp-setup-guide` - Get step-by-step setup instructions for the Agent Engineering Bootcamp

## 🧪 Testing

### Testing Tool Discovery

To verify that tools are being exposed correctly:

```bash
# Test HTTP endpoint with tool listing
node scripts/test-http-tools.mjs

# Test with a custom server URL
node scripts/test-http-tools.mjs https://your-server-url.vercel.app
```

## 🔧 Troubleshooting

### Cursor Not Detecting Tools

If Cursor isn't detecting your MCP server tools:

1. **Check Cursor Version**: Ensure you have Cursor 0.48.0 or later for direct SSE support
2. **Use Direct SSE**: Update your configuration to use `"url": "https://your-server/sse"` instead of the command approach
3. **Restart Cursor**: After updating the configuration, fully restart Cursor
4. **Check Server Logs**: View your Vercel function logs to ensure the server is receiving requests
5. **Test Manually**: Use the test scripts to verify the server is working:
   ```bash
   node scripts/test-http-tools.mjs
   ```
