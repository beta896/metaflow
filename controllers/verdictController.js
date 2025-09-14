const Verdict = require('../models/Verdict');

exports.createVerdict = async (req, res) => {
  try {
    const verdict = await Verdict.create(req.body);
    res.status(201).json({ message: '?? Verdict logged', verdict });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
