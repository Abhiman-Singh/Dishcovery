import React from "react";
import { Home, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";


const Homenavbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/dashboard/homepage" className="flex items-center">
              <img
                src={'/logo.png'}
                alt="DishCovery Logo"
                className="h-8 w-8 rounded-full border-2 border-orange-500"
              />
              <span className="text-orange-500 font-bold ml-2 hidden sm:block">
                DishCovery
              </span>
            </Link>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden sm:flex items-center space-x-8">
            <Link
              to="/dashboard/homepage"
              className={`flex items-center gap-2 hover:text-orange-500 transition-colors ${
                location.pathname === '/dashboard/homepage' ? 'text-orange-500' : ''
              }`}
            >
              <Home size={20} />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              to="/dashboard/favorites"
              className={`flex items-center gap-2 hover:text-orange-500 transition-colors ${
                location.pathname === '/dashboard/favorites' ? 'text-orange-500' : ''
              }`}
            >
              <Heart size={20} />
              <span className="font-medium">Favorites</span>
            </Link>
          </div>

          {/* User Button */}
          <div className="flex items-center">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/dashboard/homepage"
            className={`flex flex-col items-center p-2 ${
              location.pathname === '/dashboard/homepage' ? 'text-orange-500' : ''
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/dashboard/favorites"
            className={`flex flex-col items-center p-2 ${
              location.pathname === '/dashboard/favorites' ? 'text-orange-500' : ''
            }`}
          >
            <Heart size={24} />
            <span className="text-xs mt-1">Favorites</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Homenavbar;