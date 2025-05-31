import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Noodle } from '../types';

const FAVOURITES_KEY = 'NoodlesData';

const useFavourites = () => {
  const [favourites, setFavourites] = useState<Noodle[]>([]);

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const stored = await AsyncStorage.getItem(FAVOURITES_KEY);
        if (stored) {
          setFavourites(JSON.parse(stored));
        }
      } catch (err) {
        console.warn('Failed to load favourites:', err);
      }
    };

    loadFavourites();
  }, []);

  useEffect(() => {
    const saveFavourites = async () => {
      try {
        await AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
      } catch (err) {
        console.warn('Failed to save favourites:', err);
      }
    };
    saveFavourites();
  }, [favourites]);

  const markFavourite = (item: Noodle) => {
    setFavourites((prev) => ([...prev, item]));
  };

  const unmarkFavourite = (item: Noodle) => {
    setFavourites((prev) => prev.filter((_item) => _item.id !== item.id));
  };

  const isFavourite = (item: Noodle) => {
    const foundedIndex = favourites.findIndex((_item) => _item.id === item.id)
    return foundedIndex > -1
  };

  return {
    favourites,
    markFavourite,
    unmarkFavourite,
    isFavourite,
  };
};

export default useFavourites;
