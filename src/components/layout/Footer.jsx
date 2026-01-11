import { Heart, Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ivisalas@email.com', label: 'Email' },
  ]

  return (
    <footer className="bg-accent-dark text-white py-6 sm:py-8">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xs sm:text-sm">I</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} Ivi Salas. Made with{' '}
              <Heart size={12} className="inline text-red-500 fill-red-500 sm:w-3.5 sm:h-3.5" /> in the Philippines.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 text-gray-400 hover:text-primary hover:bg-gray-800 rounded-full transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} className="sm:w-5 sm:h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
