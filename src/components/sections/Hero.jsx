import { ArrowUpRight } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="min-h-[100svh] h-[100svh] pt-14 xs:pt-16 sm:pt-20 md:pt-24 lg:pt-28 overflow-hidden bg-white flex flex-col">
      <div className="flex-1 flex flex-col relative">
        {/* Top Content */}
        <div className="container-custom max-w-7xl">
          {/* Hello Badge */}
          <div className="flex justify-center mb-1 xs:mb-1.5 sm:mb-2 animate-fade-in-up">
            <span className="inline-flex items-center px-3 xs:px-4 sm:px-5 md:px-6 py-1 xs:py-1.5 bg-white border-2 border-gray-800 rounded-full text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-lufga font-medium text-gray-800">
              Hello!
            </span>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-0 px-2 animate-fade-in-up relative z-10" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-urbanist font-semibold leading-[1.15] mb-0">
              I'm{' '}
              <span className="text-primary">Ivi Susej Marie E. Salas</span>,
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-urbanist font-semibold text-gray-800 leading-[1.15]">
              Aspiring Web Developer
            </p>
          </div>
        </div>

        {/* Bottom Content - fills remaining space */}
        <div className="flex-1 relative mt-0 xs:mt-[-0.5rem] sm:mt-[-1rem] md:mt-[-2rem] lg:mt-[-3rem]">
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
            h-[45%] xs:h-[48%] sm:h-[55%] md:h-[65%] lg:h-[78%] xl:h-[85%]
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
            <div className="absolute bottom-[4%] xs:bottom-[5%] sm:bottom-[7%] md:bottom-[9%] lg:bottom-[12%] left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center glass-container rounded-full p-0.5 xs:p-1 sm:p-1.5 shadow-xl 
                min-w-[160px] xs:min-w-[180px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[340px]">
                <a 
                  href="#projects"
                  className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 bg-primary text-white font-lufga font-bold 
                    text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm 
                    px-2.5 xs:px-3 sm:px-4 md:px-5 lg:px-8 
                    py-1.5 xs:py-1.5 sm:py-2 md:py-2.5 lg:py-3 
                    rounded-full transition-all duration-300 hover:bg-primary/90"
                >
                  Portfolio
                  <ArrowUpRight className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" strokeWidth={2.5} />
                </a>
                <span
                  className="flex-1 text-center font-lufga font-light text-white/80 
                    text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm 
                    px-2 xs:px-2.5 sm:px-3 md:px-4 lg:px-6 
                    py-1.5 xs:py-1.5 sm:py-2 md:py-2.5 lg:py-3 
                    whitespace-nowrap cursor-default select-none"
                >
                  Hire me
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Quote & Education - Hidden on very small screens to avoid overlap */}
        <div className="lg:hidden absolute bottom-1 xs:bottom-2 sm:bottom-3 left-0 right-0 text-center px-2 xs:px-3 sm:px-4 animate-fade-in-up z-0 hidden xs:block" style={{ animationDelay: '0.5s' }}>
          <p className="text-secondary font-montserrat text-[8px] xs:text-[9px] sm:text-xs leading-snug mb-0.5 xs:mb-1 max-w-[280px] xs:max-w-xs sm:max-w-sm mx-auto">
            Passionate about building user-friendly and responsive websites.
          </p>
          <div>
            <p className="font-montserrat font-bold text-gray-800 text-[8px] xs:text-[9px] sm:text-xs">BS in Information Technology</p>
            <p className="font-montserrat text-gray-500 text-[8px] xs:text-[9px] sm:text-xs">Dean's Lister</p>
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
