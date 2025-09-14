const Milestone = require('../models/Milestone');

exports.createMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.create(req.body);
    res.status(201).json({ message: '?? Milestone logged', milestone });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
