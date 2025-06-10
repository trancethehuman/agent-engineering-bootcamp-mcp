import { createMcpHandler } from "@vercel/mcp-adapter";
import { getRedisUrl, isRedisAvailable } from "../../lib/redis";
import { echoTool, getBootcampProjectSetupGuide } from "../../tools";

const handler = createMcpHandler(
  async (server) => {
    server.tool(
      echoTool.name,
      echoTool.description,
      echoTool.schema,
      echoTool.handler
    );

    server.tool(
      getBootcampProjectSetupGuide.name,
      getBootcampProjectSetupGuide.description,
      getBootcampProjectSetupGuide.schema,
      getBootcampProjectSetupGuide.handler
    );
  },
  {},
  {
    basePath: "",
    verboseLogs: true,
    maxDuration: 60,
    ...(isRedisAvailable() && { redisUrl: getRedisUrl() }),
  }
);

export { handler as GET, handler as POST, handler as DELETE };
