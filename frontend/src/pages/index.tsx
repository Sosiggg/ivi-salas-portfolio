
import Layout from '../components/Layout';
import Hero from '../sections/Hero';
import About from '../sections/About';

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <About />
      {/* TODO: Add Skills, Certifications, Projects, Services, Education, Contact, Footer sections */}
    </Layout>
  );
}
