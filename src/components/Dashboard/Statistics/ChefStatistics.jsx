import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBowlFood,
  FaClipboardList,
  FaStarHalfStroke,
  FaChartLine
} from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import axiosSecure from "../../../api/AxiosSecure";

export default function ChefStatistics() {
  const {role, user, loading} = useAuth()
  const [stats, setStats] = useState({
    totalMeals: 0,
    totalOrders: 0,
    avgRating: 0,
    totalRevenue: 0,
  });

  const API_URL = import.meta.env.VITE_API_URL;

  
  

  useEffect(() => {
  if (loading) return;     
  if (!user) return;        
  if (role !== "chef") return;  

  const fetchStats = async () => {
    try {
      const res = await axiosSecure.get(`/dashboard/chef/stats/${user.uid}`);
      setStats(res.data);
    } catch (err) {
      console.error("Error loading chef stats:", err);
    }
  };

  fetchStats();
}, [API_URL, user, loading, role]);

  if (loading) {
  return <p className="text-center py-10">Loading...</p>;
}

if (!user) {
  return <p className="text-center py-10 text-red-500">User not found!</p>;
}

if (role !== "chef") {
  return <p className="text-center py-10 text-red-500">Unauthorized access!</p>;
}

  // Now user is guaranteed to exist
  const chefId = user.uid;
  console.log(chefId);
  

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 
      bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 
      text-transparent bg-clip-text">
        Chef Dashboard Statistics
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Meals */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="shadow-xl p-6 rounded-xl flex flex-col items-center"
        >
          <FaBowlFood className="text-4xl text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold">Total Meals</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalMeals}</p>
        </motion.div>

        {/* Total Orders */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="shadow-xl p-6 rounded-xl flex flex-col items-center"
        >
          <FaClipboardList className="text-4xl text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
        </motion.div>

        {/* Average Rating */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="shadow-xl p-6 rounded-xl flex flex-col items-center"
        >
          <FaStarHalfStroke className="text-4xl text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold">Average Rating</h3>
          <p className="text-3xl font-bold mt-2">{stats.avgRating.toFixed(1)}</p>
        </motion.div>

        {/* Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="shadow-xl p-6 rounded-xl flex flex-col items-center"
        >
          <FaChartLine className="text-4xl text-green-600 mb-4" />
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">৳ {stats.totalRevenue}</p>
        </motion.div>

      </div>
    </div>
  );
}
