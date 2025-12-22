import { useEffect, useState, useMemo } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import MealsHeader from "../../components/Meals/MealsHeader";
import MealsGrid from "../../components/Meals/MealsGrid";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/AxiosSecure";

export default function MealsPage() {
  useEffect(() => {
    document.title = "Meals - PlantNet";
  }, []);

  const [meals, setMeals] = useState([]);
  const [originalMeals, setOriginalMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;
  const { loading } = useAuth();

  const ITEMS_PER_PAGE = 10;

  // 🔹 Fetch meals (FIXED)
  useEffect(() => {
    const loadMeals = async () => {
      try {
        const res = await axiosSecure.get(`${API_URL}/meals`, {
          params: {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            search: searchText,
            category: selectedCategory,
            sort:
              sortOrder === "price-low"
                ? "asc"
                : sortOrder === "price-high"
                ? "desc"
                : "",
          },
        });

        setMeals(Array.isArray(res.data.meals) ? res.data.meals : []);
        setOriginalMeals(Array.isArray(res.data.meals) ? res.data.meals : []);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error("Failed to load meals:", err);
      } finally {
        setPageLoading(false);
      }
    };

    loadMeals();
  }, [API_URL, currentPage, searchText, selectedCategory, sortOrder]);

  const filteredMeals = useMemo(() => {
    return Array.isArray(originalMeals) ? originalMeals : [];
  }, [originalMeals]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handleSearch = (text) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  if (loading || pageLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <MealsHeader
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
        meals={filteredMeals}
      />

      <MealsGrid meals={filteredMeals} />

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
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
            )
          )}
        </div>
      )}
    </div>
  );
}
