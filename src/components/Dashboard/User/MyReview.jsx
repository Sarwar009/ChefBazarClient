import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

export default function MyReviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch user reviews
  useEffect(() => {
    if (!user) return;
    axios
      .get(`${API_URL}/reviews/user/${user.email}`)
      .then((res) => setReviews(res.data))
      .catch(() => Swal.fire("Error", "Failed to load reviews", "error"));
  }, [user]);

  // Delete review
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this review?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_URL}/reviews/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then(() => {
            setReviews((prev) => prev.filter((r) => r._id !== id));
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
          });
      }
    });
  };

  // Update review
  const handleEdit = (review) => {
    setEditingReview(review);
    reset({ rating: review.rating, comment: review.comment });
  };

  const onSubmit = (data) => {
    if (!editingReview) return;

    axios
      .patch(
        `${API_URL}/reviews/${editingReview._id}`,
        { rating: data.rating, comment: data.comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        setReviews((prev) =>
          prev.map((r) =>
            r._id === editingReview._id
              ? { ...r, ...data, date: new Date() }
              : r
          )
        );
        Swal.fire("Success", "Review updated successfully!", "success");
        setEditingReview(null);
      })
      .catch(() => Swal.fire("Error", "Failed to update review", "error"));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        My Reviews
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={rev.foodImage}
              alt={rev.mealName}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-xl text-gray-800 mb-2">
                {rev.mealName}
              </h3>
              <p className="text-yellow-500 font-semibold mb-2">
                ⭐ {rev.rating} / 5
              </p>
              <p className="text-gray-600 mb-3">{rev.comment}</p>
              <p className="text-gray-400 text-sm mb-3">
                {new Date(rev.date).toLocaleDateString()}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(rev)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(rev._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Update Review</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="font-bold">Rating</label>
              <input
                type="number"
                {...register("rating", {
                  required: "Rating is required",
                  min: { value: 1, message: "Rating cannot be less than 1" },
                  max: { value: 5, message: "Rating cannot be more than 5" },
                })}
                placeholder="Rating 1-5"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.rating && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.rating.message}
                </p>
              )}
              <label className="font-bold">Comment</label>
              <textarea
                {...register("comment", {
                  required: "Comment cannot be empty",
                })}
                placeholder="Write your review"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none h-24"
              />
              {errors.comment && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.comment.message}
                </p>
              )}
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
