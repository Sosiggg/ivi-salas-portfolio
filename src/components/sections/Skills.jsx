import SectionTitle from '../common/SectionTitle'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML5', level: 90 },
        { name: 'CSS3', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'React.js', level: 75 },
        { name: 'Tailwind CSS', level: 80 },
      ],
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git & GitHub', level: 75 },
        { name: 'VS Code', level: 90 },
        { name: 'Figma', level: 70 },
        { name: 'npm/Node.js', level: 70 },
        { name: 'Responsive Design', level: 85 },
      ],
    },
    {
      title: 'Soft Skills',
      skills: [
        { name: 'Problem Solving', level: 85 },
        { name: 'Communication', level: 80 },
        { name: 'Teamwork', level: 85 },
        { name: 'Time Management', level: 80 },
        { name: 'Adaptability', level: 90 },
      ],
    },
  ]

  const education = [
    {
      degree: 'Bachelor of Science in Information Technology',
      school: 'Your University Name',
      year: '2022 - Present',
      achievement: "Dean's Lister",
    },
    {
      degree: 'Senior High School - STEM Strand',
      school: 'Your High School Name',
      year: '2020 - 2022',
      achievement: 'With Honors',
    },
  ]

  return (
    <section id="skills" className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionTitle
          title="Skills & Resume"
          subtitle="My technical skills, tools I work with, and educational background."
        />

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="bg-white rounded-2xl p-6 shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-primary font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education Timeline */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-serif font-medium text-gray-800 text-center mb-8">
            Education
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2" />

            {education.map((item, index) => (
              <div
                key={item.degree}
                className={`relative mb-8 last:mb-0 animate-fade-in-up ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 mt-1.5 border-4 border-white shadow" />

                <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                      {item.year}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.degree}</h4>
                    <p className="text-gray-600 mb-2">{item.school}</p>
                    <p className="text-primary font-medium text-sm">{item.achievement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
