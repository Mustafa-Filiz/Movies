import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites", error);
    }
  }, []);

  const saveFavorites = async (newFavorites: number[]) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save favorites", error);
    }
  };

  const addToFavorites = async (movieId: number) => {
    if (!isFavorite(movieId)) {
      const newFavorites = [...favorites, movieId];
      setFavorites(newFavorites);
      await saveFavorites(newFavorites);
    }
  };

  const removeFromFavorites = async (movieId: number) => {
    const newFavorites = favorites.filter((id) => id !== movieId);
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const isFavorite = (movieId: number) => {
    return favorites.includes(movieId);
  };

  return {
    favorites,
    loadFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};
