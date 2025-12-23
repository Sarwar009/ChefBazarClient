import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function MyProfile() {
  useEffect(() => {
    document.title = "My Profile - Chef Bazar";
  }, []);

  const { user, role } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-xl mx-auto rounded-2xl shadow-md p-6 bg-white"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      {/* User Avatar */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3">
        <p>
          <span className="font-medium">Name: </span>
          <span className="font-semibold">{user.displayName || "N/A"}</span>
        </p>
        <p>
          <span className="font-medium">Email: </span>
          <span className="font-semibold">{user.email || "N/A"}</span>
        </p>
        <p>
          <span className="font-medium">Address: </span>
          <span className="font-semibold">{user.address || "N/A"}</span>
        </p>
        <p>
          <span className="font-medium">Role: </span>
          <span className="font-semibold">{role}</span>
        </p>
        <p>
          <span className="font-medium">Status: </span>
          <span
            className={`font-semibold px-2 py-1 rounded ${
              user.status === "fraud" ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }`}
          >
            {user.status || "active"}
          </span>
        </p>

        {/* Only show Chef Id if role is chef */}
        {role === "chef" && (
          <p>
            <span className="font-medium">Chef ID: </span>
            <span className="font-semibold">{user.chefId || "N/A"}</span>
          </p>
        )}
      </div>

      {/* Edit Profile Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/dashboard/update-profile")}
          className="px-4 py-2 rounded-lg shadow hover:scale-105 transition cursor-pointer bg-green-500 text-white font-medium"
        >
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
}
