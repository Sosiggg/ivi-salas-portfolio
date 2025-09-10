import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
  <Layout>
      <Head>
        <title>Home | Ivi Salas</title>
      </Head>
      <main className="min-h-screen px-6 py-24 max-w-5xl mx-auto">
        <section className="space-y-6">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight"
          >
            Hi, I&apos;m Ivi 👋
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeIn}
            transition={{ duration: 0.9 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-prose"
          >
            Full-stack developer focused on crafting performant, accessible, and delightful web experiences.
          </motion.p>
        </section>
      </main>
    </Layout>
  );
}
