import { useEffect, useState } from 'react';
import useMedia from './useMedia';

const useDarkMode = (): {
  theme: string;
  ToggleTheme: () => void;
} => {
  const [theme, setTheme] = useState('light');

  const prefersDarkMode = useMedia<boolean>(
    ['(prefers-color-scheme: dark)'],
    [true],
    false,
  );

  const ToggleTheme = (): void => {
    const root = document.documentElement;
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      root.setAttribute('data-mode', 'dark');
      setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      root.setAttribute('data-mode', 'light');
      setTheme('light');
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    const localTheme = window.localStorage.getItem('theme');

    let innerTheme = 'light';
    if (localTheme) {
      innerTheme = localTheme;
    } else if (prefersDarkMode) {
      innerTheme = 'dark';
    }
    root.setAttribute('data-mode', innerTheme);
    setTheme(innerTheme);
  }, [prefersDarkMode]);

  return {
    theme,
    ToggleTheme,
  };
};

export default useDarkMode;
