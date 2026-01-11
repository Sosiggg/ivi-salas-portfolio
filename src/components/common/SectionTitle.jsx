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
    <div className={`mb-12 md:mb-16 ${alignmentClasses} ${className}`}>
      <h2 className="heading-secondary text-gray-800 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
