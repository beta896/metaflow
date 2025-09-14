const tf = require("@tensorflow/tfjs-node");

// Expanded dataset with dynamic audience segmentation insights
const trainData = tf.tensor2d([
  [5000, 10, 50, 1], [7000, 12, 60, 2], [8500, 15, 75, 3], 
  [10000, 18, 90, 4], [12000, 20, 100, 5], [15000, 25, 120, 6]
]); // Format: [Revenue, Ad Engagement, Affiliate Conversions, User Behavior Score]

const labels = tf.tensor2d([
  ["Casual Users"], ["Engaged Audience"], ["High-Value Users"], 
  ["Influencers"], ["Premium Customers"], ["Top Monetizers"]
]); // AI-generated user segment classifications

// AI Model Setup
const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, inputShape: [4], activation: "relu" }));
model.add(tf.layers.dropout({ rate: 0.2 }));
model.add(tf.layers.dense({ units: 32, activation: "relu" }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({ optimizer: "adam", loss: "meanSquaredError" });

// Train the AI model
const trainAIModel = async () => {
  await model.fit(trainData, labels, { epochs: 150 });
};

// AI-driven user segmentation based on real-time engagement
const getDynamicUserSegment = async (revenue, adEngagement, affiliateConversions, behaviorScore) => {
  const input = tf.tensor2d([[revenue, adEngagement, affiliateConversions, behaviorScore]]);
  const output = model.predict(input);
  return output.dataSync();
};

module.exports = { trainAIModel, getDynamicUserSegment };