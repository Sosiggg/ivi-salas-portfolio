import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'
import { Code, Layout, Smartphone, Database, Palette, Globe } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Layout,
      title: 'Web Development',
      description: 'Building responsive and modern websites using HTML, CSS, JavaScript, and React.js with a focus on clean code and best practices.',
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Creating websites that look and work beautifully on all devices, from mobile phones to desktop computers.',
    },
    {
      icon: Code,
      title: 'Front-End Development',
      description: 'Developing interactive user interfaces with modern frameworks and libraries for optimal user experience.',
    },
    {
      icon: Palette,
      title: 'UI/UX Implementation',
      description: 'Translating design mockups into functional, pixel-perfect web pages with attention to detail.',
    },
    {
      icon: Database,
      title: 'Basic Back-End',
      description: 'Understanding of server-side concepts and database management for full-stack development foundations.',
    },
    {
      icon: Globe,
      title: 'Web Optimization',
      description: 'Optimizing websites for performance, accessibility, and search engine visibility.',
    },
  ]

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="Services"
          subtitle="Here's what I can offer to help bring your web projects to life."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon size={28} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
