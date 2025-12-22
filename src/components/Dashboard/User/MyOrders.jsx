import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import OrderCard from "../OrderCard";
import useAuth from "../../../hooks/useAuth";
import axiosSecure from "../../../api/AxiosSecure";

export default function MyOrders() {
  const {user} = useAuth();
  const [orders, setOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  

  console.log(orders, "orders");
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get(`${API_URL}/orders/user/${user.email}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      }
    };
    fetchOrders();
  }, []);

  console.log(orders);
  

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Orders</h2>
      <div>
        {orders.length === 0 ? (
          <p className="text-center">No orders yet.</p>
        ) : (
          <div  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              orders.map(order => (
            <OrderCard key={order._id} order={order} setOrders={setOrders} />
          ))
            }
          </div>
          
        )}
      </div>
    </div>
  );
}

