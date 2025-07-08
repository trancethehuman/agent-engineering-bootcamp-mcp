import { createMcpHandler } from "@vercel/mcp-adapter";
import { getRedisUrl, isRedisAvailable } from "../../lib/redis";
import {
  echoTool,
  getBootcampProjectSetupGuide,
  bootcampScheduleTool,
  joinBootcampTool,
  extractLectureContent,
} from "../../tools";

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

    server.tool(
      bootcampScheduleTool.name,
      bootcampScheduleTool.description,
      bootcampScheduleTool.schema,
      bootcampScheduleTool.handler
    );

    server.tool(
      joinBootcampTool.name,
      joinBootcampTool.description,
      joinBootcampTool.schema,
      joinBootcampTool.handler
    );

    server.tool(
      extractLectureContent.name,
      extractLectureContent.description,
      extractLectureContent.schema,
      extractLectureContent.handler
    );
  },
  {},
  {
    basePath: "",
    verboseLogs: true,
    maxDuration: 10,
    ...(isRedisAvailable() && { redisUrl: getRedisUrl() }),
  }
);

export { handler as GET, handler as POST, handler as DELETE };
