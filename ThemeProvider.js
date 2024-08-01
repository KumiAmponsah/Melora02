import React, { createContext, useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('gradient'); // Default theme

  const themeStyles = useMemo(() => {
    return theme === 'gradient' ? styles.gradient : styles.blue;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeStyles }}>
      <View style={themeStyles.container}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  gradient: {
    container: {
      flex: 1,
      backgroundColor: '#e0f7fa', // Example gradient color
    },
  },
  blue: {
    container: {
      flex: 1,
      backgroundColor: '#007BFF', // Blue color
    },
  },
});

export default ThemeProvider;
