// src/pages/dashboard/PlatformStatistics.jsx
import React from "react";
import { motion } from "framer-motion";

export default function PlatformStatistics() {
  // placeholder numbers
  const stats = {
    totalPayments: 125000,
    totalUsers: 540,
    pendingOrders: 12,
    deliveredOrders: 420,
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500">Total Payments</div>
          <div className="text-2xl font-bold">৳ {stats.totalPayments}</div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500">Orders Pending</div>
          <div className="text-2xl font-bold">{stats.pendingOrders}</div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500">Orders Delivered</div>
          <div className="text-2xl font-bold">{stats.deliveredOrders}</div>
        </div>
      </div>
    </motion.div>
  );
}
