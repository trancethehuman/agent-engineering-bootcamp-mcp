import { Redis as UpstashRedis } from "@upstash/redis";
import { createClient, RedisClientType } from "redis";

let redisClient: UpstashRedis | RedisClientType | null = null;

export function getRedisClient() {
  if (redisClient) {
    return redisClient;
  }

  // Try Upstash first (production environment)
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    console.log("Using Upstash Redis");
    redisClient = UpstashRedis.fromEnv();
    return redisClient;
  }

  // Fall back to local Redis (development environment)
  if (process.env.REDIS_URL) {
    console.log("Using local Redis");
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    // Connect if it's a local Redis client
    if ("connect" in redisClient) {
      redisClient.connect().catch(console.error);
    }

    return redisClient;
  }

  console.warn(
    "No Redis configuration found. SSE transport will not be available."
  );
  return null;
}

export function getRedisUrl(): string | undefined {
  // For Upstash, we use the REST URL
  if (process.env.UPSTASH_REDIS_REST_URL) {
    return process.env.UPSTASH_REDIS_REST_URL;
  }

  // For local Redis, we use the REDIS_URL
  return process.env.REDIS_URL;
}

export function isRedisAvailable(): boolean {
  return !!(
    (process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN) ||
    process.env.REDIS_URL
  );
}
