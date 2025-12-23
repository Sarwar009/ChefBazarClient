import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router";
import axiosSecure from "../../../api/AxiosSecure";

export default function MyMeals() {
  const { roleData } = useAuth();
  const [meals, setMeals] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;


useEffect(() => {
  if (!roleData?.chefId) return;

  console.log("chefId 👉", roleData.chefId);

  axiosSecure
    .get(`/meals/chef/${roleData.chefId}`)
    .then(res => {
      setMeals(res.data);
    })
    .catch(err => console.error(err));
}, [roleData?.chefId]);


  // DELETE
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this meal?");
    if (!confirm) return;

    const res = await axiosSecure.delete(`/meals/${id}`);
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
        <button className="bg-blue-500 px-3 py-1 rounded-lg my-4 hover:bg-blue-700">
          <Link to='/dashboard/create-meal'>
            Create Meal
          </Link>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className=" shadow-lg rounded-xl p-4">
            <img
              src={meal.foodImage}
              className="h-40 w-full object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-3">{meal.foodName}</h3>
            <p><span className="font-bold">Chef:</span> {meal.chefName}</p>
            <p className="text-sm"><span className="font-bold">Chef ID:</span> {meal.chefId}</p>

            <p className="mt-2 font-semibold"><span className="font-bold">Price: </span>{meal.price}tk</p>
            <p><span className="font-bold">Rating: </span> {meal.rating}</p>
            <p className="text-sm">
              <span className="font-bold">Ingredients:</span> {meal.ingredients.join(", ")}
            </p>
            <p className="text-sm">⏱ {meal.estimatedDeliveryTime}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleDelete(meal._id)}
                className="bg-red-500 px-3 py-1 rounded-lg"
              >
                Delete
              </button>

              <button
                onClick={() =>
                  (window.location.href = `/dashboard/update-meal/${meal._id}`)
                }
                className="bg-blue-500 px-3 py-1 rounded-lg"
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
