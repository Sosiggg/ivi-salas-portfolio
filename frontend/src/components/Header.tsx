import React from 'react';

export default function Header({ onToggleTheme, darkMode }: { onToggleTheme: () => void; darkMode: boolean }) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 shadow flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl tracking-tight">Ivi Salas</span>
      </div>
      <nav aria-label="Main navigation" className="flex items-center gap-6">
        <a href="#home" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Home</a>
        <a href="#about" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">About</a>
        <a href="#skills" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Skills</a>
        <a href="#projects" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Projects</a>
        <a href="#services" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Services</a>
        <a href="#education" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Education</a>
        <a href="#contact" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Contact</a>
        <a href="/resume.pdf" download className="ml-4 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Download Resume</a>
        <button aria-label="Toggle dark mode" onClick={onToggleTheme} className="ml-2 px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          {darkMode ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
}
