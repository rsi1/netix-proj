import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div style={{ padding: 16 }}>
      <h1>NETIX Admin</h1>
      <p>Rychlé odkazy:</p>
      <ul>
        <li><Link to="/admin/dev">Dev přehled</Link></li>
        <li><Link to="/admin/dbtest">DB test</Link></li>
        <li><Link to="/admin/backend">Backend test</Link></li>
        <li><Link to="/admin/users">Uživatelé</Link></li>
        </ul>

    </div>
  );
}
