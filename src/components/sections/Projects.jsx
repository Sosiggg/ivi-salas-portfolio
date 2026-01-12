import { useState, useRef } from 'react'
import { Github, ArrowLeft, ArrowRight } from 'lucide-react'

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Touch/swipe handling refs
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const projects = [
    {
      title: 'SmarTanom',
      subtitle: 'IoT Hydroponic Monitoring System',
      description: 'A smart, scalable, plug-and-play, solar-powered system for monitoring nutrient conditions in hydroponic setups. It integrates IoT hardware with mobile and web applications to provide real-time data access, system diagnostics, and remote management for efficient and data-driven hydroponic operations.',
      features: [
        'Real-time nutrient and environmental monitoring',
        'Solar-powered and energy-efficient operation',
        'Web and mobile dashboard integration',
        'Scalable multi-device support',
      ],
      technologies: ['ESP32', 'React', 'React Native', 'Django', 'PostgreSQL', 'Firebase'],
      image: '/SmarTanom.png',
      githubUrl: 'https://github.com/Sosiggg/SmarTanom',
    },
    {
      title: 'TORI',
      subtitle: 'Collaborative IMS',
      description: 'A collaborative inventory management system designed for small businesses and vendors sharing booth spaces at events. It features role-based access for multiple sellers, mobile accessibility, cost-splitting, and automatic sales tracking.',
      features: [
        'Mobile accessibility optimized for smartphones',
        'Role-based access (Admin, Co-Admin, Seller)',
        'Real-time inventory and sales tracking',
        'Stock alerts and performance reports',
      ],
      technologies: ['React.js', 'Node.js', 'Supabase', 'JavaScript'],
      image: '/TORI.png',
      githubUrl: 'https://github.com/Sosiggg/TORI',
    },
    {
      title: 'FitnessFeast',
      subtitle: 'Fitness Recipe Website',
      description: 'A recipe website designed for fitness-focused individuals. The platform offers a wide variety of recipes, each complete with nutritional facts, calorie counts, and categorized to meet specific fitness goals like weight loss and muscle gain.',
      features: [
        'Recipe display with nutritional facts',
        'Categorization based on fitness goals',
        'Clean and modern UI design',
        'User-friendly interface',
      ],
      technologies: ['React.js', 'CSS', 'JavaScript', 'Vite'],
      image: '/FitnessFeast.png',
      githubUrl: 'https://github.com/Sosiggg/fitnessfeast',
    },
    {
      title: 'RNGSUS Home Security',
      subtitle: 'ESP32 + Arduino Security System',
      description: 'An ESP32 and Arduino-based home security system that arms with a keypad/LCD, monitors temperature and humidity, detects motion and laser beam breaks, sounds a buzzer, and raises alerts via push notifications.',
      features: [
        'Keypad + LCD for arming/disarming',
        'Motion sensor and laser tripwire detection',
        'Temperature and humidity monitoring',
        'Push notifications via Pushbullet/Pushover',
      ],
      technologies: ['ESP32', 'Arduino', 'C++', 'DHT22', 'PIR Sensor'],
      image: '/HomeSecurity.jpg',
      githubUrl: 'https://github.com/Sosiggg/RngsusHomeSecurity',
    },
    {
      title: 'EnviroSense',
      subtitle: 'Environmental Monitoring System',
      description: 'A comprehensive environmental monitoring system that collects temperature, humidity, and obstacle detection data using ESP32 devices and displays it in real-time through both web and mobile applications.',
      features: [
        'Real-time sensor data visualization',
        'Cross-platform mobile app (Flutter)',
        'React web dashboard with charts',
        'WebSocket for live updates',
      ],
      technologies: ['ESP32', 'FastAPI', 'Flutter', 'React', 'PostgreSQL'],
      image: '/EnviroSense.png',
      githubUrl: 'https://github.com/Sosiggg/EnviroSense',
    },
    {
      title: 'ABC Company Payroll System',
      subtitle: 'Java Payroll Management',
      description: 'A payroll management system developed using Java that streamlines the process of managing employee salaries, tax calculations, bonuses, and deductions. It ensures accuracy, compliance with regulations, and generates comprehensive payroll reports.',
      features: [
        'Employee management (Add, Update, Remove)',
        'Automatic salary and tax calculation',
        'Detailed payroll report generation',
        'Secure admin authentication',
      ],
      technologies: ['Java', 'PostgreSQL', 'JDBC'],
      image: '/ABC_PayrollSystem.png',
      githubUrl: 'https://github.com/Sosiggg/payroll-management-system',
    },
  ]

  const totalSlides = projects.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  // Touch/swipe handlers - defined after nextSlide/prevSlide
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX // Reset end position
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeThreshold = 50
    const diff = touchStartX.current - touchEndX.current
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next slide
        nextSlide()
      } else {
        // Swiped right - go to previous slide
        prevSlide()
      }
    }
  }

  const currentProject = projects[currentSlide]

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-16 pt-20 sm:pt-24 lg:pt-28 bg-gray-50 overflow-hidden">
      <div className="container-custom flex flex-col">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-6 flex-shrink-0">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-2">
            <span className="h-px w-6 sm:w-8 md:w-12 bg-primary"></span>
            <span className="text-primary text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase">My Work</span>
            <span className="h-px w-6 sm:w-8 md:w-12 bg-primary"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-urbanist font-bold text-navDark">
            Projects
          </h2>
        </div>

        {/* Single Project Display */}
        <div 
          className="relative flex items-center"
          style={{ touchAction: 'pan-y pinch-zoom' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-secondary hover:border-primary hover:text-primary hover:shadow-xl hover:-translate-y-1/2 hover:scale-110 transition-all duration-300 shadow-md"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-secondary hover:border-primary hover:text-primary hover:shadow-xl hover:-translate-y-1/2 hover:scale-110 transition-all duration-300 shadow-md"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          {/* Project Content */}
          <div className="w-full px-10 sm:px-14 md:px-20">
            {/* Mobile: Entire card is clickable */}
            <a 
              href={currentProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block sm:hidden bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden active:scale-[0.98] transition-transform"
            >
              <div className="grid grid-cols-1 h-[480px]">
                {/* Project Image */}
                <div className="relative overflow-hidden h-44">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Project Info */}
                <div className="p-4 flex flex-col h-[336px] overflow-hidden">
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider rounded-full">
                        {currentProject.subtitle}
                      </span>
                    </div>
                    <h3 className="text-lg font-urbanist font-bold text-navDark mb-2 line-clamp-1">
                      {currentProject.title}
                    </h3>
                    <p className="text-secondary text-xs leading-relaxed mb-3 text-justify line-clamp-2">
                      {currentProject.description}
                    </p>

                    {/* Features */}
                    <div className="mb-3">
                      <h4 className="text-[10px] font-bold text-navDark mb-1 uppercase tracking-wide">Key Features</h4>
                      <ul className="grid grid-cols-1 gap-y-1">
                        {currentProject.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start gap-1.5 text-secondary text-[10px] leading-snug">
                            <svg className="w-2.5 h-2.5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {currentProject.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-gray-100 text-secondary text-[10px] font-medium rounded-md border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {currentProject.technologies.length > 5 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-secondary text-[10px] font-medium rounded-md border border-gray-200">
                            +{currentProject.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tap to view indicator */}
                  <div className="flex-shrink-0 pt-2 flex items-center justify-center gap-1.5 text-primary text-[10px] font-medium">
                    <Github className="w-3 h-3" />
                    <span>Tap to view on GitHub</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Desktop: Regular card with button */}
            <div className="hidden sm:block bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-[520px] md:h-[560px] lg:h-[480px]">
                {/* Project Image */}
                <div className="relative group overflow-hidden h-52 md:h-56 lg:h-full">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navDark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Info */}
                <div className="p-5 md:p-6 lg:p-8 flex flex-col h-[368px] md:h-[404px] lg:h-full overflow-hidden">
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full">
                        {currentProject.subtitle}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-urbanist font-bold text-navDark mb-3 line-clamp-1">
                      {currentProject.title}
                    </h3>
                    <p className="text-secondary text-sm md:text-base leading-relaxed mb-4 text-justify line-clamp-3">
                      {currentProject.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-navDark mb-1.5 uppercase tracking-wide">Key Features</h4>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                        {currentProject.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-secondary text-xs md:text-sm leading-snug">
                            <svg className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-gray-100 text-secondary text-xs font-medium rounded-md border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {currentProject.technologies.length > 5 && (
                          <span className="px-2.5 py-1 bg-gray-100 text-secondary text-xs font-medium rounded-md border border-gray-200">
                            +{currentProject.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* GitHub Button */}
                  <div className="flex-shrink-0 pt-2">
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-navDark text-white text-xs md:text-sm font-semibold rounded-lg hover:bg-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                      <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots with Project Names */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`group relative transition-all duration-300 ${
                currentSlide === index
                  ? 'scale-110'
                  : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`Go to ${project.title}`}
            >
              <span className={`block w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-primary ring-2 sm:ring-4 ring-primary/20'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`} />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-navDark text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">
                {project.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects