
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
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link absolute left-2 top-2 z-50 bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sr-only focus:not-sr-only"
        tabIndex={0}
      >
        Skip to main content
      </a>
      <Header onToggleTheme={handleToggleTheme} darkMode={darkMode} />
      <main id="main-content" role="main" aria-label="Main content">
        {children}
      </main>
      {/* Reduced motion support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
