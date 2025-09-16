

import { QueryClient, dehydrate } from '@tanstack/react-query';
import Layout from '../components/Layout';
import Hero from '../sections/Hero';
import About from '../sections/About';
import SkillsCertifications from '../sections/SkillsCertifications';
import { useSummary } from '../hooks/useSummary';

export default function HomePage() {
  // Hydrate summary queries client-side
  useSummary();
  return (
    <Layout>
      <Hero />
      <About />
      <SkillsCertifications />
      {/* TODO: Add Projects, Services, Education, Contact, Footer sections */}
    </Layout>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  // Prefetch all summary queries for hydration
  const { fetchSkills } = await import('../hooks/useSkills');
  const { fetchCertificates } = await import('../hooks/useCertificates');
  const { fetchExperiences } = await import('../hooks/useExperiences');
  const { fetchEducation } = await import('../hooks/useEducation');
  const { fetchProjects } = await import('../hooks/useProjects');

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ['skills'], queryFn: fetchSkills }),
    queryClient.prefetchQuery({ queryKey: ['certificates'], queryFn: fetchCertificates }),
    queryClient.prefetchQuery({ queryKey: ['experiences'], queryFn: fetchExperiences }),
    queryClient.prefetchQuery({ queryKey: ['education'], queryFn: fetchEducation }),
    queryClient.prefetchQuery({ queryKey: ['projects', 1, 10], queryFn: () => fetchProjects(1, 10) }),
  ]);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}
