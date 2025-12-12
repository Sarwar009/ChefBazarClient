import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import MealsHeader from "../../components/Meals/MealsHeader";
import MealsGrid from "../../components/Meals/MealsGrid";
import useAuth from "../../hooks/useAuth";

export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [originalMeals, setOriginalMeals] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const {loading, setLoading} = useAuth();

  useEffect(() => {
    async function loadData() {
      try {
        const mealRes = await axios.get(`${API_URL}/meals`);
        setMeals(mealRes.data);
        setOriginalMeals(mealRes.data);
        setLoading(false);
        console.log(mealRes.data);
        
      } catch (err) {
        console.error("Error loading details:", err);
        setLoading(false);
      }
    }
    loadData();
  }, [API_URL, setLoading]);

  // Search Logic
  const handleSearch = (text) => {
    const filtered = originalMeals.filter((m) =>
      m.mealName.toLowerCase().includes(text.toLowerCase())
    );
    setMeals(filtered);
  };

  // Filter Category Logic
  const handleFilter = (category) => {
    if (category === "All") {
      setMeals(originalMeals);
    } else {
      const filtered = originalMeals.filter((m) => m.foodCategory === category);
      setMeals(filtered);
    }
    
    setLoading(false)
  };

  // Sort Logic
  const handleSort = (order) => {
    const sorted = [...meals].sort((a, b) =>
      order === "asc" ? b.foodPrice - a.foodPrice : a.foodPrice - b.foodPrice
    );
    setMeals(sorted);
    setLoading(false)
  };

  
  
  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <MealsHeader
        onSearch={handleSearch}
        onSort={handleSort}
        onFilter={handleFilter}
        meals={meals}
      />
      <MealsGrid meals={meals} />
    </div>
  );
}
