'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { RiSunFill, RiMoonFill } from 'react-icons/ri';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="absolute right-5 w-fit cursor-pointer rounded-md bg-gray04 p-2 duration-200 hover:scale-110 active:scale-100 dark:bg-gray12 z-100 sm-max:right-16"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'light' ? (
        <RiSunFill className="text-gray11 h-4 w-4 dark:text-white" />
      ) : (
        <RiMoonFill className="text-gray11 h-4 w-4 dark:text-white" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
