// src/pages/dashboard/MyReview.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

export default function MyReview() {
    const [reviews, setReviews] = useState([])

  const API_URL = import.meta.env.VITE_API_URL;
  
    
    
    useEffect(() => {
    const fetchData = async () => {
            const token = localStorage.getItem("accessToken");
        try {
            const res = await axios.get(`${API_URL}/reviews`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Reviews data received:", res.data.data);
            setReviews(res.data.data)

        } catch (error) {
            console.error("API Call Failed:", error);
        }
    };
    fetchData(); 
}, [API_URL]);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <div className="grid gap-4">
        {reviews.map(r => (
          <div key={r.id} className="border rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{r.meal}</div>
                <div className="text-sm text-gray-500">Rating: {r.rating} / 5</div>
              </div>
              <div className="text-sm text-gray-400">{/* date placeholder */}Jan 10, 2025</div>
            </div>
            <p className="mt-3 text-gray-600">{r.comment}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
