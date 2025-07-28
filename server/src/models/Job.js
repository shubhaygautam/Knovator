const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  externalId: { type: String, index: true },
  title: String,
  description: String,
  url: String,
  company: String,
  location: String,
  published: Date
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
