const User = mongoose.model("User", new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  role: String,
  referrals: Number,
  tier: String,
  engagement: Number
}));
