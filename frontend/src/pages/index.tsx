
import Layout from '../components/Layout';


import Hero from '../sections/Hero';
import About from '../sections/About';
import SkillsCertifications from '../sections/SkillsCertifications';

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <About />
      <SkillsCertifications />
      {/* TODO: Add Projects, Services, Education, Contact, Footer sections */}
    </Layout>
  );
}
