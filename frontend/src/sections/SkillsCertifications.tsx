import React from 'react';
import { useSkills } from '../hooks/useSkills';
import { SkeletonList, SkeletonBadgeRow } from '../components/Skeleton';

// Fallback dummy data for SSR/static
const fallbackSkills = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Tailwind CSS', level: 80 },
  { name: 'Accessibility', level: 75 },
  { name: 'UI/UX Design', level: 80 },
  { name: 'Jest', level: 70 },
  { name: 'Cypress', level: 65 },
  { name: 'Git', level: 85 },
];

const softSkills = ['Communication', 'Teamwork', 'Problem Solving', 'Empathy', 'Adaptability'];

const certifications = [
  { title: 'Certified Front-End Developer', issuer: 'FreeCodeCamp', date: '2023', url: '#', logo: '/cert-fcc.png' },
  { title: 'Web Accessibility Specialist', issuer: 'IAAP', date: '2022', url: '#', logo: '/cert-iaap.png' },
  { title: 'React Professional', issuer: 'Meta', date: '2024', url: '#', logo: '/cert-meta.png' },
];

export default function SkillsCertifications() {
  const { data, isLoading, isError, refetch } = useSkills();
  const skills = data?.items?.length ? data.items : fallbackSkills;

  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto snap-start">
      <h2 className="text-2xl font-bold mb-8">Skills & Certifications</h2>
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="font-semibold mb-4">Technical Skills</h3>
          {isLoading ? (
            <SkeletonList count={skills.length || 8} />
          ) : isError ? (
            <div role="alert" className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded mb-4">
              <span className="font-bold">Error loading skills.</span>
              <button
                onClick={() => refetch()}
                className="ml-4 px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Retry loading skills"
              >Retry</button>
            </div>
          ) : (
            <ul className="space-y-4">
              {skills.map((skill: any) => (
                <li key={skill.name} className="flex items-center justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <div className="flex-1 mx-4 h-2 bg-gray-200 dark:bg-gray-800 rounded">
                    <div className="h-2 rounded bg-blue-600" style={{ width: `${skill.level}%` }} />
                  </div>
                  <span className="text-xs text-gray-500">{skill.level}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="font-semibold mb-4">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {softSkills.map(s => (
              <span key={s} className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs">{s}</span>
            ))}
          </div>
        </div>
      </div>
      <h3 className="font-semibold mb-4">📜 Certifications & Badges</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {isLoading ? (
          <SkeletonBadgeRow count={certifications.length || 3} />
        ) : isError ? (
          <div role="alert" className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded mb-4">
            <span className="font-bold">Error loading certifications.</span>
            <button
              onClick={() => refetch()}
              className="ml-4 px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Retry loading certifications"
            >Retry</button>
          </div>
        ) : (
          certifications.map(cert => (
            <div key={cert.title} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center">
              <img src={cert.logo} alt={cert.issuer + ' logo'} className="w-16 h-16 mb-4" loading="lazy" />
              <div className="font-bold mb-1">{cert.title}</div>
              <div className="text-xs text-gray-500 mb-2">{cert.issuer} &middot; {cert.date}</div>
              <a href={cert.url} className="text-blue-600 dark:text-blue-300 underline text-xs">View Certificate</a>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
