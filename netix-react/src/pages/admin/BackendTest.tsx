const API_BASE = import.meta.env.VITE_API_BASE || "";

import { useEffect, useState } from "react";

export default function BackendTest() {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/users`)  // díky proxy se automaticky přesměruje na backend
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Backend Test</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
