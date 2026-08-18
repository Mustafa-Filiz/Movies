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

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<number[]>([]);

  const loadFavourites = useCallback(async () => {
    try {
      const storedFavourites = await AsyncStorage.getItem("favourites");
      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
      }
    } catch (error) {
      console.error("Failed to load favourites", error);
    }
  }, []);

  const saveFavourites = async (newFavourites: number[]) => {
    try {
      await AsyncStorage.setItem("favourites", JSON.stringify(newFavourites));
    } catch (error) {
      console.error("Failed to save favourites", error);
    }
  };

  const addToFavourites = async (movieId: number) => {
    if (!isFavourite(movieId)) {
      const newFavourites = [...favourites, movieId];
      setFavourites(newFavourites);
      await saveFavourites(newFavourites);
    }
  };

  const removeFromFavourites = async (movieId: number) => {
    const newFavourites = favourites.filter((id) => id !== movieId);
    setFavourites(newFavourites);
    await saveFavourites(newFavourites);
  };

  const toggleFavourite = async (movieId: number) => {
    if (isFavourite(movieId)) {
      removeFromFavourites(movieId);
    } else {
      addToFavourites(movieId);
    }
  };

  const isFavourite = (movieId: number) => {
    return favourites.includes(movieId);
  };

  return {
    favourites,
    loadFavourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
    toggleFavourite,
  };
};
