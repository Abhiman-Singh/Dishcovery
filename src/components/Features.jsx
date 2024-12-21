import React from 'react';

const Features = () => {
  return (
    <section className="bg-gradient-to-r from-orange-100 via-yellow-100 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-5xl font-semibold text-orange-600 mb-8 pt-10">
          Features
        </h2>

        {/* Feature List */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start space-x-4 rounded-lg border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex-shrink-0 text-3xl text-orange-500 mb-4 sm:mb-0">
              <span>🔍</span>
            </div>
            <div className="text-left flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-orange-500 transition-colors duration-300">
                Search for Recipes by Ingredients or Cuisine
              </h3>
              <p className="text-gray-700 text-sm">
                Easily find recipes by entering the ingredients you have on hand or selecting a preferred cuisine type. Our advanced search algorithm ensures you get the most relevant and delicious results.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start space-x-4 rounded-lg border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex-shrink-0 text-3xl text-orange-500 mb-4 sm:mb-0">
              <span>💾</span>
            </div>
            <div className="text-left flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-orange-500 transition-colors duration-300">
                Save and Organize Favorite Recipes
              </h3>
              <p className="text-gray-700 text-sm">
                Bookmark and categorize your favorite recipes for quick and easy access. Create personalized collections to suit different occasions or dietary preferences.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start space-x-4 rounded-lg border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex-shrink-0 text-3xl text-orange-500 mb-4 sm:mb-0">
              <span>🥗</span>
            </div>
            <div className="text-left flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-orange-500 transition-colors duration-300">
                Browse Recipes Based on Dietary Preferences
              </h3>
              <p className="text-gray-700 text-sm">
                Filter recipes according to dietary needs such as Vegan, Keto, Gluten-Free, and more. Our extensive database ensures that you find recipes that cater to your lifestyle and health goals.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start space-x-4 rounded-lg border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex-shrink-0 text-3xl text-orange-500 mb-4 sm:mb-0">
              <span>🍏</span>
            </div>
            <div className="text-left flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-orange-500 transition-colors duration-300">
                Access Nutrition Information and Cooking Tips
              </h3>
              <p className="text-gray-700 text-sm">
                Get nutritional data and helpful cooking tips for each recipe, empowering you to make informed choices. Learn new cooking techniques and discover tips to enhance your culinary skills.
              </p>
            </div>
          </div>

          

          <div className="flex flex-col sm:flex-row items-start space-x-4 rounded-lg border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex-shrink-0 text-3xl text-orange-500 mb-4 sm:mb-0">
              <span>🤝</span>
            </div>
            <div className="text-left flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-orange-500 transition-colors duration-300">
                Community and Sharing
              </h3>
              <p className="text-gray-700 text-sm">
                Connect with a community of fellow food enthusiasts. Share your favorite recipes, get feedback, and discover new culinary inspirations from others.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
