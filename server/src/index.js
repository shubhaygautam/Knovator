require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const jobQueue = require('./queues/jobQueue');
const importLogRouter = require('./routes/importLogs');

const app = express();
app.use(express.json());

app.use('/api/import-logs', importLogRouter);

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/job-importer';
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '0 * * * *';

mongoose.connect(MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err));

// Schedule job fetching using CRON_SCHEDULE env variable
cron.schedule(CRON_SCHEDULE, async () => {
  const feeds = require('./services/feeds');
  for (const url of feeds) {
    await jobQueue.add({ url });
  }
  console.log('Scheduled jobs enqueued');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
