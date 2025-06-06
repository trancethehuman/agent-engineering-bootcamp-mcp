#!/bin/bash

echo "🚀 Setting up MCP Next.js development environment..."

# Check for Upstash Redis configuration
if [ -f .env.local ] && grep -q "UPSTASH_REDIS_REST_URL" .env.local && grep -q "UPSTASH_REDIS_REST_TOKEN" .env.local; then
    echo "✅ Upstash Redis already configured!"
    echo "   Using cloud Redis database for SSE transport"
    echo ""
    echo "🚀 Starting development server..."
    pnpm dev
    exit 0
fi

echo "📋 Redis Setup Options:"
echo "   1. Upstash KV (Cloud Redis) - Recommended for production"
echo "   2. Local Docker Redis - Good for development"
echo ""

# Check if .env.development.local exists (from vercel env pull)
if [ -f .env.development.local ]; then
    echo "🌐 Found .env.development.local from Vercel"
    echo "   This likely contains Upstash Redis configuration"
    echo "   Copying to .env.local for local development..."
    cp .env.development.local .env.local
    echo "✅ Environment variables copied"
    echo ""
    echo "🚀 Starting development server..."
    pnpm dev
    exit 0
fi

echo "🐳 Setting up local Redis with Docker..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   Visit: https://docs.docker.com/get-docker/"
    echo ""
    echo "💡 Alternative: Set up Upstash Redis instead:"
    echo "   1. Run: vercel link (if not already linked)"
    echo "   2. Run: vercel env pull .env.development.local"
    echo "   3. Run this script again"
    exit 1
fi

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
echo "🎉 Local Redis setup complete! You can now:"
echo "   • Test SSE client: 'pnpm test:sse'"
echo "   • Test HTTP client: 'pnpm test:http'"
echo ""
echo "🐳 Redis Management:"
echo "   • Stop Redis: 'docker stop redis-mcp'"
echo "   • Remove Redis: 'docker rm redis-mcp'"
echo ""
echo "☁️  To switch to Upstash Redis later:"
echo "   1. Run: vercel link"
echo "   2. Run: vercel env pull .env.development.local"
echo "   3. Restart the development server"
echo ""
echo "🚀 Starting development server..."
pnpm dev 