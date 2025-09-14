const express = require("express");
const { logAction } = require("../utils/auditLogger");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/authMiddleware");
const Post = require("../models/Post");
const User = require("../models/User");
const AI = require("../services/aiService"); // AI-powered integration

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "User not found!" });
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ message: "Invalid credentials!" });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ accessToken: token });
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      res.status(500).json({ message: "Server error!" });
    }
  });

// ✅ Get User Profile
router.get("/auth/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error.message);
    res.status(500).json({ message: "Server error!" });
  }
});

// ✅ Admin Role Management
router.get("/admin/dashboard", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied!" });

  try {
    const users = await User.find();
    const posts = await Post.find();
    res.json({ totalUsers: users.length, totalPosts: posts.length });
  } catch (error) {
    console.error("❌ Admin Dashboard Error:", error.message);
    res.status(500).json({ message: "Server error!" });
  }
});

// ✅ Post Management (Create)
router.post("/posts", verifyToken, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({ title, content, author: req.user.id });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    console.error("❌ Post Creation Error:", error.message);
    res.status(500).json({ message: "Server error!" });
  }
});

// ✅ Post Management (Fetch All)
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (error) {
    console.error("❌ Fetch Posts Error:", error.message);
    res.status(500).json({ message: "Server error!" });
  }
});

// ✅ AI-Generated Content (Example)
router.post("/ai/generate", verifyToken, async (req, res) => {
  try {
    const generatedContent = await AI.createContent(req.body.prompt);
    res.json({ content: generatedContent });
  } catch (error) {
    console.error("❌ AI Content Generation Error:", error.message);
    res.status(500).json({ message: "AI service error!" });
  }
});

module.exports = router;
