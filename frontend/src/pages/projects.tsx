import React, { useState } from 'react';
import Head from 'next/head';
import { useProjects } from '../hooks/useProjects';
import { Layout } from '../components/Layout';

export default function ProjectsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isError } = useProjects(page, limit);

  return (
    <Layout>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-500">Failed to load projects.</p>}
        {data && (
          <>
            <ul className="space-y-4">
              {data.items.map(p => (
                <li key={p.id} className="p-4 rounded border border-gray-200 dark:border-gray-700 hover:shadow transition">
                  <h2 className="text-xl font-semibold">{p.title}</h2>
                  {p.description && <p className="text-sm opacity-80 mt-1">{p.description}</p>}
                  {/* Add external link when backend model exposes a URL */}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between mt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >Prev</button>
              <p className="text-sm">Page {page}</p>
              <button
                disabled={data.items.length < limit}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >Next</button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
