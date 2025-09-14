import redis from "redis";

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  },
});

client.on("error", (err) => console.error("❌ Redis Error:", err));

// ✅ Ensure Redis connects properly
const connectRedis = async () => {
  try {
    if (!client.isOpen) {
      await client.connect();
      console.log("✅ Redis connected successfully");
    }
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
  }
};
await connectRedis(); // ✅ Initialize connection

// 🔄 Middleware to serve and cache responses
const redisMiddleware = async (req, res, next) => {
  const key = req.originalUrl;

  try {
    const cached = await client.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    res.sendResponse = res.json;
    res.json = (body) => {
      client.set(key, JSON.stringify(body), {
        EX: parseInt(process.env.REDIS_TTL || "60", 10), // Ensure TTL is integer
      });
      res.sendResponse(body);
    };

    next();
  } catch (error) {
    console.error("❌ Redis middleware error:", error);
    next(); // Proceed without caching on failure
  }
};

export { client, redisMiddleware };