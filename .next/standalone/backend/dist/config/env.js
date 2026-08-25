"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Load .env from current working directory or relative project root
const cwdEnvPath = path_1.default.resolve(process.cwd(), ".env");
const parentEnvPath = path_1.default.resolve(__dirname, "../../.env");
if (fs_1.default.existsSync(cwdEnvPath)) {
    dotenv_1.default.config({ path: cwdEnvPath });
}
else if (fs_1.default.existsSync(parentEnvPath)) {
    dotenv_1.default.config({ path: parentEnvPath });
}
else {
    dotenv_1.default.config();
}
exports.env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: parseInt(process.env.PORT || "5000", 10),
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/scaleminte_db?schema=public",
    JWT_SECRET: process.env.JWT_SECRET || "scaleminte_jwt_super_secret_production_key_2026",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "scaleminte_refresh_super_secret_production_key_2026",
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    SMTP_HOST: process.env.SMTP_HOST || "smtp.ethereal.email",
    SMTP_PORT: parseInt(process.env.SMTP_PORT || "587", 10),
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASS: process.env.SMTP_PASS || "",
    SMTP_FROM: process.env.SMTP_FROM || "Scaleminte Support <no-reply@scaleminte.com>",
    ADMIN_NOTIFICATION_EMAIL: process.env.ADMIN_NOTIFICATION_EMAIL || "admin@scaleminte.com",
    UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads",
    MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || "5242880", 10), // 5MB
};
//# sourceMappingURL=env.js.map