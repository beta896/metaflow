const tf = require("@tensorflow/tfjs-node");

// Dataset with revenue peaks across multiple years
const trainData = tf.tensor2d([
  [1, 5000, 4500], [2, 5200, 4900], [3, 5500, 5300], [4, 5800, 5700], 
  [5, 6200, 6100], [6, 7000, 6900], [7, 9500, 9200], [8, 10000, 9800], 
  [9, 8500, 8300], [10, 7800, 7500], [11, 6000, 5700], [12, 5500, 5200]
]); // Format: [Month, Year1 Revenue, Year2 Revenue]

const labels = tf.tensor2d([
  ["Moderate"], ["Moderate"], ["High"], ["High"], 
  ["Peak"], ["Peak"], ["Extreme Peak"], ["Extreme Peak"], 
  ["Declining"], ["Declining"], ["Low"], ["Low"]
]); // AI-categorized seasonal revenue peaks

// AI Model Setup
const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, inputShape: [3], activation: "relu" }));
model.add(tf.layers.dropout({ rate: 0.2 }));
model.add(tf.layers.dense({ units: 32, activation: "relu" }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({ optimizer: "adam", loss: "meanSquaredError" });

// Train the AI model
const trainAIModel = async () => {
  await model.fit(trainData, labels, { epochs: 150 });
};

// Predict seasonal peaks based on historical patterns
const predictSeasonalPeaks = async (month, revenueYear1, revenueYear2) => {
  const input = tf.tensor2d([[month, revenueYear1, revenueYear2]]);
  const output = model.predict(input);
  return output.dataSync()[0];
};

module.exports = { trainAIModel, predictSeasonalPeaks };