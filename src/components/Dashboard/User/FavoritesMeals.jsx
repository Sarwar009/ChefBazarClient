import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import axiosSecure from "../../../api/AxiosSecure";

export default function MyFavorites() {
  useEffect(() => {
    document.title = "Favorite Meals - Chef Bazar";
  }, []);

  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`${API_URL}/favorites/${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setFavorites(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load favorites");
        setLoading(false);
      });
  }, [user]);

  // DELETE Favorite

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be removed from your favorites.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`${API_URL}/favorites/${id}`);

      if (res.data.success) {
        setFavorites((prev) => prev.filter((item) => item._id !== id));

        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Meal removed from favorites.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to remove meal.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg font-semibold">Loading favorites...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No Favorite Meals Yet</h2>
        <p className="mt-2">Add meals to see them here!</p>
      </div>
    );
  }

  console.log(favorites);
  

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Favorite Meals</h2>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Meal Name</th>
              <th className="py-3 px-4 border-b text-left">Chef Name</th>
              <th className="py-3 px-4 border-b text-left">Price</th>
              <th className="py-3 px-4 border-b text-left">Date Added</th>
              <th className="py-3 px-4 border-b text-center w-32">Action</th>
            </tr>
          </thead>

          <tbody>
            {favorites.map((meal) => (
              <tr key={meal._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{meal.foodName}</td>

                <td className="py-3 px-4 border-b">{meal.chefName}</td>

                <td className="py-3 px-4 border-b">
                  {meal.price ? `$${meal.price}` : "—"}
                </td>

                <td className="py-3 px-4 border-b">
                  {meal.createdAt
                    ? new Date(meal.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                <td className="py-3 px-4 border-b text-center">
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="bg-red-500 hover:bg-red-600  px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
