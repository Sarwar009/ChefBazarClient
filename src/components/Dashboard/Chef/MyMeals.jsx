import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router";

export default function MyMeals() {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
  if (!user?.email) return;

  axios
    .get(`${API_URL}/meals/chef/${user.email}`)
    .then(res => {
      console.log("meals 👉", res.data);
      setMeals(res.data);
    });
}, [user]);

console.log("USER 👉", user);

  // DELETE
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this meal?");
    if (!confirm) return;

    const res = await axios.delete(`${API_URL}/meals/${id}`);
    if (res.data.deletedCount > 0) {
      setMeals((prev) => prev.filter((meal) => meal._id !== id));
      toast.success("Meal deleted successfully!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Meals</h2>
      <div className="text-center">
        {meals.length === 0 && <p>No meals created yet</p>}
        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg my-4 hover:bg-blue-700">
          <Link to='/dashboard/create-meal'>
            Create Meal
          </Link>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="bg-white shadow-lg rounded-xl p-4">
            <img
              src={meal.foodImage}
              className="h-40 w-full object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-3">{meal.mealName}</h3>
            <p className="text-gray-500">Chef: {meal.chefName}</p>
            <p className="text-sm">Chef ID: {meal.chefId}</p>

            <p className="mt-2 font-semibold">💲 {meal.foodPrice}</p>
            <p>⭐ {meal.rating}</p>
            <p className="text-sm text-gray-600">
              Ingredients: {meal.ingredients.join(", ")}
            </p>
            <p className="text-sm">⏱ {meal.estimatedDeliveryTime}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleDelete(meal._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>

              <button
                onClick={() =>
                  (window.location.href = `/dashboard/update-meal/${meal._id}`)
                }
                className="bg-blue-500 text-white px-3 py-1 rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
