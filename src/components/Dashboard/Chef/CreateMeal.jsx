// src/pages/Chef/CreateMeal.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineClipboardList, HiOutlineUser, HiOutlineCurrencyDollar, HiOutlineStar, HiOutlineClock, HiOutlineTag } from "react-icons/hi";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import axiosSecure from "../../../api/AxiosSecure";

export default function CreateMeal() {
  const { user, role, roleData } = useAuth();
  const [imageURL, setImageURL] = useState(null);
  const [uploading, setUploading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    console.log('userEmail', user);

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosSecure.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
        formData
      );
      setImageURL(res.data.data.url);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };
  

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!roleData?.chefId) {
    return toast.error("You are not approved as a chef yet.");
  }

  console.log(roleData.chefId, 'roledata');
  

  const mealData = {
    foodName: e.target.foodName.value,
    chefName: e.target.chefName.value,
    foodImage: imageURL,
    price: parseFloat(e.target.price.value),
    rating: parseFloat(e.target.rating.value),
    ingredients: e.target.ingredients.value.split(",").map(i => i.trim()),
    estimatedDeliveryTime: e.target.deliveryTime.value,
    foodCategory: e.target.foodCategory.value,
    foodDescription: e.target.description.value,
    chefExperience: e.target.chefExperience.value,
    chefId: roleData.chefId,
    userEmail: user?.email,
    createdAt: new Date().toISOString(),
  };

  try {
    await axiosSecure.post(`${API_URL}/meals`, mealData);
    toast.success("Meal created successfully!");
    e.target.reset();
    setImageURL(null);
  } catch (err) {
    console.error(err);
    toast.error("Failed to create meal.");
  }
};


  

  // Input style with icon spacing
  const inputStyle = "pl-10 pr-3 py-3 w-full rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto rounded-2xl p-8 mt-6 shadow-sm"
    >
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
        Create New Meal
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Meal Name & Chef Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <HiOutlineClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input type="text" name="foodName" placeholder="Meal Name" className={inputStyle} required />
          </div>

          <div className="relative">
            <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input type="text" name="chefName" defaultValue={user?.displayName} placeholder="Chef Name" className={inputStyle} required />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold mb-2 block">Food Image</label>
          <input type="file" onChange={handleImageUpload} className="block mb-2 shadow p-3 " />
          {uploading && <p className="text-sm mt-1">Uploading...</p>}
          {imageURL && (
            <img src={imageURL} alt="Meal" className="w-48 h-48 object-cover rounded-xl mt-3 shadow-sm" />
          )}
        </div>

        {/* Price & Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <HiOutlineCurrencyDollar className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
            <input type="number" step="0.01" name="price" placeholder="Price" className={inputStyle} required />
          </div>

          <div className="relative">
            <HiOutlineStar className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
            <input type="number" step="0.1" max="5" name="rating" placeholder="Rating 0-5" className={inputStyle} required />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="font-semibold mb-2 block">Ingredients (comma separated)</label>
          <textarea name="ingredients" placeholder="Chicken, Lettuce, Tomato..." className="w-full h-24 rounded-lg border border-gray-200 shadow-sm p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none" required></textarea>
        </div>

        {/* Delivery Time & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <HiOutlineClock className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
            <input type="text" name="deliveryTime" placeholder="Estimated Delivery Time" className={inputStyle} required />
          </div>

          <div className="relative">
            <HiOutlineTag className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input type="text" name="foodCategory" placeholder="Food Category" className={inputStyle} required />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold mb-2 block">Food Description</label>
          <textarea name="description" placeholder="Describe your meal..." className="w-full h-28 rounded-lg border border-gray-200 shadow-sm p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none" required></textarea>
        </div>

        {/* Chef Experience */}
        <div>
          <label className="font-semibold mb-2 block">Chef Experience</label>
          <input type="text" name="chefExperience" placeholder="5 years in Mediterranean cuisine" className={inputStyle} required />
        </div>

        {/* Chef ID & User Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="text" value={role?.chefId || "Pending Approval"} readOnly className={`${inputStyle}`} placeholder="Chef ID" />
          <input type="email" value={user?.email} readOnly className={`${inputStyle} `} placeholder="Your Email" />
        </div>

        {/* Submit Button */}
        <motion.button whileTap={{ scale: 0.95 }} className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 font-bold rounded-xl shadow">
          Create Meal
        </motion.button>
      </form>
    </motion.div>
  );
}
