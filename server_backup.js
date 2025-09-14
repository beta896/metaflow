import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import { startingMiddleware } from "./middleware/auth.js";

import affiliateRoutes from "./routes/affiliate.js";
import dashboardRoutes from "./routes/dashboard.js";
import userRoutes from "./routes/users.js";
import referralRoutes from "./routes/referral.js";
import earningsRoutes from "./routes/earnings.js";
import Affiliate from "./models/Affiliate.js";
import tierMapRoutes from "./routes/tierMap.js";
import escalationLogRoutes from "./routes/escalationLog.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(startingMiddleware);

app.use(express.static(path.join(process.cwd(), "frontend")));

app.use("/api/affiliate", referralRoutes);
app.use("/api/affiliate", affiliateRoutes);
app.use("/api/affiliate", earningsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", tierMapRoutes);
app.use("/api/dashboard", escalationLogRoutes);

app.get("/api/ping", (req, res) => {
  res.send("✅ Backend is alive and cockpit is operational");
});

app.get("/roles/getRole", (req, res) => {
  res.json({ role: "guest" }); // Replace with real logic
});

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend", "index.html"));
});

mongoose.connect("mongodb://localhost:27017/metaflow", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("[mongo] Connected to MongoDB");
}).catch((err) => {
  console.error("[mongo] Connection error:", err.message);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("[engine-start] ML Verdict Engine running at http://localhost:" + PORT);
});
`napp.get("/api/status", (req, res) => res.json({ status: "online", timestamp: new Date().toISOString() }));
