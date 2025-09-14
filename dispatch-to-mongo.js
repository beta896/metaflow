const { MongoClient } = require("mongodb");
const fs = require("fs");

const signal = JSON.parse(fs.readFileSync("sealed-cockpit.json", "utf8"));
const client = new MongoClient("mongodb://localhost:27017");

async function run() {
  await client.connect();
  const db = client.db("metaflow");
  const signals = db.collection("signals");
  await signals.insertOne(signal);
  console.log("✅ SEALED signal dispatched to MongoDB");
  await client.close();
}

run();
