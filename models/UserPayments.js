const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserPayments = sequelize.define("UserPayments", {
  payment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  method: { type: DataTypes.STRING, allowNull: false }, // Stripe, PayPal, etc.
  status: { type: DataTypes.STRING, defaultValue: "Completed" },
});

module.exports = UserPayments;
