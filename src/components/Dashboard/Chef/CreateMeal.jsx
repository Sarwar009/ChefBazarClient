// src/pages/Chef/CreateMeal.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

export default function CreateMeal() {
  const { user, roleData } = useAuth(); 
  const [imageURL, setImageURL] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageURL) return alert("Please provide an image URL");

    const mealData = {
      mealName: e.target.mealName.value,
      chefName: e.target.chefName.value,
      foodImage: imageURL,
      foodPrice: e.target.foodPrice.value,
      foodRating: e.target.foodRating.value,
      ingredients: e.target.ingredients.value,
      deliveryArea: e.target.deliveryArea.value,
      foodCategory: e.target.foodCategory.value,
      foodDescription: e.target.foodDescription.value,
      chefExperience: e.target.chefExperience.value,
      chefId: roleData?.chefId,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post(`${API_URL}/meals`, mealData);
      if (res.status === 201 || res.status === 200) {
        alert("Meal Created Successfully!");
        e.target.reset();
        setImageURL(null);
      }
    } catch (err) {
      console.error("Error creating meal:", err);
      alert("Failed to create meal. Check console for details.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6"
    >
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
        Create New Meal
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Meal Name */}
        <div>
          <label className="font-semibold">Meal Name</label>
          <input
            type="text"
            name="mealName"
            className="input-style"
            required
          />
        </div>

        {/* Chef Name */}
        <div>
          <label className="font-semibold">Chef Name</label>
          <input
            type="text"
            name="chefName"
            defaultValue={user?.displayName}
            className="input-style"
            required
          />
        </div>

        {/* Food Image URL */}
        <div>
          <label className="font-semibold">Food Image URL</label>
          <input
            type="text"
            name="foodImage"
            placeholder="Enter image URL"
            className="input-style"
            value={imageURL || ""}
            onChange={(e) => setImageURL(e.target.value)}
            required
          />
          {imageURL && (
            <img
              src={imageURL}
              className="w-40 h-40 object-cover rounded-xl mt-3 shadow"
              alt="Meal Preview"
            />
          )}
        </div>

        {/* Price and Rating */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="font-semibold">Price</label>
            <input
              type="number"
              name="foodPrice"
              className="input-style"
              required
            />
          </div>
          <div>
            <label className="font-semibold">Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              name="foodRating"
              className="input-style"
              required
            />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="font-semibold">Ingredients</label>
          <textarea
            name="ingredients"
            className="input-style h-24"
            required
          ></textarea>
        </div>

        {/* Delivery Area & Category */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="font-semibold">Delivery Area</label>
            <input
              type="text"
              name="deliveryArea"
              placeholder="e.g., Downtown"
              className="input-style"
              required
            />
          </div>
          <div>
            <label className="font-semibold">Food Category</label>
            <input
              type="text"
              name="foodCategory"
              placeholder="e.g., Italian, Dessert"
              className="input-style"
              required
            />
          </div>
        </div>

        {/* Food Description */}
        <div>
          <label className="font-semibold">Food Description</label>
          <textarea
            name="foodDescription"
            className="input-style h-24"
            placeholder="Describe the meal..."
            required
          ></textarea>
        </div>

        {/* Chef Experience */}
        <div>
          <label className="font-semibold">Chef Experience</label>
          <input
            type="text"
            name="chefExperience"
            placeholder="5 years"
            className="input-style"
            required
          />
        </div>

        {/* Chef ID (Read-only) */}
        <div>
          <label className="font-semibold">Chef ID</label>
          <input
            type="text"
            value={roleData?.chefId || "Pending Approval"}
            readOnly
            className="input-style bg-gray-200"
          />
        </div>

        {/* User Email (Read-only) */}
        <div>
          <label className="font-semibold">User Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input-style bg-gray-200"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl shadow-lg"
        >
          Create Meal
        </motion.button>
      </form>
    </motion.div>
  );
}
