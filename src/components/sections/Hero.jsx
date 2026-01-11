import { ArrowUpRight } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="min-h-[100svh] h-[100svh] pt-14 xs:pt-16 sm:pt-20 md:pt-24 lg:pt-28 overflow-hidden bg-white flex flex-col">
      
      {/* Mobile Layout - Profile on top */}
      <div className="lg:hidden flex-1 flex flex-col items-center justify-center px-4 py-6">
        {/* Profile Circle */}
        <div className="relative mb-4 xs:mb-5 sm:mb-6 animate-fade-in-up">
          <div className="w-44 h-44 xs:w-52 xs:h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-primary flex items-center justify-center overflow-hidden">
            <img 
              src="/profile.png" 
              alt="Ivi Susej Marie E. Salas" 
              className="w-full h-full object-cover object-top scale-110"
              loading="eager"
            />
          </div>
        </div>

        {/* Hello Badge */}
        <div className="mb-3 xs:mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="inline-flex items-center px-4 xs:px-5 sm:px-6 py-1.5 xs:py-2 bg-white border-2 border-gray-800 rounded-full text-xs xs:text-sm sm:text-base font-lufga font-medium text-gray-800">
            Hello!
          </span>
        </div>

        {/* Main Heading */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-urbanist font-semibold leading-tight mb-1">
            I'm <span className="text-primary">Ivi Susej Marie E. Salas</span>,
          </h1>
          <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-urbanist font-semibold text-gray-800">
            Aspiring Web Developer
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 xs:mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a 
            href="#projects"
            className="inline-flex items-center justify-center gap-1.5 xs:gap-2 bg-primary text-white font-lufga font-bold 
              text-xs xs:text-sm 
              px-5 xs:px-6 sm:px-7 
              py-2.5 xs:py-3 sm:py-3.5 
              rounded-full transition-all duration-300 hover:bg-primary/90 shadow-xl"
          >
            Portfolio
            <ArrowUpRight className="w-3.5 h-3.5 xs:w-4 xs:h-4" strokeWidth={2.5} />
          </a>
        </div>
      </div>

      {/* Desktop Layout - Original with half circle at bottom */}
      <div className="hidden lg:flex flex-1 flex-col relative">
        {/* Top Content */}
        <div className="container-custom max-w-7xl">
          {/* Hello Badge */}
          <div className="flex justify-center mb-2 animate-fade-in-up">
            <span className="inline-flex items-center px-6 py-1.5 bg-white border-2 border-gray-800 rounded-full text-sm font-lufga font-medium text-gray-800">
              Hello!
            </span>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-0 px-2 animate-fade-in-up relative z-10" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-urbanist font-semibold leading-[1.15] mb-0">
              I'm{' '}
              <span className="text-primary">Ivi Susej Marie E. Salas</span>,
            </h1>
            <p className="text-3xl xl:text-4xl 2xl:text-5xl font-urbanist font-semibold text-gray-800 leading-[1.15]">
              Aspiring Web Developer
            </p>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="flex-1 relative mt-[-3rem]">
          <div className="container-custom max-w-7xl h-full">
            <div className="grid grid-cols-3 gap-6 h-full">
              {/* Left Quote */}
              <div className="flex flex-col justify-center animate-fade-in-up pt-16 xl:pt-20" style={{ animationDelay: '0.2s' }}>
                <QuoteIcon />
                <p className="text-secondary font-montserrat text-xs xl:text-sm leading-relaxed max-w-xs">
                  I am passionate about web development,<br />
                  focused on building user-friendly, visually engaging,
                  and responsive websites.
                </p>
              </div>

              {/* Center placeholder */}
              <div />

              {/* Right - Education Badge */}
              <div className="flex flex-col items-end justify-center animate-fade-in-up pt-16 xl:pt-20" style={{ animationDelay: '0.4s' }}>
                <div className="text-right">
                  <p className="font-montserrat font-bold text-gray-800 text-sm xl:text-base">BS in Information Technology</p>
                  <p className="font-montserrat text-gray-500 text-xs xl:text-sm">Dean's Lister</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Group - Half Circle + Profile Image */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10
            h-[78%] xl:h-[85%]
            flex flex-col items-center justify-end">
            {/* Half Circle */}
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

            {/* Glass CTA Buttons */}
            <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center glass-container rounded-full p-1.5 shadow-xl min-w-[340px]">
                <a 
                  href="#projects"
                  className="flex items-center justify-center gap-2 bg-primary text-white font-lufga font-bold 
                    text-sm px-8 py-3 
                    rounded-full transition-all duration-300 hover:bg-primary/90"
                >
                  Portfolio
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                </a>
                <span
                  className="flex-1 text-center font-lufga font-light text-white/80 
                    text-sm px-6 py-3 
                    whitespace-nowrap cursor-default select-none"
                >
                  Hire me
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Quote icon component
const QuoteIcon = () => (
  <svg 
    className="w-8 h-8 xl:w-10 xl:h-10 text-secondary mb-2 -ml-2" 
    viewBox="0 0 40 40" 
    fill="currentColor"
  >
    <path d="M10 20 Q10 12, 18 12 L18 16 Q14 16, 14 20 L18 20 L18 28 L10 28 Z" />
    <path d="M22 20 Q22 12, 30 12 L30 16 Q26 16, 26 20 L30 20 L30 28 L22 28 Z" />
  </svg>
)

export default Hero
