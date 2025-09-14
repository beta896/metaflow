const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path if needed

const Milestone = sequelize.define('Milestone', {
  milestone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phase: {
    type: DataTypes.STRING,
    allowNull: false
  },
  executedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'milestones',
  timestamps: false
});

module.exports = Milestone;
