import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

export default function ManageUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/admin/users`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
      .then((res) => setUsers(res.data));
  }, []);

  const makeFraud = (id) => {
    axios.patch(`${API_URL}/admin/users/${id}`, { status: "fraud" }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
      .then(() => {
        Swal.fire("Success", "User marked as fraud", "success");
        setUsers((prev) => prev.map((u) => u._id === id ? { ...u, status: "fraud" } : u));
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.status}</td>
              <td className="p-2">
                {u.role !== "admin" && u.status !== "fraud" && (
                  <button onClick={() => makeFraud(u._id)} className="bg-red-500 text-white px-2 py-1 rounded">Make Fraud</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
