"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const conversionApi_1 = __importDefault(require("./routes/conversionApi"));
const cors_1 = __importDefault(require("cors"));
/**
 * Express application instance.
 */
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 3000;
// Middleware to parse JSON in requests
app.use(express_1.default.json());
// Enable CORS
// Use the routes defined in the separate files
app.use("/api", conversionApi_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
