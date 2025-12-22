import { useState, useMemo } from "react";

export default function MealsHeader({ meals, onSearch, onSort, onFilter }) {
  const [searchText, setSearchText] = useState("");

  const uniqueCategories = useMemo(
    () => [...new Set(meals.map((m) => m.foodCategory))],
    [meals]
  );

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
      {/* Search */}
      <input
        type="text"
        placeholder="Search meals..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          onSearch(e.target.value);
        }}
        className="border px-4 py-2 rounded-lg w-full md:w-1/3"
      />

      {/* Category Filter */}
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="border px-4 py-2 rounded-lg w-full md:w-1/4"
      >
        <option value="All">All</option>
        {uniqueCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        onChange={(e) => onSort(e.target.value)}
        className="border px-4 py-2 rounded-lg w-full md:w-1/4"
      >
        <option value="">Sort By</option>
        <option value="price-low">Low to High ↑</option>
        <option value="price-high">High to Low ↓</option>
      </select>
    </div>
  );
}
