import React, { createContext } from 'react';
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from 'styles/theme';
import { useDarkMode } from 'library/hooks/useDarkMode';

export const ThemeContext = createContext();

export default function DarkModeProvider({ children }) {
  const { isDark, toggleTheme } = useDarkMode(false);
  const theme = isDark ? darkTheme : lightTheme;
  const themeMode = isDark ? 'dark' : 'light';

  const contextValue = { themeMode, toggleTheme };
  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
