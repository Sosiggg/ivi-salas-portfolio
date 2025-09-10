import Head from 'next/head';
import { Layout } from '../components/Layout';
import { useExperiences } from '../hooks/useExperiences';

export default function ExperiencePage() {
  const { data, isLoading, isError } = useExperiences();
  return (
    <Layout>
      <Head><title>Experience</title></Head>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Experience</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-500">Failed to load experience.</p>}
        <ul className="space-y-6">
          {data?.items.map(e => (
            <li key={e.id} className="p-4 border rounded border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold">{e.role} @ {e.company}</h2>
              <p className="text-xs opacity-70">{e.start_date} – {e.end_date || 'Present'}</p>
              {e.description && <p className="text-sm mt-2 whitespace-pre-line">{e.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
