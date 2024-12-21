// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

// Import all necessary pages
import LandingPage from './pages/LandingPage';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';

const ProtectedRoute = () => {
  return (
    <>
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <Navigate to="/" replace />
      </SignedOut>
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route index element={<HomePage />} />
        <Route path="homepage" element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />

      </Route>
    </Routes>
  );
};

export default App;