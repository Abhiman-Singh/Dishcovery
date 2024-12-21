import React, { useState } from 'react';
import { Filter, X, Sliders, Clock, ChefHat, Flag, Heart } from 'lucide-react';
import Badge from './Badge';  // Updated import path

const FilterModal = ({ onApplyFilters, activeFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    diet: activeFilters?.diet || '',
    health: activeFilters?.health || '',
    cuisine: activeFilters?.cuisine || '',
    mealType: activeFilters?.mealType || '',
    maxTime: activeFilters?.maxTime || 120,
    excludeIngredients: activeFilters?.excludeIngredients || '',
    calories: activeFilters?.calories || { min: 0, max: 1000 },
    sort: activeFilters?.sort || 'relevance'
  });

  const dietOptions = ['Balanced', 'High-Protein', 'Low-Carb', 'Low-Fat', 'Vegan', 'Vegetarian'];
  const healthOptions = ['Dairy-Free', 'Gluten-Free', 'Nut-Free', 'Soy-Free', 'Sugar-Conscious'];
  const cuisineTypes = ['American', 'Asian', 'British', 'Caribbean', 'Central European', 'Chinese', 'French', 'Indian', 'Italian', 'Mexican'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Teatime'];
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'time', label: 'Cooking Time' },
    { value: 'calories', label: 'Calories' }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCaloriesChange = (type) => (e) => {
    const value = parseInt(e.target.value) || 0;
    setFilters(prev => ({
      ...prev,
      calories: {
        ...prev.calories,
        [type]: value
      }
    }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.diet) count++;
    if (filters.health) count++;
    if (filters.cuisine) count++;
    if (filters.mealType) count++;
    if (filters.maxTime < 120) count++;
    if (filters.excludeIngredients) count++;
    if (filters.calories.min > 0 || filters.calories.max < 1000) count++;
    return count;
  };

  const resetFilters = () => {
    setFilters({
      diet: '',
      health: '',
      cuisine: '',
      mealType: '',
      maxTime: 120,
      excludeIngredients: '',
      calories: { min: 0, max: 1000 },
      sort: 'relevance'
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-full hover:bg-gray-50 transition"
      >
        <Filter size={20} />
        <span className="hidden md:inline">Filters</span>
        {getActiveFilterCount() > 0 && (
          <Badge variant="secondary" className="ml-1">
            {getActiveFilterCount()}
          </Badge>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full md:w-[480px] h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Filters</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Sliders size={16} />
                <span>Sort by</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFilters(prev => ({ ...prev, sort: option.value }))}
                    className={`px-4 py-2 rounded-full text-sm ${
                      filters.sort === option.value 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ChefHat size={16} className="text-gray-500" />
                  <label className="text-sm text-gray-500">Diet</label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dietOptions.map(diet => (
                    <button
                      key={diet}
                      onClick={() => setFilters(prev => ({ 
                        ...prev, 
                        diet: prev.diet === diet ? '' : diet 
                      }))}
                      className={`px-4 py-2 rounded-full text-sm ${
                        filters.diet === diet 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heart size={16} className="text-gray-500" />
                  <label className="text-sm text-gray-500">Health Labels</label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {healthOptions.map(health => (
                    <button
                      key={health}
                      onClick={() => setFilters(prev => ({ 
                        ...prev, 
                        health: prev.health === health ? '' : health 
                      }))}
                      className={`px-4 py-2 rounded-full text-sm ${
                        filters.health === health 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {health}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Flag size={16} className="text-gray-500" />
                  <label className="text-sm text-gray-500">Cuisine Type</label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cuisineTypes.map(cuisine => (
                    <button
                      key={cuisine}
                      onClick={() => setFilters(prev => ({ 
                        ...prev, 
                        cuisine: prev.cuisine === cuisine ? '' : cuisine 
                      }))}
                      className={`px-4 py-2 rounded-full text-sm ${
                        filters.cuisine === cuisine 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-gray-500" />
                  <label className="text-sm text-gray-500">
                    Max Cooking Time: {filters.maxTime} minutes
                  </label>
                </div>
                <input 
                  type="range" 
                  name="maxTime"
                  min="0" 
                  max="120"
                  value={filters.maxTime}
                  onChange={handleFilterChange}
                  className="w-full accent-green-500"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0 min</span>
                  <span>2 hours</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Calories Range
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.calories.min}
                    onChange={handleCaloriesChange('min')}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.calories.max}
                    onChange={handleCaloriesChange('max')}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Exclude Ingredients
                </label>
                <input
                  type="text"
                  name="excludeIngredients"
                  value={filters.excludeIngredients}
                  onChange={handleFilterChange}
                  placeholder="e.g., nuts, dairy (comma separated)"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white pt-4 mt-6 flex gap-4">
              <button 
                onClick={resetFilters}
                className="flex-1 p-2 border rounded hover:bg-gray-50 transition"
              >
                Reset All
              </button>
              <button 
                onClick={applyFilters}
                className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterModal;