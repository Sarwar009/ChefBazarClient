import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosSecure from '../../../api/AxiosSecure'

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axiosSecure
      .get('/reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error("Failed to load reviews", err));
  }, [API_URL]);

  if (reviews.length === 0) {
    return (
      <section className="py-16 text-center">
        <p>No reviews yet</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <motion.div
            key={r._id}
            className="p-5 rounded-xl shadow border border-gray-100 flex gap-4"
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <img
              src={r.reviewerImage || r.foodImage}
              alt={r.reviewerName}
              className="w-16 h-16 rounded-full object-cover"
            />

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{r.reviewerName}</h4>

                <div className="text-yellow-400 text-sm">
                  {"★".repeat(Number(r.rating))}
                  {"☆".repeat(5 - Number(r.rating))}
                </div>
              </div>

              <p className="text-sm mt-1">
                <span className="font-medium">{r.foodCategory}</span>
              </p>

              <p className="mt-2">{r.comment}</p>

              <p className="text-xs mt-2">
                {new Date(r.date).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
