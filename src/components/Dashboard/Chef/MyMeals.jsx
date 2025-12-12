// src/pages/dashboard/MyMeals.jsx
import React from "react";
import { motion } from "framer-motion";

export default function MyMeals() {
  const meals = [
    { id: 1, name: "Grilled Chicken Salad", price: 200, rating: 4.5 },
    { id: 2, name: "Pasta Alfredo", price: 130, rating: 4.2 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">My Meals</h2>

      <div className="grid gap-4">
        {meals.map(m => (
          <div key={m.id} className="flex justify-between items-center border rounded-lg p-3">
            <div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-gray-500">৳ {m.price} • ⭐ {m.rating}</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-lg">Edit</button>
              <button className="px-3 py-1 bg-red-500 text-white rounded-lg">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
