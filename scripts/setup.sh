#!/bin/bash

echo "🚀 Setting up MCP Next.js development environment..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

echo "🐳 Starting Redis container..."

if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running. Please start Docker first."
    echo "   • Open Docker Desktop application"
    echo "   • Or start Docker daemon if using Docker CLI"
    echo ""
    echo "⚠️  You can still use the HTTP transport without Redis:"
    echo "   • Run 'pnpm dev'"
    echo "   • Test with: 'node scripts/test-streamable-http-client.mjs http://localhost:3000'"
    echo ""
else
    if docker ps | grep -q "redis-mcp"; then
        echo "✅ Redis container 'redis-mcp' is already running"
    else
        if docker ps -a | grep -q "redis-mcp"; then
            echo "🔄 Starting existing Redis container..."
            docker start redis-mcp
        else
            echo "📦 Creating new Redis container..."
            docker run -d --name redis-mcp -p 6379:6379 redis:latest
        fi
        echo "✅ Redis is now running on localhost:6379"
    fi
fi

ENV_CREATED=false
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    echo "REDIS_URL=redis://localhost:6379" > .env.local
    echo "✅ Created .env.local with Redis configuration"
    ENV_CREATED=true
else
    if ! grep -q "REDIS_URL" .env.local; then
        echo "📝 Adding Redis URL to existing .env.local..."
        echo "REDIS_URL=redis://localhost:6379" >> .env.local
        echo "✅ Added Redis configuration to .env.local"
        ENV_CREATED=true
    else
        echo "✅ Redis URL already configured in .env.local"
    fi
fi

if [ "$ENV_CREATED" = true ]; then
    echo "🔄 Stopping any running Next.js server to pick up new environment variables..."
    pkill -f "next dev" 2>/dev/null || true
    sleep 2
fi

echo ""
echo "🎉 Setup complete! You can now:"
echo "   • Test SSE client: 'pnpm test:sse'"
echo "   • Test HTTP client: 'pnpm test:http'"
echo ""
echo "🛑 To stop Redis later: 'docker stop redis-mcp'"
echo "🗑️  To remove Redis container: 'docker rm redis-mcp'"
echo ""
echo "🚀 Starting development server..."
pnpm dev 