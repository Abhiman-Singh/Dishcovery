import React, { useState, useEffect, useCallback } from "react";
import RecipeCard from "../components/RecipeCard";

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;


const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const recipesPerPage = 6;

  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [popularCategories] = useState([
    { name: 'Vegetarian', icon: '🥗' },
    { name: 'Desserts', icon: '🍰' },
    { name: 'Quick Meals', icon: '⏱️' },
    { name: 'Healthy', icon: '💪' },
    { name: 'Comfort Food', icon: '🍲' },
    { name: 'Gluten-Free', icon: '🌾' }
  ]);

  // Comprehensive list of search terms to get diverse recipes
  const comprehensiveSearchTerms = [
    'chicken', 'pasta', 'salad', 'breakfast', 'dessert', 
    'vegetarian', 'seafood', 'smoothie', 'soup', 'sandwich',
    'pizza', 'curry', 'steak', 'sushi', 'burger',
    'vegan', 'mexican', 'italian', 'indian', 'thai',
    'cake', 'salmon', 'ramen', 'tacos', 'risotto'
  ];

 // Debounce utility function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch Featured Recipes with Dynamic Randomization
  const fetchFeaturedRecipes = useCallback(async () => {
    // Shuffle search terms and take first 5
    const shuffledTerms = comprehensiveSearchTerms
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    try {
      // Fetch recipes for each random term
      const featuredRecipesPromises = shuffledTerms.map(async (term) => {
        const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${term}&to=1`;
        const response = await fetch(url);
        const data = await response.json();
        
        return data.hits.length > 0 ? data.hits[0].recipe : null;
      });

      const fetchedRecipes = await Promise.all(featuredRecipesPromises);
      const validRecipes = fetchedRecipes.filter(recipe => recipe !== null);
      
      // Ensure we have exactly 5 recipes, if not, retry
      if (validRecipes.length < 5) {
        console.warn('Not enough unique recipes found. Retrying...');
        return fetchFeaturedRecipes();
      }
      
      setFeaturedRecipes(validRecipes);
    } catch (error) {
      console.error("Error fetching featured recipes:", error);
    }
  }, []);

  // Fetch Recipes with Caching and Optimization
  const fetchRecipes = useCallback(async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setRecipes([]);
    setVisibleRecipes([]);
    setError("");
    setPage(1);
    setIsModalOpen(true);  // Open modal as soon as search starts

    try {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}&to=20`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        const fetchedRecipes = data.hits.map(hit => hit.recipe);
        setRecipes(fetchedRecipes);
        setVisibleRecipes(fetchedRecipes.slice(0, recipesPerPage));
      } else {
        setError("No recipes found. Try different ingredients or keywords.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch featured recipes on component mount
  useEffect(() => {
    fetchFeaturedRecipes();
  }, [fetchFeaturedRecipes]);

  

  const loadMoreRecipes = () => {
    const nextPage = page + 1;
    const startIndex = nextPage * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    
    const newVisibleRecipes = recipes.slice(0, endIndex);
    setVisibleRecipes(newVisibleRecipes);
    setPage(nextPage);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await fetchRecipes(searchQuery);
    }
  };


  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 -z-10"
        style={{
          backgroundImage: `url('/bgimage.jpg')`,
        }}
      />
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Discover Your Next 
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-800 mt-2">
            Culinary Adventure
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Explore a world of flavors. Search recipes by ingredients, cuisines, or dietary preferences and transform your cooking experience.
        </p>

        <div className="bg-white shadow-xl rounded-xl p-6 max-w-xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter ingredients, cuisine, or dish name"
            className="flex-grow py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            disabled={!searchQuery.trim()}
            className="w-full md:w-auto py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
          >
            Find Recipes
          </button>
        </form>

        </div>

        <div className="mt-12 pt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 pt-10 ">
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

        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Featured Recipes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {featuredRecipes.map((recipe, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105"
              >
                <img 
                  src={recipe.image} 
                  alt={recipe.label} 
                  className="w-full h-36 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold mb-2 truncate">{recipe.label}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">
                      {recipe.mealType?.[0] || 'Recipe'}
                    </span>
                    <button 
                      onClick={() => window.open(recipe.url, '_blank')}
                      className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs hover:bg-orange-600"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {loading ? "Searching..." : `${recipes.length} Recipes Found`}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-3xl text-gray-500 hover:text-gray-800 transition-colors"
                >
                  &times;
                </button>
              </div>

              <div className="p-6">
                {loading && (
                  <div className="text-center py-8 text-gray-500">
                    Loading delicious recipes...
                  </div>
                )}

                {error && (
                  <div className="text-center py-8 text-red-500">
                    {error}
                  </div>
                )}

                {!loading && !error && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {visibleRecipes.map((recipe, index) => (
                        <RecipeCard 
                          key={index} 
                          recipe={recipe} 
                          bg="bg-gray-50" 
                          badge="bg-green-100" 
                        />
                      ))}
                    </div>

                    {visibleRecipes.length < recipes.length && (
                      <div className="text-center">
                        <button
                          onClick={loadMoreRecipes}
                          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Load More Recipes
                        </button>
                      </div>
                    )}

                    {visibleRecipes.length === recipes.length && visibleRecipes.length > 0 && (
                      <div className="text-center text-gray-500">
                        You've reached the end of the recipes
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default HeroSection;