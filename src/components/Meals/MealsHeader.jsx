import { useState } from "react";

export default function MealsHeader({ meals, onSearch, onSort, onFilter }) {
  const [searchText, setSearchText] = useState("");

  // const categories = [meals.foodCategory];

  // console.log(categories);
  

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
        {meals.map((cat) => (
          <option key={cat._id}>{cat.foodCategory}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        onChange={(e) => onSort(e.target.value)}
        className="border px-4 py-2 rounded-lg w-full md:w-1/4"
      >
        <option value="asc">High to low ↑</option>
        <option value="desc">Low to high ↓</option>
      </select>

    </div>
  );
}
