import Head from 'next/head';
import { Layout } from '../components/Layout';
import { useSkills } from '../hooks/useSkills';

export default function SkillsPage() {
  const { data, isLoading, isError } = useSkills();
  return (
    <Layout>
      <Head><title>Skills</title></Head>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Skills</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-500">Failed to load skills.</p>}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.items.map(s => (
            <div key={s.id} className="p-4 border rounded border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold">{s.name}</h2>
              <p className="text-xs opacity-70">{s.category}</p>
              {s.level && <p className="text-xs mt-1">Level: {s.level}</p>}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
