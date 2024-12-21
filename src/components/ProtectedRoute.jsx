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