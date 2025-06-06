#!/usr/bin/env node

async function testHttpTools() {
  const baseUrl =
    process.argv[2] || "https://agent-engineering-bootcamp-mcp.vercel.app";

  console.log(`Testing MCP HTTP endpoints on: ${baseUrl}\n`);

  try {
    // Test the /mcp endpoint (HTTP transport)
    console.log("Testing HTTP transport at /mcp:");
    const httpResponse = await fetch(`${baseUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "tools/list",
        params: {},
        id: 1,
      }),
    });

    if (httpResponse.ok) {
      const contentType = httpResponse.headers.get("content-type");
      console.log("Content-Type:", contentType);

      if (contentType?.includes("text/event-stream")) {
        // Handle SSE format
        const text = await httpResponse.text();
        console.log("Raw SSE response:");
        console.log(text);

        // Parse SSE data
        const lines = text.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              console.log("\nParsed data:", JSON.stringify(data, null, 2));
            } catch (e) {
              // Skip non-JSON data lines
            }
          }
        }
      } else {
        const data = await httpResponse.json();
        console.log("JSON Response:", JSON.stringify(data, null, 2));
      }
    } else {
      console.log(`HTTP ${httpResponse.status}: ${httpResponse.statusText}`);
      const text = await httpResponse.text();
      console.log("Response body:", text);
    }

    console.log("\n---\n");

    // Test initialize first
    console.log("Testing initialize method:");
    const initResponse = await fetch(`${baseUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "initialize",
        params: {
          protocolVersion: "2024-11-05",
          capabilities: {},
          clientInfo: {
            name: "test-client",
            version: "1.0.0",
          },
        },
        id: 2,
      }),
    });

    if (initResponse.ok) {
      const data = await initResponse.json();
      console.log("Initialize response:", JSON.stringify(data, null, 2));
    }

    console.log("\n---\n");

    // Test SSE endpoint
    console.log("Testing SSE endpoint at /sse:");
    const sseResponse = await fetch(`${baseUrl}/sse`, {
      method: "GET",
      headers: {
        Accept: "text/event-stream",
      },
    });

    console.log(
      `SSE endpoint status: ${sseResponse.status} ${sseResponse.statusText}`
    );
  } catch (error) {
    console.error("Error:", error.message);
    if (error.stack) {
      console.error("Stack:", error.stack);
    }
  }
}

testHttpTools();
