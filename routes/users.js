import express from "express";
const router = express.Router();

// Example route
router.get("/profile", (req, res) => {
  res.json({ message: "User profile loaded" });
});

export default router;
