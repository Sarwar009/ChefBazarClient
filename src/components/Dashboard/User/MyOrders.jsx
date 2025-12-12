import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`${API_URL}/orders/user/${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch(() => console.log("Failed to load orders"));
  }, [user]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel this order?",
      text: "You cannot undo this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `${API_URL}/orders/cancel/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then(() => {
            setOrders((prev) =>
              prev.map((o) =>
                o._id === id ? { ...o, orderStatus: "canceled" } : o
              )
            );
            Swal.fire("Canceled!", "Your order has been canceled.", "success");
          });
      }
    });
  };

  if (!orders.length)
    return (
      <p className="text-center text-gray-500 mt-20 text-xl">
        No orders yet...
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        My Orders
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-lg border border-gray-200 rounded-xl p-5"
          >
            {/* Meal Image */}
            <img
              src={order.mealImage}
              alt={order.mealName}
              className="w-full h-44 object-cover rounded-lg shadow"
            />

            <h3 className="text-xl font-semibold mt-3">{order.mealName}</h3>

            <p className="text-gray-600 mt-1">
              <span className="font-semibold text-gray-800">Quantity:</span>{" "}
              {order.quantity}
            </p>

            <p className="text-green-600 mt-1 font-semibold">
              Total Price: ${order.price * order.quantity}
            </p>

            <p className="text-gray-600 mt-1">
              Order Date:{" "}
              {new Date(order.orderTime).toLocaleDateString("en-US")}
            </p>

            {/* Status Badge */}
            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium
              ${
                order.orderStatus === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.orderStatus === "approved"
                  ? "bg-blue-100 text-blue-700"
                  : order.orderStatus === "delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.orderStatus.toUpperCase()}
            </span>

            {/* Cancel Button */}
            {order.orderStatus === "pending" && (
              <button
                onClick={() => handleCancel(order._id)}
                className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg hover:bg-red-600 transition"
              >
                Cancel Order
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
