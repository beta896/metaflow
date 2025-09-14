const tf = require("@tensorflow/tfjs-node");

// Example dataset: revenue trends per month + engagement metrics
const trainData = tf.tensor2d([
  [1, 500, 30], [2, 520, 35], [3, 580, 40], 
  [4, 600, 45], [5, 650, 50], [6, 700, 55], 
  [7, 720, 60], [8, 750, 65], [9, 800, 70]
]); // Format: [Month, Revenue, Ad Clicks]

const labels = tf.tensor2d([520, 580, 600, 650, 700, 720, 750, 780, 810]); 

// Build AI revenue prediction model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, inputShape: [3], activation: "relu" }));
model.add(tf.layers.dropout({ rate: 0.2 })); // Prevents overfitting
model.add(tf.layers.dense({ units: 32, activation: "relu" }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({ optimizer: "adam", loss: "meanAbsoluteError" });

// Train the model with past revenue data
const trainAIModel = async () => {
  await model.fit(trainData, labels, { epochs: 100 });
};

// Predict future revenue based on engagement trends
const predictRevenue = async (month, earnings, clicks) => {
  const input = tf.tensor2d([[month, earnings, clicks]]);
  const output = model.predict(input);
  return output.dataSync()[0];
};

// Fine-tune AI model periodically with new data
const updateModelWithNewData = async (newData, newLabels) => {
  const updatedTrainData = trainData.concat(tf.tensor2d(newData));
  const updatedLabels = labels.concat(tf.tensor2d(newLabels));
  await model.fit(updatedTrainData, updatedLabels, { epochs: 100 });
};

module.exports = { trainAIModel, predictRevenue, updateModelWithNewData };