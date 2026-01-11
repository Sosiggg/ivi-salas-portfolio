/**
 * Reusable Section Title Component
 * @param {Object} props - Component props
 * @param {string} props.title - Main title text
 * @param {string} props.subtitle - Optional subtitle/description
 * @param {string} props.className - Additional CSS classes
 * @param {'left' | 'center'} props.align - Text alignment
 */
const SectionTitle = ({ title, subtitle, className = '', align = 'center' }) => {
  const alignmentClasses = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-2 ${alignmentClasses} ${className}`}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-gray-800 mb-2 sm:mb-3 md:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
