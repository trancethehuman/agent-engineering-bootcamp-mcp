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
              href="https://cursor.com/install-mcp?config=%7B%22agent-bootcamp%22%3A%7B%22url%22%3A%22https%3A%2F%2Fagent-engineering-bootcamp-mcp.vercel.app%2Fsse%22%7D%7D"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <img
                src="https://raw.githubusercontent.com/modelcontextprotocol/servers/main/images/cursor-logo.png"
                alt="Cursor"
                className="w-5 h-5 mr-2"
              />
              Add to Cursor
            </a>

            <a
              href="https://github.com/trancethehuman/agent-engineering-bootcamp-mcp"
              className="github-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="github-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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
