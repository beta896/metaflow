import tf from '@tensorflow/tfjs-node';

// Simulated dataset for AI-driven affiliate performance analysis
const trainData = tf.tensor2d([
  [5000, 10, 50, 1],
  [7000, 12, 60, 2],
  [8500, 15, 75, 3],
  [10000, 18, 90, 4],
  [12000, 20, 100, 5],
  [15000, 25, 120, 6]
]); // Format: [Revenue, Engagement, Conversion, Score]

// Convert string labels to numeric categories (e.g., 0–5)
const labels = tf.tensor2d([
  [0], // High-Value Affiliate
  [1], // Moderate Performer
  [2], // Top-Tier Partner
  [3], // Emerging Affiliate
  [4], // Premium Affiliate
  [5]  // Strategic Partner
]);

// AI Model Setup
const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, inputShape: [4], activation: "relu" }));
model.add(tf.layers.dropout({ rate: 0.2 }));
model.add(tf.layers.dense({ units: 32, activation: "relu" }));
model.add(tf.layers.dense({ units: 1, activation: "linear" }));

model.compile({ optimizer: "adam", loss: "meanSquaredError" });

// Train the AI model
const trainAIModel = async () => {
  console.log("🧠 Training affiliate matcher...");
  await model.fit(trainData, labels, { epochs: 150 });
  console.log("✅ Training complete.");
};

// Generate affiliate match recommendation
const getSmartAffiliateMatch = async (revenue, clickEngagement, conversionRate, partnerScore) => {
  const input = tf.tensor2d([[revenue, clickEngagement, conversionRate, partnerScore]]);
  const output = model.predict(input);
  const prediction = output.dataSync()[0];

  const categories = [
    "High-Value Affiliate",
    "Moderate Performer",
    "Top-Tier Partner",
    "Emerging Affiliate",
    "Premium Affiliate",
    "Strategic Partner"
  ];

  const index = Math.round(prediction);
  const label = categories[index] || "Unclassified";

  console.log(`🔍 Predicted Match: ${label} (Score: ${prediction.toFixed(2)})`);
  return label;
};

// Export for agent use
export const matchAffiliateProducts = async () => {
  await trainAIModel();
  await getSmartAffiliateMatch(9500, 16, 80, 3); // Example input
};