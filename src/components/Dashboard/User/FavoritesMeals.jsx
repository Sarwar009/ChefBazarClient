import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import MealDetailsBtn from "../../Shared/Button/MealDetailsBtn";

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [meals, setMeals] =useState([])

  const API_URL = import.meta.env.VITE_API_URL;
  

  useEffect(() => {
    if (!user) return;
    async function loadFavorites() {
      try {
        const res = await axios.get(`${API_URL}/favorites/${user.email}`);
        setFavorites(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load favorites!");
        setLoading(false);
      }
    }
    loadFavorites();
  }, [user, API_URL]);

  const handleDeletefav = async (id) => {
    console.log(id);
    
  try {
    await axios.delete(`${API_URL}/favorites/${id}`);
    setFavorites((prev) => prev.filter((f) => f._id !== id));
    toast.success("Item Deleted!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete Item!");
  }}

  if (!user) return <p className="text-center py-20">Login to see your favorites.</p>;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Favorite Meals</h1>

      {favorites.length === 0 && <p>No favorites added yet.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {favorites.map((meal) => (
          <motion.div
            key={meal._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col relative"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
          >
          <button
                className="absolute top-3 right-3 z-50 text-red-700 cursor-pointer"
                onClick={() => handleDeletefav(meal._id)}
                title="Delete Favorite "
              >
                <MdDeleteForever size={20}  />
              </button>
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={meal.foodImage}
                alt={meal.mealName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{meal.mealName}</h3>
                <p className="text-gray-500 text-sm">By {meal.chefName}</p>
                <p className="text-orange-600 font-bold mt-1">৳ {meal.price}</p>
              </div>
            
              <MealDetailsBtn mealId={meal.mealId}/>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
