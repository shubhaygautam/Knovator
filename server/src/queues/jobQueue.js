const Bull = require('bull');
const jobWorker = require('../workers/jobWorker');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const queue = new Bull('job-import-queue', REDIS_URL);

queue.process(async (job) => {
  await jobWorker(job.data.url);
});

module.exports = queue;
