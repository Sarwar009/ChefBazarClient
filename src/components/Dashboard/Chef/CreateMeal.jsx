// src/pages/dashboard/CreateMeal.jsx
import React from "react";
import { motion } from "framer-motion";

export default function CreateMeal() {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Create Meal</h2>

      <form className="space-y-4">
        <input className="w-full p-3 border rounded-lg" placeholder="Meal Name" />
        <input className="w-full p-3 border rounded-lg" placeholder="Price" type="number" />
        <textarea className="w-full p-3 border rounded-lg" placeholder="Ingredients, description..." rows={4} />
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg">Create</button>
          <button type="button" className="px-4 py-2 border rounded-lg">Reset</button>
        </div>
      </form>
    </motion.div>
  );
}
