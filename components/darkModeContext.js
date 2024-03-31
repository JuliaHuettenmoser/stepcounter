// darkModeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadDarkModeSetting = async () => {
      const savedIsDarkMode = await AsyncStorage.getItem('@isDarkMode');
      if (savedIsDarkMode !== null) {
        setIsDarkMode(savedIsDarkMode === 'true');
      }
    };

    loadDarkModeSetting();
  }, []);

  const toggleDarkMode = async () => {
    setIsDarkMode(!isDarkMode);
    await AsyncStorage.setItem('@isDarkMode', (!isDarkMode).toString());
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
