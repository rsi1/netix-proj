import { useState } from "react";

export default function DbTestPage() {
  const [result, setResult] = useState("");

  const testDb = async () => {
    const res = await fetch("/api/db/test");
    const text = await res.text();
    setResult(text);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Test DB připojení (NAS)</h1>

      <button onClick={testDb} style={{ padding: "8px 20px" }}>
        Otestovat připojení
      </button>

      {result && (
        <p style={{ marginTop: 20 }}>
          Výsledek: <b>{result}</b>
        </p>
      )}
    </div>
  );
}
