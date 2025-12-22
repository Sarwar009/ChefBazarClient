import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import MealsHeader from "../../components/Meals/MealsHeader";
import MealsGrid from "../../components/Meals/MealsGrid";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/AxiosSecure";

export default function MealsPage() {
  useEffect(() => {
    document.title = "Meals - ChefBazzar";
  }, []);

  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;
  const { loading } = useAuth();

  const ITEMS_PER_PAGE = 10;

  // Fetch meals from backend
  useEffect(() => {
    const loadMeals = async () => {
      try {
        setPageLoading(true);
        const res = await axiosSecure.get(`${API_URL}/meals`, {
          params: {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            search: searchText || undefined,
            category: selectedCategory !== "All" ? selectedCategory : undefined,
            sort:
              sortOrder === "price-low"
                ? "asc"
                : sortOrder === "price-high"
                ? "desc"
                : undefined,
          },
        });

        setMeals(Array.isArray(res.data.meals) ? res.data.meals : []);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error("Failed to load meals:", err);
      } finally {
        setPageLoading(false);
      }
    };

    loadMeals();
  }, [API_URL, currentPage, searchText, selectedCategory, sortOrder]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handleSearch = (text) => {
    setSearchText(text);
    setCurrentPage(1); // reset to page 1
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // reset to page 1
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(1); // reset to page 1
  };

  if (loading || pageLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <MealsHeader
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
        meals={meals} // pass current meals for categories
      />

      <MealsGrid meals={meals} />

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page
                  ? "bg-lime-500 text-white"
                  : "hover:bg-gray-100"
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
