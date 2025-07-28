# Knovator Job Importer

## Setup

```
cd server
npm install
```

Create a `.env` file in `server` with:

```
MONGO_URI=mongodb://localhost/job-importer
REDIS_URL=redis://localhost:6379
JOB_CONCURRENCY=2
CRON_SCHEDULE=0 * * * *
```

```
cd ../client
npm install
```

## Running

Start MongoDB and Redis locally, then run the server:

```
cd server
npm run dev
```

In a separate terminal start the worker process:

```
cd server
npm run worker
```

In another terminal run the Next.js client:

```
cd client
npm run dev
```

Open `http://localhost:3000` to view the import history.

