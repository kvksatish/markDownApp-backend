// src/app.ts
import express, { Application } from "express";
import conversionApi from "./routes/conversionApi";
import cors from "cors";

/**
 * Express application instance.
 */
const app: Application = express();

app.use(cors());

const port: number = 3000;

// Middleware to parse JSON in requests
app.use(express.json());

// Enable CORS

// Use the routes defined in the separate files
app.use("/api", conversionApi);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
