import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import { ENV } from "./lib/env.js";

import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import incidentRoutes from "./routes/incident.route.js";
import assignmentRoutes from "./routes/assignment.route.js";
import caseUpdateRoutes from "./routes/caseUpdate.route.js";

import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/case-updates", caseUpdateRoutes);


if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();