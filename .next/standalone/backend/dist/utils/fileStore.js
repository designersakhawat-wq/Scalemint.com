"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadData = loadData;
exports.saveData = saveData;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DATA_DIR = path_1.default.join(process.cwd(), "data");
// Ensure data directory exists
if (!fs_1.default.existsSync(DATA_DIR)) {
    try {
        fs_1.default.mkdirSync(DATA_DIR, { recursive: true });
    }
    catch (e) {
        console.error("Failed to create data directory:", e);
    }
}
function loadData(fileName, defaultData) {
    const filePath = path_1.default.join(DATA_DIR, fileName);
    try {
        if (fs_1.default.existsSync(filePath)) {
            const content = fs_1.default.readFileSync(filePath, "utf-8");
            return JSON.parse(content);
        }
    }
    catch (err) {
        console.error(`Error reading ${fileName}:`, err);
    }
    saveData(fileName, defaultData);
    return defaultData;
}
function saveData(fileName, data) {
    const filePath = path_1.default.join(DATA_DIR, fileName);
    try {
        if (!fs_1.default.existsSync(DATA_DIR)) {
            fs_1.default.mkdirSync(DATA_DIR, { recursive: true });
        }
        fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    }
    catch (err) {
        console.error(`Error writing ${fileName}:`, err);
    }
}
//# sourceMappingURL=fileStore.js.map