# Agent Engineering Bootcamp MCP

## Setup

### Quick Setup (Recommended)

Run the automated setup script to install dependencies and configure Redis:

```sh
pnpm run setup
```

This script will:

- Check for Docker installation
- Start a Redis container for SSE transport
- Create/update `.env.local` with Redis configuration
- Provide next steps for testing

### Manual Setup

If you prefer manual setup, install the required dependencies:

```sh
npm install @modelcontextprotocol/sdk
# or
pnpm install @modelcontextprotocol/sdk
```

For SSE transport support, you'll also need Redis running locally:

```sh
# Using Docker (recommended)
docker run -d --name redis-mcp -p 6379:6379 redis:latest

# Create .env.local file
echo "REDIS_URL=redis://localhost:6379" > .env.local
```

## Sample Clients

This project includes two sample clients:

### SSE Client (for production with Redis)

`scripts/test-client.mjs` - Uses Server-Sent Events transport (requires Redis)

### HTTP Client (for local development)

`scripts/test-streamable-http-client.mjs` - Uses streamable HTTP transport (no Redis required)

### Testing against a deployed server:

```sh
node scripts/test-client.mjs https://mcp-for-next-js.vercel.app
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

# Test prompts functionality
pnpm test:prompts
```

Or use the full commands:

```sh
node scripts/test-client.mjs http://localhost:3000
node scripts/test-streamable-http-client.mjs http://localhost:3000
node scripts/test-prompts.mjs http://localhost:3000
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

**Uses `@vercel/mcp-adapter`**

## Usage

This Agent Engineering Bootcamp MCP server uses the [Vercel MCP Adapter](https://www.npmjs.com/package/@vercel/mcp-adapter) to provide setup guidance and tools for students learning agent development.

Update `app/[transport]/route.ts` with your tools, prompts, and resources following the [MCP TypeScript SDK documentation](https://github.com/modelcontextprotocol/typescript-sdk/tree/main?tab=readme-ov-file#server).

## Features

This Agent Engineering Bootcamp MCP server includes:

### 🔧 Tools

- **Echo Tool** - Simple tool that echoes back a message (for testing)

### 📝 Prompts

- **Agent Bootcamp Setup** - Helps students set up their development environment for agent engineering
  - Supports both Python (uv + FastAPI) and TypeScript (Next.js) paths
  - Stored in `/prompts/agent-bootcamp.md`
  - Customizable based on language preference

### 🚀 Transports

- **HTTP Transport** - Stateless HTTP requests (no Redis required)
- **SSE Transport** - Server-Sent Events with Redis for state management

## Notes for running on Vercel

- To use the SSE transport, requires a Redis attached to the project under `process.env.REDIS_URL`
- Make sure you have [Fluid compute](https://vercel.com/docs/functions/fluid-compute) enabled for efficient execution
- After enabling Fluid compute, open `app/route.ts` and adjust `maxDuration` to 800 if you using a Vercel Pro or Enterprise account
- [Deploy the Next.js MCP template](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js)
