import Head from 'next/head';
import { Layout } from '../components/Layout';
import { useCertificates } from '../hooks/useCertificates';

export default function CertificatesPage() {
  const { data, isLoading, isError } = useCertificates();
  return (
    <Layout>
      <Head><title>Certificates</title></Head>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Certificates</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-500">Failed to load certificates.</p>}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.items.map(c => (
            <div key={c.id} className="p-4 border rounded border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-sm">{c.title}</h2>
              <p className="text-xs opacity-70">{c.issuer}</p>
              {c.verification_url && <a href={c.verification_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 underline mt-1 inline-block">Verify</a>}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
