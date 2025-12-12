import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

export default function ChefOrderRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch order requests for chef
  useEffect(() => {
    if (!user?.uid) return;

    fetch(`${import.meta.env.VITE_API_URL}/chef/orders/${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.uid]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      {/* Page Header */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-gray-800"
      >
        Order Requests
      </motion.h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No order requests yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req, index) => (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-2xl shadow-lg bg-white border hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {req.mealName}
              </h3>

              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Customer:</span> {req.customerName}
              </p>

              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Quantity:</span> {req.quantity}
              </p>

              <p className="text-gray-600 text-sm mb-3">
                <span className="font-semibold">Price:</span> ${req.totalPrice}
              </p>

              <div className="flex items-center justify-between mt-4">
                <button
                  className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition"
                  onClick={() => handleAccept(req._id)}
                >
                  Accept
                </button>

                <button
                  className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                  onClick={() => handleReject(req._id)}
                >
                  Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Dummy handlers (replace with your API)
function handleAccept(id) {
  console.log("Accepted:", id);
}

function handleReject(id) {
  console.log("Rejected:", id);
}
