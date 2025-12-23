import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import axiosSecure from "../../../api/AxiosSecure";

const COLORS = ["#f59e0b", "#22c55e"]; // Pending, Delivered

const StatCard = ({ title, value }) => (
  <div className=" shadow rounded-lg p-4 text-center">
    <h4>{title}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default function PlatformStats() {
  useEffect(() => {
    document.title = "Admin Statistics - Chef Bazar";
  }, []);

  const [stats, setStats] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
  axiosSecure
    .get(`${API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    })
    .then((res) => {
      console.log("Stats:", res.data);
      setStats(res.data);
    })
    .catch((err) => console.error(err));
}, []);


  if (!stats) return <p>Loading...</p>;

  // Correct field names
  const paymentsData = [{ name: "Payments", amount: stats.totalPaymentAmount || 0 }];
  const ordersData = [
    { name: "Pending", value: stats.pendingOrders || 0 },
    { name: "Delivered", value: stats.deliveredOrders || 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Platform Statistics</h2>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Payments" value={`৳ ${stats.totalPaymentAmount}`} />
        <StatCard title="Orders Pending" value={stats.pendingOrders} />
        <StatCard title="Orders Delivered" value={stats.deliveredOrders} />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Payments</h3>
          <BarChart width={400} height={250} data={paymentsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Orders</h3>
          <PieChart width={400} height={250}>
            <Pie dataKey="value" data={ordersData} cx="50%" cy="50%" outerRadius={80} label>
              {ordersData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
