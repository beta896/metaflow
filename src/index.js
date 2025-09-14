import express from "express";
import verdictsRouter from "../routes/verdicts.js";

const app = express();
app.use(express.json());

app.use("/verdicts", verdictsRouter);

app.get("/", (req, res) => {
  res.send("Metaflow backend is alive.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});