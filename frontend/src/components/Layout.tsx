
import React, { useState, useEffect } from 'react';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) setDarkMode(stored === 'dark');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleToggleTheme = () => {
    setDarkMode((prev) => {
      localStorage.setItem('theme', !prev ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', !prev);
      return !prev;
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header onToggleTheme={handleToggleTheme} darkMode={darkMode} />
      <main>{children}</main>
    </div>
  );
}
