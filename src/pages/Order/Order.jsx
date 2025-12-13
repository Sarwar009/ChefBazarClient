import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm, Watch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

export default function Order() {
  const { id } = useParams();
  const { user, roleData } = useAuth();
  const [meal, setMeal] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0)
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = watch("quantity");

  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const qty = parseInt(quantity) || 0;
    setTotalPrice((meal?.foodPrice || 0) * qty);
  }, [quantity, meal]);

  useEffect(() => {
    axios.get(`${API_URL}/meals/${id}`).then((res) => {
      setMeal(res.data);
    });
  }, [id]);

  const userName =
    user?.displayName || user?.name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "Not Available";

  const onSubmit = (data) => {
    if (!user) return;

    Swal.fire({
      title: `Total Price: ${totalPrice}`,
      text: "Confirm this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${API_URL}/orders`,
            {
              ...data,
              mealId: id,
              foodImage: meal.foodImage,
              mealName: meal.mealName,
              price: meal.foodPrice,
              userEmail: user?.email,
              orderStatus: "pending",
              chefId: roleData.chefId,
              orderTime: new Date(),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then(() =>
            Swal.fire("Success!", "Order placed successfully!", "success")
          );
      }
    });
  };

  if (!meal) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Card */}
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Order Your Meal</h2>
          <p className="text-gray-500 mt-1">{meal.mealName}</p>
        </div>

        {/* Meal info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={meal.foodImage}
            alt={meal.mealName}
            className="w-24 h-24 rounded-lg object-cover shadow"
          />
          <div>
            <p className="text-lg font-semibold text-gray-700">
              {meal.mealName}
            </p>
            <p className="text-green-600 font-semibold text-md">
              Price: ${meal.foodPrice}
            </p>
          </div>
        </div>
        <p className="border-b-2 pb-3 mb-2">
          {" "}
          <span className="font-bold">Description: </span>
          {meal.foodDescription}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              value={userName}
              disabled
              className="w-full border p-3 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full border p-3 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">
              Delivery Address
            </label>
            <input
              type="text"
              {...register("userAddress", { required: true })}
              placeholder="Enter your address"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Quantity</label>
            <input
              type="number"
              
              {...register("quantity", { required: true, min: 1 })}
              placeholder="1"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="flex justify-between font-medium text-gray-700">
            <h6>Total Amount : </h6>
            <p>{totalPrice} Taka</p>
            
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}
