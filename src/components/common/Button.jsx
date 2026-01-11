import { ArrowUpRight } from 'lucide-react'

/**
 * Reusable Button Component
 * @param {Object} props - Component props
 * @param {'primary' | 'secondary'} props.variant - Button style variant
 * @param {React.ReactNode} props.children - Button content
 * @param {boolean} props.hasArrow - Whether to show arrow icon
 * @param {string} props.href - Optional link href
 * @param {function} props.onClick - Optional click handler
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({ 
  variant = 'primary', 
  children, 
  hasArrow = false, 
  href, 
  onClick,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300'
  
  const variants = {
    primary: 'bg-white text-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-accent-dark text-white hover:bg-gray-700',
  }

  const buttonClasses = `${baseStyles} ${variants[variant]} ${className}`

  const content = (
    <>
      {children}
      {hasArrow && <ArrowUpRight size={18} />}
    </>
  )

  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={buttonClasses} {...props}>
      {content}
    </button>
  )
}

export default Button
