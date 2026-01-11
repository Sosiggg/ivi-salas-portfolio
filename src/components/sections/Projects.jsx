import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import { ExternalLink, Github, Folder } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'Personal Portfolio Website',
      description: 'A responsive portfolio website built with React.js and Tailwind CSS, showcasing modern web development practices and clean UI design.',
      technologies: ['React.js', 'Tailwind CSS', 'Vite', 'JavaScript'],
      concepts: ['Component-Based Architecture', 'Responsive Design', 'CSS Flexbox/Grid', 'State Management'],
      image: null, // Replace with actual image path
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'Task Management App',
      description: 'A full-featured task management application with CRUD operations, local storage persistence, and filtering capabilities.',
      technologies: ['React.js', 'CSS3', 'LocalStorage API', 'JavaScript'],
      concepts: ['CRUD Operations', 'State Management', 'Data Persistence', 'User Authentication'],
      image: null,
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'E-Commerce Landing Page',
      description: 'A modern and responsive e-commerce landing page with product showcase, shopping cart UI, and smooth animations.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Figma'],
      concepts: ['Responsive Design', 'CSS Animations', 'UI/UX Design', 'Cross-Browser Compatibility'],
      image: null,
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'Weather Dashboard',
      description: 'A weather application that fetches real-time data from a weather API and displays forecasts with dynamic backgrounds.',
      technologies: ['JavaScript', 'REST API', 'HTML5', 'CSS3'],
      concepts: ['API Integration', 'Async/Await', 'DOM Manipulation', 'Error Handling'],
      image: null,
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'Quiz Application',
      description: 'An interactive quiz app with multiple categories, score tracking, and timed questions for an engaging user experience.',
      technologies: ['React.js', 'CSS Modules', 'JavaScript'],
      concepts: ['State Management', 'Timer Functions', 'Conditional Rendering', 'Array Methods'],
      image: null,
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'Blog Platform UI',
      description: 'A clean and minimal blog platform interface with article listings, reading view, and comment section designs.',
      technologies: ['HTML5', 'Tailwind CSS', 'JavaScript'],
      concepts: ['Semantic HTML', 'Typography', 'Accessibility', 'CSS Grid'],
      image: null,
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
  ]

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="Projects"
          subtitle="A showcase of my work demonstrating problem-solving skills and technical expertise."
        />

        {/* Featured Projects */}
        <div className="space-y-8 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in-up ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Folder size={64} className="text-primary/30" />
                    </div>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  Featured Project
                </span>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Concepts */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Concepts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.concepts.map((concept) => (
                      <span
                        key={concept}
                        className="px-3 py-1 border border-primary/30 text-primary text-sm rounded-full"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <Button variant="primary" href={project.liveUrl} hasArrow>
                    <ExternalLink size={18} />
                    Live Demo
                  </Button>
                  <Button variant="secondary" href={project.githubUrl}>
                    <Github size={18} />
                    Code
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div>
          <h3 className="text-2xl font-serif font-medium text-gray-800 text-center mb-8">
            Other Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div
                key={project.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Folder size={40} className="text-primary" />
                  <div className="flex gap-2">
                    <a
                      href={project.githubUrl}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                      aria-label="View code on GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.liveUrl}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-gray-500 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
