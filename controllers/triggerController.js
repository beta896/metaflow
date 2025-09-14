const Trigger = require('../models/Trigger');

exports.createTrigger = async (req, res) => {
  try {
    const trigger = await Trigger.create(req.body);
    res.status(201).json({ message: '?? Trigger logged', trigger });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
