-- Active: 1764612427089@@192.168.3.31@3306@demo
import { useEffect, useState } from "react";

export default function HistoryList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/search-history")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Historie hledání</h3>
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>
            {item.queryText} — ({item.resultsCount} výsledků)
          </li>
        ))}
      </ul>
    </div>
  );
}
