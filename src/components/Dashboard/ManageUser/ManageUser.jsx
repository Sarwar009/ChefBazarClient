// src/pages/dashboard/ManageUser.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ManageUser() {
  const users = [
    { id: "u1", name: "Rahim", email: "rahim@example.com", role: "chef" },
    { id: "u2", name: "Sadia", email: "sadia@example.com", role: "user" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="grid gap-3">
        {users.map(u => (
          <div key={u.id} className="flex justify-between items-center border rounded-lg p-3">
            <div>
              <div className="font-semibold">{u.name}</div>
              <div className="text-sm text-gray-500">{u.email}</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg">Make Chef</button>
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg">Make Admin</button>
              <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg">Mark Fraud</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
