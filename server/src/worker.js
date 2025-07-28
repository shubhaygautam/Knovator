require('dotenv').config();
const mongoose = require('mongoose');
const queue = require('./queues/jobQueue');
const jobWorker = require('./workers/jobWorker');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/job-importer';
const CONCURRENCY = parseInt(process.env.JOB_CONCURRENCY || '2', 10);

mongoose.connect(MONGO_URI, {})
  .then(() => console.log('MongoDB connected for worker'))
  .catch(err => console.error('MongoDB connection error', err));

queue.process(CONCURRENCY, async (job) => {
  await jobWorker(job.data.url);
});

console.log(`Worker started with concurrency ${CONCURRENCY}`);

