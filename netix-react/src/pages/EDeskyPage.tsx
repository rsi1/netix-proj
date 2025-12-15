
import { useState } from "react";

export default function EDeskyPage() {
  const [text, setText] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(
        `/api/edesky/search?text=${encodeURIComponent(text)}`
      );

      if (!res.ok) {
        throw new Error(`Chyba API: ${res.status}`);
      }

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message ?? "Neznámá chyba");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h1>Vyhledávání e-desek</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Zadej hledaný výraz (např. Brno)"
          style={{ padding: 8, width: 300, marginRight: 8 }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Hledám…" : "Vyhledat"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <pre
          style={{
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 6,
            maxHeight: 400,
            overflow: "auto",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
