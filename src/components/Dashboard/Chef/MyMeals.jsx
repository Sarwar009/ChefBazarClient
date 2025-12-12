// src/pages/dashboard/MyMeals.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

export default function MyMeals() {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/meals/chef/${user.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
      .then((res) => setMeals(res.data));
  }, [user]);

  const deleteMeal = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the meal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/meals/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
          .then(() => {
            Swal.fire("Deleted!", "Meal deleted successfully", "success");
            setMeals((prev) => prev.filter((m) => m._id !== id));
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <div key={meal._id} className="border p-4 rounded">
            <img src={meal.foodImage} className="w-full h-48 object-cover rounded" />
            <h3 className="font-bold mt-2">{meal.foodName}</h3>
            <p>Price: ${meal.price}</p>
            <p>Rating: {meal.rating}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => deleteMeal(meal._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              <button className="bg-blue-500 text-white px-2 py-1 rounded">Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

