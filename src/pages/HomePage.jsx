import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import FilterModal from "../components/FilterModal";
import { useEffect, useState } from "react";
import { getRandomColor } from "../libs/utils";
import { useAuth } from "@clerk/clerk-react";


const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("paneer");
  const [activeFilters, setActiveFilters] = useState({
    diet: '',
    health: '',
    cuisine: '',
    mealType: '',
    maxTime: 120
  });
  const { isSignedIn } = useAuth();
  const [popularCategories] = useState([
	  { name: 'Vegetarian', icon: '🥗' },
	  { name: 'Desserts', icon: '🍰' },
	  { name: 'Quick Meals', icon: '⏱️' },
	  { name: 'Healthy', icon: '💪' },
	  { name: 'Comfort Food', icon: '🍲' },
	  { name: 'Gluten-Free', icon: '🌾' }
	]);

  const buildQueryParams = (baseQuery, filters) => {
    let params = new URLSearchParams({
      type: 'public',
      q: baseQuery,
      app_id: APP_ID,
      app_key: APP_KEY
    });

    if (filters.diet) params.append('diet', filters.diet.toLowerCase());
    if (filters.health) params.append('health', filters.health.toLowerCase());
    if (filters.cuisine) params.append('cuisineType', filters.cuisine.toLowerCase());
    if (filters.mealType) params.append('mealType', filters.mealType.toLowerCase());
    if (filters.maxTime < 120) params.append('time', `0-${filters.maxTime}`);

    return params.toString();
  };

  const fetchRecipes = async (query = searchQuery, filters = activeFilters) => {
    setLoading(true);
    setRecipes([]);
    try {
      const queryParams = buildQueryParams(query, filters);
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?${queryParams}`
      );
      const data = await res.json();
      setRecipes(data.hits || []);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    const newQuery = e.target[0].value;
    setSearchQuery(newQuery);
    fetchRecipes(newQuery);
  };

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
    fetchRecipes(searchQuery, newFilters);
  };

  return (
    <div className="bg-[#faf9fb] p-6 md:p-10 min-h-screen flex flex-col">
      <div className="max-w-screen-lg mx-auto pt-16">
        <div className="flex gap-4 items-center mb-6">
          <form onSubmit={handleSearchRecipe} className="flex-1">
            <label className="flex items-center bg-white shadow-lg px-4 py-2 rounded-full">
              <Search size={24} className="text-gray-500" />
              <input
                type="text"
                className="text-sm md:text-md flex-grow outline-none px-4 bg-transparent"
                placeholder="What do you want to cook today?"
              />
            </label>
          </form>
          <FilterModal onApplyFilters={handleApplyFilters} />
        </div>

        <div className="flex flex-col items-center mb-8">
  <div className="mt-12 w-full px-4 md:px-8">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
      Popular Categories
    </h2>
    <div className="flex flex-wrap justify-center gap-4">
      {popularCategories.map((category, index) => (
        <button
          key={index}
          onClick={() => fetchRecipes(category.name)}
          className="flex items-center bg-white shadow-md rounded-lg px-4 py-2 hover:bg-orange-50 transition-colors"
        >
          <span className="mr-2 text-xl">{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  </div>
  {Object.values(activeFilters).some(value => value !== '' && value !== 120) && (
    <div className="mt-4 text-sm md:text-base text-slate-600">
      Showing filtered results
    </div>
  )}
</div>

		

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			
          {!loading &&
            recipes.map(({ recipe }, index) => (
              <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
            ))}

          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col gap-3 animate-pulse">
                <div className="bg-gray-200 rounded-lg h-32 w-full"></div>
                <div className="flex justify-between">
                  <div className="bg-gray-200 rounded-full h-4 w-24"></div>
                  <div className="bg-gray-200 rounded-full h-4 w-20"></div>
                </div>
                <div className="bg-gray-200 rounded-full h-4 w-1/2"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;