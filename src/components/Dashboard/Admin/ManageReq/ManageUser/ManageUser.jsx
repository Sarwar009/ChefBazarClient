import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      .then((res) => setUsers(res.data));
  }, []);

  const makeFraud = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be marked as fraud!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Fraud",
    });

    if (!confirm.isConfirmed) return;

    await axios.patch(
      `${API_URL}/users/${id}/fraud`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
    );

    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, status: "fraud" } : u))
    );

    Swal.fire("Success", "User marked as fraud", "success");
  };

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      user?.email?.toLowerCase().includes(search.toLowerCase());

    const matchRole =
      roleFilter === "all" || user.role === roleFilter;

    return matchSearch && matchRole;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6  rounded-xl shadow"
    >
      <h2 className="text-3xl font-semibold mb-6">
        Manage Users
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="chef">Chef</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-3 font-medium">
                  {user.displayName}
                </td>

                <td className="px-4 py-3">
                  {user.email}
                </td>

                <td className="px-4 py-3 text-center">
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600 capitalize">
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "fraud"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  {user.role !== "admin" &&
                  user.status !== "fraud" ? (
                    <button
                      onClick={() => makeFraud(user._id)}
                      className="px-4 py-1.5 text-sm bg-red-500 hover:bg-red-600 rounded-lg"
                    >
                      Make Fraud
                    </button>
                  ) : (
                    <span className="text-sm">
                      N/A
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
