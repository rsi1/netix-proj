import { useState } from "react";

export default function DbTestPage() {
  const [result, setResult] = useState("");

  const testDb = async () => {
    try {
      const res = await fetch("api/admin/dev/dbtest", {
        credentials: "include",
      });

      const text = await res.text();

      if (!res.ok) {
        setResult(`Chyba ${res.status}: ${text}`);
        return;
      }

      setResult(text);
    } catch (e) {
      setResult("Chyba spojení s backendem.");
      console.error(e);
    }
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