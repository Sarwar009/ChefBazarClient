import { useEffect, useState, useMemo } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import MealsHeader from "../../components/Meals/MealsHeader";
import MealsGrid from "../../components/Meals/MealsGrid";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/AxiosSecure";

export default function MealsPage() {
  const { loading } = useAuth();
  const [meals, setMeals] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMeals, setTotalMeals] = useState(0);

  useEffect(() => {
    document.title = "Meals - ChefBazzar";
  }, []);

  const ITEMS_PER_PAGE = 9;

  // Fetch all meals once
  useEffect(() => {
    const loadMeals = async () => {
      try {
        setPageLoading(true);
        const res = await axiosSecure.get("/meals", {
          params: {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
          },
        });

        setMeals(res.data.meals || []);
        setTotalMeals(res.data.total || 0);
      } catch (err) {
        console.error("Failed to load meals:", err);
      } finally {
        setPageLoading(false);
      }
    };

    loadMeals();
  }, [currentPage]);

  const totalPages = Math.ceil(totalMeals / ITEMS_PER_PAGE);

  // Frontend filtered & sorted meals
  const displayedMeals = useMemo(() => {
    let filtered = [...meals];

    // Filter by search
    if (searchText) {
      filtered = filtered.filter((meal) =>
        meal.foodName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (meal) => meal.foodCategory === selectedCategory
      );
    }

    // Sort by price
    if (sortOrder === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [meals, searchText, selectedCategory, sortOrder]);

  if (loading || pageLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <MealsHeader
        meals={meals} // pass full meals for category list
        onSearch={setSearchText}
        onFilter={setSelectedCategory}
        onSort={setSortOrder}
      />

      <MealsGrid meals={displayedMeals} />
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded border ${
                currentPage === page
                  ? "bg-emerald-500 text-white"
                  : "hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
