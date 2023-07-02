import useDarkMode from '../../hooks/useDarkMode';
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext<string>('light');
const ThemeDispatchContext = createContext<(() => void) | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, ToggleTheme } = useDarkMode();
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={ToggleTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export const useToggleTheme = () => useContext(ThemeDispatchContext);

export default ThemeProvider;
