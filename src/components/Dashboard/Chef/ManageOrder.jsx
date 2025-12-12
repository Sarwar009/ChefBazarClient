import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

export default function ChefOrderRequests() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/orders/chef/${user.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
      .then((res) => setOrders(res.data));
  }, [user]);

  const updateStatus = (orderId, status) => {
    axios.patch(`${API_URL}/orders/${orderId}`, { status }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
      .then(() => {
        Swal.fire("Success", `Order ${status}`, "success");
        setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, orderStatus: status } : o));
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order Requests</h2>
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded flex flex-col md:flex-row justify-between items-center">
            <div>
              <p><strong>Meal:</strong> {order.mealName}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>User:</strong> {order.userEmail}</p>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button onClick={() => updateStatus(order._id, "cancelled")} disabled={order.orderStatus !== "pending"} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
              <button onClick={() => updateStatus(order._id, "accepted")} disabled={order.orderStatus !== "pending"} className="bg-green-500 text-white px-2 py-1 rounded">Accept</button>
              <button onClick={() => updateStatus(order._id, "delivered")} disabled={order.orderStatus !== "accepted"} className="bg-blue-500 text-white px-2 py-1 rounded">Deliver</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}















// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import LoadingSpinner from "../../Shared/LoadingSpinner";
// import useAuth from "../../../hooks/useAuth";

// export default function ChefOrderRequests() {
//   const { user } = useAuth();
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch order requests for chef
//   useEffect(() => {
//     if (!user?.uid) return;

//     fetch(`${import.meta.env.VITE_API_URL}/chef/orders/${user.uid}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setRequests(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [user?.uid]);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="p-6">
//       {/* Page Header */}
//       <motion.h2 
//         initial={{ opacity: 0, y: -20 }} 
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-bold mb-6 text-gray-800"
//       >
//         Order Requests
//       </motion.h2>

//       {requests.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg">
//           No order requests yet.
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {requests.map((req, index) => (
//             <motion.div
//               key={req._id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1 }}
//               className="p-5 rounded-2xl shadow-lg bg-white border hover:shadow-xl transition"
//             >
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 {req.mealName}
//               </h3>

//               <p className="text-gray-600 text-sm">
//                 <span className="font-semibold">Customer:</span> {req.customerName}
//               </p>

//               <p className="text-gray-600 text-sm">
//                 <span className="font-semibold">Quantity:</span> {req.quantity}
//               </p>

//               <p className="text-gray-600 text-sm mb-3">
//                 <span className="font-semibold">Price:</span> ${req.totalPrice}
//               </p>

//               <div className="flex items-center justify-between mt-4">
//                 <button
//                   className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition"
//                   onClick={() => handleAccept(req._id)}
//                 >
//                   Accept
//                 </button>

//                 <button
//                   className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
//                   onClick={() => handleReject(req._id)}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Dummy handlers (replace with your API)
// function handleAccept(id) {
//   console.log("Accepted:", id);
// }

// function handleReject(id) {
//   console.log("Rejected:", id);
// }
