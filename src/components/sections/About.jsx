import SectionTitle from '../common/SectionTitle'
import { Code, GraduationCap, Heart, Target } from 'lucide-react'

const About = () => {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'BS in Information Technology student with consistent academic excellence as a Dean\'s Lister.',
    },
    {
      icon: Code,
      title: 'Technical Focus',
      description: 'Passionate about front-end development, creating responsive and user-friendly web applications.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Dedicated to continuous learning and staying updated with the latest web technologies.',
    },
    {
      icon: Target,
      title: 'Goal',
      description: 'Seeking opportunities to grow as a developer and contribute to meaningful projects.',
    },
  ]

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionTitle
          title="About Me"
          subtitle="Get to know me better and discover what drives my passion for web development."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image/Visual */}
          <div className="relative animate-fade-in-up">
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Decorative background */}
              <div className="absolute inset-4 bg-primary/10 rounded-3xl rotate-6" />
              <div className="absolute inset-0 bg-white rounded-3xl shadow-xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-white font-serif text-5xl font-bold">I</span>
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-gray-800 mb-2">
                    Ivi Susej Marie E. Salas
                  </h3>
                  <p className="text-primary font-medium">Aspiring Web Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600 leading-relaxed">
                Hello! I'm <span className="font-semibold text-gray-800">Ivi Susej Marie E. Salas</span>, 
                an aspiring web developer currently pursuing my Bachelor of Science in Information Technology. 
                I am passionate about creating beautiful, functional, and user-centered digital experiences.
              </p>
              <p className="text-gray-600 leading-relaxed">
                My journey in web development started with curiosity and has grown into a deep commitment 
                to mastering front-end technologies. I believe in writing clean, maintainable code and 
                creating interfaces that are both visually appealing and accessible to all users.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
