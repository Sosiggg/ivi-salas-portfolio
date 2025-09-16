import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 snap-start">
      <img src="/ivi-headshot.png" alt="Ivi Susej Marie E. Salas headshot" className="w-32 h-32 rounded-full mb-6 shadow-lg" loading="lazy" />
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">Hi, I’m Ivi Susej Marie E. Salas — Front-End Developer</h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center mb-8 max-w-xl">I build beautiful, accessible, and performant web experiences.</p>
      <div className="flex gap-4">
        <a href="#projects" className="px-6 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">View Projects</a>
        <a href="/resume.pdf" download className="px-6 py-3 rounded bg-gray-100 dark:bg-gray-800 text-blue-700 dark:text-blue-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Download Resume</a>
      </div>
    </section>
  );
}
