import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Preferences = {
  unit: 'metric' | 'imperial';
  setUnit: (unit: 'metric' | 'imperial') => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
};

const PreferencesContext = createContext<Preferences | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unit, setUnitState] = useState<'metric' | 'imperial'>('metric');
  const [categories, setCategoriesState] = useState<string[]>([]);

  // Load from AsyncStorage 
  useEffect(() => {
    const loadPrefs = async () => {
      const storedUnit = await AsyncStorage.getItem('unit');
      const storedCategories = await AsyncStorage.getItem('categories');

      if (storedUnit === 'metric' || storedUnit === 'imperial') {
        setUnitState(storedUnit);
      }

      if (storedCategories) {
        try {
          setCategoriesState(JSON.parse(storedCategories));
        } catch {
          setCategoriesState([]);
        }
      }
    };

    loadPrefs();
  }, []);

  const setUnit = async (newUnit: 'metric' | 'imperial') => {
    await AsyncStorage.setItem('unit', newUnit);
    setUnitState(newUnit);
  };

  const setCategories = async (newCategories: string[]) => {
    await AsyncStorage.setItem('categories', JSON.stringify(newCategories));
    setCategoriesState(newCategories);
  };

  return (
    <PreferencesContext.Provider value={{ unit, setUnit, categories, setCategories }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error('usePreferences must be used within PreferencesProvider');
  return context;
};
