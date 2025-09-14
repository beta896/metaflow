const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path if needed

const Trigger = sequelize.define('Trigger', {
  triggerType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capitalEfficiencyScore: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'triggers',
  timestamps: false
});

module.exports = Trigger;
