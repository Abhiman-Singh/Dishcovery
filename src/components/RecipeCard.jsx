import {Heart,  HeartPulse, Soup, InfoIcon, Clock, X, ExternalLink, Youtube,ChefHat,Share2,Info,ArrowLeft, Users,Copy} from "lucide-react";
import { useState } from "react";
import { useAuth, SignInButton, useClerk } from "@clerk/clerk-react";
import { AiFillFire, AiOutlineFieldTime, AiOutlineCheckSquare } from "react-icons/ai";
import { BiDish } from "react-icons/bi";
import { GiWeightScale } from "react-icons/gi";
import { BsArrowLeft } from "react-icons/bs";
import { useFavorites } from '../hooks/useFavorites';



const getTwoValuesFromArray = (arr) => {
    return arr.slice(0, 2);
};

const RecipeCard = ({ recipe, bg = "bg-white", badge = "bg-green-100" }) => {
    const healthLabels = getTwoValuesFromArray(recipe.healthLabels || []);
    const { isSignedIn } = useAuth();
    const { openSignIn } = useClerk();
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false); // For video modal
    const [videoUrl, setVideoUrl] = useState(""); // Store the video URL for iframe
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    

    const handleAuthRequired = (action) => {
        if (!isSignedIn) {
            openSignIn();
            return false;
        }
        return true;
    };

    const handleFavoriteClick = async () => {
      if (!isSignedIn) {
          openSignIn();
          return;
      }
      
      if (isFavorite(recipe)) {
          await removeFavorite(recipe);
      } else {
          await addFavorite(recipe);
      }
  };

    const handleDetailsClick = (e) => {
        e.preventDefault();
        if (!handleAuthRequired("view details")) return;
        setShowDetailsModal(true);
    };

    const handleYouTubeClick = async (e) => {
        e.preventDefault();
        if (!handleAuthRequired("search YouTube")) return;

        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        const query = `${recipe.label} recipe`;
        const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}`;

        try {
            const response = await fetch(youtubeUrl);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const videoId = data.items[0].id.videoId;
                const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`;

                const videoDetailsResponse = await fetch(videoDetailsUrl);
                const videoDetails = await videoDetailsResponse.json();

                if (videoDetails.items && videoDetails.items.length > 0) {
                    // Set the video URL for iframe
                    const video = videoDetails.items[0];
                    const views = video.statistics.viewCount;
                    setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
                    setShowVideoModal(true); // Show the video modal
                }
            } else {
                alert("No YouTube videos found for this recipe.");
            }
        } catch (error) {
            console.error("Error fetching YouTube data:", error);
            alert("There was an error fetching YouTube data.");
        }
    };

    const closeModal = () => {
        setShowDetailsModal(false);
    };
    const closeVideoModal = () => {
        setShowVideoModal(false); // Close video modal
        setVideoUrl(""); // Reset video URL
    };

    return (
        <>
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={recipe.image}
                        alt={recipe.label}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <ChefHat size={14} className="text-orange-500" />
                            {(recipe.cuisineType && recipe.cuisineType[0]) || "General"}
                        </div>
                        <button
            onClick={handleFavoriteClick}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200"
        >
            <Heart
                size={18}
                className={`${isFavorite(recipe) ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"}`}
            />
        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                        {recipe.label}
                    </h3>

                    {/* Health Labels */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {healthLabels.map((label, idx) => (
                            <div
                                key={idx}
                                className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1"
                            >
                                <HeartPulse size={12} />
                                {label}
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                        <button
                            onClick={handleDetailsClick}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex justify-center items-center gap-2 text-sm font-medium"
                        >
                            <InfoIcon size={16} />
                            Details
                        </button>
                        <button
                            onClick={handleYouTubeClick}
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 flex justify-center items-center gap-2 text-sm font-medium"
                        >
                            <Youtube size={16} />
                            Video
                        </button>
                    </div>
                </div>
            </div>

            {showDetailsModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg w-full max-w-4xl relative">
                        <button
                            onClick={() => setShowDetailsModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <RecipeDetailsModal 
                            recipe={recipe} 
                            onClose={() => setShowDetailsModal(false)}
                            isFavorite={isFavorite(recipe)}
                            onFavoriteClick={handleFavoriteClick}
                        />
                    </div>
                </div>
            )}

            {/* Video Modal */}
            {showVideoModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative">
                        <button
                            onClick={closeVideoModal}
                            className="absolute top-2 right-2 text-black text-xl"
                        >
                            ×
                        </button>
                        <iframe
                            width="100%"
                            height="400"
                            src={videoUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
};

const RecipeDetailsModal = ({ recipe, onClose, isFavorite, onFavoriteClick }) => {
   
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [activeTab, setActiveTab] = useState('ingredients');
    const { isSignedIn } = useAuth();
    const { openSignIn } = useClerk();

    const handleShare = async (platform) => {
        const recipeUrl = recipe.url;
        const shareText = `Check out this amazing recipe for ${recipe.label}!`;
        
        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(recipeUrl)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + recipeUrl)}`, '_blank');
                break;
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent('Check out this recipe!')}&body=${encodeURIComponent(shareText + '\n\n' + recipeUrl)}`;
                break;
            case 'copy':
                try {
                    await navigator.clipboard.writeText(recipeUrl);
                    alert('Link copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
                break;
        }
        setShowSharePopup(false);
    };

    const addRecipeToFavorites = () => {
        if (!isSignedIn) {
            openSignIn();
            return;
        }

        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.label === recipe.label);

        if (isRecipeAlreadyInFavorites) {
            favorites = favorites.filter((fav) => fav.label !== recipe.label);
            setIsFavorite(false);
        } else {
            favorites.push(recipe);
            setIsFavorite(true);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    const groupIngredientsByCategory = (ingredients) => {
        return ingredients.reduce((acc, ingredient) => {
            const category = ingredient.foodCategory || "Other";
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(ingredient);
            return acc;
        }, {});
    };

    const groupedIngredients = groupIngredientsByCategory(recipe.ingredients || []);
    const tempImages = recipe.images || [];
    const tempNutrients = Object.entries(recipe.digest || {});

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
    <div className="max-w-lg mx-auto px-2 sm:px-4">
      <div className="flex items-center justify-between h-12">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors md:hidden"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <h1 className="text-md font-semibold text-gray-900 truncate hidden md:block">
          {recipe?.label}
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSharePopup(true)}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded-full transition"
          >
            <Share2 size={16} />
          </button>
          <button
            onClick={onClose}
            className="hidden md:flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  </div>
    
            <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Hero Image */}
                <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
                  <img
                    src={recipe?.image}
                    alt={recipe?.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {recipe?.cuisineType?.map((cuisine, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                          {cuisine}
                        </span>
                      ))}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                      {recipe?.label}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{recipe?.totalTime || 0} mins</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{recipe.yield} servings</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat size={16} />
                        <span>{recipe?.dishType?.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
    
                {/* Content Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex overflow-x-auto">
                    {['ingredients', 'nutrition', 'health'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 md:px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                          activeTab === tab
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
    
                {/* Tab Content */}
                <div className="p-4 md:p-6">
                  {activeTab === 'ingredients' && (
                    <div className="space-y-6">
                      {Object.entries(groupedIngredients).map(([category, ingredients]) => (
                        <div key={category}>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">{category}</h3>
                          <ul className="space-y-3">
                            {ingredients.map((ingredient, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 mt-0.5" />
                                <span className="text-gray-700 text-sm md:text-base">{ingredient.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
    
                  {activeTab === 'nutrition' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tempNutrients.map(([key, nutrient]) => (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-600 mb-1">{nutrient.label}</h3>
                          <p className="text-xl font-bold text-gray-900">
                            {Math.round(nutrient.total / (recipe.yield || 1))}
                            <span className="text-sm font-normal text-gray-500 ml-1">
                              {nutrient.unit}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
    
                  {activeTab === 'health' && (
                    <div className="flex flex-wrap gap-2">
                      {recipe?.healthLabels?.map((label, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                          {label.replace("-", " ")}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
    
                {/* Action Buttons */}
                <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                        onClick={onFavoriteClick}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
                            isFavorite 
                                ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                    >
                        <Heart size={20} className={isFavorite ? "fill-red-600" : ""} />
                        {isFavorite ? "Saved to Favorites" : "Save Recipe"}
                    </button>
                    <button
                      onClick={() => window.open(recipe?.url, '_blank', 'noopener,noreferrer')}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <Info size={20} />
                      View Original Recipe
                    </button>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Share Modal */}
            {showSharePopup && (
              <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white rounded-xl p-6 w-full max-w-sm relative">
                  <button
                    onClick={() => setShowSharePopup(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <X size={20} />
                  </button>
                  <h3 className="text-xl font-bold mb-6">Share Recipe</h3>
                  <div className="grid gap-3">
  {[
    { name: "Facebook", color: "bg-[#1877F2]", hover: "hover:bg-[#1664D9]" },
    { name: "Twitter", color: "bg-[#1DA1F2]", hover: "hover:bg-[#1A8CD8]" },
    { name: "WhatsApp", color: "bg-[#25D366]", hover: "hover:bg-[#20BD5B]" },
    { name: "Email", color: "bg-[#EA4335]", hover: "hover:bg-[#D33C2F]" },
  ].map(({ name, color, hover }) => (
    <button
      key={name}
      onClick={() => handleShare(name.toLowerCase())}
      className={`${color} ${hover} text-black py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition`}
    >
      {name}
    </button>
  ))}
  {/* Replace Copy Link Button with Input and Copy Icon */}
  <div className="relative flex items-center bg-gray-100 py-3 px-4 rounded-lg">
    <input
      type="text"
      value={recipe.url}
      readOnly
      className="flex-grow bg-transparent text-gray-900 text-sm outline-none"
    />
    <button
      onClick={() => handleShare('copy')}
      className="ml-2 text-gray-500 hover:text-gray-700"
    >
      <Copy size={20} />
    </button>
  </div>
</div>

                </div>
              </div>
            )}
          </div>
        </div>
      );
    
};


export default RecipeCard;