import { Code, GraduationCap, Heart, Target } from 'lucide-react'

const About = () => {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'BS in Information Technology student at University of Science and Technology of Southern Philippines.',
    },
    {
      icon: Code,
      title: 'Technical Focus',
      description: 'Front-end development with responsive and user-friendly web applications.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Continuous learning and staying current with modern web technologies.',
    },
    {
      icon: Target,
      title: 'Goal',
      description: 'Growing as a developer and contributing to meaningful projects.',
    },
  ]

  const stats = [
    { value: '10+', label: 'Projects' },
    { value: '7+', label: 'Frameworks' },
    { value: '900+', label: 'Contributions' },
  ]

  return (
    <section id="about" className="h-screen flex flex-col justify-center pt-20 pb-4 sm:pt-24 sm:pb-6 lg:pt-28 lg:pb-8 bg-gray-50 overflow-hidden">
      <div className="container-custom h-full flex flex-col">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-6 flex-shrink-0">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8 sm:w-12 bg-primary"></span>
            <span className="text-primary text-sm sm:text-base font-semibold tracking-widest uppercase">About Me</span>
            <span className="h-px w-8 sm:w-12 bg-primary"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-urbanist font-bold text-navDark">
            Get to Know Me
          </h2>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            
            {/* Left - Profile Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 w-full max-w-[280px] sm:max-w-[320px] shadow-sm">
                {/* Profile Image */}
                <div className="relative mb-4">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img 
                      src="/profile1.png" 
                      alt="Ivi Susej Marie E. Salas" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Status badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-navDark px-4 py-1.5 rounded-full shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs font-medium text-white whitespace-nowrap">Available for work</span>
                    </div>
                  </div>
                </div>

                {/* Name and title */}
                <div className="text-center mt-5 mb-4">
                  <h3 className="text-lg sm:text-xl font-urbanist font-bold text-navDark">
                    Ivi Susej Marie E. Salas
                  </h3>
                  <p className="text-primary font-semibold text-sm sm:text-base mt-1">Aspiring Web Developer</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center py-2">
                      <div className="text-xl sm:text-2xl font-urbanist font-bold text-primary">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-secondary font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              {/* Introduction */}
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-urbanist font-bold text-navDark mb-2">
                  Hello, I'm Ivi Salas!
                </h3>
                <p className="text-secondary text-sm sm:text-base leading-relaxed text-justify">
                  An aspiring web developer currently pursuing my <span className="font-semibold text-navDark">Bachelor of Science in Information Technology</span>. I am passionate about creating beautiful, functional, and user-centered digital experiences. My journey in web development started with curiosity and has grown into a deep commitment to mastering front-end technologies.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="group flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200"
                  >
                    <div className="p-2 sm:p-2.5 bg-primary/10 rounded-md group-hover:bg-primary group-hover:text-white transition-all duration-200">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-urbanist font-semibold text-navDark text-sm sm:text-base mb-0.5">{item.title}</h4>
                      <p className="text-secondary text-xs sm:text-sm leading-relaxed text-justify">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <a 
                  href="#contact" 
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-navDark hover:shadow-lg hover:shadow-navDark/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Let's Work Together
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a 
                  href="/IviSalas_CV.pdf" 
                  download
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-navDark text-sm font-semibold rounded-lg border-2 border-navDark hover:bg-navDark hover:text-white hover:shadow-lg hover:shadow-navDark/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About