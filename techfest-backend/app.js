import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/events.js";
import authRoutes from "./routes/auth.js";
import registrationRoutes from "./routes/registrations.js";
import { logger, notFound, errorHandler } from "./middleware/common.js";
import {
  securityHeaders,
  sanitizeRequest,
  createRateLimiter
} from "./middleware/security.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.use(securityHeaders);
app.use(cors({
  origin(origin, callback) {
    // Allow server-to-server and local health checks with no Origin header.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));
app.use(express.json({ limit: "20kb" }));
app.use(sanitizeRequest);
app.use(logger);

app.get("/", (req, res) => {
  res.json({ success: true, message: "TechFest 2026 API is running" });
});
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, status: "healthy" });
});

const generalLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 200 });
const authLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 10 });
app.use("/api", generalLimiter);
app.use("/api/auth", authLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
