import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosSecure from "../../../api/AxiosSecure";

export default function UpdateMeal() {
  useEffect(() => {
    document.title = "Update Meal - Chef Bazar";
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axiosSecure.get(`/meals/${id}`).then(res => setMeal(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = {
      foodName: e.target.foodName.value,
      price: e.target.price.value,
      rating: e.target.rating.value,
      estimatedDeliveryTime: e.target.time.value
    };

    const res = await axiosSecure.patch(`/meals/${id}`, updated);
    if (res.data.modifiedCount > 0) {
      toast.success("Meal updated!");
      navigate("/dashboard/my-meals");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow">
      <input defaultValue={meal.foodName} name="foodName" className="input" />
      <input defaultValue={meal.price} name="price" type="number" className="input" />
      <input defaultValue={meal.rating} name="rating" type="number" className="input" />
      <input defaultValue={meal.estimatedDeliveryTime} name="time" className="input" />

      <button className="bg-green-600 w-full py-2 rounded mt-4">
        Update Meal
      </button>
    </form>
  );
}
