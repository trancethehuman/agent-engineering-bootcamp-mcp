# Agent Engineering Bootcamp MCP

## Add to Cursor

Get instant access to the Agent Engineering Bootcamp intelligent onboarding in Cursor:

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=agent-bootcamp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtb2RlbGNvbnRleHRwcm90b2NvbC9zZXJ2ZXItZXZlcnl0aGluZyIsImh0dHBzOi8vYWdlbnQtZW5naW5lZXJpbmctYm9vdGNhbXAtbWNwLnZlcmNlbC5hcHAvbWNwIl19)

_The hosted server provides the same agent bootcamp prompts without requiring local setup._

## For Developers: Local Development Setup

If you want to clone this repository and develop/test the MCP server locally:

### Setting Up Local MCP Server

1. **Clone and setup:**

   ```sh
   git clone https://github.com/trancethehuman/agent-engineering-bootcamp-mcp.git
   cd agent-engineering-bootcamp-mcp
   pnpm run setup
   ```

2. **Generate your local Cursor deeplink:**

   ```sh
   pnpm generate:cursor-link local
   ```

   Or generate a link for a hosted server:

   ```sh
   pnpm generate:cursor-link hosted https://your-server-url.vercel.app
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

You can test this MCP server with Claude Desktop to see the agent bootcamp prompt in action.

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
         "command": "node",
         "args": [
           "/ABSOLUTE/PATH/TO/YOUR/PROJECT/scripts/test-streamable-http-client.mjs",
           "http://localhost:3000"
         ]
       }
     }
   }
   ```

   **Important:** Replace `/ABSOLUTE/PATH/TO/YOUR/PROJECT` with the actual absolute path to your project directory.

4. **Restart Claude Desktop** completely to pick up the new configuration.

### Testing the Prompt

Once configured, you should see a tools icon (🔨) in Claude Desktop. You can now test the agent bootcamp prompt:

1. Look for the "Search and tools" icon in Claude Desktop
2. You should see the `agent-bootcamp` prompt available
3. Try asking: _"Help me setup my project for the agent engineering bootcamp"_
4. Claude will walk you through the step-by-step setup process!

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

- **Redis**: The SSE transport automatically uses Upstash KV when available, or falls back to `REDIS_URL`
  - Recommended: Use Upstash KV integration in Vercel dashboard
  - Alternative: Set `REDIS_URL` environment variable manually
- Make sure you have [Fluid compute](https://vercel.com/docs/functions/fluid-compute) enabled for efficient execution
- After enabling Fluid compute, open `app/[transport]/route.ts` and adjust `maxDuration` to 800 if you using a Vercel Pro or Enterprise account
- [Deploy the Next.js MCP template](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js)
