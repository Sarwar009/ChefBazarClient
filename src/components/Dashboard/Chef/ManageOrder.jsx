import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import axiosSecure from "../../../api/AxiosSecure";
import { motion } from "framer-motion";

export default function ChefOrderRequests() {
  const { roleData } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.title = "Manage Orders - Chef Bazar";
  }, []);

  useEffect(() => {
    if (!roleData?.chefId) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/orders/chef/${roleData.chefId}`, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [roleData]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axiosSecure.patch(
        `/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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

  const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  if (loading) return <LoadingSpinner />;

  if (!orders.length)
    return <p className="text-center py-16 text-lg">No orders yet</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">
        Order Requests
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          const isCancelled = orderStatus === "cancelled";
          const isAccepted = orderStatus === "accepted";
          const isDelivered = orderStatus === "delivered";

          return (
            <motion.div
              key={_id}
              className="rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold line-clamp-1">{foodName}</h3>
                <p>Price: ৳ {price}</p>
                <p>Quantity: {quantity}</p>
                <p>
                  Status: <span className="font-semibold">{orderStatus}</span>
                </p>
                <p>User: {userEmail}</p>
                <p>Address: {userAddress}</p>
                <p>Payment: {paymentStatus}</p>
                <p>Ordered at: {formatDateTime(orderTime)}</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => updateStatus(_id, "cancelled")}
                  disabled={isCancelled || isAccepted || isDelivered}
                  className={`flex-1 px-3 py-2 rounded-lg text-white font-medium transition ${
                    isCancelled || isAccepted || isDelivered
                      ? "bg-gray-500 cursor-not-allowed "
                      : "bg-red-500 hover:bg-red-600 cursor-pointer"
                  }`}
                >
                  Cancel
                </button>

                <button
                  onClick={() => updateStatus(_id, "accepted")}
                  disabled={isCancelled || isAccepted || isDelivered}
                  className={`flex-1 px-3 py-2 rounded-lg text-white font-medium transition ${
                    isCancelled || isAccepted || isDelivered
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 cursor-pointer"
                  }`}
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(_id, "delivered")}
                  disabled={!isAccepted || isCancelled || isDelivered}
                  className={`flex-1 px-3 py-2 rounded-lg text-white font-medium transition ${
                    !isAccepted || isCancelled || isDelivered
                      ? "bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  Deliver
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
