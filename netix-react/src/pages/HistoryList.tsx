import { useState } from "react";

export default function EDeskyPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/edesky/search?text=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Chyba při načítání" });
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Vyhledávání eDesek</h1>

      <input
        type="text"
        value={query}
        placeholder="Zadejte hledaný text..."
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, width: 300, marginRight: 10 }}
      />

      <button onClick={handleSearch} style={{ padding: "8px 20px" }}>
        Hledat
      </button>

      {loading && <p>Načítám…</p>}

      {result && (
        <pre style={{ marginTop: 20 }}>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
