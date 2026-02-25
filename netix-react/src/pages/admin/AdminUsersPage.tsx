import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  roles: any[];
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/users`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Uživatelé</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.roles?.map(r => r.name).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}