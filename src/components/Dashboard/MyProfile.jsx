
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function MyProfile() {

    const navigate =useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="flex gap-6 items-center">
        <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
          <img src="https://i.ibb.co/7W7T9dP/spicy-chicken.jpg" alt="avatar" className="w-full h-full object-cover"/>
        </div>

        <div>
          <p className="text-lg font-semibold">User Name</p>
          <p className="text-sm text-gray-500">user@example.com</p>
          <p className="mt-3 text-sm text-gray-600">
            Role: <span className="font-medium">User</span>
          </p>
        </div>
      </div>

      <div className="mt-6 space-x-3">
        <button 
        onClick={()=> navigate('/dashboard/update-profile')}
        className="px-4 py-2 bg-emerald-500 text-white rounded-lg shadow hover:scale-105 transition">
          Edit Profile
        </button>
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
          Change Password
        </button>
      </div>
    </motion.div>
  );
}
