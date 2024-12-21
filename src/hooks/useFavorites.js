import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { db, auth } from '../config/firebase-config';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { signInWithCustomToken } from 'firebase/auth';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken, userId } = useAuth();

  const initializeFirebase = async () => {
    if (!userId) return;
    try {
      const token = await getToken({ template: 'integration_firebase' });
      await signInWithCustomToken(auth, token);
    } catch (error) {
      console.error('Error initializing Firebase:', error);
    }
  };

  const fetchFavorites = async () => {
    if (!userId) return;
    try {
      await initializeFirebase();
      const favoritesRef = collection(db, 'favorites');
      const q = query(favoritesRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const favoritesData = querySnapshot.docs.map(doc => doc.data().recipe);
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (recipe) => {
    if (!userId) return;
    try {
      await initializeFirebase();
      const favoriteRef = doc(db, 'favorites', `${userId}_${recipe.label}`);
      await setDoc(favoriteRef, {
        userId,
        recipe,
        createdAt: new Date().toISOString()
      });
      setFavorites(prev => [...prev, recipe]);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const removeFavorite = async (recipe) => {
    if (!userId) return;
    try {
      await initializeFirebase();
      const favoriteRef = doc(db, 'favorites', `${userId}_${recipe.label}`);
      await deleteDoc(favoriteRef);
      setFavorites(prev => prev.filter(fav => fav.label !== recipe.label));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const isFavorite = (recipe) => {
    return favorites.some(fav => fav.label === recipe.label);
  };

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [userId]);

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite
  };
};