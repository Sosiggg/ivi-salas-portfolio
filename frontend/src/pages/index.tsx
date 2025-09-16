import Head from 'next/head';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { useProjects } from '../hooks/useProjects';
import { useSkills } from '../hooks/useSkills';
import { useExperiences } from '../hooks/useExperiences';
import { useCertificates } from '../hooks/useCertificates';
import { SkeletonList, SkeletonBadgeRow } from '../components/Skeleton';

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  // Page-level data hydration via React Query hooks; SSR not required for static overview.
  // Fetch small samples (page 1)
  const { data: projects, isLoading: loadingProjects, isError: errorProjects, refetch: refetchProjects } = useProjects(1, 3);
  const { data: skills, isLoading: loadingSkills, isError: errorSkills, refetch: refetchSkills } = useSkills();
  const { data: experiences, isLoading: loadingExp, isError: errorExp, refetch: refetchExp } = useExperiences();
  const { data: certificates, isLoading: loadingCerts, isError: errorCerts, refetch: refetchCerts } = useCertificates();


  return (
  <Layout>
      <Head>
        <title>Home | Ivi Salas</title>
      </Head>
      <main className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
        <section className="space-y-6 mb-16">
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

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-xl border bg-white/60 dark:bg-gray-900/40 backdrop-blur border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Highlighted Projects</h2>
            {loadingProjects && <SkeletonList count={3} />}
            {errorProjects && (
              <div role="alert" className="text-red-600 dark:text-red-400 text-sm mb-2">
                Failed to load projects. <button className="underline" onClick={() => refetchProjects()}>Retry</button>
              </div>
            )}
            {!loadingProjects && projects && projects.items.length === 0 && (
              <div className="text-gray-400 text-sm">No projects found.</div>
            )}
            {!loadingProjects && projects && projects.items.length > 0 && (
              <ul className="space-y-3">
                {projects.items.slice(0,3).map(p => (
                  <li key={p.id} className="group">
                    <div className="font-medium group-hover:text-blue-600 transition">{p.title}</div>
                    {p.description && <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{p.description}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-6 rounded-xl border bg-white/60 dark:bg-gray-900/40 backdrop-blur border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Core Skills</h2>
            {loadingSkills && <SkeletonBadgeRow count={12} />}
            {errorSkills && (
              <div role="alert" className="text-red-600 dark:text-red-400 text-sm mb-2">
                Failed to load skills. <button className="underline" onClick={() => refetchSkills()}>Retry</button>
              </div>
            )}
            {!loadingSkills && skills && skills.items.length === 0 && (
              <div className="text-gray-400 text-sm">No skills found.</div>
            )}
            {!loadingSkills && skills && skills.items.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.items.slice(0,12).map(s => (
                  <span key={s.id} className="px-2.5 py-1 text-xs rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">{s.name}</span>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 rounded-xl border bg-white/60 dark:bg-gray-900/40 backdrop-blur border-gray-200 dark:border-gray-700 shadow-sm md:col-span-2 lg:col-span-1">
            <h2 className="font-semibold text-lg mb-4">Recent Experience</h2>
            {loadingExp && <SkeletonList count={3} />}
            {errorExp && (
              <div role="alert" className="text-red-600 dark:text-red-400 text-sm mb-2">
                Failed to load experience. <button className="underline" onClick={() => refetchExp()}>Retry</button>
              </div>
            )}
            {!loadingExp && experiences && experiences.items.length === 0 && (
              <div className="text-gray-400 text-sm">No experience found.</div>
            )}
            {!loadingExp && experiences && experiences.items.length > 0 && (
              <ul className="space-y-3">
                {experiences.items.slice(0,3).map(e => (
                  <li key={e.id}>
                    <div className="font-medium">{e.role} @ {e.company}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{e.description || '—'}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-6 rounded-xl border bg-white/60 dark:bg-gray-900/40 backdrop-blur border-gray-200 dark:border-gray-700 shadow-sm md:col-span-2 lg:col-span-1">
            <h2 className="font-semibold text-lg mb-4">Latest Certificates</h2>
            {loadingCerts && <SkeletonList count={3} />}
            {errorCerts && (
              <div role="alert" className="text-red-600 dark:text-red-400 text-sm mb-2">
                Failed to load certificates. <button className="underline" onClick={() => refetchCerts()}>Retry</button>
              </div>
            )}
            {!loadingCerts && certificates && certificates.items.length === 0 && (
              <div className="text-gray-400 text-sm">No certificates found.</div>
            )}
            {!loadingCerts && certificates && certificates.items.length > 0 && (
              <ul className="space-y-3">
                {certificates.items.slice(0,3).map(c => (
                  <li key={c.id}>
                    <div className="font-medium">{c.title}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{c.issuer}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mt-16 text-sm text-gray-400 dark:text-gray-500">Data dynamically loaded from secured backend. Content customizable via admin endpoints.</div>
      </main>
    </Layout>
  );
}
