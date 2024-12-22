#Dishcovery
Recipe Finder App

## Overview
The Recipe Finder App is a web application designed to help users discover and explore new recipes. With features such as recipe search, recommendations, and the ability to favorite recipes, this app makes cooking more enjoyable and convenient. The app integrates with the Edamam API to fetch recipe data and YouTube for recipe tutorials. Authentication is handled through Clerk, ensuring a seamless and secure user experience. User data, including favorite recipes, is stored in Firebase.

## Features
- **Landing Page:** Includes a navbar with links to Home, About Us, Features, Contact Us, Login, and Sign Up.
- **Search Recipes:** Use the search bar to find recipes based on ingredients or keywords.
- **Recommended Recipes:** Explore curated recipe suggestions on the home page.
- **Favorite Recipes:** Save your favorite recipes for quick access,stored in Firebase.
- **YouTube Integration:** Redirect to YouTube videos for detailed recipe tutorials.
- **User Authentication:** Secure login and signup using Clerk.
- **Navigation Bar(Post Login):** Access Home, Favorites, Profile, and Logout options after logging in.

## Tech Stack
- **Frontend:** React, JavaScript, Vite, Tailwind CSS
- **API Integration:** Edamam API for recipes, YouTube for video tutorials
- **Authentication:** Clerk
- **Database:** Firebase for storing favorite recipes
- **Hosting:** Vercel for hosting the application

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abhiman-Singh/Dishcovery.git
2. Navigate to the project directory:
   ```bash
   cd recipe-finder-app
3. Install dependencies:
   ```bash
   npm install
4. Set up environment variables:
- **Create a .env file in the root directory and add the following variables:
  ```env
  VITE_API_KEY=your_edamam_api_key
  VITE_APP_ID=your_edamam_app_id
  VITE_CLERK_PUBLISHABLE_KEY=your_clerk_api
  VITE_YOUTUBE_API_KEY=your_youtube_api_key
  VITE_FIREBASE_API_KEY=your_firebase_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
  VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
  VITE_FIREBASE_APP_ID=your_firebase_app_id
5. Start the development server:
