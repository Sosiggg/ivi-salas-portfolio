import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Code, Smartphone, Layout, Cpu, Server, Database } from 'lucide-react'

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cardsPerSlide, setCardsPerSlide] = useState(3)
  
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Building responsive and modern websites using HTML, CSS, JavaScript, and React.js with clean, maintainable code.',
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Creating websites that look and work beautifully on all devices, from mobile to desktop and across different screen sizes.',
    },
    {
      icon: Layout,
      title: 'UI/UX Design',
      description: 'Designing intuitive and visually appealing user interfaces with focus on user experience and modern design principles.',
    },
    {
      icon: Cpu,
      title: 'IoT Development',
      description: 'Building Internet of Things solutions connecting hardware devices with software applications for smart systems.',
    },
    {
      icon: Server,
      title: 'Basic Backend',
      description: 'Developing server-side functionality with basic API endpoints and backend logic to support web applications.',
    },
    {
      icon: Database,
      title: 'Database',
      description: 'Setting up and managing simple databases for data storage, retrieval, basic CRUD operations, and writing efficient database queries.',
    },
  ]

  // Update cards per slide based on screen size
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 640) {
        setCardsPerSlide(1) // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2) // Tablet: 2 cards
      } else {
        setCardsPerSlide(3) // Desktop: 3 cards
      }
    }

    updateCardsPerSlide()
    window.addEventListener('resize', updateCardsPerSlide)
    return () => window.removeEventListener('resize', updateCardsPerSlide)
  }, [])

  // Reset slide when cards per slide changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [cardsPerSlide])

  const totalSlides = Math.ceil(services.length / cardsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  // Get current visible services
  const getVisibleServices = (slideIndex) => {
    const start = slideIndex * cardsPerSlide
    return services.slice(start, start + cardsPerSlide)
  }

  return (
    <section id="services" className="min-h-screen flex items-center justify-center pt-20 pb-4 px-3 xs:pt-24 xs:pb-4 xs:px-4 sm:pt-6 sm:pb-6 sm:px-6 md:p-8 lg:p-12 bg-white">
      {/* Main container with background image */}
      <div 
        className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col"
        style={{ backgroundImage: 'url(/servicesbg.png)' }}
      >
        {/* Subtle white film overlay */}
        <div className="absolute inset-0 bg-white/10" />
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col p-4 xs:p-5 sm:p-6 md:p-8 lg:p-12 xl:p-16">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-urbanist font-semibold text-white mb-2 xs:mb-3 sm:mb-4 lg:mb-0">
              My Services
            </h2>
            <p className="text-gray-300 text-xs xs:text-sm md:text-base lg:text-lg max-w-lg lg:text-right leading-relaxed">
              Transforming ideas into digital reality. I offer comprehensive web solutions tailored to your needs, from design to development.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative flex flex-col px-0 sm:px-12 md:px-14 lg:px-16">
            {/* Cards Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div 
                    key={slideIndex} 
                    className="flex gap-3 xs:gap-4 md:gap-5 lg:gap-6 min-w-full py-2"
                  >
                    {getVisibleServices(slideIndex).map((service, index) => (
                      <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - positioned outside cards container */}
            <button 
              onClick={prevSlide}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 items-center justify-center z-20
                w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full
                bg-white/5 border border-white/20 backdrop-blur-md
                text-white/70 hover:text-white hover:bg-white/15 hover:border-white/40
                transition-all duration-300 hover:scale-105"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            </button>
            <button 
              onClick={nextSlide}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 items-center justify-center z-20
                w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full
                bg-white/5 border border-white/20 backdrop-blur-md
                text-white/70 hover:text-white hover:bg-white/15 hover:border-white/40
                transition-all duration-300 hover:scale-105"
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 md:mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'w-8 sm:w-10 bg-primary' 
                    : 'w-2 sm:w-2.5 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Glass Card Component with clean rounded corner
const ServiceCard = ({ service, index }) => {
  const IconComponent = service.icon
  
  return (
    <div 
      className="flex-1 basis-0 min-w-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative group">
        {/* Card with glass effect */}
        <div className="service-card-glass p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col min-h-[280px] xs:min-h-[300px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[400px]">
          {/* Icon with color change on hover */}
          <div className="mb-3 xs:mb-4 md:mb-6 relative">
            <div className="w-10 h-10 xs:w-12 xs:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center 
              transition-colors duration-300 group-hover:bg-primary/20">
              <IconComponent className="w-5 h-5 xs:w-6 xs:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white/70 transition-colors duration-300 group-hover:text-primary" />
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-lg xs:text-xl md:text-2xl lg:text-3xl font-urbanist font-semibold text-white mb-2 xs:mb-3 md:mb-4 transition-colors duration-300 group-hover:text-primary/90">
            {service.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-400 text-xs xs:text-sm md:text-base leading-relaxed text-justify transition-colors duration-300 group-hover:text-gray-300">
            {service.description}
          </p>
          
          {/* Spacer */}
          <div className="flex-1" />
          
          {/* Bottom hover indicator - subtle gradient line */}
          <div className="mt-4 xs:mt-6 md:mt-8 relative overflow-hidden h-[2px] rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-primary to-primary/50 rounded-full transition-all duration-500 ease-out group-hover:w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
