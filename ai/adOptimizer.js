const tf = require("@tensorflow/tfjs-node");

// Simulated dataset for AI-driven ad targeting optimization
const trainData = tf.tensor2d([
  [500, 50, 5], [700, 70, 10], [1000, 100, 15], 
  [1200, 130, 20], [1500, 170, 25], [2000, 220, 30]
]); // Format: [Ad Spend, Click Rate, Conversions]

const labels = tf.tensor2d([
  ["Increase budget"], ["Refine audience targeting"], 
  ["Optimize bidding strategy"], ["Boost retargeting campaigns"], 
  ["Adjust frequency caps"], ["Reduce low-performing ads"]
]); // AI-generated ad placement strategies

// AI Model Setup
const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, inputShape: [3], activation: "relu" }));
model.add(tf.layers.dropout({ rate: 0.2 })); // Prevents overfitting
model.add(tf.layers.dense({ units: 32, activation: "relu" }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({ optimizer: "adam", loss: "meanSquaredError" });

// Train the AI model
const trainAIModel = async () => {
  await model.fit(trainData, labels, { epochs: 150 });
};

// Generate ad optimization recommendations based on live data
const optimizeAdPlacement = async (adSpend, clickRate, conversions) => {
  const input = tf.tensor2d([[adSpend, clickRate, conversions]]);
  const output = model.predict(input);
  return output.dataSync();
};

module.exports = { trainAIModel, optimizeAdPlacement };