import { useEffect, useState } from 'react';

export default function Home() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/import-logs')
      .then(res => res.json())
      .then(setLogs);
  }, []);

  return (
    <div>
      <h1>Import History</h1>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Feed URL</th>
            <th>Total</th>
            <th>New</th>
            <th>Updated</th>
            <th>Failed</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.feedUrl}</td>
              <td>{log.totalImported}</td>
              <td>{log.newJobs}</td>
              <td>{log.updatedJobs}</td>
              <td>{log.failedJobs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
