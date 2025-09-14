import mongoose from \"mongoose\";
import Verdict from \"./models/Verdict.js\";
import { pushVerdictToNotion } from \"./notion/notionSync.js\";

async function testPush() {
  try {
    await mongoose.connect(\"mongodb://127.0.0.1:27007/metaflow\", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(\"? Connected to MongoDB\");

    const verdict = new Verdict({
      symbol: \"BTCUSDT\",
      verdict: \"LONG\",
      capital: 500,
      entry: 27200,
      stop: 26800,
      target: 28000,
      hold: \"2h breakout + volume surge\",
      date: new Date()
    });

    const saved = await verdict.save();
    console.log(\"?? Verdict saved:\", saved);

    await pushVerdictToNotion(saved);
    console.log(\"?? Verdict pushed to Notion\");
  } catch (err) {
    console.error(\"? Test failed:\", err.message);
  } finally {
    mongoose.connection.close();
  }
}

testPush();
