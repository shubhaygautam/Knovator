const Bull = require('bull');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Shared queue instance used by the API to enqueue jobs and by the worker
// process to consume them.
const queue = new Bull('job-import-queue', REDIS_URL);

module.exports = queue;
