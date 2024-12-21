import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../libs/utils";
import { useFavorites } from '../hooks/useFavorites';

const FavoritesPage = () => {
    const { favorites, loading } = useFavorites();

    if (loading) {
        return (
            <div className='bg-[#faf9fb] flex-1 p-10 min-h-screen flex items-center justify-center'>
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className='bg-[#faf9fb] flex-1 p-10 min-h-screen'>
            <div className='max-w-screen-lg mx-auto'>
                <p className='font-bold text-3xl md:text-5xl my-4 pt-10'>My Favorites</p>

                {favorites.length === 0 && (
                    <div className='h-[80vh] flex flex-col items-center justify-center gap-4'>
                        <img 
                            src='/404.svg' 
                            className='h-64 max-w-full' 
                            alt='No favorites found' 
                        />
                        <p className="text-gray-500 text-xl">No favorite recipes yet</p>
                    </div>
                )}

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {favorites.map((recipe) => (
                        <RecipeCard 
                            key={recipe.uri || recipe.label} 
                            recipe={recipe} 
                            {...getRandomColor()} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;