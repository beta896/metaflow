import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import { startingMiddleware } from "./middleware/auth.js";
import passport from "passport";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth20";
import crypto from "crypto";

const app = express();
app.use(express.json());

// ✅ Serve Static Assets
app.use(express.static("public"));

// ✅ CORS Whitelist
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use(cors({
  origin: function (origin, callback) {
    const normalizedOrigin = origin?.replace(/\/$/, "");
    if (!origin || allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Blocked origin: ${origin}`);
      callback(new Error("CORS not allowed for origin: " + origin));
    }
  },
  credentials: true
}));

app.use(startingMiddleware);

// ✅ Helmet CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdn.jsdelivr.net/npm/@popperjs/core"
      ],
      scriptSrcElem: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdn.jsdelivr.net/npm/@popperjs/core"
      ],
      styleSrc: ["'self'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "http://localhost:3000"],
      connectSrc: ["'self'", "http://localhost:3000"]
    }
  }
}));

// ✅ MongoDB Connection
mongoose.connect("mongodb://localhost:27017/metaflow", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("[mongo] Connected to MongoDB");
}).catch((err) => {
  console.error("[mongo] Connection error:", err.message);
});

// ✅ User Model
const User = mongoose.model("User", new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  platform: String,
  followers: Number,
  region: String,
  role: String,
  tier: String,
  engagement: Number,
  referrals: Number,
  lifeCycleTag: String,
  encryptedTag: String,
  timestamp: String
}));

// 🔐 Encrypt Tag Utility
function encryptTagInline(tag) {
  const cipher = crypto.createCipher("aes-256-cbc", "metaflow-secret-key");
  let encrypted = cipher.update(tag, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// ✅ Root Redirect
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// ✅ Auth Routes
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: "User already exists" });

  const newUser = new User({ email, password });
  await newUser.save();
  res.json({ status: "Account created" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ status: "Login successful", user });
});

app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({ status: "Reset link sent", link: `http://localhost:3000/reset/${user._id}` });
});

// ✅ Google OAuth
app.use(session({ secret: "metaflow-secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: "GOOGLE_CLIENT_ID",
  clientSecret: "GOOGLE_CLIENT_SECRET",
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = new User({ googleId: profile.id, email: profile.emails[0].value });
    await user.save();
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));

app.get("/api/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));
app.get("/api/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/dashboard",
  failureRedirect: "/login"
}));

// ✅ Heartbeat
app.get("/api/status", (req, res) => {
  res.json({ status: "online", timestamp: new Date().toISOString() });
});

// ✅ Contributor Feed
app.get("/api/contributors", async (req, res) => {
  const contributors = await User.find().limit(10);
  res.json(contributors);
});

// ✅ Life Cycle Transition
app.post("/api/lifecycle-transition", async (req, res) => {
  const { email, platform, followers, region, lifeCycleTag } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, platform, followers, region });
  }

  user.lifeCycleTag = lifeCycleTag;
  user.encryptedTag = encryptTagInline(lifeCycleTag);
  user.timestamp = new Date().toISOString();
  await user.save();

  res.json({ status: "INIT phase complete", user });
});

// ✅ Offer Matching
app.post("/api/offer-match", async (req, res) => {
  const { product, region, link, commission, assignedTo, lifeCycleTag } = req.body;

  const offer = {
    product,
    region,
    link,
    commission,
    assignedTo,
    lifeCycleTag,
    encryptedTag: encryptTagInline(lifeCycleTag),
    timestamp: new Date().toISOString()
  };

  res.json({ status: "ACTIVE phase complete", offer });
});

// ✅ Escalation Logic
app.post("/api/escalate", async (req, res) => {
  const { email, trigger } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  let verdict = "No escalation";
  if (trigger === "admin") {
    user.role = "Admin";
    user.tier = "Tier 3";
    verdict = "Admin escalation approved";
  } else if (trigger === "referral" && user.referrals >= 5) {
    user.tier = "Tier 2";
    verdict = "Referral-based escalation";
  }

  await user.save();
  res.json({ status: "Escalated", verdict, tier: user.tier, role: user.role });
});

// ✅ Profit Trigger
app.post("/api/profit-trigger", async (req, res) => {
  const { email, profit } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  let tier = user.tier;
  if (profit >= 100) tier = "Tier 2";
  if (profit >= 500) tier = "Tier 3";

  user.tier = tier;
  await user.save();
  res.json({ status: "Tier updated", tier });
});

// ✅ Legacy Snapshot
app.get("/api/legacy", async (req, res) => {
  const lifeCycleTag = "LCT-SEALED";

  const payload = {
    founder: "Mustafa",
    cockpitModules: [
      "HealthWidget", "ProfitWidget", "TierWidget", "AuditTrail",
      "MilestoneMap", "EscalationPanel", "SystemSnapshot",
      "VerdictChain", "ReferralImpact", "ProfitTrigger",
      "Logbook", "RitualSync", "LifeCycleEngine"
    ],
    activatedOn: new Date().toISOString(),
    location: "Desert of 10th of Ramadan, Egypt",
    mission: "Architect scalable, audit-ready systems with compounding profit and symbolic clarity",
    lifeCycleTag,
    encryptedTag: encryptTagInline(lifeCycleTag)
  };

  res.json(payload);
});

// ✅ Final Boot
const PORT = 300