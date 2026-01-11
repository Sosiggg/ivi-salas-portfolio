import { ArrowUpRight } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="h-full pt-20 xs:pt-22 sm:pt-24 md:pt-28 lg:pt-32 overflow-hidden bg-white flex flex-col">
      <div className="flex-1 flex flex-col relative">
        {/* Top Content */}
        <div className="container-custom max-w-7xl">
          {/* Hello Badge */}
          <div className="flex justify-center mb-1 xs:mb-1.5 sm:mb-2 animate-fade-in-up">
            <span className="inline-flex items-center px-4 xs:px-5 sm:px-6 py-1 xs:py-1.5 bg-white border-2 border-gray-800 rounded-full text-[10px] xs:text-xs sm:text-sm font-lufga font-medium text-gray-800">
              Hello!
            </span>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-0 px-2 animate-fade-in-up relative z-10" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-urbanist font-semibold leading-[1.05] mb-0">
              I'm{' '}
              <span className="text-primary">Ivi Susej Marie E. Salas</span>,
            </h1>
            <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-urbanist font-semibold text-gray-800 leading-[1.05]">
              Aspiring Web Developer
            </p>
          </div>
        </div>

        {/* Bottom Content - fills remaining space */}
        <div className="flex-1 relative mt-[-1rem] xs:mt-[-1.5rem] sm:mt-[-2rem] md:mt-[-3rem] lg:mt-[-4rem]">
          <div className="container-custom max-w-7xl h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 h-full">
              {/* Left Quote - positioned lower */}
              <div className="hidden lg:flex flex-col justify-center animate-fade-in-up pt-16 xl:pt-20" style={{ animationDelay: '0.2s' }}>
                <QuoteIcon />
                <p className="text-secondary font-montserrat text-xs xl:text-sm leading-relaxed max-w-xs">
                  I am passionate about web development,<br />
                  focused on building user-friendly, visually engaging,
                  and responsive websites.
                </p>
              </div>

              {/* Center placeholder for grid */}
              <div className="hidden lg:block" />

              {/* Right - Education Badge - positioned lower */}
              <div className="hidden lg:flex flex-col items-end justify-center animate-fade-in-up pt-16 xl:pt-20" style={{ animationDelay: '0.4s' }}>
                <div className="text-right">
                  <p className="font-montserrat font-bold text-gray-800 text-sm xl:text-base">BS in Information Technology</p>
                  <p className="font-montserrat text-gray-500 text-xs xl:text-sm">Dean's Lister</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Group - Half Circle + Profile Image scale together */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10
            h-[55%] xs:h-[58%] sm:h-[65%] md:h-[72%] lg:h-[80%] xl:h-[85%]
            flex flex-col items-center justify-end">
            {/* Half Circle - sized relative to profile container */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 
              w-[140%] aspect-[2/1]
              bg-primary rounded-t-full" 
            />
            
            {/* Profile Image */}
            <img 
              src="/profile.png" 
              alt="Ivi Susej Marie E. Salas - Aspiring Web Developer" 
              className="relative z-10 h-full w-auto object-contain object-bottom drop-shadow-2xl"
              loading="eager"
            />

            {/* Glass CTA Buttons - positioned lower */}
            <div className="absolute bottom-[8%] xs:bottom-[9%] sm:bottom-[10%] md:bottom-[11%] lg:bottom-[12%] left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center glass-container rounded-full p-0.5 xs:p-1 sm:p-1.5 shadow-xl 
                min-w-[220px] xs:min-w-[250px] sm:min-w-[300px] md:min-w-[340px]">
                <a 
                  href="#projects"
                  className="flex items-center justify-center gap-1.5 xs:gap-2 bg-primary text-white font-lufga font-bold 
                    text-[10px] xs:text-xs sm:text-sm 
                    px-4 xs:px-5 sm:px-6 md:px-8 
                    py-2 xs:py-2.5 sm:py-3 
                    rounded-full transition-all duration-300 hover:bg-primary/90"
                >
                  Portfolio
                  <ArrowUpRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                </a>
                <span
                  className="flex-1 text-center font-lufga font-light text-white/80 
                    text-[10px] xs:text-xs sm:text-sm 
                    px-2 xs:px-3 sm:px-5 md:px-6 
                    py-2 xs:py-2.5 sm:py-3 
                    whitespace-nowrap cursor-default select-none"
                >
                  Hire me
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Quote & Education */}
        <div className="lg:hidden absolute bottom-2 xs:bottom-3 sm:bottom-4 left-0 right-0 text-center px-3 xs:px-4 animate-fade-in-up z-0" style={{ animationDelay: '0.5s' }}>
          <p className="text-secondary font-montserrat text-[10px] xs:text-xs sm:text-sm leading-relaxed mb-1 xs:mb-2 max-w-sm sm:max-w-md mx-auto">
            I am passionate about web development, focused on building user-friendly, 
            visually engaging, and responsive websites.
          </p>
          <div>
            <p className="font-montserrat font-bold text-gray-800 text-[10px] xs:text-xs sm:text-sm">BS in Information Technology</p>
            <p className="font-montserrat text-gray-500 text-[10px] xs:text-xs sm:text-sm">Dean's Lister</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Quote icon component - styled like the design
const QuoteIcon = () => (
  <svg 
    className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-secondary mb-1 lg:mb-2 -ml-1 lg:-ml-2" 
    viewBox="0 0 40 40" 
    fill="currentColor"
  >
    <path d="M10 20 Q10 12, 18 12 L18 16 Q14 16, 14 20 L18 20 L18 28 L10 28 Z" />
    <path d="M22 20 Q22 12, 30 12 L30 16 Q26 16, 26 20 L30 20 L30 28 L22 28 Z" />
  </svg>
)

export default Hero
