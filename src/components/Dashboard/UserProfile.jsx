import React, { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserProfile() {
  const { user, updateUserProfile, setUser } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(name, photo);

      setUser({ ...user, displayName: name, photoURL: photo });

      await axios.put(`${import.meta.env.VITE_API_URL}/update-user`, {
        email: user.email,
        name,
        photo,
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-lg mx-auto shadow-xl rounded-xl p-6"
    >
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r 
       from-purple-500 to-blue-500 text-transparent bg-clip-text">
        Update Profile
      </h2>

      <div className="flex justify-center mb-6">
        <img
          src={photo || user?.photoURL}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-md"
        />
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Name */}
        <div>
          <label className="font-semibold">Full Name</label>
          <input
            type="text"
            className="input input-bordered w-full mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="font-semibold">Photo URL</label>
          <input
            type="text"
            className="input input-bordered w-full mt-1"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn w-full bg-gradient-to-r from-purple-500 to-blue-500  text-lg font-bold"
        >
          Update Profile
        </motion.button>
      </form>
    </motion.div>
  );
}
