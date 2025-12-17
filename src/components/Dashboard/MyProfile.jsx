import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function MyProfile() {
  const {user, role} = useAuth();
  const navigate = useNavigate();

  console.log(user);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className=" rounded-2xl shadow-md p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col mx-1 md:mx-4">
          <p className="text-lg">Name: <span className=" font-semibold">{user.displayName}</span></p>
          <p className="text-sm">Email: <span className=" font-semibold">{user.email}</span></p>
          <p className="mt-3 text-sm">
            Role: <span className="font-medium">{role}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 space-x-3 text-center">
        <button
          onClick={() => navigate("/dashboard/update-profile")}
          className="px-4 py-2 rounded-lg shadow hover:scale-105 transition cursor-pointer"
        >
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
}
