import Head from 'next/head';
import { Layout } from '../components/Layout';

export default function BlogPage() {
  return (
    <Layout>
      <Head>
        <title>Blog | Ivi Salas</title>
      </Head>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600 dark:text-gray-400">Articles coming soon. MDX / contentlayer integration planned.</p>
      </div>
    </Layout>
  );
}
