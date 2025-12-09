// Reviews.jsx
import React from "react";
import { motion } from "framer-motion";

const demoReviews = [
  { id: 1, name: "Sadia Rahman", image: "https://i.pravatar.cc/100?img=5", rating: 5, text: "Delicious and hygienic. Homey taste!" },
  { id: 2, name: "Hasib Khan", image: "https://i.pravatar.cc/100?img=10", rating: 5, text: "Fast delivery and great portions." },
  { id: 3, name: "Mira Chowdhury", image: "https://i.pravatar.cc/100?img=15", rating: 4, text: "Loved the biryani — authentic!" },
  { id: 4, name: "Arafat", image: "https://i.pravatar.cc/100?img=20", rating: 5, text: "Consistent quality, highly recommended." }
];

export default function Reviews({ reviews = demoReviews }) {
  

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">Customer Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <motion.div
            key={r.id}
            className="review-card bg-white p-5 rounded-xl shadow border border-gray-100 flex gap-4"
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <img src={r.image} alt={r.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">{r.name}</h4>
                <div className="text-yellow-400">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              </div>
              <p className="text-gray-600 mt-2">{r.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
