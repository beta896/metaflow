import cors from "cors";

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for origin: " + origin));
    }
  },
  credentials: true
}));
