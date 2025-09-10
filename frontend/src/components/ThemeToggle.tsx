import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = theme === 'system' ? systemTheme : theme;

  if (!mounted) return null;

  const isDark = current === 'dark';
  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="text-lg"
        >
          {isDark ? '🌙' : '☀️'}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
