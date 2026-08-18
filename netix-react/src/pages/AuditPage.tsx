import { useEffect, useState } from "react";

type AuditLog = {
  id: number;
  changedAt: string;
  username: string;
  action: string;
  tableName: string;
  recordId: number;
  detail: string;
};

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/audit", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setLogs(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Audit log</h1>

      {error && <p>Chyba: {error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Čas</th>
            <th>Uživatel</th>
            <th>Akce</th>
            <th>Tabulka</th>
            <th>Záznam</th>
            <th>Detail</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{new Date(log.changedAt).toLocaleString("cs-CZ")}</td>
              <td>{log.username}</td>
              <td>{log.action}</td>
              <td>{log.tableName}</td>
              <td>{log.recordId}</td>
              <td>{log.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}