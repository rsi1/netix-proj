import { useEffect, useState } from "react";

interface BackendResponse {
  message: string;
  status: string;
  version: string;
}

export default function HelloFromBackend() {
  const [data, setData] = useState<BackendResponse | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h3>Backend Response:</h3>
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
    </div>
  );
}
