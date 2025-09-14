import Verdict from "./models/Verdict.js";
import sequelize from "./config/db.js";

(async () => {
  await sequelize.sync();

  await Verdict.create({
    title: "alpha",
    description: "Initial verdict",
    timestamp: new Date(),
    versions: [
      { description: "Initial verdict", timestamp: new Date().toISOString() }
    ]
  });

  console.log("? Seeded verdict with version history");
})();
