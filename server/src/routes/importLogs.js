const express = require('express');
const ImportLog = require('../models/ImportLog');
const router = express.Router();

router.get('/', async (req, res) => {
  const logs = await ImportLog.find().sort({ timestamp: -1 }).limit(50);
  res.json(logs);
});

module.exports = router;
