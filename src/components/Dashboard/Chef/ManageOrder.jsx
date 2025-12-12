
import React from "react";
import { motion } from "framer-motion";

export default function ManageOrder() {
  const requests = [
    { id: "ORD-101", meal: "Grilled Salmon", qty: 2, status: "pending", user: "user1@example.com" },
    { id: "ORD-102", meal: "Beef Steak", qty: 1, status: "accepted", user: "user2@example.com" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Order Requests</h2>

      <div className="space-y-3">
        {requests.map(r => (
          <div key={r.id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold">{r.meal} x{r.qty}</div>
              <div className="text-sm text-gray-500">{r.user} • {r.id}</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg">Cancel</button>
              <button className="px-3 py-1 bg-emerald-500 text-white rounded-lg">Accept</button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">Mark Delivered</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
