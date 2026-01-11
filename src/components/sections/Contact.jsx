import { useState } from 'react'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import { Mail, MapPin, Phone, Send, Linkedin, Github, Facebook } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ivisalas@email.com',
      href: 'mailto:ivisalas@email.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+63 XXX XXX XXXX',
      href: 'tel:+63XXXXXXXXXX',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Philippines',
      href: null,
    },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://facebook.com/', label: 'Facebook' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Let's work together
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              I'm currently looking for internship opportunities and junior developer positions. 
              Whether you have a question, want to collaborate on a project, or just want to say hi, 
              feel free to reach out!
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-800 font-medium hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-800 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-600 mb-4">Connect with me on social media:</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-primary hover:border-primary hover:shadow-md transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="How can I help you?"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <div
                  className={`mb-4 p-4 rounded-xl text-sm ${
                    submitStatus === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {submitStatus === 'success'
                    ? 'Thank you! Your message has been sent successfully.'
                    : 'Oops! Something went wrong. Please try again.'}
                </div>
              )}

              <Button
                variant="primary"
                className="w-full justify-center bg-primary text-white hover:bg-primary-light"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
