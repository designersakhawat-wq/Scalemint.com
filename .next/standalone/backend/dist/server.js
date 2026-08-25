"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const prisma_1 = require("./config/prisma");
const logger_1 = require("./utils/logger");
async function startServer() {
    const server = app_1.default.listen(env_1.env.PORT, async () => {
        logger_1.logger.info(`🚀 Scaleminte Backend running on http://localhost:${env_1.env.PORT}`);
        logger_1.logger.info(`🔍 Environment: ${env_1.env.NODE_ENV}`);
        logger_1.logger.info(`🩺 Health check: http://localhost:${env_1.env.PORT}/api/health`);
        logger_1.logger.info(`🔗 API Base: http://localhost:${env_1.env.PORT}/api/v1`);
        try {
            await prisma_1.prisma.$connect();
            logger_1.logger.info("📦 Connected to PostgreSQL database successfully.");
        }
        catch (dbError) {
            logger_1.logger.warn(`⚠️ PostgreSQL database server is not reachable at localhost:5432 yet.\n   Start your PostgreSQL server to enable database-backed queries.`);
        }
    });
    const shutdown = async (signal) => {
        logger_1.logger.info(`Received ${signal}. Closing HTTP server and disconnecting Prisma...`);
        server.close(async () => {
            await prisma_1.prisma.$disconnect();
            logger_1.logger.info("HTTP server closed cleanly.");
            process.exit(0);
        });
    };
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
}
startServer();
//# sourceMappingURL=server.js.map