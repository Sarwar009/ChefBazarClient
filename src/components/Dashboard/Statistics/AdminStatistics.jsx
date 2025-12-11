// src/pages/dashboard/PlatformStatistics.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";

export default function PlatformStatistics() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [pendingOrder, setpPendingOrder] = useState(0);
  const [delivered, setDelivared] = useState(0)

  const {role} = useAuth()

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_URL}/orders`);
            const orders = res.data;

            if (orders && orders.length > 0) {
                const totalPrice = orders.reduce((sum, order) => sum + order.price, 0);
                setTotalAmount(totalPrice);
                const pendingOrders = orders.filter(
                    (order) => order.orderStatus === 'pending' 
                );
                const totalPendingCount = pendingOrders.length; 
                setpPendingOrder(totalPendingCount);

                const delivaredOrders = orders.filter(
                    (order) => order.orderStatus === 'delivered' 
                );
                const totalDelivered = delivaredOrders.length; 
                setDelivared(totalDelivered);
                
            } else {
                setTotalAmount(0);
                setpPendingOrder(0);
                setDelivared(0)
            }
        } catch (error) {
            console.error("Error", error);
            setTotalAmount(0);
            setpPendingOrder(0);
                setDelivared(0)
        }
    };
    fetchData();
}, [API_URL]);

  // ...
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        if(role === 'admin') {
          const res = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const users = res.data;
        const userCount = users.length;
        
        setTotalUser(userCount);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('401 Error'
          );
        } else {
          console.error(error);
        }
        setTotalUser(0);
      }
    };
    fetchUser();
  }, [API_URL, role]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500">Total Payments</div>
          <div className="text-2xl font-bold">৳ {totalAmount}</div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-2xl font-bold">{totalUser}</div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500">Orders Pending</div>
          <div className="text-2xl font-bold">{pendingOrder}</div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500">Orders Delivered</div>
          <div className="text-2xl font-bold">{delivered}</div>
        </div>
      </div>
    </motion.div>
  );
}
