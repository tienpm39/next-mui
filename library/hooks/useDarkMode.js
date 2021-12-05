import { useEffect, useState } from 'react';

export const useDarkMode = (initial = false) => {
    const [isDark, setIsDark] = useState(initial);
    const setTheme = mode => mode === 'dark' ? setIsDark(true) : setIsDark(false);
    const setMode = mode => {
      mode === window.localStorage.setItem('theme', mode);
      setTheme(mode);
    }
    const toggleTheme = () => {
      if (isDark) {
        setMode('light')
      } else {
        setMode('dark')
      }
    }
    useEffect(() => {
      const localTheme = window.localStorage.getItem('theme');
      localTheme && setTheme(localTheme)
    },[]);

    return { isDark, toggleTheme };
}