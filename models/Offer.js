module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Offer', {
    issuerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaignName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    revenue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    contractStatus: {
      type: DataTypes.ENUM('Pending', 'Active', 'Completed'),
      defaultValue: 'Pending'
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'offers',
    timestamps: false,
    indexes: [
      {
        fields: ['issuerName', 'timestamp']
      }
    ]
  });
};
