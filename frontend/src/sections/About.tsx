import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center snap-start">
      <img src="/ivi-about.png" alt="Ivi Salas profile" className="w-48 h-48 rounded-xl shadow-lg mx-auto md:mx-0" loading="lazy" />
      <div>
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Front-End Developer with 5+ years experience building modern, accessible, and delightful web apps. Passionate about UI/UX, performance, and inclusive design.</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
            <span className="block font-semibold">Experience</span>
            <span>5+ years</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
            <span className="block font-semibold">Location</span>
            <span>Philippines</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
            <span className="block font-semibold">Specialties</span>
            <span>React, UI/UX, Accessibility</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
            <span className="block font-semibold">Languages</span>
            <span>English, Filipino</span>
          </div>
        </div>
      </div>
    </section>
  );
}
