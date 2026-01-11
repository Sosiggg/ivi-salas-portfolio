import { Mail, Phone, Linkedin, Github, MapPin, ArrowUpRight, Sparkles } from 'lucide-react'

const Contact = () => {
  const contactItems = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+63 917 821 6691',
      href: 'tel:+639178216691',
      color: 'from-emerald-400 to-green-500',
      bgGlow: 'group-hover:shadow-emerald-500/20',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'salas.ivisusej@gmail.com',
      href: 'mailto:salas.ivisusej@gmail.com',
      color: 'from-primary to-blue-500',
      bgGlow: 'group-hover:shadow-primary/20',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/ivisalas',
      href: 'https://www.linkedin.com/in/ivisalas',
      color: 'from-blue-500 to-blue-600',
      bgGlow: 'group-hover:shadow-blue-500/20',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/Sosiggg',
      href: 'https://github.com/Sosiggg',
      color: 'from-violet-500 to-purple-600',
      bgGlow: 'group-hover:shadow-violet-500/20',
    },
  ]

  return (
    <section id="contact" className="min-h-screen bg-navDark relative overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(71,114,177,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(71,114,177,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container-custom relative z-10 pt-20 sm:pt-24 lg:pt-28 pb-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-gray-400 text-sm font-medium">Let's work together</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-urbanist font-bold text-white mb-5">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Touch</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Looking for internship opportunities. Feel free to reach out!
          </p>
        </div>

        {/* Contact Cards - Bento Grid Style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-10">
          {contactItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${item.bgGlow}`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              {/* Label */}
              <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1">{item.label}</p>

              {/* Value */}
              <p className="text-white font-semibold text-xs sm:text-sm group-hover:text-primary transition-colors duration-300 whitespace-nowrap leading-tight">
                {item.value}
              </p>

              {/* Arrow */}
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
            </a>
          ))}
        </div>

        {/* CTA Card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-blue-500/20 rounded-3xl p-[1px]">
            <div className="bg-navDark/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full" />
                    <div className="absolute inset-0 w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-50" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Available for Opportunities</p>
                    <p className="text-gray-400 text-sm">Open to internships & collaborations</p>
                  </div>
                </div>
                <a
                  href="mailto:salas.ivisusej@gmail.com"
                  className="group flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-primary to-blue-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Email</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-gray-500 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Based in Philippines</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
