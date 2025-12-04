import { useState } from "react";
import SearchForm from "../features/edesky/SearchForm";
import SearchResults from "../features/edesky/SearchResults";
import { searchEDesky } from "../features/edesky/api";
import { Dashboard } from "../features/edesky/types";

export default function EDeskyPage() {
  const [results, setResults] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    const data = await searchEDesky(query);
    setResults(data.dashboards);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Vyhledávání eDesek</h1>

      <SearchForm onSearch={handleSearch} />

      {loading ? <p>⏳ Načítám…</p> : <SearchResults items={results} />}
    </div>
  );
}
