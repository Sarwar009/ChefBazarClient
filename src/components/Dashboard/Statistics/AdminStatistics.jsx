import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";

export default function PlatformStats() {
  const [stats, setStats] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/admin/stats`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
      .then((res) => setStats(res.data));
  }, []);

  const paymentsData = [{ name: "Payments", amount: stats.totalPayments || 0 }];
  const ordersData = [
    { name: "Pending", value: stats.ordersPending || 0 },
    { name: "Delivered", value: stats.ordersDelivered || 0 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Total Payments</h3>
          <BarChart width={300} height={200} data={paymentsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Orders</h3>
          <PieChart width={300} height={200}>
            <Pie dataKey="value" data={ordersData} cx={150} cy={100} outerRadius={80} label>
              <Cell fill="#8884d8" />
              <Cell fill="#82ca9d" />
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
}


