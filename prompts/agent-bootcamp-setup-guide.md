# Agent Engineering Bootcamp Setup

Welcome to the Agent Engineering Bootcamp! This guide will walk you through setting up your development environment step by step.

## Important Instructions

⚠️ **Please follow this guide one step at a time.** After each step, I (your AI assistant) will check in with you to make sure everything is working correctly before we proceed to the next step. Don't rush ahead - let's make sure your setup is solid!

## Step 1: Choose Your Programming Language

**Are you primarily a Python or TypeScript/JavaScript developer?**

Please tell me which language you prefer, and I'll guide you through the appropriate setup.

---

## For Python Developers

### Step 2A: Install uv (Python Package Manager)

We recommend using **uv** - the fast, modern Python package manager.

**Installation options:**

**macOS and Linux:**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows (PowerShell):**

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.sh | iex"
```

**Alternative methods:**

- **Homebrew:** `brew install uv`
- **pipx:** `pipx install uv`
- **pip:** `pip install uv`

After installation, restart your terminal and verify uv is working:

```bash
uv --version
```

**🔄 Check-in:** Please run `uv --version` and let me know if it works before we continue.

### Step 3A: Project Setup Decision

**Do you want to:**

1. **Create a new agent project from scratch**, or
2. **Add agent capabilities to your current project**?

Please let me know your choice.

#### Option 1: New Agent Project

```bash
uv init my-agent-project
cd my-agent-project
uv add openai-agents fastapi uvicorn python-dotenv
```

#### Option 2: Add to Current Project

```bash
uv add openai-agents fastapi uvicorn python-dotenv
```

### Step 4A: Set Up OpenAI Agents SDK

Create a `.env` file in your project root:

```bash
echo "OPENAI_API_KEY=your-api-key-here" > .env
```

Create a simple agent example (`main.py`):

```python
from agents import Agent, Runner
import os
from dotenv import load_dotenv

load_dotenv()

agent = Agent(
    name="Assistant",
    instructions="You are a helpful assistant for agent engineering."
)

result = Runner.run_sync(agent, "Say hello and introduce yourself!")
print(result.final_output)
```

**🔄 Check-in:** Please create these files and let me know if you encounter any issues.

---

## For TypeScript Developers

### Step 2B: Choose Your Agent Framework

**Which framework would you like to use for building agents?**

1. **OpenAI Agents SDK** - Purpose-built for agent development with handoffs, guardrails, and tracing
2. **Vercel AI SDK** - Flexible AI toolkit with great Next.js integration

Please tell me your preference.

#### Option 1: OpenAI Agents SDK

**Installation:**

```bash
npm install @openai/agents
```

**Project Setup Decision:**

- **New project:** `npx create-next-app@latest my-agent-project --typescript`
- **Current project:** Continue in your existing directory

**Simple example (`agent.ts`):**

```typescript
import { Agent, run } from "@openai/agents";

const agent = new Agent({
  name: "Assistant",
  instructions: "You are a helpful assistant for agent engineering.",
});

const result = await run(agent, "Say hello and introduce yourself!");
console.log(result.finalOutput);
```

#### Option 2: Vercel AI SDK with Next.js

**Project setup:**

```bash
npx create-next-app@latest my-agent-project --typescript --tailwind --eslint
cd my-agent-project
npm install ai @ai-sdk/openai
```

**Environment setup:**

```bash
echo "OPENAI_API_KEY=your-api-key-here" > .env.local
```

**🔄 Check-in:** Let me know which option you chose and if the installation completed successfully.

---

## Final Steps (All Developers)

### Step 5: API Key Setup

1. **Get your OpenAI API key** from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Add it to your environment variables** (`.env` for Python, `.env.local` for Next.js)
3. **Never commit your API keys to version control!**

### Step 6: Test Your Setup

Run your example code to make sure everything works:

**Python:**

```bash
uv run python main.py
```

**TypeScript/Node:**

```bash
npm run dev  # for Next.js
# or
npx tsx agent.ts  # for standalone TypeScript
```

**🔄 Final Check-in:** Please test your setup and let me know if you see a successful response from your agent!

## Next Steps

Once your environment is working:

- ✅ Explore the agent framework documentation
- ✅ Join the Discord community for support
- ✅ Start with the "Hello World Agent" tutorial
- ✅ Begin building your first real agent project

**Remember:** I'm here to help at every step. Don't hesitate to ask questions if anything doesn't work as expected!

Happy coding! 🚀
