import Head from 'next/head';
import { Layout } from '../components/Layout';
import { useEducation } from '../hooks/useEducation';

export default function EducationPage() {
  const { data, isLoading, isError } = useEducation();
  return (
    <Layout>
      <Head><title>Education</title></Head>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Education</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-500">Failed to load education entries.</p>}
        <ul className="space-y-6">
          {data?.items.map(ed => (
            <li key={ed.id} className="p-4 border rounded border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold">{ed.degree} @ {ed.institution}</h2>
              <p className="text-xs opacity-70">{ed.start_date} – {ed.end_date || 'Present'}</p>
              {/* Description field not exposed in current Education schema */}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
