import { Link } from "react-router-dom";

function CardLink({ title, desc, to }: Readonly<{ title: string; desc: string; to: string }>) {
  return (
    <div className="card col-4">
      <h3 style={{ margin: "0 0 8px 0" }}>{title}</h3>
      <div className="muted" style={{ marginBottom: 12 }}>{desc}</div>
      <Link to={to}>Otevřít →</Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <h1>Dashboard</h1>
      <p className="muted">Rychlý rozcestník pro NETIX backend / data / integrace.</p>

      <div className="grid" style={{ marginTop: 16 }}>
        <CardLink title="e-Desky" desc="Vyhledávání a test integrace." to="/edesky" />
        <CardLink title="Backend test" desc="API /users přes Vite proxy." to="/backend" />
        <CardLink title="DB test" desc="Ověření připojení a dotazů." to="/dbtest" />

        <div className="card col-12">
          <h3 style={{ margin: "0 0 8px 0" }}>Stav</h3>
          <div className="muted">
            Tip: přidej sem později „health“ z actuatoru, nebo počty importovaných RÚIAN záznamů.
          </div>
        </div>
      </div>
    </>
  );
}
