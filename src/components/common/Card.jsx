/**
 * Card Component for displaying content in a styled container
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Enable hover effects
 */
const Card = ({ children, className = '', hover = true }) => {
  const hoverClasses = hover 
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' 
    : ''

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 ${hoverClasses} ${className}`}>
      {children}
    </div>
  )
}

export default Card
