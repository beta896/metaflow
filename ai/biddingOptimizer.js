const tf = require("@tensorflow/tfjs-node");

// Dataset analyzing bidding trends and volatility
const trainData = tf.tensor2d([
  [0.5, 1000, 50, 1], [1.0, 1500, 75, 2], [1.5, 2000, 100, 3], 
  [2.0, 2500, 130, 4], [2.5, 3000, 160, 5], [3.0, 3500, 200, 6]
]); // Format: [Bid Amount, Impressions, Click Rate, Market Volatility Score]

const labels = tf.tensor2d([
  ["Stable"], ["Moderate Fluctuation"], ["High Volatility"], 
  ["Critical Market Shift"], ["Urgent Bid Adjustment"], ["Emergency Increase"]
]); // AI-generated market fluctuation alerts

const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, inputShape: [4], activation: "relu" }));
model.add(tf.layers.dropout({ rate: 0.2 }));
model.add(tf.layers.dense({ units: 32, activation: "relu" }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({ optimizer: "adam", loss: "meanSquaredError" });

const trainAIModel = async () => {
  await model.fit(trainData, labels, { epochs: 150 });
};

// Generate bidding alerts based on real-time data  
const detectMarketShift = async (bidAmount, impressions, clickRate, marketVolatility) => {
  const input = tf.tensor2d([[bidAmount, impressions, clickRate, marketVolatility]]);
  const output = model.predict(input);
  return output.dataSync();
};

module.exports = { trainAIModel, detectMarketShift };