export default function HomePage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Agent Engineering Bootcamp MCP</title>
        <meta
          name="description"
          content="Model Context Protocol server providing bootcamp resources and serving as an MCP template example."
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #333;
                background: #fafafa;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px 20px;
            }

            .container {
                max-width: 500px;
                width: 100%;
                text-align: center;
            }

            .header {
                margin-bottom: 48px;
            }

            h1 {
                font-size: 2rem;
                font-weight: 600;
                margin-bottom: 8px;
                color: #000;
            }

            .subtitle {
                font-size: 1rem;
                color: #666;
                font-weight: 400;
            }

            .description {
                font-size: 1rem;
                color: #555;
                margin-bottom: 40px;
                line-height: 1.6;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
            }

            .buttons {
                display: flex;
                flex-direction: column;
                gap: 16px;
                align-items: center;
                margin-bottom: 48px;
            }

            .cursor-btn {
                display: inline-block;
            }

            .github-btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 10px 16px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                text-decoration: none;
                color: #374151;
                font-size: 0.875rem;
                font-weight: 500;
                background: white;
                transition: all 0.2s ease;
            }

            .github-btn:hover {
                background: #f9fafb;
                border-color: #9ca3af;
            }

            .github-icon {
                width: 16px;
                height: 16px;
            }

            .info {
                font-size: 0.875rem;
                color: #6b7280;
                line-height: 1.5;
                border-top: 1px solid #e5e7eb;
                padding-top: 24px;
            }

            .info code {
                background: #f3f4f6;
                padding: 2px 6px;
                border-radius: 3px;
                font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
                font-size: 0.8rem;
            }

            @media (max-width: 480px) {
                h1 {
                    font-size: 1.75rem;
                }
                
                .container {
                    padding: 0 16px;
                }
            }
          `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>Agent Engineering Bootcamp MCP</h1>
            <p className="subtitle">Bootcamp Resources & MCP Template</p>
          </div>

          <p className="description">
            Get step-by-step setup instructions for the Agent Engineering
            Bootcamp. This server provides bootcamp resources and serves as a
            simple example of how to build an MCP server using Next.js.
          </p>

          <div className="buttons">
            <a
              href="https://cursor.com/install-mcp?name=agent-bootcamp&config=eyJ1cmwiOiJodHRwczovL2FnZW50LWVuZ2luZWVyaW5nLWJvb3RjYW1wLW1jcC52ZXJjZWwuYXBwL3NzZSJ9"
              className="cursor-btn"
            >
              <img
                src="https://cursor.com/deeplink/mcp-install-dark.svg"
                alt="Add agent-bootcamp MCP server to Cursor"
                height="32"
              />
            </a>

            <a
              href="https://github.com/trancethehuman/agent-engineering-bootcamp-mcp"
              className="github-btn"
            >
              <svg
                className="github-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View Source
            </a>
          </div>

          <div className="info">
            <p>
              Protocol endpoint: <code>/mcp</code>
              <br />
              Use this as a template for building your own MCP servers.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
