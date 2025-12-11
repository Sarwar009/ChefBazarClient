// MealDetails.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { MdDeleteForever  } from "react-icons/md";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAddToFavorites from "../../hooks/useAddToFavorites";

import OrderBtn from '../../components/Shared/Button/OrderBtn'

export default function MealDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToFavorites } = useAddToFavorites();

  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;
  

  // Redirect if NOT logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);
  // Load meal & reviews
  useEffect(() => {
  async function loadData() {
    try {
    const mealRes = await axios.get(`${API_URL}/meals/${id}`);

      setMeal(mealRes.data);

      const reviewRes = await axios.get(`${API_URL}/reviews/${id}`);
      
      setReviews(reviewRes.data);

    } catch (err) {
      console.error("Error loading details:", err);
    }
  }
  loadData();
  
}, [API_URL, id]);


  // Add to favorites
  const handleAddToFavorites = () => {
    addToFavorites(meal, user);
  }

console.log(user.uid);


 // Submit new review
const submitReview = async (e) => {
  e.preventDefault();
  const form = e.target;

  const user_Id = localStorage.getItem('userId')
  console.log(user_Id);
  

  const newReview = {
    foodId: meal._id,
    userId: user_Id,
    reviewerName: user.displayName,
    reviewerImage: user.photoURL,
    rating: parseInt(form.rating.value),
    comment: form.comment.value,
    date: new Date().toISOString(),
  };

  try {
    const res = await axios.post(`${API_URL}/reviews`, newReview);

    setReviews((prev) => [res.data, ...prev]); 
    form.reset();
    toast.success("Review Added!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to add review!");
  }
};

// Delete review
const handleDeleteReview = async (reviewId) => {
  try {
    await axios.delete(`${API_URL}/reviews/${reviewId}`);
    setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    toast.success("Review Deleted!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete review!");
  }}

  if (!meal) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Meal Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full h-[350px] rounded-3xl overflow-hidden shadow-xl"
      >
        <img src={meal.foodImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            {meal.mealName}
          </h1>
          <p className="mt-2 text-lg opacity-90 text-blue-300">By {meal.chefName}</p>
        </div>
      </motion.div>

      {/* Main Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-lg p-7"
        >
          <h2 className="text-2xl font-bold mb-4">Meal Information</h2>

          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Chef:</strong> {meal.chefName}
            </p>
            <p>
              <strong>Chef ID:</strong> {meal.chefId}
            </p>
            <p>
              <strong>Price:</strong> ৳ {meal.foodPrice}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {meal.foodRating}
            </p>
            <p>
              <strong>Delivery Area:</strong> {meal.deliveryArea}
            </p>
            <p>
              <strong>Chef Experience:</strong> {meal.chefExperience}
            </p>

            <p>
              <strong>Ingredients:</strong>
            </p>
            <ul className="list-disc pl-6">
              {meal.ingredients?.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 mt-6">
            {/* <button
              onClick={() => navigate(`/order/${meal._id}`)}
            >
              
            </button> */}
              <OrderBtn  meal={meal}/>
            <button
              onClick={handleAddToFavorites}
              className="mt-5 px-5 py-2 bg-linear-to-r from-emerald-500 to-lime-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              Add to Favorite ❤️
            </button>
          </div>
        </motion.div>

        {/* Right: Review Form */}
        <motion.form
          onSubmit={submitReview}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-lg p-7"
        >
          <h2 className="text-2xl font-bold mb-4">Give a Review</h2>

          <div className="space-y-5">
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              required
              placeholder="Rating (1-5)"
              className="w-full p-3 border rounded-xl"
            />

            <textarea
              name="comment"
              required
              placeholder="Write your review..."
              className="w-full p-3 border rounded-xl h-28"
            />

            <button className="px-6 py-3 bg-emerald-500 text-white rounded-full w-full font-semibold shadow hover:scale-105 transition">
              Submit Review
            </button>
          </div>
        </motion.form>
      </div>

      {/* Reviews List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 bg-white rounded-3xl shadow-lg p-7"
      >
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {reviews.length === 0 && <p>No reviews yet.</p>}
  {reviews.map((r) => (
    <div key={r._id} className="p-4 bg-white shadow rounded-xl mb-4 relative">
      <button
      className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer"
      onClick={() => handleDeleteReview(r._id)}
      title="Delete Review"
    >
      <MdDeleteForever size={20}  />
    </button>
      <div className="flex gap-3 items-center">
        <img src={r.reviewerImage} className="w-12 h-12 rounded-full" />
        <div>
          <h4 className="font-semibold">{r.reviewerName}</h4>
          <p className="text-yellow-500">⭐ {r.rating}</p>
        </div>
      </div>

      <p className="mt-3">{r.comment}</p>
      <p className="text-sm text-gray-500 mt-2">
        {new Date(r.date).toLocaleDateString()}
      </p>
    </div>
  ))}
</div>

        
      </motion.div>
    </div>
  );
}
