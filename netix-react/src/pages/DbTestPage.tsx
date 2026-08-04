import { useState } from "react";

import { apiFetch } from "../api/apiFetch";

export default function DbTestPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testDb = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await apiFetch(
        "/api/db/test",
      );

      const text = await response.text();

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${text}`,
        );
      }

      setResult(text);
    } catch (error) {
      setResult(
        error instanceof Error
          ? error.message
          : "Test databáze selhal.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Test DB připojení (NAS)</h1>

      <button
        type="button"
        onClick={testDb}
        disabled={loading}
        style={{ padding: "8px 20px" }}
      >
        {loading
          ? "Testuji…"
          : "Otestovat připojení"}
      </button>

      {result && (
        <p style={{ marginTop: 20 }}>
          Výsledek: <b>{result}</b>
        </p>
      )}
    </div>
  );
}