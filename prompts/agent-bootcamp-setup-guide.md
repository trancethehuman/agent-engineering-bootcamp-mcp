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
from dotenv import load_dotenv

load_dotenv()

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

### Step 6A: Add .env to .gitignore

To prevent accidentally committing your API keys to version control, add `.env` to your `.gitignore` file:

```bash
echo ".env" >> .gitignore
```

Or if you prefer to edit manually, create/update `.gitignore` and add this line:

```
.env
```

**🔄 Check-in:** Please create these files and let me know when you're ready to test the setup.

---

## For TypeScript Developers

The complete code can be found here: https://github.com/trancethehuman/my-agent-bootcamp

### Step 2B: Install Node.js

**Installation Guide:** Follow the official Node.js installation documentation

**Quick hints by platform:**

- **macOS:** Homebrew, direct download, or version managers (nvm/fnm)
- **Windows:** Direct download, package managers, or version managers
- **Linux:** Package manager, direct download, or version managers

Verify installation:

```bash
node --version
```

**🔄 Check-in:** Please run `node --version` and let me know if it works before we continue.

### Step 3B: Install pnpm Package Manager

**Installation Guide:** Follow the official pnpm installation guide

**Quick hints by platform:**

- **Windows:** PowerShell script or `npm install -g pnpm`
- **macOS:** `brew install pnpm` or curl script
- **Linux:** curl script or `npm install -g pnpm`

Verify installation:

```bash
pnpm --version
```

**🔄 Check-in:** Please run `pnpm --version` and let me know if the installation completes successfully.

### Step 4B: Install Git

**Installation Guide:** Follow the official Git installation documentation

**Quick hints by platform:**

- **macOS:** Homebrew, Xcode Command Line Tools, or direct download
- **Windows:** Git for Windows, package managers, or direct download
- **Linux:** Distribution package manager or direct download

Verify installation:

```bash
git --version
```

**🔄 Check-in:** Please run `git --version` and verify it works before we continue.

### Step 5B: Create New Project

```bash
npx create-next-app@latest YOUR-PROJECT-NAME --typescript --tailwind --eslint
cd YOUR-PROJECT-NAME
```

**🔄 Check-in:** Verify the project creation completed successfully.

### Step 6B: Install AI SDK

Install the AI SDK and OpenAI provider:

```bash
pnpm install ai @ai-sdk/openai
```

**🔄 Check-in:** Run this command and verify the installation completes successfully.

### Step 7B: Create Chat API Route

Create an API route file at `app/api/chat/route.ts`:

```tsx
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "system",
          content:
            "You are a creative poet. Write beautiful, original poems about nature, life, or dreams. Make them thoughtful and inspiring.",
        },
        ...messages,
      ],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error generating poem:", error);
    return Response.json({ error: "Failed to generate poem" }, { status: 500 });
  }
}
```

### Step 8B: Install Shadcn UI components

Run the following in the root directory of your project:

```bash
pnpm dlx shadcn@latest init
```

### Step 9B: Add the `card` and `button` components from Shadcn to your project

```bash
pnpm dlx shadcn@latest add button card
```

### Step 10B: Create a Poem Card component

Create a file, `components/poem-card.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PoemCard() {
  const [showPoem, setShowPoem] = useState(false);
  const poemContainerRef = useRef<HTMLDivElement>(null);

  const { messages, append, reload, status } = useChat({
    api: "/api/chat",
    onFinish: () => {
      setShowPoem(true);
    },
  });

  const currentPoem =
    messages.find((m) => m.role === "assistant")?.content || "";

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (poemContainerRef.current && currentPoem) {
      poemContainerRef.current.scrollTop =
        poemContainerRef.current.scrollHeight;
    }
  }, [currentPoem]);

  const handleGeneratePoem = async () => {
    setShowPoem(true);
    await append({
      role: "user",
      content: "Please write me a beautiful poem.",
    });
  };

  const handleRegeneratePoem = async () => {
    await reload();
  };

  const handleHidePoem = () => {
    setShowPoem(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Discover a Poem</CardTitle>
        <CardDescription>
          Click the button below to generate a unique poem with AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showPoem && (
          <Button
            onClick={handleGeneratePoem}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Generating Poem..." : "Generate Poem"}
          </Button>
        )}
        {showPoem && (
          <div
            ref={poemContainerRef}
            className="whitespace-pre-wrap text-sm text-muted-foreground max-h-60 overflow-y-auto p-2 border rounded-md scroll-smooth"
          >
            {currentPoem}
            {isLoading && (
              <div className="text-center text-xs text-gray-500 mt-2">
                ✨ Creating your poem...
              </div>
            )}
          </div>
        )}
      </CardContent>
      {showPoem && (
        <CardFooter className="space-x-2">
          <Button
            onClick={handleRegeneratePoem}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? "Regenerating..." : "Regenerate"}
          </Button>
          <Button
            onClick={handleHidePoem}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            Hide Poem
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
```

### Step 11B: Modify the root page

Open the root page, `app/page.tsx` and modify it to be like below:

```tsx
import PoemCard from "@/components/poem-card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <PoemCard />
    </div>
  );
}
```

### Step 12B: Obtain your OpenAI API key

Go to https://openai.com/api/ and get your API key. Put $5 on your account so you're not rate-limited.

### Step 13B: Create a .env.local file to store the API key

Create a `.env.local` file in your project root:

```bash
OPENAI_API_KEY=your-actual-api-key-here
```

**🔄 Check-in:** Create these files and verify they're ready for testing.

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

**🔄 Final Check-in:** Test your setup and verify you see a successful response from the AI model streaming on the page!

### Next Steps

Congratulations! You now have a working TypeScript/Next.js environment with AI SDK integration. You can start building your AI agents and applications using this foundation.
