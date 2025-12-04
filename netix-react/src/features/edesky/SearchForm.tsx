import { useState } from "react";

export default function SearchForm({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() !== "") {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Zadej text pro vyhledání"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ padding: 8, width: 250 }}
      />
      <button type="submit" style={{ padding: "8px 15px", marginLeft: 8 }}>
        Hledat
      </button>
    </form>
  );
}
