// src/pages/dashboard/ManageRequest.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ManageRequest() {
  const requests = [
    { id: 1, user: "jamal@example.com", type: "chef", status: "pending" },
    { id: 2, user: "mina@example.com", type: "admin", status: "pending" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>

      <div className="space-y-3">
        {requests.map(r => (
          <div key={r.id} className="flex justify-between items-center border rounded-lg p-3">
            <div>
              <div className="font-semibold">{r.user}</div>
              <div className="text-sm text-gray-500">{r.type} request</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">Approve</button>
              <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
