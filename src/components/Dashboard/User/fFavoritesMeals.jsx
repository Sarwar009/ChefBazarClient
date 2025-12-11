// src/pages/dashboard/FavoriteMeal.jsx
import React from "react";
import { motion } from "framer-motion";

export default function FavoriteMeal() {
  const favorites = [
    { id: 1, name: "Grilled Salmon", price: 320 },
    { id: 2, name: "Veggie Delight Pizza", price: 180 }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Favorite Meals</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {favorites.map(f => (
          <div key={f.id} className="flex items-center gap-4 border rounded-lg p-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg" />
            <div>
              <div className="font-semibold">{f.name}</div>
              <div className="text-sm text-gray-500">৳ {f.price}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
