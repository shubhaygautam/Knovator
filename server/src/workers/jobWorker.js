const axios = require('axios');
const xml2js = require('xml2js');
const Job = require('../models/Job');
const ImportLog = require('../models/ImportLog');

module.exports = async function processFeed(url) {
  const log = new ImportLog({ feedUrl: url, totalFetched: 0, totalImported: 0, newJobs: 0, updatedJobs: 0, failedJobs: 0, failures: [] });

  try {
    const { data } = await axios.get(url);
    const json = await xml2js.parseStringPromise(data, { explicitArray: false });
    const items = json.rss ? json.rss.channel.item : json.items.item || [];
    log.totalFetched = items.length;

    for (const item of items) {
      try {
        const existing = await Job.findOne({ externalId: item.guid });
        if (existing) {
          existing.title = item.title;
          existing.description = item.description;
          existing.url = item.link;
          existing.company = item['job:company'] || existing.company;
          existing.location = item['job:location'] || existing.location;
          existing.published = new Date(item.pubDate);
          await existing.save();
          log.updatedJobs += 1;
        } else {
          await Job.create({
            externalId: item.guid,
            title: item.title,
            description: item.description,
            url: item.link,
            company: item['job:company'],
            location: item['job:location'],
            published: new Date(item.pubDate)
          });
          log.newJobs += 1;
        }
        log.totalImported += 1;
      } catch (err) {
        log.failedJobs += 1;
        log.failures.push(err.message);
      }
    }
  } catch (err) {
    log.failedJobs = log.totalFetched;
    log.failures.push(err.message);
  }

  await log.save();
  return log;
};
