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

### Step 3A: Create New Project

```bash
uv init my-project
cd my-project
```

### Step 4A: Install LiteLLM

LiteLLM allows you to call 100+ LLMs using the OpenAI input/output format, providing a unified interface for different AI providers.

```bash
uv add litellm python-dotenv
```

**🔄 Check-in:** Please run this command and let me know if the installation completes successfully.

### Step 5A: Create Your First LiteLLM Example

Create a simple example file (`main.py`) to test LiteLLM:

```python
from litellm import completion
import os
from dotenv import load_dotenv

load_dotenv()

os.environ["OPENAI_API_KEY"] = "your-api-key-here"

response = completion(
    model="openai/gpt-4o",
    messages=[{"content": "Hello, how are you?", "role": "user"}]
)

print(response.choices[0].message.content)
```

Also create a `.env` file in your project root:

```bash
OPENAI_API_KEY=your-actual-api-key-here
```

**🔄 Check-in:** Please create these files and let me know when you're ready to test the setup.

---

## For TypeScript Developers

### Step 2B: Create New Project

```bash
npx create-next-app@latest my-project --typescript --tailwind --eslint
cd my-project
```

**🔄 Check-in:** Let me know if the project creation completed successfully.

### Step 3B: Install AI SDK

Install the AI SDK and OpenAI provider:

```bash
pnpm install ai @ai-sdk/openai
```

**🔄 Check-in:** Please run this command and let me know if the installation completes successfully.

### Step 4B: Create Chat API Route

Create an API route file at `app/api/chat/route.ts`:

```typescript
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}
```

### Step 5B: Create Frontend Component

Create a simple frontend at `app/page.tsx`:

```typescript
"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const generatePoem = () => {
    handleSubmit(new Event("submit") as any, {
      data: {
        messages: [
          {
            role: "user",
            content: "Write a beautiful short poem about coding and AI",
          },
        ],
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">AI Poem Generator</h1>

      <button
        onClick={generatePoem}
        disabled={isLoading}
        className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? "Generating..." : "Generate a Poem"}
      </button>

      <div className="mt-6">
        {messages.map((m) => (
          <div key={m.id} className="mb-4">
            {m.role === "assistant" && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap font-serif">
                  {m.content}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

Also create a `.env.local` file in your project root:

```bash
OPENAI_API_KEY=your-actual-api-key-here
```

**🔄 Check-in:** Please create these files and let me know when you're ready to test the setup.

---

## Final Steps (All Developers)

### Step 3: API Key Setup

1. **Sign up/Login to OpenAI** at [https://platform.openai.com/login](https://platform.openai.com/login)
2. **Get your OpenAI API key** from [OpenAI Platform API Keys](https://platform.openai.com/api-keys)
3. **Add it to your environment variables** (`.env` for Python, `.env.local` for Next.js)
4. **Never commit your API keys to version control!**

**🔄 Check-in:** Please get your API key and add it to your environment file before proceeding.

### Step 4: Test Your LLM Integration

Now let's test that your LLM integration is working:

**For Python:**

Run your Python script:

```bash
uv run python main.py
```

You should see a response from the AI model printed to your terminal.

**For TypeScript/Next.js:**

1. Start your development server:

```bash
pnpm run dev
```

2. Open your browser and go to `http://localhost:3000`

3. Click the "Generate a Poem" button

You should see a beautiful poem about coding and AI appear on the page, streaming in real-time!

**🔄 Final Check-in:** Please test your setup and let me know if you see a successful response from the AI model!
