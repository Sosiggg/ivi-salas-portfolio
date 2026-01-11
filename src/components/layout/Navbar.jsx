import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Service', href: '#services' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Get the scroll container (the snap container)
      const scrollContainer = document.querySelector('.snap-container')
      const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY
      
      setIsScrolled(scrollTop > 50)

      // Determine active section based on scroll position
      const sections = navLinks.map(link => link.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Listen to scroll on the snap container
    const scrollContainer = document.querySelector('.snap-container')
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Initial check
    handleScroll()
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavClick = (href) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 sm:py-4' : 'py-4 sm:py-5 md:py-6'
    }`}>
      <div className="container-custom max-w-6xl">
        <nav className="bg-navDark rounded-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between shadow-xl">
          {/* Desktop Navigation - Left Side */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {navLinks.slice(0, 3).map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`px-5 lg:px-7 py-2.5 lg:py-3 rounded-full text-sm lg:text-base font-montserrat font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Logo - Center */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="ISMES Logo" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain" />
            </div>
            <span className="text-white font-montserrat font-bold text-base sm:text-lg md:text-xl tracking-wide">ISMES</span>
          </div>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {navLinks.slice(3).map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`px-5 lg:px-7 py-2.5 lg:py-3 rounded-full text-sm lg:text-base font-montserrat font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 sm:p-2.5 text-white hover:bg-gray-700 rounded-full transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-navDark rounded-2xl p-3 sm:p-4 shadow-xl animate-fade-in-up">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-left text-sm sm:text-base font-montserrat font-medium transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
