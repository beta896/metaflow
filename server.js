import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import { startingMiddleware } from "./middleware/auth.js";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import crypto from "crypto";

const app = express();
app.use(express.json());

// Serve Static Assets
app.use(express.static("public"));

// CORS Whitelist
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use(
  cors({
    origin(origin, callback) {
      const normalizedOrigin = origin?.replace(/\/$/, "");
      if (!origin || allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        console.warn(`[CORS] Blocked origin: ${origin}`);
        callback(new Error("CORS not allowed for origin: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(startingMiddleware);

// Helmet CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://cdn.jsdelivr.net/npm/@popperjs/core"],
        scriptSrcElem: ["'self'", "https://cdn.jsdelivr.net", "https://cdn.jsdelivr.net/npm/@popperjs/core"],
        styleSrc: ["'self'", "https://cdn.jsdelivr.net"],
        imgSrc: ["'self'", "http://localhost:3000"],
        connectSrc: ["'self'", "http://localhost:3000"],
      },
    },
  })
);

// In-memory fallback model when MongoDB is unavailable
function createInMemoryUserModel() {
  const store = [];
  const byId = new Map();

  class Doc {
    constructor(data) {
      Object.assign(this, data);
      this._id = this._id || String(Date.now()) + Math.random().toString(36).slice(2);
    }
    async save() {
      const idx = store.findIndex((u) => u._id === this._id);
      if (idx >= 0) {
        store[idx] = { ...store[idx], ...this };
      } else {
        store.push(this);
      }
      byId.set(this._id, this);
      return this;
    }
  }

  return {
    async findOne(query) {
      return (
        store.find((u) => Object.entries(query).every(([k, v]) => u[k] === v)) || null
      );
    },
    find() {
      const results = [...store];
      return {
        limit(n) {
          return results.slice(0, n);
        },
      };
    },
    async findById(id) {
      return byId.get(id) || null;
    },
    modelDoc(data) {
      return new Doc(data);
    },
    get Doc() {
      return Doc;
    },
  };
}

let User;
let usingMemory = false;

try {
  await mongoose.connect(process.env.MONGO_URI || "", {
    serverSelectionTimeoutMS: 1500,
  });
  const schema = new mongoose.Schema({
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
    timestamp: String,
  });
  User = mongoose.model("User", schema);
  console.log("[mongo] Connected to MongoDB");
} catch (err) {
  console.warn("[mongo] Falling back to in-memory store:", err.message);
  const Mem = createInMemoryUserModel();
  // shim to behave like mongoose: new User() and User.findOne etc
  User = function (data) {
    return new Mem.Doc(data);
  };
  User.findOne = Mem.findOne;
  User.find = Mem.find;
  User.findById = Mem.findById;
  User.prototype.save = Mem.Doc.prototype.save;
  usingMemory = true;
}

function encryptTagInline(tag) {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    crypto.createHash("sha256").update(String(process.env.SECRET_KEY || "metaflow-secret-key")).digest(),
    Buffer.alloc(16, 0)
  );
  const encrypted = Buffer.concat([cipher.update(tag, "utf8"), cipher.final()]).toString("hex");
  return encrypted;
}

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

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

// OAuth setup (optional if env vars missing)
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  app.use(session({ secret: process.env.SESSION_SECRET || "metaflow-secret", resave: false, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({ googleId: profile.id, email: profile.emails?.[0]?.value });
          await user.save();
        }
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user || null);
  });

  app.get("/api/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));
  app.get("/api/auth/google/callback", passport.authenticate("google", { successRedirect: "/dashboard", failureRedirect: "/login" }));
} else {
  console.warn("[oauth] Google credentials not set; OAuth routes disabled");
}

app.get("/api/status", (req, res) => {
  res.json({ status: "online", store: usingMemory ? "memory" : "mongo", timestamp: new Date().toISOString() });
});

app.get("/api/contributors", async (req, res) => {
  const results = await User.find();
  const list = Array.isArray(results) ? results : results.limit ? results.limit(10) : results;
  res.json(list);
});

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
    timestamp: new Date().toISOString(),
  };
  res.json({ status: "ACTIVE phase complete", offer });
});

app.post("/api/escalate", async (req, res) => {
  const { email, trigger } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  let verdict = "No escalation";
  if (trigger === "admin") {
    user.role = "Admin";
    user.tier = "Tier 3";
    verdict = "Admin escalation approved";
  } else if (trigger === "referral" && (user.referrals || 0) >= 5) {
    user.tier = "Tier 2";
    verdict = "Referral-based escalation";
  }

  await user.save();
  res.json({ status: "Escalated", verdict, tier: user.tier, role: user.role });
});

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

app.get("/api/legacy", async (req, res) => {
  const lifeCycleTag = "LCT-SEALED";
  const payload = {
    founder: "Mustafa",
    cockpitModules: [
      "HealthWidget",
      "ProfitWidget",
      "TierWidget",
      "AuditTrail",
      "MilestoneMap",
      "EscalationPanel",
      "SystemSnapshot",
      "VerdictChain",
      "ReferralImpact",
      "ProfitTrigger",
      "Logbook",
      "RitualSync",
      "LifeCycleEngine",
    ],
    activatedOn: new Date().toISOString(),
    location: "Desert of 10th of Ramadan, Egypt",
    mission: "Architect scalable, audit-ready systems with compounding profit and symbolic clarity",
    lifeCycleTag,
    encryptedTag: encryptTagInline(lifeCycleTag),
  };
  res.json(payload);
});

const PORT = Number(process.env.API_PORT || 5000);
app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});
