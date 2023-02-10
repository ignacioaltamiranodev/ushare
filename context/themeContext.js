import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('darkTheme')) === 'ON') {
      setDarkTheme(true);
    }
  }, []);

  useEffect(() => {
    darkTheme
      ? localStorage.setItem('darkTheme', JSON.stringify('ON'))
      : localStorage.setItem('darkTheme', JSON.stringify('OFF'));
  }, [darkTheme]);

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const data = { darkTheme, toggleDarkTheme };
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
