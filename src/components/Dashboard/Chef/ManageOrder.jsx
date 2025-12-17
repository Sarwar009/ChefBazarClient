import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";

export default function ChefOrderRequests() {
  const { roleData } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!roleData?.chefId) return;
    console.log(roleData.chefId, 'roledata');
    

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/orders/chef/${roleData.chefId}`
        );
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [roleData]);

const updateStatus = async (orderId, newStatus) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.patch(
      `${API_URL}/orders/${orderId}/status`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, orderStatus: newStatus } : o
        )
      );
      toast.success(`Order ${newStatus}`);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to update order");
  }
};

const formatDateTime = (date) => {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

  console.log(orders, 'orders');
  
  if (!orders.length) return <p className="text-center py-10">No orders yet</p>;
  
  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Order Requests</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          const {
            _id,
            foodName,
            price,
            quantity,
            orderStatus,
            userEmail,
            orderTime,
            userAddress,
            paymentStatus,
            
          } = order;

          // Button logic
          const isCancelled = orderStatus === "cancelled";
          const isAccepted = orderStatus === "accepted";
          const isDelivered = orderStatus === "delivered";

          return (
            <div key={_id} className="p-4 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold">{foodName}</h3>
              <p>Price: ${price}</p>
              <p>Quantity: {quantity}</p>
              <p>
                Status: <span className="font-semibold">{orderStatus}</span>
              </p>
              <p>User: {userEmail}</p>
              <p>Address: {userAddress}</p>
              <p>Payment: {paymentStatus}</p>
              <p>Ordered at: {formatDateTime(orderTime)}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => updateStatus(_id, "cancelled")}
                  disabled={isCancelled || isAccepted || isDelivered}
                  className={`px-3 py-1 rounded ${
                    isCancelled || isAccepted || isDelivered
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  Cancel
                </button>

                <button
                  onClick={() => updateStatus(_id, "accepted")}
                  disabled={isCancelled || isAccepted || isDelivered}
                  className={`px-3 py-1 rounded ${
                    isCancelled || isAccepted || isDelivered
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(_id, "delivered")}
                  disabled={!isAccepted || isCancelled || isDelivered}
                  className={`px-3 py-1 rounded ${
                    !isAccepted || isCancelled || isDelivered
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Deliver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
