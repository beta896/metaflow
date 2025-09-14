import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AIContentRevenue = sequelize.define("AIContentRevenue", {
  content_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content_type: {
    type: DataTypes.STRING,
    allowNull: false, // Examples: Posts, Ads, Articles
  },
  earnings: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "AIContentRevenue",
  timestamps: false, // Optional: enable if you want createdAt/updatedAt
});

export default AIContentRevenue;