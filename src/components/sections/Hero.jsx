import Button from '../common/Button'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-24 pb-12 md:pt-28 overflow-hidden">
      <div className="container-custom">
        <div className="relative flex flex-col items-center">
          {/* Hello Badge */}
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              Hello!
              <span className="text-primary">✨</span>
            </span>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="heading-primary mb-2">
              I'm{' '}
              <span className="text-primary italic">Ivi Susej Marie E. Salas</span>,
            </h1>
            <p className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-gray-800 flex items-center justify-center gap-3">
              <DecorativeLines />
              Aspiring Web Developer
            </p>
          </div>

          {/* Content Container */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mt-4">
            {/* Left Quote */}
            <div className="hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="quote-mark">"</div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                I am passionate about web development, focused on building user-friendly, 
                visually engaging, and responsive websites.
              </p>
            </div>

            {/* Center - Profile Image */}
            <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                {/* Blue Circle Background */}
                <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-primary rounded-full absolute bottom-0 left-1/2 -translate-x-1/2" />
                
                {/* Profile Image */}
                <div className="relative z-10">
                  <ProfileImage />
                </div>

                {/* CTA Buttons - Positioned over the image */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1">
                    <Button variant="primary" hasArrow href="#projects">
                      Portfolio
                    </Button>
                    <Button variant="secondary" href="#contact" className="ml-1">
                      Hire me
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Education Badge */}
            <div className="hidden lg:flex flex-col items-end animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-right">
                <p className="font-semibold text-gray-800 text-lg">BS in Information Technology</p>
                <p className="text-gray-500">Dean's Lister</p>
              </div>
            </div>
          </div>

          {/* Mobile Quote & Education */}
          <div className="lg:hidden mt-8 text-center px-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              I am passionate about web development, focused on building user-friendly, 
              visually engaging, and responsive websites.
            </p>
            <div>
              <p className="font-semibold text-gray-800">BS in Information Technology</p>
              <p className="text-gray-500 text-sm">Dean's Lister</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Decorative wavy lines component
const DecorativeLines = () => (
  <svg 
    className="w-8 h-8 text-primary" 
    viewBox="0 0 32 32" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M4 8 Q8 4, 12 8 T20 8" />
    <path d="M4 16 Q8 12, 12 16 T20 16" />
  </svg>
)

// Profile Image placeholder component
const ProfileImage = () => (
  <div className="w-72 h-80 md:w-80 md:h-[22rem] lg:w-96 lg:h-[26rem] flex items-end justify-center">
    {/* Placeholder for profile image - replace src with actual image */}
    <div className="relative w-full h-full flex items-end justify-center">
      <svg 
        className="w-64 h-72 md:w-72 md:h-80 lg:w-80 lg:h-96 text-gray-300"
        viewBox="0 0 200 250"
        fill="currentColor"
      >
        {/* Silhouette placeholder */}
        <ellipse cx="100" cy="60" rx="45" ry="50" fill="#e5e7eb" />
        <path d="M30 250 Q30 150 100 130 Q170 150 170 250 Z" fill="#1e3a5f" />
      </svg>
      {/* 
        Replace the SVG above with your actual image:
        <img 
          src="/profile.png" 
          alt="Ivi Susej Marie E. Salas" 
          className="w-full h-full object-contain object-bottom"
        />
      */}
    </div>
  </div>
)

export default Hero
