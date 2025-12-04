import { Dashboard } from "./types";

export default function SearchResults({ items }: { items: Dashboard[] }) {
  if (items.length === 0) return <p>Žádné výsledky.</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Název</th>
          <th>Kategorie</th>
          <th>NUTS3</th>
          <th>NUTS4</th>
          <th>RUIAN</th>
        </tr>
      </thead>
      <tbody>
        {items.map((d, i) => (
          <tr key={i}>
            <td>{d.name}</td>
            <td>{d.category}</td>
            <td>{d.nuts3_name}</td>
            <td>{d.nuts4_name}</td>
            <td>{d.ruian_kod}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
