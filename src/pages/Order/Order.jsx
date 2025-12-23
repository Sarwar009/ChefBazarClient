import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import axiosSecure from "../../api/AxiosSecure";

export default function Order() {
  useEffect(() => {
    document.title = "Order - Chef Bazar";
  }, []);

  const { id } = useParams();
  const { user } = useAuth();
  const [meal, setMeal] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: { quantity: 1 },
  });

  const navigate = useNavigate()

  const quantity = watch("quantity") || 1;
  const API_URL = import.meta.env.VITE_API_URL;

  // Default order status and order time
  const [orderStatus] = useState("pending");
  const [orderTime] = useState(new Date().toISOString());

  // Update total price whenever quantity or meal changes
  useEffect(() => {
    setTotalPrice((meal?.price || 0) * parseInt(quantity));
  }, [quantity, meal]);

  // Load meal data
  useEffect(() => {
    axiosSecure
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

    if (!data.userAddress) {
      Swal.fire("Error", "Please enter your delivery address.", "error");
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
        const orderPayload = {
          mealId: id,
          foodName: meal.foodName,
          foodImage: meal.foodImage,
          price: meal.price,
          quantity: parseInt(data.quantity),
          totalPrice: totalPrice,
          userName: userName,
          userEmail: userEmail,
          userAddress: data.userAddress,
          orderStatus,
          paymentStatus: "pending",
          chefId: meal?.chefId || null,
  estimatedDeliveryTime: meal.estimatedDeliveryTime,
          orderTime,
        };

        axiosSecure
          .post(`${API_URL}/orders`, orderPayload, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then(() =>
            Swal.fire("Success!", "Order placed successfully!", "success"),
            navigate('/meals')
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
      <div className="max-w-2xl mx-auto shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">Order Your Meal</h2>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-24 h-24 rounded-lg object-cover shadow"
          />
          <div>
            <p className="text-lg font-semibold">{meal.foodName}</p>
            <p className="text-lg">{meal.chefId}</p>
            <p className="text-green-600 font-semibold text-md">
              Price: {meal.price} Taka
            </p>
          </div>
        </div>

        <p className="pb-3 mb-2">
          <span className="font-bold">Description: </span>
          {meal.foodDescription}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Auto-filled Name */}
          <div>
            <label className="font-medium">Your Name</label>
            <input
              type="text"
              value={userName}
              disabled
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Auto-filled Email */}
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* User-entered Delivery Address */}
          <div>
            <label className="font-medium">Delivery Address</label>
            <input
              type="text"
              {...register("userAddress", { required: true })}
              placeholder="Enter your address"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Quantity selector */}
          <div>
            <label className="font-medium">Quantity</label>
            <input
              type="number"
              {...register("quantity", { required: true, min: 1 })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Order Status (readonly) */}
          <div>
            <label className="font-medium">Order Status</label>
            <input
              type="text"
              value={orderStatus}
              disabled
              className="w-full border p-3 rounded-lg bg-gray-100"
            />
          </div>

          {/* Order Time (readonly) */}
          <div>
            <label className="font-medium">Order Time</label>
            <input
              type="text"
              value={new Date(orderTime).toLocaleString()}
              disabled
              className="w-full border p-3 rounded-lg bg-gray-100"
            />
          </div>

          {/* Total Price */}
          <div className="flex justify-between font-medium">
            <h6>Total Amount:</h6>
            <p>{totalPrice} Taka</p>
          </div>

          {/* Confirm Order Button */}
          <button
            type="submit"
            className="w-full bg-green-600 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}
