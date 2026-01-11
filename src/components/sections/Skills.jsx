const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      skills: [
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
      ],
    },
    {
      title: 'Frameworks & Libraries',
      skills: [
        { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
      ],
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Expo', icon: 'https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
      ],
    },
    {
      title: 'Other',
      skills: [
        { name: 'REST APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
        { name: 'IoT (ESP32)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg' },
        { name: 'Sensor Integration', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg' },
        { name: 'POS Systems', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'Data Visualization', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg' },
        { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      ],
    },
  ]

  return (
    <section id="skills" className="h-screen flex flex-col justify-center pt-20 pb-4 sm:pt-24 sm:pb-6 lg:pt-28 lg:pb-8 bg-gray-50 overflow-hidden">
      <div className="container-custom h-full flex flex-col justify-center">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8 sm:w-12 bg-primary"></span>
            <span className="text-primary text-sm sm:text-base font-semibold tracking-widest uppercase">What I Know</span>
            <span className="h-px w-8 sm:w-12 bg-primary"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-urbanist font-bold text-navDark">
            My Skills
          </h2>
        </div>

        {/* Skills Grid - 2x2 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto w-full">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-base sm:text-lg font-urbanist font-bold text-navDark mb-4 pb-3 border-b border-gray-100">
                {category.title}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex flex-col items-center gap-2 p-2 sm:p-3 rounded-xl hover:bg-primary/5 transition-all duration-200"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                      <img 
                        src={skill.icon} 
                        alt={skill.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs text-secondary font-medium text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills