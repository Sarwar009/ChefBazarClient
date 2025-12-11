// src/pages/dashboard/MyOrders.jsx
import React from "react";
import { motion } from "framer-motion";

export default function MyOrders() {
  // placeholder list - replace with real data
  const orders = [
    { id: "ORD-001", meal: "Beef Bhuna", price: 220, status: "pending" },
    { id: "ORD-002", meal: "Pasta Alfredo", price: 130, status: "delivered" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      <div className="space-y-4">
        {orders.map(o => (
          <div key={o.id} className="flex justify-between items-center border rounded-lg p-4">
            <div>
              <div className="font-semibold">{o.meal}</div>
              <div className="text-sm text-gray-500">{o.id} • ৳ {o.price}</div>
            </div>
            <div className="text-right">
              <div className={`inline-block px-3 py-1 rounded-full text-sm ${o.status === "delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {o.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
