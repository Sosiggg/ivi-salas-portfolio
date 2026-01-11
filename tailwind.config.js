/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#4772B1',
        secondary: '#344054',
        navDark: '#171717',
        accent: '#E8F4F8',
        dark: '#1A202C',
        light: '#F7FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
        lufga: ['Lufga', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
