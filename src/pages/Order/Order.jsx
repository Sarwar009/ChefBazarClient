import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

export default function Order() {
  const { id } = useParams();
  const { user, roleData } = useAuth();
  const [meal, setMeal] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: { quantity: 1 },
  });

  const quantity = watch("quantity") || 1;
  const API_URL = import.meta.env.VITE_API_URL;

  // Calculate total price whenever quantity or meal changes
  useEffect(() => {
    setTotalPrice((meal?.price || 0) * parseInt(quantity));
  }, [quantity, meal]);

  // Fetch meal details from backend
  useEffect(() => {
    axios
      .get(`${API_URL}/meals/${id}`)
      .then((res) => setMeal(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const userName =
    user?.displayName || user?.name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "Not Available";

  const onSubmit = (data) => {
    if (!user) {
      Swal.fire("Error", "You must be logged in to place an order.", "error");
      return;
    }

    Swal.fire({
      title: `Total Price: ${totalPrice} Taka`,
      text: "Do you want to confirm this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        // Prepare payload
        const orderPayload = {
          mealId: id,
          mealName: meal.mealName,
          foodImage: meal.foodImage,
          price: meal.price,
          quantity: parseInt(data.quantity),
          totalPrice: totalPrice,
          userName: userName,
          userEmail: userEmail,
          userAddress: data.userAddress,
          orderStatus: "pending",
          chefId: roleData?.chefId || null,
          orderTime: new Date().toISOString(),
        };

        axios
          .post(`${API_URL}/orders`, orderPayload, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then(() =>
            Swal.fire("Success!", "Order placed successfully!", "success")
          )
          .catch((err) => {
            console.error(err);
            Swal.fire(
              "Error",
              "Something went wrong while placing the order.",
              "error"
            );
          });
      }
    });
  };

  if (!meal) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Order Your Meal</h2>
          <p className="text-gray-500 mt-1">{meal.mealName}</p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-24 h-24 rounded-lg object-cover shadow"
          />
          <div>
            <p className="text-lg font-semibold text-gray-700">
              {meal.foodName}
            </p>
            <p className="text-green-600 font-semibold text-md">
              Price: {meal.price} Taka
            </p>
          </div>
        </div>

        <p className="border-b-2 pb-3 mb-2">
          <span className="font-bold">Description: </span>
          {meal.foodDescription}
        </p>

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
            <label className="text-gray-700 font-medium">Delivery Address</label>
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
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex justify-between font-medium text-gray-700">
            <h6>Total Amount:</h6>
            <p>{totalPrice} Taka</p>
          </div>

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
