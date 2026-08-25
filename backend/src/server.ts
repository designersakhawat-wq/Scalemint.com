import app from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma";
import { logger } from "./utils/logger";

async function startServer() {
  const server = app.listen(env.PORT, async () => {
    logger.info(`🚀 Scaleminte Backend running on http://localhost:${env.PORT}`);
    logger.info(`🔍 Environment: ${env.NODE_ENV}`);
    logger.info(`🩺 Health check: http://localhost:${env.PORT}/api/health`);
    logger.info(`🔗 API Base: http://localhost:${env.PORT}/api/v1`);

    try {
      await prisma.$connect();
      logger.info("📦 Connected to PostgreSQL database successfully.");
    } catch (dbError: any) {
      logger.warn(
        `⚠️ PostgreSQL database server is not reachable at localhost:5432 yet.\n   Start your PostgreSQL server to enable database-backed queries.`
      );
    }
  });

  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Closing HTTP server and disconnecting Prisma...`);
    server.close(async () => {
      await prisma.$disconnect();
      logger.info("HTTP server closed cleanly.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer();
