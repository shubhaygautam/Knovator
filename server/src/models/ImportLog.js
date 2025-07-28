const mongoose = require('mongoose');

const importLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  feedUrl: String,
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: Number,
  failures: [String]
});

module.exports = mongoose.model('ImportLog', importLogSchema);
