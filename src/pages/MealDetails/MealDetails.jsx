import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

export default function MealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/meals/${id}`).then((res) => setMeal(res.data));
    axios.get(`${API_URL}/reviews/${id}`).then((res) => setReviews(res.data));
  }, [id, API_URL]);

  const onSubmit = (data) => {
  if (!user) return navigate("/login");

  console.log(data);
  
  // Prepare review payload
  const reviewPayload = {
  foodId: id,
  foodImage: meal.foodImage,
  mealName: meal.mealName,
  foodCategory: meal.foodCategory,
  chefName: meal.chefName,
  reviewerName: user.displayName || user.name || "User",
  reviewerEmail: user.email || "",
  reviewerImage: user.photoURL || user.image || "",
  rating: data.rating,
  comment: data.comment,
  date: new Date().toISOString(),
};


  // Post review to backend
  axios
    .post(`${API_URL}/reviews`, reviewPayload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      Swal.fire("Success", "Review submitted successfully!", "success");
      reset(); 

      const insertedId = res.data.insertedId;
      if (insertedId) {
        setReviews((prev) => [
          ...prev,
          { _id: insertedId, ...reviewPayload },
        ]);
      } else {
        axios.get(`${API_URL}/reviews/${id}`).then((res) => setReviews(res.data));
      }
    })
    .catch((err) => {
      console.error(err);
      Swal.fire("Error", "Failed to submit review", "error");
    });
}; console.log(user, 'user');

console.log(reviews, 'review');


  if (!meal)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );

  const ingredients = Array.isArray(meal.ingredients)
    ? meal.ingredients
    : typeof meal.ingredients === "string"
    ? meal.ingredients.split(",").map((i) => i.trim())
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 shadow-lg rounded-lg p-6">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {meal.foodName}
            </h2>
            <p className=" mb-1">
              <span className="font-semibold">Chef:</span> {meal.chefName}
            </p>
            <p className=" mb-1">
              <span className="font-semibold">Price:</span> ${meal.price}
            </p>
            <p className=" mb-1">
              <span className="font-semibold">Rating:</span> {meal.rating} ⭐
            </p>
            <p className=" mb-1">
              <span className="font-semibold">Ingredients:</span>{" "}
              {ingredients.length > 0 ? ingredients.join(", ") : "N/A"}
            </p>
            <p className=" mb-1">
              <span className="font-semibold">Delivery Time:</span>{" "}
              {meal.estimatedDeliveryTime}
            </p>
            <p className=" mb-1">
              <span className="font-semibold">Chef Experience:</span>{" "}
              {meal.chefExperience}
            </p>
          </div>
          <button
            onClick={() => navigate(`/order/${id}`)}
            className="mt-4 bg-green-600 hover:bg-green-700 transition-colors  font-semibold px-6 py-3 rounded-lg shadow-md w-full md:w-auto"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold  mb-4">Reviews</h3>
        <div className="flex flex-col gap-4">
          {reviews.length > 0 ? (
            reviews.map((rev, idx) => (
              <div
                key={idx}
                className=" p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={rev.reviewerImage || "/default-avatar.png"}
                    alt={rev.reviewerName}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">
                      {rev.reviewerName || "Anonymous"}
                    </p>
                    <p className="text-sm">
                      {rev.date
                        ? new Date(rev.date).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                  <p className="ml-auto text-yellow-500 font-semibold">
                    {rev.rating} ⭐
                  </p>
                </div>
                <p>{rev.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {/* Review Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex flex-col gap-3 p-6 rounded-lg shadow-md"
        >
          <h4 className="text-lg font-semibold mb-2">
            Write a Review
          </h4>
          <input
            type="number"
            {...register("rating", { required: true, min: 1, max: 5 })}
            placeholder="Rating 1-5"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            {...register("comment", { required: true })}
            placeholder="Write your review"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-colors  font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
