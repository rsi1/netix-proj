import { useState } from "react";

export default function EDeskyPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    if (!query) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `/api/edesky/search?text=${encodeURIComponent(query)}`
      );

      if (!res.ok) {
        throw new Error(`Chyba API: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message ?? "Neznámá chyba");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Vyhledávání eDesek</h1>

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={query}
          placeholder="Zadej hledaný text (např. Brno)"
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 8, width: 300, marginRight: 8 }}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Hledám..." : "Hledat"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <pre
          style={{
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 6,
            maxHeight: 400,
            overflow: "auto",
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
