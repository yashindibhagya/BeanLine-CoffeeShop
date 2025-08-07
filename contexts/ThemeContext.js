import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const lightTheme = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#000000',
  textTertiary: '#888888',
  border: '#DDDDDD',
  primary: '#D2691E',
  gray400: '#CCCCCC',
  error: '#FF5252',
  typography: {
    body: { fontSize: 16 },
  },
};

const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textTertiary: '#AAAAAA',
  border: '#333333',
  primary: '#FF8C00',
  gray400: '#666666',
  error: '#FF6E6E',
  typography: {
    body: { fontSize: 16 },
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
