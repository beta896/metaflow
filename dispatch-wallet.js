const { MongoClient } = require("mongodb");
const fs = require("fs");

const payload = JSON.parse(fs.readFileSync("wallet-ledger.json", "utf8"));
const client = new MongoClient("mongodb://localhost:27017");

async function run() {
  await client.connect();
  const db = client.db("metaflow");
  const collection = db.collection("wallets");
  await collection.insertOne(payload);
  console.log("✅ Wallet ledger dispatched to MongoDB");
  await client.close();
}

run();
