import { Link } from "react-router-dom";

export default function DevToolsPage() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Dev Tools</h1>
      <ul>
        <li><Link to="/admin/dbtest">DB test</Link></li>
        <li><Link to="/admin/backend">Backend test</Link></li>
      </ul>
    </div>
  );
}
